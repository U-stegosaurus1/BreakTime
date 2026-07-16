import { Router } from 'express';
import { getRewards, redeemReward } from '../controllers/reward.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.get('/', getRewards);
router.post('/redeem', redeemReward);
export default router;
