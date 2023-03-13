import express from 'express';
import {
    createStudentsRecord, getStudentRecords, getStudentRecord
} from '../controllers/student.js';
// import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/create').post(createStudentsRecord)
router.route('/').get(getStudentRecords)
router.route('/:id').get(getStudentRecord)

export default router;
