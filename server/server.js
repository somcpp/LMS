import { configDotenv } from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectDB } from './database/db.js';
//Routes
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import lectureRouter from './routes/lecture.route.js';
import mediaRouter from './routes/media.route.js';
import purchaseRouter from './routes/purchaseCourse.route.js';
import courseProgressRouter from './routes/courseProgress.route.js';

configDotenv()
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

connectDB(); 

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/lecture',lectureRouter);
app.use('/api/media', mediaRouter)
app.use('/api/purchase',purchaseRouter);
app.use('/api/progress', courseProgressRouter);

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
})

