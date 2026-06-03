import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const location = useLocation();
  const mentor = location.state?.mentor;

  const [messages, setMessages] = useState([
    { sender: "mentor", text: "Hi, how can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "mentor", text: "I'll get back to you shortly." },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <h2>Chat with {mentor?.name || "Your Mentor"}</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "mentor"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
