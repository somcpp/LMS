import express from 'express'
import { createCourse, deleteCourse, getCourseById, getCreatorCourses, getPublsihedCourses, searchCourse, togglePublishCourse, updateCourse } from '../controller/course.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js'
import { isAdmin } from '../middlewares/isAdmin.js';
const courseRouter = express.Router();

courseRouter.get('/', isAuthenticated, getCreatorCourses)
courseRouter.get('/search', searchCourse)
courseRouter.post('/create',isAuthenticated,isAdmin, createCourse);
courseRouter.get('/published-courses', getPublsihedCourses)
courseRouter.put('/update/:courseId', isAuthenticated,isAdmin,upload.single('courseThumbnail'), updateCourse)
courseRouter.get('/:courseId', isAuthenticated, getCourseById);
courseRouter.put('/publish/:courseId', isAuthenticated, isAdmin,togglePublishCourse)

courseRouter.delete('/delete/:courseId', isAuthenticated, isAdmin, deleteCourse);



export default courseRouter;