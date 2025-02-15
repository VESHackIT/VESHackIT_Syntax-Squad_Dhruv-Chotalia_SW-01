import React, { useState, useEffect } from "react";

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
    if (!draggedLetter) return;
    const wordData = gameData[currentWordIndex];

    if (!wordData.incorrectPositions.includes(targetIndex)) {
      setMessage("This letter is already correct!");
      return;
    }

    const correctLetter = wordData.correctWord[targetIndex];

    // Report a mistake if the dragged letter is not the correct one
    if (draggedLetter !== correctLetter) {
      const mistakeData = {
        userId: "12345", // Replace with actual user ID if available
        gameType: "Word Correction",
        mistake: {
          incorrect: draggedLetter,
          correct: correctLetter,
        },
        word: wordData.correctWord,
      };

      fetch("http://localhost:3000/api/mistake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mistakeData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Mistake recorded:", data))
        .catch((error) =>
          console.error("Error reporting mistake:", error)
        );
    }

    // Swap the letters instead of removing the dragged letter
    const newWord = [...currentWord];
    const replacedLetter = newWord[targetIndex];
    newWord[targetIndex] = draggedLetter;
    setCurrentWord(newWord);

    // Update available letters by replacing the dragged letter with the letter that was in the tile
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

    // Check if the new word matches the correct word
    if (newWord.join("") === wordData.correctWord) {
      const pointsEarned = Math.max(10 - attempts, 1);
      setScore((prev) => prev + pointsEarned);
      setMessage(
        `Correct! You earned ${pointsEarned} points. Click Next to continue.`
      );
      setIsCorrect(true);
    }
  };

  const handleNext = () => {
    if (!isCorrect) {
      setMessage("Fix all incorrect letters before moving on!");
      return;
    }
    if (currentWordIndex < gameData.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setMessage(`Game completed! Final score: ${score}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Word Correction Game</h2>
        <p className="text-lg">Score: {score}</p>
        <p className="text-sm text-gray-600 mt-1">
          Attempts this word: {attempts}
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-2">
          {currentWord.map((letter, index) => {
            const wordData = gameData[currentWordIndex];
            const correctLetter = wordData.correctWord[index];
            const isCurrentCorrect = letter === correctLetter;
            const isInitiallyIncorrect =
              wordData.incorrectPositions.includes(index);
            return (
              <div
                key={index}
                className={`w-12 h-12 border-2 flex items-center justify-center text-2xl rounded-lg ${
                  isCurrentCorrect
                    ? "border-green-500 bg-green-50"
                    : isInitiallyIncorrect
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                {letter}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {availableLetters.map((letter, index) => (
            <div
              key={index}
              className="w-12 h-12 text-2xl bg-blue-500 text-white rounded-lg flex items-center justify-center cursor-move"
              draggable
              onDragStart={() => setDraggedLetter(letter)}
            >
              {letter}
            </div>
          ))}
        </div>

        {message && (
          <div
            className={`text-xl font-bold ${
              message.includes("Correct") || message.includes("completed")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleNext}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${
            !isCorrect && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isCorrect}
        >
          Next Word
        </button>
      </div>
    </div>
  );
};

export default WordCorrectionGame;
