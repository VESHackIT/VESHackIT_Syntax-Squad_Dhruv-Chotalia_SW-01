import React, { useState, useEffect } from "react";
import { Trophy, Heart, RotateCcw, ChevronRight } from "lucide-react";

const gameData = [
  {
    correctWord: "beautiful",
    initialWord: "befutiful",
    incorrectPositions: [2],
    letterOptions: ["a", "e", "u", "i", "o"],
  },
  {
    correctWord: "house",
    initialWord: "hoase",
    incorrectPositions: [2],
    letterOptions: ["u", "a", "e", "o"],
  },
  {
    correctWord: "necessary",
    initialWord: "nesessary",
    incorrectPositions: [2],
    letterOptions: ["c", "s", "e", "a"],
  },
  {
    correctWord: "receive",
    initialWord: "recieve",
    incorrectPositions: [3],
    letterOptions: ["e", "i", "a", "o"],
  },
  {
    correctWord: "conscience",
    initialWord: "consvience",
    incorrectPositions: [4],
    letterOptions: ["c", "i", "e", "s"],
  },
  {
    correctWord: "occurrence",
    initialWord: "occuranse",
    incorrectPositions: [6, 7],
    letterOptions: ["c", "s", "e", "n"],
  },
];

const WordCorrectionGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetWord();
  }, [currentWordIndex]);

  const resetWord = () => {
    const wordData = gameData[currentWordIndex];
    setCurrentWord([...wordData.initialWord]);
    setAvailableLetters([...wordData.letterOptions]);
    setIsCorrect(false);
    setMessage("");
    setAttempts(0);
  };

  const handleDrop = (targetIndex) => {
    if (!draggedLetter || lives <= 0) return;
    const wordData = gameData[currentWordIndex];

    if (!wordData.incorrectPositions.includes(targetIndex)) {
      setMessage("This letter is already correct!");
      return;
    }

    const correctLetter = wordData.correctWord[targetIndex];

    // Handle incorrect attempt
    if (draggedLetter !== correctLetter) {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setMessage("Game Over! Click Reset to try again.");
        }
        return newLives;
      });
    }

    const newWord = [...currentWord];
    const replacedLetter = newWord[targetIndex];
    newWord[targetIndex] = draggedLetter;
    setCurrentWord(newWord);

    const newAvailableLetters = availableLetters.slice();
    const draggedIndex = newAvailableLetters.indexOf(draggedLetter);
    if (draggedIndex !== -1) {
      newAvailableLetters.splice(draggedIndex, 1, replacedLetter);
    } else {
      newAvailableLetters.push(replacedLetter);
    }
    setAvailableLetters(newAvailableLetters);

    setDraggedLetter(null);
    setAttempts((prev) => prev + 1);

    if (newWord.join("") === wordData.correctWord) {
      const pointsEarned = Math.max(10 - attempts, 1);
      setScore((prev) => prev + pointsEarned);
      setMessage(`Correct! +${pointsEarned} points`);
      setIsCorrect(true);
    }
  };

  const handleNext = () => {
    if (!isCorrect) {
      setMessage("Fix all incorrect letters first!");
      return;
    }
    if (currentWordIndex < gameData.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
      setMessage(`Congratulations! Final score: ${score}`);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setMessage("");
    resetWord();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Word Correction Game
          </h1>
          <div className="flex justify-center items-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-semibold">{score}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < lives ? "text-red-500" : "text-gray-300"}`}
                  fill={i < lives ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Word {currentWordIndex + 1} of {gameData.length}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-3">
            {currentWord.map((letter, index) => {
              const wordData = gameData[currentWordIndex];
              const isCurrentCorrect = letter === wordData.correctWord[index];
              const isInitiallyIncorrect =
                wordData.incorrectPositions.includes(index);
              return (
                <div
                  key={index}
                  className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-200 ${
                    isCurrentCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : isInitiallyIncorrect
                        ? "border-red-400 bg-red-50 text-red-700 shadow-md hover:shadow-lg"
                        : "border-gray-300 bg-gray-50 text-gray-700"
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                >
                  {letter}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {availableLetters.map((letter, index) => (
              <div
                key={index}
                className={`w-14 h-14 text-2xl font-bold bg-blue-600 text-white rounded-lg flex items-center justify-center cursor-move 
                  transform hover:scale-105 transition-transform duration-150 shadow-md
                  ${gameOver ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                draggable={!gameOver}
                onDragStart={() => setDraggedLetter(letter)}
              >
                {letter}
              </div>
            ))}
          </div>

          {message && (
            <div
              className={`text-xl font-bold px-6 py-3 rounded-lg ${
                message.includes("Correct") ||
                message.includes("Congratulations")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors
                ${
                  isCorrect && !gameOver
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              disabled={!isCorrect || gameOver}
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCorrectionGame;
