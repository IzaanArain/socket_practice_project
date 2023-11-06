const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");
const { Server } = require("socket.io");
const Connect = require("./config/DBConnection");
const Message = require("./model/MessageModel");
const { Socket } = require("dgram");
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
  console.log("user connected", socket.id);
  // socket.join("room");

  socket.on("join_room", (data) => {
    console.log(data)
    socket.join(data.room);
    console.log(socket.rooms)
  });

  socket.on("send_message", (data) => {
    console.log("sending", data);
    socket.to(data.room).emit("receive_message", data);
    console.log(socket.rooms)
  });
  
  // socket.on("receive_message",(data)=>{
  //   console.log("received",data)
  // })

   // socket.on("message", (data) => {
  //   socket.emit("message", data);
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

Connect().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.cyan);
    console.log(`Server running on port ${PORT}`.cyan);
  });
});
