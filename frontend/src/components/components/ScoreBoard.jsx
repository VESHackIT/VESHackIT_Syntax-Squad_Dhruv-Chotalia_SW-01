import React from 'react';
import { Trophy } from 'lucide-react';

const ScoreBoard = ({ score, level }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span className="text-lg font-bold">Score: {score}</span>
      </div>
      <div className="border-l-2 pl-4">
        <span className="text-lg font-bold">Level: {level}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;