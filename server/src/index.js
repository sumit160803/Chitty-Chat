//import section
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); //initialize dotenv
const app = express();
const PORT = process.env.PORT || 5001;

import authRoutes from './routes/auth.routes.js'; //import the authRoutes
import {connectDb} from './libs/db.js'; //import the connectDb function

//use section
app.use(express.json()); //middleware to parse json data

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb(); //connect to the database
});