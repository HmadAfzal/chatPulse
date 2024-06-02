import express from 'express'
import { loginUser, logoutUser, signUp, getUser } from '../controllers/userControllers.js';
const userRouter= new express.Router();

userRouter.post('/api/signup', signUp);
userRouter.post('/api/login', loginUser);
userRouter.post('/api/logout', logoutUser);
userRouter.get('/api/user/:query', getUser);


export default userRouter;