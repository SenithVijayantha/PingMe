import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "node:http";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();
const port = process.env.PORT || 5001;
// const server = http.createServer(app);

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://pingme-frontend-six.vercel.app/", // frontend origin
    credentials: true, // allow cookies to be sent
  })
);

// routes
app.use("/api/status", (req, res) => {
  res.send("Server is listening");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store online users
export const userSocketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// connect DB and start server
try {
  await connectDB();
  if (process.env.NODE_ENV === "dev") {
    server.listen(port, () => console.log("Server started on PORT:", port));
  }
} catch (error) {
  console.error(error);
}

// Export server for Vercel
export default server;
