// src/components/FeedbackMessage.jsx
import React from "react";

const FeedbackMessage = ({ message, animateSuccess }) => (
  <div
    className={`text-2xl font-bold transition-all duration-500 ${animateSuccess ? "animate-bounce" : ""} text-center my-4`}
  >
    {message && <p>{message}</p>}
  </div>
);

export default FeedbackMessage;
