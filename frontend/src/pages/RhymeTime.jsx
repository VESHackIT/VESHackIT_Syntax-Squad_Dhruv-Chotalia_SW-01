// // import React, { useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Brain } from 'lucide-react';
// // import WordCard from './components/WordCard';
// // import ScoreBoard from './components/ScoreBoard';
// // import useGameStore from './store/gameStore';
// // import { getRandomWords } from './utils/wordUtils';

// // function App() {
// //   const { score, currentLevel, targetWord, options, isCorrect, incrementScore, setGameState } = useGameStore();

// //   const handleWordSelect = (selectedWord) => {
// //     const correct = selectedWord.endsWith(targetWord.text.slice(-2));
// //     setGameState({ isCorrect: correct });

// //     if (correct) {
// //       incrementScore();
// //       setTimeout(() => {
// //         const newTarget = getRandomWords(1)[0];
// //         const newOptions = getRandomWords(4);
// //         setGameState({
// //           targetWord: newTarget,
// //           options: newOptions,
// //           isCorrect: null,
// //           currentLevel: Math.floor(score / 5) + 1,
// //         });
// //       }, 1000);
// //     }
// //   };

// //   useEffect(() => {
// //     // Initialize game
// //     const newTarget = getRandomWords(1)[0];
// //     const newOptions = getRandomWords(4);
// //     setGameState({ targetWord: newTarget, options: newOptions });
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
// //       <div className="max-w-4xl mx-auto">
// //         <motion.div
// //           initial={{ y: -20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           className="text-center mb-8"
// //         >
// //           <div className="flex items-center justify-center gap-2 mb-4">
// //             <Brain className="w-8 h-8 text-purple-600" />
// //             <h1 className="text-4xl font-bold text-purple-600">Rhyme Time</h1>
// //           </div>
// //           <p className="text-gray-600">Find the word that rhymes with the target!</p>
// //         </motion.div>

// //         <ScoreBoard score={score} level={currentLevel} />

// //         <div className="mt-8">
// //           <WordCard word={targetWord.text} isTarget={true} />
// //         </div>

// //         <motion.div
// //           className="mt-8 grid grid-cols-2 gap-4"
// //           initial={{ y: 20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //         >
// //           {options.map((option, index) => (
// //             <WordCard
// //               key={index}
// //               word={option.text}
// //               onClick={() => handleWordSelect(option.text)}
// //               isCorrect={isCorrect}
// //             />
// //           ))}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Brain } from 'lucide-react';
// import WordCard from './components/WordCard';
// import ScoreBoard from './components/ScoreBoard';
// import useGameStore from './store/gameStore';
// import { getDynamicWords } from './utils/wordUtils';

// function App() {
//   const {
//     score,
//     currentLevel,
//     targetWord,
//     options,
//     isCorrect,
//     incrementScore,
//     setGameState,
//   } = useGameStore();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch dynamic words based on the current difficulty level
//   const fetchWords = async (level) => {
//     setLoading(true);
//     try {
//       const { target, options } = await getDynamicWords(level);
//       setGameState({
//         targetWord: target,
//         options: options,
//         isCorrect: null,
//         currentLevel: level,
//       });
//     } catch (err) {
//       setError('Failed to load words. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWordSelect = (selectedWord) => {
//     // Check if the selected word rhymes with the target (example logic)
//     const correct = selectedWord.endsWith(targetWord.text.slice(-2));
//     setGameState({ isCorrect: correct });

//     if (correct) {
//       incrementScore();
//       setTimeout(() => {
//         // Update level every 5 points; adjust as needed
//         const newLevel = Math.floor((score + 1) / 5) + 1;
//         fetchWords(newLevel);
//       }, 1000);
//     }
//   };

//   useEffect(() => {
//     // Initialize game with dynamic words based on the current level
//     fetchWords(currentLevel);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-xl text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-center mb-8"
//         >
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Brain className="w-8 h-8 text-purple-600" />
//             <h1 className="text-4xl font-bold text-purple-600">Rhyme Time</h1>
//           </div>
//           <p className="text-gray-600">
//             Find the word that rhymes with the target!
//           </p>
//         </motion.div>

//         <ScoreBoard score={score} level={currentLevel} />

//         <div className="mt-8">
//           <WordCard word={targetWord.text} isTarget={true} />
//         </div>

//         <motion.div
//           className="mt-8 grid grid-cols-2 gap-4"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//         >
//           {options.map((option, index) => (
//             <WordCard
//               key={index}
//               word={option.text}
//               onClick={() => handleWordSelect(option.text)}
//               isCorrect={isCorrect}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import WordCard from '../components/components/WordCard';
import ScoreBoard from '../components/components/ScoreBoard';
import useGameStore from '../components/components/gameStore';
import { getDynamicWords } from '../components/components/wordUtils';

function RhymeTime() {
  const {
    score,
    currentLevel,
    targetWord,
    options,
    isCorrect,
    incrementScore,
    setGameState,
  } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dynamic words using Gemini's API based on the current difficulty level.
  const fetchWords = async (level) => {
    setLoading(true);
    try {
      const { target, options } = await getDynamicWords(level);
      setGameState({
        targetWord: target,
        options: options,
        isCorrect: null,
        currentLevel: level,
      });
      setError(null);
    } catch (err) {
      setError('Failed to load words. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle word selection and update game state
  const handleWordSelect = (selectedWord) => {
    // Check if the selected word rhymes with the target based on the ending letters.
    const correct = selectedWord.endsWith(targetWord.text.slice(-2));
    setGameState({ isCorrect: correct });

    if (correct) {
      incrementScore();
      setTimeout(() => {
        const newLevel = Math.floor((score + 1) / 5) + 1;
        fetchWords(newLevel);
      }, 1000);
    } else {
      // Report the mistake to the backend using the mistake dictionary structure.
      const mistakeData = {
        userId: "12345", // Replace with actual user ID if available.
        gameType: "Rhyme Time",
        mistake: {
          incorrect: selectedWord,
          correct: targetWord.text,
        },
        word: targetWord.text,
      };

      fetch("http://localhost:3000/api/mistake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mistakeData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Mistake recorded:", data))
        .catch((error) =>
          console.error("Error reporting mistake:", error)
        );

      // Reset the feedback after a short delay.
      setTimeout(() => {
        setGameState({ isCorrect: null });
      }, 1000);
    }
  };

  useEffect(() => {
    // Initialize game with words from the API based on current level.
    fetchWords(currentLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

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

        <ScoreBoard score={score} level={currentLevel} />

        <div className="mt-8">
          <WordCard word={targetWord.text} isTarget={true} />
        </div>

        <motion.div
          className="mt-8 grid grid-cols-2 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {options.map((option, index) => (
            <WordCard
              key={index}
              word={option.text}
              onClick={() => handleWordSelect(option.text)}
              isCorrect={isCorrect}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default RhymeTime;

