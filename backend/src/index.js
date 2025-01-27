import express from "express";
import dotenvb from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import codeBlockRoutes from './routes/codeBlockRoutes.js';

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";




dotenvb.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    })
);

app.use('/api/codeblocks', codeBlockRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});
