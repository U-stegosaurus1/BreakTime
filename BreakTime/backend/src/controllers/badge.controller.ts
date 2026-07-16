import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

export const getAllBadges = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    
    // Fetch all badges
    const allBadgesSnapshot = await db.collection('badges').orderBy('requirementValue', 'asc').get();
    const allBadges = allBadgesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch earned badges for this user
    const earnedSnapshot = await db.collection('userBadges').where('userId', '==', userId).get();
    const earned = earnedSnapshot.docs.map(doc => doc.data());

    const earnedMap = new Map(earned.map(e => [e.badgeId, e.earnedAt]));
    
    const result = allBadges.map(b => ({
      ...b,
      earned: earnedMap.has(b.id),
      earnedAt: earnedMap.get(b.id) || null,
    }));
    
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getUserBadges = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const userBadgesSnapshot = await db.collection('userBadges')
      .where('userId', '==', userId)
      .orderBy('earnedAt', 'desc')
      .get();
      
    const badges = await Promise.all(userBadgesSnapshot.docs.map(async doc => {
      const data = doc.data();
      const badgeDoc = await db.collection('badges').doc(data.badgeId).get();
      return {
        id: doc.id,
        ...data,
        badge: badgeDoc.exists ? { id: badgeDoc.id, ...badgeDoc.data() } : null
      };
    }));

    res.json({ success: true, data: badges });
  } catch (err) {
    next(err);
  }
};
