import { Router } from 'express';
import { getAllBadges, getUserBadges } from '../controllers/badge.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.get('/', getAllBadges);
router.get('/mine', getUserBadges);
export default router;
