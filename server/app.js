import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();


// Secret key for JWT
const SECRET_KEY = 'my_secret_key';

// Sample user data
const users = [
  {
    username: 'user1',
    password: 'password1'
  },
  {
    username: 'user2',
    password: 'password2'
  }
];

// Middleware to parse the request body
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Endpoint to handle login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if the username and password are correct
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  
  // Generate JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  
  // Send the token back to the client
  res.json({ token });
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
