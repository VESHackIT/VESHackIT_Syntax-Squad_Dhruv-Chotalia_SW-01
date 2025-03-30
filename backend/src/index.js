import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./router.js";
import { createNewUser, signin } from "./handlers/user.js";
import { protect } from "./modules/auth.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);
app.post("/hi", (req, res) => {
  res.json({ message: "hi" });
});

// Only listen directly when not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

export default app;
