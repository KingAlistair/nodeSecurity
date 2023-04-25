import { Router } from "express";
import jwt from 'jsonwebtoken';
import db from "../databases/connection.js";

const router = Router();

// Endpoint to handle login requests
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    //Retrive users from db
    const users = await db.all("SELECT * FROM users;");

    // Check if the username and password are correct
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.json({ accessToken: token });
});

export default router;