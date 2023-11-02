import { useState, useEffect, Fragment } from "react";

const Chat = ({ socket, username, room,messageList, setMessageList }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  // const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prev) => {
        return [...prev, messageData];
      });
      setCurrentMessage("")
    }
  };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data);
  //     setMessageList((prev) => {
  //       return [...prev, data];
  //     });
  //   });
  // }, [socket]);
  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <p>Live Chat</p>
          <h3>Name : {username}</h3>
        </div>
        <div className="chat-body">
          {messageList.map((msg, i) => {
            return (
              <Fragment key={i}>
                <div
                  className="message"
                  id={username === msg.author ? "you" : "other"}
                >
                  <div className="message-content">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>
                      {msg.author} : {msg.time}
                    </p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Hey..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e)=>{
              e.key==="Enter" && sendMessage()
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
