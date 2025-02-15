import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const comparePasswords = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
};
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "user not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "user not authorized" });
    return;
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload) {
    req.user = payload;
    next();
  } else {
    res.status(401);
    res.json({ message: "user not authorized" });
    return;
  }
};
