import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notifsSnapshot = await db.collection('notifications')
      .where('userId', '==', req.user!.userId)
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get();
      
    const notifs = notifsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: notifs });
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const docRef = db.collection('notifications').doc(id);
    const doc = await docRef.get();
    
    if (doc.exists && doc.data()!.userId === req.user!.userId) {
      await docRef.update({ isRead: true });
    }
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const markAllRead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notifsSnapshot = await db.collection('notifications')
      .where('userId', '==', req.user!.userId)
      .where('isRead', '==', false)
      .get();
      
    if (!notifsSnapshot.empty) {
      const batch = db.batch();
      notifsSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { isRead: true });
      });
      await batch.commit();
    }
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
