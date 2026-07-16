import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { firebaseAdmin, db } from '../config/firebase';

export interface AuthRequest extends Request {
  user?: any; // Will hold { userId, email, ... }
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    
    // Verify Firebase ID Token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    
    // Look up the user by email in Firestore
    const usersSnapshot = await db.collection('users').where('email', '==', decodedToken.email).limit(1).get();

    if (usersSnapshot.empty) {
       throw new AppError('User not found in database', 404);
    }

    const userDoc = usersSnapshot.docs[0];

    // Attach user details so other controllers function as normal
    req.user = {
       userId: userDoc.id,
       email: decodedToken.email,
       firebaseUid: decodedToken.uid
    };
    
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};
