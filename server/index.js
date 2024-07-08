// 1. Import packages
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// 2. Create Instace & make server
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());

// 3. Server static files
app.use(express.static("public"));

// 4. Create connection
io.on("connection", (socket) => {
  console.log("New Connection ✅");

  socket.on("message", (msg) => {
    console.log("Message Recieved: " + msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => console.log("Disconnected ❌"));
});

// 5.Run server
server.listen(PORT, () => console.log(`Server Up at ${PORT}`));
