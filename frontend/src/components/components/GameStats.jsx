// src/components/GameStats.jsx
import React from "react";

const GameStats = ({ score, time, level }) => (
  <div className="flex justify-around w-full max-w-xl mx-auto my-4">
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      <span className="text-lg font-semibold">Score: </span> {score}
    </div>
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      <span className="text-lg font-semibold">Time: </span> {time}s
    </div>
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      <span className="text-lg font-semibold">Level: </span> {level}
    </div>
  </div>
);

export default GameStats;
