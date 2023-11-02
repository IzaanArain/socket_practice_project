import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:5000");
function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    console.log("useEffect")
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((prev) => {
        return [...prev, data];
      });
    });
  }, [socket]);

  return (
    <>
    <h1>Hello world</h1>
      {showChat ? (
        <Chat
          socket={socket}
          username={userName}
          room={room}
          messageList={messageList}
          setMessageList={setMessageList}
        />
      ) : (
        <div className="join-chat">
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
      )}
    </>
  );
}

export default App;
