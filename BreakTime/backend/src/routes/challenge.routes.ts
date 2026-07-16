import { Router } from 'express';
import { getChallenges, getUserChallengeHistory } from '../controllers/challenge.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.get('/', getChallenges);
router.get('/history', getUserChallengeHistory);
export default router;
