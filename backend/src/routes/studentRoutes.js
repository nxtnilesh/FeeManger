import express from 'express';
import { getAllStudents, getProfile, updateProfile, markFeesPaid } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.put('/pay', protect, markFeesPaid);

export default router;
