// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import codeBlockRoutes from './routes/codeBlockRoutes.js';
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    // In development, allow localhost
    // In production, this will be handled by the same-origin policy
    origin: process.env.NODE_ENV === "production" 
        ? true  // Allow same origin in production
        : "http://localhost:5173",
    credentials: true,
}));

// API routes
app.use('/api/codeblocks', codeBlockRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Handle client-side routing
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    connectDB();
});