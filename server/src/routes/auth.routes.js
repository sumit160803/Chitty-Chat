import express from 'express';
import {signup,login,logout,updateProfile,checkAuth, deleteAuth} from '../controllers/auth.controller.js'; //import the functions from the controller
import {protectedRoute} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update', protectedRoute,updateProfile);

router.get('/check',protectedRoute,checkAuth);

router.delete('/delete/',protectedRoute,deleteAuth);

export default router;  //export the router