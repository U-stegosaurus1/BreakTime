import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { period = 'week' } = req.query;

    const now = new Date();
    let since = new Date();
    if (period === 'week') since.setDate(now.getDate() - 7);
    else if (period === 'month') since.setMonth(now.getMonth() - 1);
    else since.setFullYear(now.getFullYear() - 1);

    const logsSnapshot = await db.collection('activityLogs')
      .where('userId', '==', userId)
      .where('loggedAt', '>=', since)
      .orderBy('loggedAt', 'asc')
      .get();
      
    const logs = logsSnapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        ...data,
        loggedAt: data.loggedAt?.toDate() || new Date()
      };
    });

    // Group by day
    const byDay: Record<string, Record<string, number>> = {};
    for (const log of logs) {
      const day = log.loggedAt.toISOString().split('T')[0];
      if (!byDay[day]) byDay[day] = {};
      byDay[day][log.activityType] = (byDay[day][log.activityType] || 0) + log.value;
    }

    const userDoc = await db.collection('users').doc(userId).get();
    let user = null;
    if (userDoc.exists) {
      const uData = userDoc.data()!;
      user = {
        totalPoints: uData.totalPoints,
        level: uData.level,
        xp: uData.xp,
        currentStreak: uData.currentStreak,
        longestStreak: uData.longestStreak
      };
    }

    const totalSteps = logs.filter(l => l.activityType === 'steps').reduce((a, l) => a + l.value, 0);
    const totalActiveMinutes = logs.filter(l => l.activityType === 'active_minutes').reduce((a, l) => a + l.value, 0);
    const totalBreaks = logs.filter(l => l.activityType === 'breaks').reduce((a, l) => a + l.value, 0);
    const totalCalories = Math.round(totalSteps * 0.04 + totalActiveMinutes * 5);

    res.json({
      success: true,
      data: {
        overview: { totalSteps, totalActiveMinutes, totalBreaks, totalCalories },
        byDay,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
