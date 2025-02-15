import React from 'react';
import Header from '../components/components/Header';
import GameArea from '../components/components/GameArea';
import '../index.css'; // This file should include your Tailwind directives

function SpellingBee() {
  return (
    <div className="App">
      <GameArea />
    </div>
  );
}
export default SpellingBee;
