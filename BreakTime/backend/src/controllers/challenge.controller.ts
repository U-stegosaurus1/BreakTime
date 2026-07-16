import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';

export const getChallenges = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type = 'daily' } = req.query;
    const userId = req.user!.userId;

    const challengesSnapshot = await db.collection('challenges')
      .where('type', '==', String(type))
      .where('isActive', '==', true)
      .get();
      
    const challenges = challengesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const now = new Date();
    // Get today's start for daily, week start for weekly
    const periodStart = new Date();
    if (type === 'daily') {
      periodStart.setHours(0, 0, 0, 0);
    } else if (type === 'weekly') {
      const day = periodStart.getDay();
      periodStart.setDate(periodStart.getDate() - day);
      periodStart.setHours(0, 0, 0, 0);
    }

    const progressRecordsSnapshot = await db.collection('challengeProgress')
      .where('userId', '==', userId)
      .where('startedAt', '>=', periodStart)
      .get();

    const progressRecords = progressRecordsSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    // Filter to only the challenges we care about (in case there are other types fetched)
    const relevantProgress = progressRecords.filter(p => challenges.some(c => c.id === p.challengeId));
    
    const progressMap = new Map(relevantProgress.map(p => [p.challengeId, p]));

    // Create progress records for challenges that don't have one
    const periodEnd = new Date(periodStart);
    if (type === 'daily') periodEnd.setDate(periodEnd.getDate() + 1);
    else if (type === 'weekly') periodEnd.setDate(periodEnd.getDate() + 7);

    const toCreate = challenges.filter(c => !progressMap.has(c.id));
    if (toCreate.length > 0) {
      const batch = db.batch();
      toCreate.forEach(c => {
        const newRef = db.collection('challengeProgress').doc();
        const data = {
          userId,
          challengeId: c.id,
          currentValue: 0,
          isCompleted: false,
          startedAt: periodStart,
          expiresAt: periodEnd,
        };
        batch.set(newRef, data);
        progressMap.set(c.id, { id: newRef.id, ...data });
      });
      await batch.commit();
    }

    const result = challenges.map((c: any) => {
      const p: any = progressMap.get(c.id) || null;
      return {
        ...c,
        progress: p,
        percentage: p ? Math.min(Math.round((p.currentValue / c.targetValue) * 100), 100) : 0,
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getUserChallengeHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const historySnapshot = await db.collection('challengeProgress')
      .where('userId', '==', req.user!.userId)
      .where('isCompleted', '==', true)
      .orderBy('completedAt', 'desc')
      .limit(20)
      .get();
      
    const history = await Promise.all(historySnapshot.docs.map(async doc => {
      const data = doc.data();
      const challengeDoc = await db.collection('challenges').doc(data.challengeId).get();
      return {
        id: doc.id,
        ...data,
        challenge: challengeDoc.exists ? { id: challengeDoc.id, ...challengeDoc.data() } : null
      };
    }));
    
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};
