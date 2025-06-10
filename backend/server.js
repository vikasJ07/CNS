import path from "path";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";


const __dirname = path.resolve();
// require('dotenv').config();
dotenv.config();

const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:5000", // frontend origin
    credentials: true, // allow cookies/auth headers if needed
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
