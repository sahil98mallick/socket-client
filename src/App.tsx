import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://socket-server-flax.vercel.app");

const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setReceivedMessage(data);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Socket.io Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received: {receivedMessage}</p>
    </div>
  );
};

export default App;
