import { Router } from 'express';
import { getFriends, sendFriendRequest, acceptFriendRequest } from '../controllers/friend.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.get('/', getFriends);
router.post('/request', sendFriendRequest);
router.put('/:id/accept', acceptFriendRequest);
export default router;
