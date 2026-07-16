import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) throw new AppError('User not found', 404);
    const userData = userDoc.data()!;

    // Fetch user badges
    const userBadgesSnapshot = await db.collection('userBadges')
      .where('userId', '==', userId)
      .orderBy('earnedAt', 'desc')
      .limit(3)
      .get();
      
    // Fetch badge details
    const userBadges = await Promise.all(userBadgesSnapshot.docs.map(async doc => {
      const data = doc.data();
      const badgeDoc = await db.collection('badges').doc(data.badgeId).get();
      return {
        ...data,
        badge: badgeDoc.exists ? badgeDoc.data() : null
      };
    }));

    // Aggregate counts (we'll just use length for now or rely on a maintained counter)
    const activitiesCount = (await db.collection('activityLogs').where('userId', '==', userId).get()).size;
    const allBadgesCount = (await db.collection('userBadges').where('userId', '==', userId).get()).size;

    res.json({ 
      success: true, 
      data: {
        id: userDoc.id,
        email: userData.email,
        fullName: userData.fullName,
        university: userData.university,
        avatarUrl: userData.avatarUrl,
        level: userData.level,
        xp: userData.xp,
        totalPoints: userData.totalPoints,
        currentStreak: userData.currentStreak,
        longestStreak: userData.longestStreak,
        createdAt: userData.createdAt?.toDate(),
        userBadges,
        _count: {
          activities: activitiesCount,
          userBadges: allBadgesCount
        }
      } 
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, university, avatarUrl, fcmToken } = req.body;
    const userId = req.user!.userId;
    
    await db.collection('users').doc(userId).update({
      fullName,
      university,
      avatarUrl,
      fcmToken
    });

    const updatedDoc = await db.collection('users').doc(userId).get();
    const data = updatedDoc.data()!;
    
    res.json({ 
      success: true, 
      data: {
        id: updatedDoc.id,
        email: data.email,
        fullName: data.fullName,
        university: data.university,
        avatarUrl: data.avatarUrl
      }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await db.collection('users').doc(req.user!.userId).delete();
    // Ideally, also delete linked data (activities, goals, etc) or use a Cloud Function
    res.json({ success: true, message: 'Account deleted' });
  } catch (err) {
    next(err);
  }
};
