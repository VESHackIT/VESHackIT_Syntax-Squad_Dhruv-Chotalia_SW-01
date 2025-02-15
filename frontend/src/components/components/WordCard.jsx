// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { Volume2 } from 'lucide-react';
// // import { speakWord } from '../utils/wordUtils';

// // const WordCard = ({ word, onClick, isTarget, isCorrect }) => {
// //   const handleClick = () => {
// //     onClick?.();
// //   };

// //   return (
// //     <motion.div
// //       whileTap={{ scale: 0.95 }}
// //       className={`
// //         ${isTarget ? 'bg-purple-600 text-white' : 'bg-white'}
// //         ${isCorrect === true ? 'bg-green-500 text-white' : ''}
// //         ${isCorrect === false ? 'bg-red-500 text-white' : ''}
// //         p-6 rounded-xl shadow-lg cursor-pointer flex items-center justify-between
// //         transition-colors duration-300
// //       `}
// //       onClick={handleClick}
// //     >
// //       <span className="text-2xl font-bold">{word}</span>
// //       {isTarget && (
// //         <button
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             speakWord(word);
// //           }}
// //           className="p-2 rounded-full transition-colors"
// //         >
// //           <Volume2 className="w-6 h-6" />
// //         </button>
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default WordCard;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Volume2 } from 'lucide-react';
// import { speakWord } from '../utils/wordUtils';

// const WordCard = ({ word, onClick, isTarget, isCorrect }) => {
//   const handleClick = () => {
//     onClick?.();
//   };

//   return (
//     <motion.div
//       whileTap={{ scale: 0.95 }}
//       className={`
//         ${isTarget ? 'bg-purple-600 text-white' : 'bg-white'}
//         ${isCorrect === true ? 'bg-green-500 text-white' : ''}
//         ${isCorrect === false ? 'bg-red-500 text-white' : ''}
//         p-6 rounded-xl shadow-lg cursor-pointer flex items-center justify-between
//         transition-colors duration-300
//       `}
//       onClick={handleClick}
//     >
//       <span className="text-2xl font-bold">{word}</span>
//       {isTarget && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             speakWord(word);
//           }}
//           className="p-2 rounded-full transition-colors"
//         >
//           <Volume2 className="w-6 h-6" />
//         </button>
//       )}
//     </motion.div>
//   );
// };

// export default WordCard;


import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakWord } from './wordUtils';
const WordCard = ({ word, onClick, isTarget, isCorrect }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`
        ${isTarget ? 'bg-purple-600 text-white' : 'bg-white'}
        ${isCorrect === true ? 'bg-green-500 text-white' : ''}
        ${isCorrect === false ? 'bg-red-500 text-white' : ''}
        p-6 rounded-xl shadow-lg cursor-pointer flex items-center justify-between
        transition-colors duration-300
      `}
      onClick={handleClick}
    >
      <span className="text-2xl font-bold">{word}</span>
      {isTarget && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            speakWord(word);
          }}
          className="p-2 rounded-full transition-colors"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      )}
    </motion.div>
  );
};

export default WordCard;
