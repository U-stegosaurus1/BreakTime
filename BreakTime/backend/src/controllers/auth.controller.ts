import { Request, Response, NextFunction } from 'express';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, fullName, university } = req.body;

    const usersRef = db.collection('users');
    const existing = await usersRef.where('email', '==', email).get();
    
    if (!existing.empty) throw new AppError('User already synced', 409);

    const userDocRef = usersRef.doc();
    const userId = userDocRef.id;

    await userDocRef.set({
      email,
      fullName,
      university: university || null,
      level: 1,
      xp: 0,
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date(),
      lastActiveDate: new Date()
    });

    await db.collection('settings').doc(userId).set({
      notificationsEnabled: true,
      dailyReminderTime: "09:00",
      theme: "light",
      privacyLevel: "public"
    });

    const goalsRef = db.collection('goals');
    const batch = db.batch();
    
    const goals = [
      { userId, type: 'steps', targetValue: 2000, unit: 'steps', isActive: true, createdAt: new Date() },
      { userId, type: 'active_minutes', targetValue: 15, unit: 'minutes', isActive: true, createdAt: new Date() },
      { userId, type: 'breaks', targetValue: 3, unit: 'breaks', isActive: true, createdAt: new Date() },
      { userId, type: 'water', targetValue: 2000, unit: 'ml', isActive: true, createdAt: new Date() },
    ];

    goals.forEach(goal => {
      batch.set(goalsRef.doc(), goal);
    });

    await batch.commit();

    res.status(201).json({
      success: true,
      data: {
        user: { id: userId, email, fullName, university },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    
    if (userId) {
      await db.collection('users').doc(userId).update({
        lastActiveDate: new Date()
      });
    }

    res.json({ success: true, message: "Login synced successfully" });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.json({ success: true });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.json({ success: true, message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.json({ success: true, message: 'Password recovery handled by Firebase' });
};
