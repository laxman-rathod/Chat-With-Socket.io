import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    socket.on("message", (message): void => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages, setMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div id="container">
      <h1>Simple Chat App</h1>
      <section id="sec">
        <p id="server">
          {messages.map((message: string, index: number) => (
            <div key={index}>Server: {message}</div>
          ))}
        </p>
      </section>
      <input
        type="text"
        value={messageInput}
        placeholder="Enter a message"
        onChange={(e) => setMessageInput(e.target.value)}
      />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default App;
