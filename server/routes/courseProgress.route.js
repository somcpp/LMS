import express from 'express'
import { getCourseProgress, updateLectureProgress } from '../controller/courseProgress.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const courseProgressRouter = express.Router();

courseProgressRouter.get('/:courseId',isAuthenticated, getCourseProgress)
courseProgressRouter.post('/:courseId/lecture/:lectureId/view',isAuthenticated, updateLectureProgress)

export default courseProgressRouter;