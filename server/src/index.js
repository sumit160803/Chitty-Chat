//import section
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; //import cookie-parser
import cors from 'cors'; //import cors

dotenv.config(); //initialize dotenv
const app = express();
const PORT = process.env.PORT || 5001;

import {connectDb} from './libs/db.js'; //import the connectDb function
import authRoutes from './routes/auth.routes.js'; //import the authRoutes
import messageRoutes from './routes/message.routes.js'; //import the messageRoutes

//use section
app.use(express.json()); //middleware to parse json data
app.use(cookieParser()); //middleware to parse cookies
app.use(cors(
  {
    origin: process.env.CLIENT_URL, //allow only the client to connect
    credentials: true //enable credentials
  }
))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb(); //connect to the database
});