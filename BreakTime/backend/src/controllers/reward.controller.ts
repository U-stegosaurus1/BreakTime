import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';
import { FieldValue } from 'firebase-admin/firestore';

export const getRewards = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rewardsSnapshot = await db.collection('rewards')
      .where('isActive', '==', true)
      .orderBy('cost', 'asc')
      .get();
      
    const rewards = rewardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: rewards });
  } catch (err) {
    next(err);
  }
};

export const redeemReward = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { rewardId } = req.body;
    const userId = req.user!.userId;

    await db.runTransaction(async (transaction) => {
      const rewardRef = db.collection('rewards').doc(rewardId);
      const userRef = db.collection('users').doc(userId);

      const [rewardDoc, userDoc] = await Promise.all([
        transaction.get(rewardRef),
        transaction.get(userRef)
      ]);

      if (!rewardDoc.exists) throw new AppError('Reward not found', 404);
      if (!userDoc.exists) throw new AppError('User not found', 404);

      const rewardData = rewardDoc.data()!;
      const userData = userDoc.data()!;

      if (userData.totalPoints < rewardData.cost) {
        throw new AppError('Insufficient points', 400);
      }

      transaction.update(userRef, {
        totalPoints: FieldValue.increment(-rewardData.cost)
      });
      
      // Optionally create a record of the redemption
      const redemptionRef = db.collection('redemptions').doc();
      transaction.set(redemptionRef, {
        userId,
        rewardId,
        cost: rewardData.cost,
        redeemedAt: FieldValue.serverTimestamp()
      });
    });

    res.json({ success: true, message: 'Reward redeemed successfully!' });
  } catch (err) {
    next(err);
  }
};
