import React from "react";

const WelcomeHeader = ({ name }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-purple-600">
        Welcome back, {name}! 👋
      </h1>
      <p className="text-gray-600">Ready to continue your learning journey?</p>
    </div>
  );
};

export default WelcomeHeader;
