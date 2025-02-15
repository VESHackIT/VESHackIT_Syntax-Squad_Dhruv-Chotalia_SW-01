// src/App.jsx
import React from 'react';
import Header from '../components/components/Header';
import GameArea from '../components/components/GameArea';
// This file should include your Tailwind directives

function SpellingBee() {
  return (
    <div className="App">
      <Header />
      <GameArea />
    </div>
  );
}

export default SpellingBee;
