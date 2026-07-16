import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';

export const getGoals = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const goalsSnapshot = await db.collection('goals')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();
      
    const goals = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: goals });
  } catch (err) {
    next(err);
  }
};

export const createGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type, targetValue, unit } = req.body;
    const userId = req.user!.userId;
    
    const goalRef = db.collection('goals').doc();
    const data = {
      userId,
      type,
      targetValue,
      unit,
      isActive: true,
      createdAt: new Date()
    };
    await goalRef.set(data);
    
    res.status(201).json({ success: true, data: { id: goalRef.id, ...data } });
  } catch (err) {
    next(err);
  }
};

export const updateGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { targetValue } = req.body;
    
    const goalRef = db.collection('goals').doc(id);
    const doc = await goalRef.get();
    
    if (!doc.exists || doc.data()!.userId !== req.user!.userId) {
      throw new AppError('Goal not found', 404);
    }
    
    await goalRef.update({ targetValue });
    res.json({ success: true, data: { id, ...doc.data(), targetValue } });
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const goalRef = db.collection('goals').doc(id);
    const doc = await goalRef.get();
    
    if (doc.exists && doc.data()!.userId === req.user!.userId) {
      await goalRef.update({ isActive: false });
    }
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
