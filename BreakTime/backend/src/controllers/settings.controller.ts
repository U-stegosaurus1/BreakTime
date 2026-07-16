import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

export const getSettings = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const settingsRef = db.collection('settings').doc(userId);
    let settingsDoc = await settingsRef.get();

    if (!settingsDoc.exists) {
      const defaultSettings = {
        notificationsEnabled: true,
        breakReminders: true,
        breakReminderInterval: 60,
        hydrationReminders: true,
        hydrationInterval: 120,
        dailyChallengeReminder: true,
        soundEnabled: true,
        vibrationEnabled: true,
        darkMode: false,
      };
      await settingsRef.set(defaultSettings);
      settingsDoc = await settingsRef.get();
    }

    res.json({ success: true, data: settingsDoc.data() });
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const {
      notificationsEnabled,
      breakReminders,
      breakReminderInterval,
      hydrationReminders,
      hydrationInterval,
      dailyChallengeReminder,
      soundEnabled,
      vibrationEnabled,
      darkMode,
    } = req.body;

    // Filter out undefined values to only update what's provided
    const updateData: any = {};
    if (notificationsEnabled !== undefined) updateData.notificationsEnabled = notificationsEnabled;
    if (breakReminders !== undefined) updateData.breakReminders = breakReminders;
    if (breakReminderInterval !== undefined) updateData.breakReminderInterval = breakReminderInterval;
    if (hydrationReminders !== undefined) updateData.hydrationReminders = hydrationReminders;
    if (hydrationInterval !== undefined) updateData.hydrationInterval = hydrationInterval;
    if (dailyChallengeReminder !== undefined) updateData.dailyChallengeReminder = dailyChallengeReminder;
    if (soundEnabled !== undefined) updateData.soundEnabled = soundEnabled;
    if (vibrationEnabled !== undefined) updateData.vibrationEnabled = vibrationEnabled;
    if (darkMode !== undefined) updateData.darkMode = darkMode;

    const settingsRef = db.collection('settings').doc(userId);
    await settingsRef.set(updateData, { merge: true });
    
    const updatedDoc = await settingsRef.get();

    res.json({ success: true, data: updatedDoc.data() });
  } catch (err) {
    next(err);
  }
};
