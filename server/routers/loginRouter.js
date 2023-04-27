import { Router } from "express";
import jwt from 'jsonwebtoken';
import db from "../databases/connection.js";
import bcrypt from "bcrypt";


const router = Router();
let refreshTokens = [];


// Get User information from token
router.get("/user", authenticateToken, async (req, res) => {
  const users = await db.all("SELECT * FROM users;");
  res.json(users.find(user => user.username === req.user.username));
});

// Handle login requests
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve users from db
  const users = await db.all('SELECT * FROM users;');

  // Check if the username exists
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Compare the hashed password with the input password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.send({ accessToken: token, refreshToken: refreshToken });
});

// Closes token
router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
});

// Creates new token with expire time of 15 minutes
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}


// Middleware that checks if user has a valid, unexpired token 
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default router;