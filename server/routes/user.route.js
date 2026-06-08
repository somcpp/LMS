import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getUserProfile, updateProfile } from '../controller/user.controller.js';
import upload from '../utils/multer.js';

const userRouter = express.Router();

userRouter.get('/profile', isAuthenticated, getUserProfile)
userRouter.put('/update', isAuthenticated, upload.single("profilePhoto"), updateProfile)

export default userRouter