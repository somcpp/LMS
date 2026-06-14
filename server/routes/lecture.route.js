import express from 'express';
import { createLecture, getLectureById, getLectures, removeLecture, updateLecture } from '../controller/lecture.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const lectureRouter = express.Router();

lectureRouter.post('/create/:courseId',isAuthenticated, createLecture);
lectureRouter.get('/course/:courseId', isAuthenticated, getLectures);
lectureRouter.get('/:lectureId',isAuthenticated,getLectureById);
lectureRouter.put('/:courseId/:lectureId', isAuthenticated,updateLecture);
lectureRouter.delete('/:courseId/:lectureId', isAuthenticated, removeLecture);
 
export default lectureRouter;