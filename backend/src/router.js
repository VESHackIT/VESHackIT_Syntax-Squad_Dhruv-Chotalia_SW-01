import express from "express";
import { handleMistake } from "./handlers/handleMistake.js";
const router = Express.Router();
router.use("/game/letterpopup");
router.post("/mistake", handleMistake);
export default router;
