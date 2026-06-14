import { configDotenv } from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectDB } from './database/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import lectureRouter from './routes/lecture.route.js';
import mediaRouter from './routes/media.route.js';

configDotenv()
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

connectDB(); 

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/lecture',lectureRouter);
app.use('/media', mediaRouter)

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
})

