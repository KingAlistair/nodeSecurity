import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from "../databases/connection.js";

const router = Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Check if user already exists
    const users = await db.all("SELECT * FROM users;");
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).send({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        db.exec(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}');`);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error creating user' });
    }
});

export default router;
