import { useState, useEffect, useCallback } from "react";

// Define levels with static word lists
const levels = [
  { level: 1, words: ["at", "in", "is", "it", "no", "go", "so", "me", "we", "do"] },
  { level: 5, words: ["am", "an", "as", "be", "by", "he", "if", "or", "to", "up"] },
  { level: 10, words: ["bad", "big", "cat", "dog", "fat", "hot", "man", "red", "sun", "wet"] },
  { level: 15, words: ["box", "car", "cup", "day", "eat", "fun", "get", "his", "job", "key"] },
  { level: 20, words: ["bed", "fly", "map", "pen", "run", "sit", "ten", "win", "yes", "zoo"] },
  { level: 25, words: ["able", "bake", "came", "date", "face", "game", "hate", "idea", "joke", "kind"] },
  { level: 30, words: ["blue", "book", "city", "dark", "easy", "fine", "grow", "help", "into", "jump"] },
  { level: 35, words: ["learn", "make", "near", "open", "play", "quit", "rain", "sing", "talk", "walk"] },
  { level: 40, words: ["about", "after", "again", "could", "first", "great", "happy", "light", "might", "never"] },
  { level: 45, words: ["better", "before", "family", "friend", "little", "people", "pretty", "should", "though", "through"] },
  { level: 50, words: ["because", "believe", "change", "enough", "follow", "happen", "listen", "moment", "picture", "problem"] },
  { level: 55, words: ["accept", "advice", "appear", "believe", "certain", "decide", "direct", "enough", "explain", "famous"] },
  { level: 60, words: ["imagine", "include", "instead", "mention", "perhaps", "prepare", "receive", "suggest", "thought", "through"] },
  { level: 65, words: ["although", "because", "complete", "consider", "continue", "different", "difficult", "discover", "especially", "important"] },
  { level: 70, words: ["actually", "anything", "beautiful", "carefully", "certainly", "difficult", "everybody", "everything", "however", "probably"] },
  { level: 75, words: ["although", "business", "decision", "education", "experience", "knowledge", "possible", "question", "together", "understand"] },
  { level: 80, words: ["absolutely", "attention", "community", "dangerous", "different", "especially", "important", "knowledge", "necessary", "probably"] },
  { level: 85, words: ["beginning", "carefully", "certainly", "difficult", "everything", "generally", "important", "knowledge", "particular", "possible"] },
  { level: 90, words: ["although", "business", "decision", "education", "experience", "knowledge", "possible", "question", "together", "understand"] },
  { level: 95, words: ["accessible", "accomplish", "adventure", "ambassador", "character", "conscious", "definitely", "disappear", "environment", "excellent"] },
  { level: 100, words: ["accommodate", "achievement", "collection", "consequence", "development", "disadvantage", "enthusiastic", "opportunity", "particular", "successful"] },
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

const GameStats = ({ score, time, level }) => (
  <div className="flex justify-around w-full max-w-2xl mx-auto">
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      Score: {score}
    </div>
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      Time: {time}s
    </div>
    <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
      Level: {level}
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
  // Global game state (score, time, message, bubbles, etc.)
  const [gameState, setGameState] = useState({
    targetWord: "",
    currentIndex: 0,
    score: 0,
    time: 0,
    message: "",
    bubbles: [],
  });

  // Level-related state
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  // Pool of words left for the current level (avoids repetition)
  const [currentPool, setCurrentPool] = useState([]);
  // Level performance tracking
  const [levelAttempts, setLevelAttempts] = useState(0);
  const [levelCorrect, setLevelCorrect] = useState(0);

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  // Update bubble positions
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

  // Create bubbles for the given word
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

  // Start or restart the game for the current level
  const startLevel = () => {
    const currentLevel = levels[currentLevelIndex];
    // Reset the pool with a copy of the words for this level
    setCurrentPool([...currentLevel.words]);
    // Reset level stats
    setLevelAttempts(0);
    setLevelCorrect(0);
    // Reset overall game state (score/time can be cumulative or per level)
    setGameState((prev) => ({
      ...prev,
      targetWord: "",
      currentIndex: 0,
      message: "",
      bubbles: [],
      time: 0,
    }));
    // Load the first word for this level
    loadWord();
  };

  // Load a word from the current pool without repeating
  const loadWord = () => {
    if (currentPool.length === 0) {
      // Level complete; evaluate performance
      const accuracy =
        levelAttempts > 0 ? (levelCorrect / levelAttempts) * 100 : 0;
      // Example thresholds: at least 70% accuracy and average time < target (not computed here)
      if (accuracy >= 70) {
        alert(
          `Level ${levels[currentLevelIndex].level} complete! Accuracy: ${accuracy.toFixed(
            1,
          )}%. Moving to the next level.`
        );
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex((prev) => prev + 1);
        }
      } else {
        alert(
          `Level ${levels[currentLevelIndex].level} incomplete. Accuracy: ${accuracy.toFixed(
            1,
          )}%. Try again.`
        );
      }
      // Restart the level regardless (either next level or repeat current)
      startLevel();
      return;
    }
    // Pick a random word from the current pool
    const randomIndex = Math.floor(Math.random() * currentPool.length);
    const newWord = currentPool[randomIndex];
    // Remove the chosen word from the pool
    const newPool = currentPool.filter((_, idx) => idx !== randomIndex);
    setCurrentPool(newPool);
    // Set game state for the new word
    setGameState((prev) => ({
      ...prev,
      targetWord: newWord,
      currentIndex: 0,
      message: "",
      bubbles: createBubbles(newWord),
      time: 0, // reset word timer if desired
    }));
  };

  // Handle correct/incorrect bubble clicks
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
          // Word complete
          setLevelAttempts((prev) => prev + 1);
          setLevelCorrect((prev) => prev + 1);
          setTimeout(() => {
            setGameState((prevState) => ({ ...prevState, message: "✨ Perfect! Next word! ✨" }));
            loadWord();
          }, 2000);
          return { ...newState, message: "✨ Perfect! Get ready for the next word! ✨" };
        }
        return newState;
      });
    } else {
      setGameState((prev) => ({
        ...prev,
        score: Math.max(0, prev.score - 5),
        message: "Oops! Wrong letter!",
      }));
      // Count incorrect attempts only if first mistake on this word (optional)
      setLevelAttempts((prev) => prev + 1);
      setTimeout(
        () =>
          setGameState((prev) => ({
            ...prev,
            message: "",
          })),
        1000
      );
    }
  };

  // Start level on initial mount or when level changes
  useEffect(() => {
    startLevel();
  }, [currentLevelIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-red-900 to-yellow-500 text-white overflow-hidden">
      <div className="w-full bg-black/20 backdrop-blur-sm rounded-b-3xl px-6 py-4 mb-6">
        <h1 className="text-4xl font-bold text-center mb-4">Pop the Letters</h1>
        <GameStats score={gameState.score} time={gameState.time} level={levels[currentLevelIndex].level} />
      </div>

      <div className="text-center">
        <WordDisplay word={gameState.targetWord} currentIndex={gameState.currentIndex} />
        <div className="h-8 text-2xl font-bold">{gameState.message}</div>
        <button
          onClick={startLevel}
          className="px-8 py-4 text-xl bg-white/20 border-2 border-white/30 rounded-full
                     backdrop-blur-sm cursor-pointer transition-all duration-300
                     hover:bg-white/30 hover:-translate-y-1"
        >
          Restart Level
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
