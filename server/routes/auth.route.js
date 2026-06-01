import express from 'express'
import { createUser, loginUser, logoutUser } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', createUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', logoutUser);

export default authRouter;