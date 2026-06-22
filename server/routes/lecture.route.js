import express from 'express';
import { createLecture, getLectureById, getLectures, removeLecture, updateLecture } from '../controller/lecture.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { isAdmin } from '../middlewares/isAdmin.js';
const lectureRouter = express.Router();

lectureRouter.post('/create/:courseId',isAuthenticated,isAdmin, createLecture);
lectureRouter.get('/course/:courseId', isAuthenticated, getLectures);
lectureRouter.get('/:lectureId',isAuthenticated,getLectureById);
lectureRouter.put('/:courseId/:lectureId', isAuthenticated,isAdmin,updateLecture);
lectureRouter.delete('/:courseId/:lectureId', isAuthenticated,isAdmin, removeLecture);
 
export default lectureRouter;