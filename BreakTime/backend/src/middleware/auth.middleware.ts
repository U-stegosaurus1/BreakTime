import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { firebaseAdmin, db } from '../config/firebase';

export interface AuthRequest extends Request {
  user?: { userId: string; email: string; firebaseUid: string };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];

    // Verify Firebase ID Token
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    // Look up user in Firestore by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', decoded.email)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      throw new AppError('User not found in database', 404);
    }

    const userDoc = usersSnapshot.docs[0];
    req.user = { userId: userDoc.id, email: decoded.email!, firebaseUid: decoded.uid };
    next();
  } catch (error: any) {
    if (error.statusCode) return next(error);
    next(new AppError('Invalid or expired token', 401));
  }
};
