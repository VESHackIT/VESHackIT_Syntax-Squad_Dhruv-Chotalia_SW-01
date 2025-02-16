// export default App;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import ScoreBoard from "../components/components/ScoreBoard";
import useGameStore from "../components/components/gameStore";

const wordData = [
  {
    target: "cat",
    options: ["bat", "dog", "mat", "pen"],
    correctOption: "bat",
  },
  {
    target: "tree",
    options: ["bee", "rock", "free", "sun"],
    correctOption: "free",
  },
  {
    target: "star",
    options: ["car", "moon", "far", "book"],
    correctOption: "far",
  },
  {
    target: "light",
    options: ["night", "dark", "right", "door"],
    correctOption: "night",
  },
  {
    target: "play",
    options: ["stay", "run", "way", "table"],
    correctOption: "stay",
  },
  {
    target: "blue",
    options: ["clue", "red", "shoe", "green"],
    correctOption: "clue",
  },
  {
    target: "fun",
    options: ["run", "sleep", "sun", "laugh"],
    correctOption: "run",
  },
  {
    target: "hill",
    options: ["chill", "tall", "pill", "ball"],
    correctOption: "chill",
  },
];

function RhymeTime() {
  const { score, incrementScore, setGameState } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setGameState({
      targetWord: wordData[currentIndex].target,
      options: wordData[currentIndex].options,
      isCorrect: null,
    });
    setSelectedWord(null);
  }, [currentIndex]);

  const handleWordSelect = (selected) => {
    setSelectedWord(selected);
    const correct = selected === wordData[currentIndex].correctOption;
    setIsCorrect(correct);

    if (correct) {
      incrementScore();
    }
  };

  const TargetWord = ({ word }) => (
    <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-100 text-center">
      <h2 className="text-2xl font-bold text-purple-600">{word}</h2>
    </div>
  );

  const OptionWord = ({ word, isSelected, isCorrect, onClick }) => (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 text-center cursor-pointer
        transition-all duration-200
        ${
          isSelected
            ? isCorrect === "correct"
              ? "bg-green-100 border-green-500"
              : "bg-red-100 border-red-500"
            : "bg-white border-gray-200 hover:border-blue-500 hover:shadow-md"
        }
      `}
    >
      <h2 className="text-2xl font-bold text-gray-700">{word}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-600">Rhyme Time</h1>
          </div>
          <p className="text-gray-600">
            Find the word that rhymes with the target!
          </p>
        </motion.div>

        <ScoreBoard score={score} level={currentIndex + 1} />

        <div className="mt-8">
          <TargetWord word={wordData[currentIndex].target} />
        </div>

        <motion.div
          className="mt-8 grid grid-cols-2 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {wordData[currentIndex].options.map((option, index) => (
            <OptionWord
              key={index}
              word={option}
              onClick={() => handleWordSelect(option)}
              isSelected={selectedWord === option}
              isCorrect={
                selectedWord === option
                  ? isCorrect
                    ? "correct"
                    : "wrong"
                  : null
              }
            />
          ))}
        </motion.div>

        {isCorrect !== null && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % wordData.length)
              }
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RhymeTime;
