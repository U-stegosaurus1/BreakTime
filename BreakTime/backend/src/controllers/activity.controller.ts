import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';
import { FieldValue } from 'firebase-admin/firestore';

const POINTS_MAP: Record<string, number> = {
  steps: 0.01,
  active_minutes: 2,
  stretch: 3,
  breaks: 10,
  water: 0.005,
};

const XP_PER_POINT = 1.2;

export const logActivity = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { activityType, value, unit, metadata } = req.body;
    const userId = req.user!.userId;

    const multiplier = POINTS_MAP[activityType] || 1;
    const pointsEarned = Math.round(value * multiplier);
    const xpGained = Math.round(pointsEarned * XP_PER_POINT);
    let newLevel = 1;

    // Use a Firestore transaction to safely update user stats and challenges
    const newLogRef = db.collection('activityLogs').doc();
    
    await db.runTransaction(async (transaction) => {
      // 1. Get user
      const userRef = db.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) throw new AppError('User not found', 404);
      
      const userData = userDoc.data()!;
      const newXP = (userData.xp || 0) + xpGained;
      newLevel = Math.floor(newXP / 500) + 1;

      // 2. Add activity log
      transaction.set(newLogRef, {
        userId,
        activityType,
        value,
        unit,
        pointsEarned,
        metadata: metadata || null,
        loggedAt: FieldValue.serverTimestamp()
      });

      let extraPointsFromChallenges = 0;

      // 3. Update challenges
      const now = new Date();
      // Firestore transactions require queries to be done outside or as gets, but we can't easily query inside transaction
      // Let's get active challenges first before transaction, or just query inside.
      // Firestore allows queries inside transactions before writes!
      const challengesSnapshot = await transaction.get(
        db.collection('challengeProgress')
          .where('userId', '==', userId)
          .where('isCompleted', '==', false)
          .where('expiresAt', '>', now)
      );

      for (const cpDoc of challengesSnapshot.docs) {
        const cpData = cpDoc.data();
        
        // We need the challenge data. We'll fetch it if it matches type
        const challengeDoc = await transaction.get(db.collection('challenges').doc(cpData.challengeId));
        if (challengeDoc.exists) {
          const challengeData = challengeDoc.data()!;
          if (challengeData.category === activityType || (activityType === 'breaks' && challengeData.category === 'breaks')) {
            const newValue = cpData.currentValue + value;
            const isCompleted = newValue >= challengeData.targetValue;
            
            transaction.update(cpDoc.ref, {
              currentValue: Math.min(newValue, challengeData.targetValue),
              isCompleted,
              completedAt: isCompleted ? FieldValue.serverTimestamp() : null
            });

            if (isCompleted) {
              extraPointsFromChallenges += challengeData.points;
            }
          }
        }
      }

      // 4. Update user
      transaction.update(userRef, {
        totalPoints: FieldValue.increment(pointsEarned + extraPointsFromChallenges),
        xp: newXP,
        level: newLevel,
        lastActiveDate: FieldValue.serverTimestamp()
      });
    });

    res.status(201).json({
      success: true,
      data: { logId: newLogRef.id, pointsEarned, xpGained, newLevel },
    });
  } catch (err) {
    next(err);
  }
};

export const getActivityHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { days = 7 } = req.query;
    const since = new Date();
    since.setDate(since.getDate() - Number(days));

    const logsSnapshot = await db.collection('activityLogs')
      .where('userId', '==', req.user!.userId)
      .where('loggedAt', '>=', since)
      .orderBy('loggedAt', 'desc')
      .get();
      
    const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

export const getTodaySummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logsSnapshot = await db.collection('activityLogs')
      .where('userId', '==', userId)
      .where('loggedAt', '>=', today)
      .get();

    const summary = logsSnapshot.docs.reduce((acc, doc) => {
      const log = doc.data();
      if (!acc[log.activityType]) acc[log.activityType] = 0;
      acc[log.activityType] += log.value;
      return acc;
    }, {} as Record<string, number>);

    const goalsSnapshot = await db.collection('goals')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();

    const goalsWithProgress = goalsSnapshot.docs.map(doc => {
      const g = doc.data();
      return {
        id: doc.id,
        ...g,
        currentValue: summary[g.type] || 0,
        percentage: Math.min(Math.round(((summary[g.type] || 0) / g.targetValue) * 100), 100),
      };
    });

    res.json({ success: true, data: { summary, goals: goalsWithProgress } });
  } catch (err) {
    next(err);
  }
};
