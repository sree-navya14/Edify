import React, { useState } from "react";
import "../styles/FlipCard.css"; // Make sure this is imported

const FlipCard = ({ frontImage, frontText, backImage, backText }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="flip-card-inner"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="flip-card-front">
          <h3 className="flip-title">{frontText}</h3>
          <img src={frontImage} alt="Front" className="flip-image" />
        </div>
        <div className="flip-card-back">
          <img src={backImage} alt="Back" className="flip-img" />
          <p className="flip-description">{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
