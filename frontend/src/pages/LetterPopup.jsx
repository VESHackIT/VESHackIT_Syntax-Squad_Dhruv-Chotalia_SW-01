import { useState, useEffect, useCallback } from "react";

const words = [
  "rainbow",
  "sunshine",
  "butterfly",
  "starlight",
  "ocean",
  "mountain",
  "galaxy",
  "forest",
];

const generateRandomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
};

const Bubble = ({ letter, position, isDecoy, onClick }) => {
  return (
    <div
      className={`absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer select-none
                  transition-transform duration-200 animate-float
                  ${isDecoy ? "bg-white/10 border-white/20" : "bg-white/20 border-white/30"}
                  border-2 backdrop-blur-sm hover:scale-110 active:scale-90`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(${position.offsetX}px, ${position.offsetY}px)`,
      }}
      onClick={onClick}
    >
      <span className="text-2xl font-bold text-white">{letter}</span>
    </div>
  );
};

const GameStats = ({ score, time }) => (
  <div className="flex justify-around w-full max-w-2xl mx-auto">
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      Score: {score}
    </div>
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      Time: {time}s
    </div>
  </div>
);

const WordDisplay = ({ word, currentIndex }) => (
  <div className="text-5xl font-bold text-white text-shadow my-6 tracking-wider">
    <span className="text-green-400">{word.slice(0, currentIndex)}</span>
    {word.slice(currentIndex)}
  </div>
);

export default function Game() {
  const [gameState, setGameState] = useState({
    targetWord: "",
    currentIndex: 0,
    score: 0,
    time: 0,
    message: "",
    bubbles: [],
  });

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  const updateBubblePositions = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      bubbles: prev.bubbles.map((bubble) => {
        let newX = bubble.x + bubble.speedX;
        let newY = bubble.y + bubble.speedY;
        let newSpeedX = bubble.speedX;
        let newSpeedY = bubble.speedY;

        if (newX <= 0 || newX >= dimensions.width - 64) {
          newSpeedX *= -1;
        }
        if (newY <= 0 || newY >= dimensions.height - 64) {
          newSpeedY *= -1;
        }

        return {
          ...bubble,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
        };
      }),
    }));
  }, [dimensions]);

  useEffect(() => {
    const timer = setInterval(updateBubblePositions, 16);
    return () => clearInterval(timer);
  }, [updateBubblePositions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createBubbles = (word) => {
    const wordBubbles = word.split("").map((letter) => ({
      letter,
      isDecoy: false,
      x: Math.random() * (dimensions.width - 64),
      y: Math.random() * (dimensions.height - 64),
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      offsetX: 0,
      offsetY: 0,
    }));

    const decoyBubbles = Array.from({ length: 15 }, () => ({
      letter: generateRandomChar(),
      isDecoy: true,
      x: Math.random() * (dimensions.width - 64),
      y: Math.random() * (dimensions.height - 64),
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      offsetX: 0,
      offsetY: 0,
    }));

    return [...wordBubbles, ...decoyBubbles];
  };

  const startGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setGameState({
      targetWord: newWord,
      currentIndex: 0,
      score: 0,
      time: 0,
      message: "",
      bubbles: createBubbles(newWord),
    });
  };

  const handleBubbleClick = (bubble, index) => {
    if (
      bubble.letter.toLowerCase() ===
      gameState.targetWord[gameState.currentIndex].toLowerCase()
    ) {
      setGameState((prev) => {
        const newBubbles = [...prev.bubbles];
        newBubbles.splice(index, 1);

        const newState = {
          ...prev,
          bubbles: newBubbles,
          currentIndex: prev.currentIndex + 1,
          score: prev.score + 10,
        };

        if (newState.currentIndex === prev.targetWord.length) {
          setTimeout(startGame, 2000);
          return {
            ...newState,
            message: "✨ Perfect! Get ready for the next word! ✨",
          };
        }

        return newState;
      });
    } else {
      setGameState((prev) => ({
        ...prev,
        score: Math.max(0, prev.score - 5),
        message: "Oops! Wrong letter!",
      }));
      setTimeout(
        () => setGameState((prev) => ({ ...prev, message: "" })),
        1000,
      );
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-red-900 to-yellow-500 text-white overflow-hidden">
      <div className="w-full bg-black/20 backdrop-blur-sm rounded-b-3xl px-6 py-4 mb-6">
        <h1 className="text-4xl font-bold text-center mb-4">Pop the Letters</h1>
        <GameStats score={gameState.score} time={gameState.time} />
      </div>

      <div className="text-center">
        <WordDisplay
          word={gameState.targetWord}
          currentIndex={gameState.currentIndex}
        />
        <div className="h-8 text-2xl font-bold">{gameState.message}</div>
        <button
          onClick={startGame}
          className="px-8 py-4 text-xl bg-white/20 border-2 border-white/30 rounded-full
                     backdrop-blur-sm cursor-pointer transition-all duration-300
                     hover:bg-white/30 hover:-translate-y-1"
        >
          Start Game
        </button>
      </div>

      {gameState.bubbles.map((bubble, index) => (
        <Bubble
          key={index}
          letter={bubble.letter}
          position={bubble}
          isDecoy={bubble.isDecoy}
          onClick={() => handleBubbleClick(bubble, index)}
        />
      ))}
    </div>
  );
}
