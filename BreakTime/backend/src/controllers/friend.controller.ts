import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';
import { AppError } from '../utils/AppError';

export const getFriends = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    
    // Firestore doesn't support OR queries easily across multiple fields unless using 'in' with a composite key.
    // We can run two queries and merge them.
    const sentSnapshot = await db.collection('friendships')
      .where('senderId', '==', userId)
      .where('status', '==', 'accepted')
      .get();
      
    const receivedSnapshot = await db.collection('friendships')
      .where('receiverId', '==', userId)
      .where('status', '==', 'accepted')
      .get();

    const friendIds = new Set<string>();
    sentSnapshot.docs.forEach(doc => friendIds.add(doc.data().receiverId));
    receivedSnapshot.docs.forEach(doc => friendIds.add(doc.data().senderId));

    const friends: any[] = [];
    if (friendIds.size > 0) {
      // In Firestore, 'in' queries are limited to 10 items.
      // If a user has many friends, we'd batch this or fetch them individually.
      // For simplicity, we fetch them individually here.
      for (const id of Array.from(friendIds)) {
        const userDoc = await db.collection('users').doc(id).get();
        if (userDoc.exists) {
          const data = userDoc.data()!;
          friends.push({
            id: userDoc.id,
            fullName: data.fullName,
            avatarUrl: data.avatarUrl,
            totalPoints: data.totalPoints,
            currentStreak: data.currentStreak,
            level: data.level
          });
        }
      }
    }

    res.json({ success: true, data: friends });
  } catch (err) {
    next(err);
  }
};

export const sendFriendRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const userId = req.user!.userId;
    
    const targetSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (targetSnapshot.empty) throw new AppError('User not found', 404);
    
    const targetId = targetSnapshot.docs[0].id;
    if (targetId === userId) throw new AppError('Cannot add yourself', 400);

    const newFriendshipRef = db.collection('friendships').doc();
    const data = {
      senderId: userId,
      receiverId: targetId,
      status: 'pending',
      createdAt: new Date()
    };
    
    await newFriendshipRef.set(data);
    res.status(201).json({ success: true, data: { id: newFriendshipRef.id, ...data } });
  } catch (err) {
    next(err);
  }
};

export const acceptFriendRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const docRef = db.collection('friendships').doc(id);
    const doc = await docRef.get();
    
    if (doc.exists && doc.data()!.receiverId === req.user!.userId) {
      await docRef.update({ status: 'accepted' });
    }
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
