const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
// const io=new Server(server);

io.on("connection", (socket) => {
  // console.log("user connected", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message",(data)=>{
    console.log(data)
    socket.to(data.room).emit("receive_message",data)
  })

  socket.on("diconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server runnimg on http://localhost:${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
