import { create } from "domain";
import { prisma } from "../prisma.js"; // ✅ Correct
import { hashPassword, createJWT, comparePasswords } from "../modules/auth.js";
export const createNewUser = async (req, res, next) => {
  try {
    console.log("in try block");
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        name: req.body.name || null, // Optional
        email: req.body.email || null, // Optional
      },
    });
    console.log(" user created");
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    console.error("Error creating user:", e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
};

export const signin = async (req, res) => {
  console.log("in signin", req.body); // Debugging to check request body

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createJWT(user);
  res.json({ token });
};
