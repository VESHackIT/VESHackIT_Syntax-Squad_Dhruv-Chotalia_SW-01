import express from "express";
import { handleMistake } from "./handlers/handleMistake.js";
import { generateSentence, analyzeMistakes } from "../ai/ai";
const router = express.Router();
router.post("/mistake", handleMistake);
router.post("spelling-safari/generate-sentence", async (req, res) => {
  try {
    const { accuracy, currentLevel } = req.body;
    const response = await generateSentence(accuracy, currentLevel);
    res.json(response);
  } catch (error) {
    console.error("Error in /generate-sentence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("spelling-safari/analyze-mistakes", async (req, res) => {
  try {
    const { mistakes } = req.body;
    if (!mistakes || !Array.isArray(mistakes)) {
      return res.status(400).json({ error: "Invalid mistakes provided" });
    }
    const response = await analyzeMistakes(mistakes);
    res.json(response);
  } catch (error) {
    console.error("Error in /analyze-mistakes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
