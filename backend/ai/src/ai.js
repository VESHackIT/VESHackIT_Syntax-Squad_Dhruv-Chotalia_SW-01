
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SPELLING_GAME_PROMPTS } from "./SystemPrompt";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Helper function to extract JSON from markdown
function extractJson(markdownText: string): string {
  const regex = /```json\s*([\s\S]+?)\s*```/;
  const match = markdownText.match(regex);
  return match ? match[1].trim() : markdownText;
}

// Function to generate a sentence
export async function generateSentence(accuracy: number, currentLevel: number) {
  let difficulty = "medium";
  if (accuracy > 80 && currentLevel > 50) {
    difficulty = "hard";
  } else if (accuracy < 50 || currentLevel < 30) {
    difficulty = "easy";
  }

  const prompt = SPELLING_GAME_PROMPTS.GENERATE_SENTENCE(difficulty);
  try {
    const result = await model.generateContent(prompt);
    const responseObj = await result.response;
    const jsonText = extractJson(responseObj.text());
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating sentence:", error);
    return { sentence: "", errors: [], difficulty };
  }
}

// Function to analyze spelling mistakes
export async function analyzeMistakes(mistakes: string[]) {
  const prompt = SPELLING_GAME_PROMPTS.ANALYZE_MISTAKES(mistakes);
  try {
    const result = await model.generateContent(prompt);
    const responseObj = await result.response;
    const jsonText = extractJson(responseObj.text());
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error analyzing mistakes:", error);
    return { suggestions: {} };
  }
}
