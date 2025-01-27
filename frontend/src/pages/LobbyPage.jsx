import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useCodeStore from '../store/useCodeStore';

const LobbyPage = () => {
    const navigate = useNavigate();
    const socket = useRef(null);
    const { 
        codeBlocks, 
        fetchCodeBlocks, 
        loading, 
        error,
        updateCodeBlockInLobby 
    } = useCodeStore();

    useEffect(() => {
        // Initial fetch of code blocks
        fetchCodeBlocks();

        // Initialize socket connection for lobby
        socket.current = io('http://localhost:5001');
        
        // Join lobby room
        socket.current.emit('join-lobby');

        // Listen for code block updates
        socket.current.on('code-block-update', (updatedBlock) => {
            updateCodeBlockInLobby(updatedBlock);
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [fetchCodeBlocks, updateCodeBlockInLobby]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Choose code block</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {codeBlocks.map((block) => (
                    <div 
                        key={block._id}
                        className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => navigate(`/code/${block._id}`)}
                    >
                        <div className="card-body">
                            <h2 className="card-title">{block.title}</h2>
                            <div className="flex gap-2">
                                <div className="badge badge-primary">
                                    {block.studentCount} students
                                </div>
                                <div className="badge badge-secondary">
                                    {block.mentorPresent ? 'Mentor present' : 'No mentor'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LobbyPage;