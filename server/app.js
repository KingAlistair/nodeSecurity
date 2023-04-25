import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();
const app = express();


// Middleware to parse the request body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to enable CORS
app.use(cors());


import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);
import mailRouter from "./routers/mailRouter.js";
app.use(mailRouter);


const posts = [{
  username: "Dani",
  post: "Dani Post"
},
{
  username: "Thomas",
  post: "Tomy Post"
}
]

app.get("/posts", authenticateToken, (req,res)=> {
  console.log(req.user.username)
  res.json(posts.filter(post => post.username === req.user.username))
});

app.post("/post/login", (req,res)=>{
  const username = req.body.username;
  const user = {username: username};

  const token = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.send({accessToken: token, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

app.delete('/logout', (req, res)=> {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
});

let refreshTokens= [];

app.post('/token', (req,res)=>{
 const refreshToken = req.body.token;
 if (refreshToken == null) return res.sendStatus(401);
 if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
 jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
  if (err) return res.sendStatus(403);
  const accesToken = generateAccessToken({username: user.username});
  res.json({ accessToken: accesToken});
 });
});

app.post('/users', authenticateToken, (req, res) => {
  res.json(users.filter(user => user.username === req.user.username))
});


// Middleware that checks if user has a valid unexpired token 
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
