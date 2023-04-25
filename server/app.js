import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());


import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);
import mailRouter from "./routers/mailRouter.js";
app.use(mailRouter);


// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
