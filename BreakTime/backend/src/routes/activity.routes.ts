import { Router } from 'express';
import { logActivity, getActivityHistory, getTodaySummary } from '../controllers/activity.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.post('/', logActivity);
router.get('/history', getActivityHistory);
router.get('/today', getTodaySummary);
export default router;
