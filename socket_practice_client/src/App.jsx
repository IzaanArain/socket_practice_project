import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:5000");
function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(userName !=="" && room !==""){
      socket.emit("join_room",room);
    }
  };
  return (
    <>
      <h1>Hello world</h1>
      <div>
        <h3>Join Chat</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    </>
  );
}

export default App;
