import { useState, useEffect } from "react";
import Header from "./Header";
import GameStats from "./GameStats";
import InputField from "./InputField";
import FeedbackMessage from "./FeedbackMessage";

const API_URL = "http://localhost:3001"; // Adjust if your backend URL is different

export default function GameArea() {
  // Level and game progress state
  const [level, setLevel] = useState(1);
  const [usedWords, setUsedWords] = useState([]);
  const [targetWord, setTargetWord] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("");

  // Timer to track overall time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text-to-Speech: speak the full word
  const speakWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Text-to-Speech: speak the word letter-by-letter
  const speakLetters = (word) => {
    if ("speechSynthesis" in window) {
      const letters = word.split("");
      let index = 0;
      const playNext = () => {
        if (index < letters.length) {
          const letterUtterance = new SpeechSynthesisUtterance(letters[index]);
          letterUtterance.onend = () => {
            index++;
            playNext();
          };
          window.speechSynthesis.speak(letterUtterance);
        }
      };
      playNext();
    }
  };

  // Fetch a new word from the backend
  const loadWord = async () => {
    try {
      const response = await fetch(`${API_URL}/api/get-word`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, usedWords }),
      });
      const data = await response.json();
      if (data.done) {
        alert(`Level ${level} complete!`);
        setUsedWords([]);
        setLevel((prev) => prev + 5);
        loadWord();
        return;
      }
      setUsedWords((prev) => [...prev, data.word]);
      setTargetWord(data.word);
      setSuggestion(data.suggestion);
      setMessage("");
      speakWord(data.word);
    } catch (error) {
      console.error("Error loading word:", error);
      setMessage("Error loading word. Please try again.");
    }
  };

  useEffect(() => {
    loadWord();
  }, [level]);

  const handleInputSubmit = (input) => {
    if (input.trim().toLowerCase() === targetWord.toLowerCase()) {
      setMessage("Correct! Great job!");
      setScore((prev) => prev + 10);
      setTimeout(() => {
        loadWord();
      }, 2000);
    } else {
      setMessage("Incorrect. Let's try again.");
      speakWord(targetWord);
      setTimeout(() => {
        speakLetters(targetWord);
      }, 1000);

      // Report the mistake using the dictionary structure
      const mistakeData = {
        userId: "12345", // Replace with actual user ID if available
        gameType: "Word Guessing",
        mistake: {
          incorrect: input.trim(),
          correct: targetWord,
        },
        word: targetWord,
      };

      fetch(`${API_URL}/api/mistake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mistakeData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Mistake recorded:", data))
        .catch((error) =>
          console.error("Error reporting mistake:", error)
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-purple-950 text-white flex flex-col items-center py-8">
      <Header />
      <GameStats score={score} time={time} level={level} />
      <div className="w-full max-w-xl mt-8 relative">
        <div className="absolute inset-0 bg-indigo-900/20 backdrop-blur-sm rounded-lg -z-10" />
        <InputField onInputSubmit={handleInputSubmit} />
        <FeedbackMessage
          message={message}
          animateSuccess={message === "Correct! Great job!"}
        />
      </div>
    </div>
  );
}
