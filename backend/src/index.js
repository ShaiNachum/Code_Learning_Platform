import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import codeBlockRoutes from './routes/codeBlockRoutes.js';
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL || "https://your-app-name.onrender.com"
        : "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use('/api/codeblocks', codeBlockRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
    // Set static folder
    const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
    app.use(express.static(frontendDistPath));

    // Handle SPA routing
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log("Environment:", process.env.NODE_ENV);
    connectDB();
});