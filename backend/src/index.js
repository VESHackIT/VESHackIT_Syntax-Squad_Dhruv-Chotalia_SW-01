import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Lumina Backend is running with Prisma!");
});

// Example endpoint to save game metrics
app.post("/api/metrics", async (req, res) => {
  const { targetWord, totalTime, score } = req.body;

  try {
    const metric = await prisma.metric.create({
      data: { targetWord, totalTime, score },
    });
    res.json(metric);
  } catch (error) {
    console.error("Error saving metrics:", error);
    res.status(500).json({ error: "Failed to save metrics" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
