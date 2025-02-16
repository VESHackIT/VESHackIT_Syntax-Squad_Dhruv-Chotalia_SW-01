import express from "express";
import { handleMistake } from "./handlers/handleMistake.js";
const router = express.Router();
router.post("/mistake", handleMistake);
export default router;
