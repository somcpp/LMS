import express from 'express'
import { createCourse, getCourseById, getCreatorCourses, updateCourse } from '../controller/course.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js'
const courseRouter = express.Router();

courseRouter.get('/', isAuthenticated, getCreatorCourses)
courseRouter.post('/create',isAuthenticated, createCourse);
courseRouter.put('/update/:courseId', isAuthenticated,upload.single('courseThumbnail'), updateCourse)
courseRouter.get('/:courseId', isAuthenticated, getCourseById);

export default courseRouter;