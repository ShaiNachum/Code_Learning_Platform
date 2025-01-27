import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCodeStore from '../store/useCodeStore';
import { io } from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import Celebration from '../components/Celebration';

const CodeBlockPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const socket = useRef(null);
    const [showCelebration, setShowCelebration] = useState(false);
    // Add state for solution visibility
    const [showSolution, setShowSolution] = useState(false);
    
    const {
        currentBlock,
        isMentor,
        studentCount,
        mentorPresent,
        fetchCodeBlock,
        setIsMentor,
        setStudentCount,
        setMentorPresent,
        updateCurrentBlock,
        resetCurrentBlock,
    } = useCodeStore();

    // Function to handle solution reveal with confirmation
    const handleRevealSolution = () => {
        if (!showSolution) {
            const confirmed = window.confirm(
                "Are you sure you want to reveal the solution? Try to solve it on your own first!"
            );
            if (confirmed) {
                setShowSolution(true);
            }
        } else {
            setShowSolution(false);
        }
    };

    useEffect(() => {
        const initializeSocket = async () => {
            try {
                await fetchCodeBlock(id);
                
                socket.current = io('http://localhost:5001');
                
                // First check if mentor is present
                const response = await fetch(`http://localhost:5001/api/codeblocks/${id}`);
                const data = await response.json();
                const willBeMentor = !data.mentorPresent;
                
                setIsMentor(willBeMentor);
                
                // Join room with determined role
                socket.current.emit('join-room', { roomId: id, isMentor: willBeMentor });
                
                // Socket event listeners
                socket.current.on('join-error', (error) => {
                    console.error('Join error:', error);
                    navigate('/');
                });

                socket.current.on('code-update', (code) => {
                    updateCurrentBlock(code);
                });
                
                socket.current.on('user-count-update', ({ studentCount, mentorPresent }) => {
                    setStudentCount(studentCount);
                    setMentorPresent(mentorPresent);
                });
                
                socket.current.on('mentor-left', () => {
                    navigate('/');
                });
                
                socket.current.on('solution-matched', () => {
                    setShowCelebration(true);
                    // Automatically reveal solution when matched
                    setShowSolution(true);
                });
            } catch (error) {
                console.error('Error initializing:', error);
                navigate('/');
            }
        };

        initializeSocket();

        return () => {
            if (socket.current) {
                socket.current.emit('leave-room');
                socket.current.disconnect();
            }
            resetCurrentBlock();
        };
    }, [id]);

    const handleCodeChange = (value) => {
        if (isMentor) return; // Prevent mentor from editing
        updateCurrentBlock(value);
        socket.current.emit('code-change', { roomId: id, code: value });
    };

    if (!currentBlock) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">{currentBlock.title}</h1>
                <div className="flex gap-4">
                    <div className="badge badge-primary">{studentCount} students</div>
                    <div className={`badge ${isMentor ? 'badge-secondary' : mentorPresent ? 'badge-success' : 'badge-warning'}`}>
                        {isMentor ? 'You are the mentor' : mentorPresent ? 'Mentor present' : 'No mentor'}
                    </div>
                </div>
            </div>

            {/* Main Code Editor Section */}
            <div className="card bg-base-200 shadow-xl mb-8">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Your Code</h2>
                    <CodeMirror
                        value={currentBlock.currentCode}
                        height="400px"
                        theme={dracula}
                        extensions={[javascript()]}
                        onChange={handleCodeChange}
                        readOnly={isMentor}
                        className="text-lg mb-4"
                    />
                </div>
            </div>

            {/* Solution Section with Reveal Button */}
            <div className="card bg-base-200 shadow-xl transition-all duration-300">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="card-title text-2xl">Solution</h2>
                        <button 
                            onClick={handleRevealSolution}
                            className={`btn ${showSolution ? 'btn-error' : 'btn-primary'}`}
                        >
                            {showSolution ? 'Hide Solution' : 'Reveal Solution'}
                        </button>
                    </div>
                    
                    {/* Animated solution container */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                        showSolution ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        <CodeMirror
                            value={currentBlock.solution}
                            height="400px"
                            theme={dracula}
                            extensions={[javascript()]}
                            readOnly={true}
                            className="text-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Celebration component */}
            <Celebration 
                show={showCelebration} 
                onClose={() => setShowCelebration(false)} 
            />
        </div>
    );
};

export default CodeBlockPage;