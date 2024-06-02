import express from 'express'
import { getChat, getMessage, sendMessage } from '../controllers/messageControllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
const messageRouter= new express.Router();

messageRouter.post('/api/chat/:id',isAuthenticated,sendMessage );
messageRouter.get('/api/chat/:id',isAuthenticated,getMessage )
messageRouter.get('/api/chat/',isAuthenticated,getChat )


export default messageRouter