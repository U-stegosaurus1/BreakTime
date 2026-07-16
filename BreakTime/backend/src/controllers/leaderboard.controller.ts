import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { db } from '../config/firebase';

export const getLeaderboard = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type = 'global', period = 'all-time' } = req.query;
    const userId = req.user!.userId;

    let users: any[] = [];

    if (type === 'friends') {
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
      friendIds.add(userId);

      // Fetch each user manually, then sort
      for (const id of Array.from(friendIds)) {
        const userDoc = await db.collection('users').doc(id).get();
        if (userDoc.exists) {
          const data = userDoc.data()!;
          users.push({
            id: userDoc.id,
            fullName: data.fullName,
            avatarUrl: data.avatarUrl,
            totalPoints: data.totalPoints || 0,
            level: data.level,
            currentStreak: data.currentStreak,
            university: data.university,
          });
        }
      }
      users.sort((a, b) => b.totalPoints - a.totalPoints);
      users = users.slice(0, 50);

    } else if (type === 'university') {
      const meDoc = await db.collection('users').doc(userId).get();
      const university = meDoc.exists ? meDoc.data()!.university : '';
      
      const usersSnapshot = await db.collection('users')
        .where('university', '==', university)
        .orderBy('totalPoints', 'desc')
        .limit(50)
        .get();
        
      users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      const usersSnapshot = await db.collection('users')
        .orderBy('totalPoints', 'desc')
        .limit(50)
        .get();
        
      users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    const ranked = users.map((u, i) => ({ ...u, rank: i + 1, isCurrentUser: u.id === userId }));
    const myRank = ranked.find(u => u.id === userId);

    res.json({ success: true, data: { leaderboard: ranked, myRank } });
  } catch (err) {
    next(err);
  }
};
