// // const wordList = [
// //   // Group 1: -at words
// //   { id: 1, text: 'cat' },
// //   { id: 2, text: 'hat' },
// //   { id: 3, text: 'bat' },
// //   { id: 4, text: 'rat' },
// //   { id: 5, text: 'mat' },
// //   { id: 6, text: 'sat' },
// //   { id: 7, text: 'pat' },

// //   // Group 2: -og words
// //   { id: 8, text: 'dog' },
// //   { id: 9, text: 'log' },
// //   { id: 10, text: 'fog' },
// //   { id: 11, text: 'hog' },

// //   // Group 3: -op words
// //   { id: 12, text: 'hop' },
// //   { id: 13, text: 'top' },
// //   { id: 14, text: 'pop' },
// //   { id: 15, text: 'mop' },
// //   { id: 16, text: 'cop' },
// //   { id: 17, text: 'shop' },
// //   { id: 18, text: 'drop' },
// //   { id: 19, text: 'stop' },

// //   // Group 4: -un words
// //   { id: 20, text: 'sun' },
// //   { id: 21, text: 'bun' },
// //   { id: 22, text: 'run' },
// //   { id: 23, text: 'gun' },
// // ];

// // export const getRandomWords = (count) => {
// //   const shuffled = [...wordList].sort(() => 0.5 - Math.random());
// //   return shuffled.slice(0, count);
// // };

// // export const speakWord = (word) => {
// //   const utterance = new SpeechSynthesisUtterance(word);
// //   utterance.lang = 'en-US'; // Adjust language as needed
// //   speechSynthesis.speak(utterance);
// // };



// const wordList = [
//   // Group 1: -at words
//   { id: 1, text: 'cat' },
//   { id: 2, text: 'hat' },
//   { id: 3, text: 'bat' },
//   { id: 4, text: 'rat' },
//   { id: 5, text: 'mat' },
//   { id: 6, text: 'sat' },
//   { id: 7, text: 'pat' },

//   // Group 2: -og words
//   { id: 8, text: 'dog' },
//   { id: 9, text: 'log' },
//   { id: 10, text: 'fog' },
//   { id: 11, text: 'hog' },

//   // Group 3: -op words
//   { id: 12, text: 'hop' },
//   { id: 13, text: 'top' },
//   { id: 14, text: 'pop' },
//   { id: 15, text: 'mop' },
//   { id: 16, text: 'cop' },
//   { id: 17, text: 'shop' },
//   { id: 18, text: 'drop' },
//   { id: 19, text: 'stop' },

//   // Group 4: -un words
//   { id: 20, text: 'sun' },
//   { id: 21, text: 'bun' },
//   { id: 22, text: 'run' },
//   { id: 23, text: 'gun' },
// ];

// // Static fallback for random words
// export const getRandomWords = (count) => {
//   const shuffled = [...wordList].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };

// // Speech synthesis function for pronouncing words
// export const speakWord = (word) => {
//   const utterance = new SpeechSynthesisUtterance(word);
//   utterance.lang = 'en-US'; // Adjust language as needed
//   speechSynthesis.speak(utterance);
// };

// // Fetch words dynamically using Gemini's API based on the difficulty level
// export async function getDynamicWords(level) {
//   try {
//     // Replace the URL below with Gemini's actual API endpoint and any required headers
//     const response = await fetch(`https://api.gemini.example/words?level=${level}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     // Expecting a response in the following format:
//     // { target: { text: 'example' }, options: [{ text: 'sample1' }, { text: 'sample2' }, ...] }
//     return data;
//   } catch (error) {
//     console.error('Error fetching dynamic words:', error);
//     // Fallback to static words if the API call fails
//     const fallbackTarget = getRandomWords(1)[0];
//     let fallbackOptions = getRandomWords(4).filter(
//       (word) => word.text !== fallbackTarget.text
//     );
//     // Ensure we have exactly 4 options
//     while (fallbackOptions.length < 4) {
//       const additional = getRandomWords(1)[0];
//       if (
//         additional.text !== fallbackTarget.text &&
//         !fallbackOptions.find((word) => word.text === additional.text)
//       ) {
//         fallbackOptions.push(additional);
//       }
//     }
//     return { target: fallbackTarget, options: fallbackOptions };
//   }
// }




// --- Static Fallback Data ---
const wordList = [
  // Group 1: -at words
  { id: 1, text: 'cat' },
  { id: 2, text: 'hat' },
  { id: 3, text: 'bat' },
  { id: 4, text: 'rat' },
  { id: 5, text: 'mat' },
  { id: 6, text: 'sat' },
  { id: 7, text: 'pat' },
  // Group 2: -og words
  { id: 8, text: 'dog' },
  { id: 9, text: 'log' },
  { id: 10, text: 'fog' },
  { id: 11, text: 'hog' },
  // Group 3: -op words
  { id: 12, text: 'hop' },
  { id: 13, text: 'top' },
  { id: 14, text: 'pop' },
  { id: 15, text: 'mop' },
  { id: 16, text: 'cop' },
  { id: 17, text: 'shop' },
  { id: 18, text: 'drop' },
  { id: 19, text: 'stop' },
  // Group 4: -un words
  { id: 20, text: 'sun' },
  { id: 21, text: 'bun' },
  { id: 22, text: 'run' },
  { id: 23, text: 'gun' },
];

// Returns a random set of static words (used as fallback)
export const getRandomWords = (count) => {
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to speak a word using the browser's speech synthesis
export const speakWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US'; // Adjust language as needed
  speechSynthesis.speak(utterance);
};

// --- Gemini API Integration ---
// Initialize the Google Generative AI client with your API key from the .env file
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || AIzaSyClzUnKmvei-DwuEEu2rUJi_NouWpETe8Q);
// // Select the Gemini model (adjust model name if needed)
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Fetch words dynamically using Gemini's API based on difficulty level
export async function getDynamicWords(level) {
  try {
    // Construct the prompt for the API
    const prompt = `Generate a target word and four option words for a rhyming game at difficulty level ${level}. 
The target word should be a single, simple word. Out of the four options, exactly one should rhyme with the target word while the others should not.
Please return the response as valid JSON formatted exactly as follows:
{
  "target": { "text": "TARGET_WORD" },
  "options": [
    { "text": "OPTION_WORD1" },
    { "text": "OPTION_WORD2" },
    { "text": "OPTION_WORD3" },
    { "text": "OPTION_WORD4" }
  ]
}
Output only the JSON without any extra commentary or formatting.`;

    // Generate content using Gemini's API
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    // Parse and return the JSON response
    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.error("Error fetching dynamic words:", error);
    // Fallback to static data if the API call fails
    const fallbackTarget = getRandomWords(1)[0];
    let fallbackOptions = getRandomWords(4).filter(
      (word) => word.text !== fallbackTarget.text
    );
    while (fallbackOptions.length < 4) {
      const additional = getRandomWords(1)[0];
      if (
        additional.text !== fallbackTarget.text &&
        !fallbackOptions.find((word) => word.text === additional.text)
      ) {
        fallbackOptions.push(additional);
      }
    }
    return { target: fallbackTarget, options: fallbackOptions };
  }
}
