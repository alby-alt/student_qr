import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import studentRouter from './student.js';


const router = express.Router()

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/students', studentRouter);



export default router;
