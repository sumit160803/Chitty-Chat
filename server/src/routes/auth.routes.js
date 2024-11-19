import express from 'express';
import {signup,login,logout} from '../controllers/auth.controller.js'; //import the functions from the controller

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;  //export the router