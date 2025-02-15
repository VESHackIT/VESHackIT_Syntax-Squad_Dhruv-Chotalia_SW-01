// src/components/FeedbackMessage.jsx
import React from 'react';

const FeedbackMessage = ({ message, animateSuccess }) => {
  return (
    <div
      className={`text-lg font-bold transition-all duration-500 ${
        animateSuccess ? 'animate-bounce' : ''
      }`}
    >
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackMessage;
