import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CodeBlock } from '../models/CodeBlock.js';



const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === "production" 
            ? true  // Allow same origin in production
            : "http://localhost:5173",
        credentials: true,
    },
});


// Track socket-to-room mapping and roles
const socketRooms = new Map(); // Map<socketId, {roomId: string, isMentor: boolean}>


// Broadcast code block updates to lobby
const broadcastCodeBlockUpdate = async (codeBlock) => {
    try {
        io.to('lobby').emit('code-block-update', {
            _id: codeBlock._id,
            title: codeBlock.title,
            studentCount: codeBlock.studentCount,
            mentorPresent: codeBlock.mentorPresent
        });
    } catch (error) {
        console.error('Error broadcasting update:', error);
    }
};


// Reset code block when empty
const resetCodeBlockIfEmpty = async (codeBlock) => {
    try {
        if (codeBlock.studentCount === 0 && !codeBlock.mentorPresent) {
            await codeBlock.reset(); // Use the new reset method
            await broadcastCodeBlockUpdate(codeBlock);
            console.log(`Reset code block ${codeBlock._id}`);
        }
    } catch (error) {
        console.error('Error resetting code block:', error);
    }
};


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle lobby joining
    socket.on('join-lobby', () => {
        socket.join('lobby');
    });

    // Handle room joining
    socket.on('join-room', async ({ roomId, isMentor }) => {
        try {
            const codeBlock = await CodeBlock.findById(roomId);
            if (!codeBlock) return;

            // Check if mentor slot is available
            if (isMentor && codeBlock.mentorPresent) {
                socket.emit('join-error', 'Mentor already present');
                return;
            }

            socket.join(roomId);
            socketRooms.set(socket.id, { roomId, isMentor });

            // Update code block state
            if (isMentor) {
                codeBlock.mentorPresent = true;
            } else {
                codeBlock.studentCount += 1;
            }
            await codeBlock.save();

            // Broadcast updates
            io.to(roomId).emit('user-count-update', {
                studentCount: codeBlock.studentCount,
                mentorPresent: codeBlock.mentorPresent
            });
            
            await broadcastCodeBlockUpdate(codeBlock);
        } catch (error) {
            console.error('Error in join-room:', error);
            socket.emit('join-error', 'Failed to join room');
        }
    });


    // Handle leaving room
    const handleLeaveRoom = async (socketId) => {
        try {
            const socketData = socketRooms.get(socketId);
            if (!socketData) return;

            const { roomId, isMentor } = socketData;
            const codeBlock = await CodeBlock.findById(roomId);
            if (!codeBlock) return;

            if (isMentor) {
                codeBlock.mentorPresent = false;
                io.to(roomId).emit('mentor-left');
            } else {
                codeBlock.studentCount = Math.max(0, codeBlock.studentCount - 1);
            }

            await codeBlock.save();
            await resetCodeBlockIfEmpty(codeBlock);
            socketRooms.delete(socketId);

            // Broadcast updates
            io.to(roomId).emit('user-count-update', {
                studentCount: codeBlock.studentCount,
                mentorPresent: codeBlock.mentorPresent
            });
            
            await broadcastCodeBlockUpdate(codeBlock);
        } catch (error) {
            console.error('Error in handleLeaveRoom:', error);
        }
    };

    socket.on('leave-room', () => handleLeaveRoom(socket.id));

    socket.on('disconnect', () => handleLeaveRoom(socket.id));

    // Handle code changes
    socket.on('code-change', async ({ roomId, code }) => {
        try {
            const socketData = socketRooms.get(socket.id);
            if (!socketData || socketData.isMentor) return; // Prevent mentor from editing

            const codeBlock = await CodeBlock.findById(roomId);
            if (!codeBlock) return;

            codeBlock.currentCode = code;
            await codeBlock.save();

            // Broadcast code update to room
            socket.to(roomId).emit('code-update', code);

            // Check for solution match
            if (code === codeBlock.solution) {
                io.to(roomId).emit('solution-matched');
            }
        } catch (error) {
            console.error('Error in code-change:', error);
        }
    });
});

export { io, app, server };