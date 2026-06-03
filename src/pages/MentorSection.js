import React from "react";
import "../styles/MentorSection.css";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa"; // Google Meet-like icon
import { FiMessageSquare } from "react-icons/fi";

const MentorSection = ({ mentor }) => {
    const navigate = useNavigate();
  if (!mentor) {
    return (
      <div className="mentor-section">
        <h2>Mentor</h2>
        <p>No mentor assigned yet. Please wait for the allocation.</p>
      </div>
    );
  }

  return (
    <div className="mentor-section">
      <h2>Mentor</h2>
      <div className="mentor-card">
        <div className="mentor-avatar">{mentor.name.charAt(0)}</div>
        <div className="mentor-info">
          <p><strong>{mentor.name}</strong></p>
          <p>{mentor.email}</p>
          <p>{mentor.expertise}</p>
        </div>
        {/* <button className="chat-button" onClick={() => alert("Open Chat UI")}>
          Chat
        </button> */}
        {/* <button
        className="chat-button"
        onClick={() => navigate("/chat", { state: { mentor } })}
        >
        Chat
        </button> */}

<div className="mentor-actions">
        <button
          className="chat-button"
          onClick={() => navigate("/chat", { state: { mentor } })}
        >
          <FiMessageSquare /> Chat
        </button>
        <a
          href={mentor.meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="meet-button"
        >
          <FaVideo /> Meet
        </a>
      </div>
      </div>
    </div>
  );
};

export default MentorSection;
