import admin from 'firebase-admin';

// Initialize Firebase Admin with service account credentials from environment variables
// Note: In a production environment, it's safer to use a service account JSON file
// For this template, you must set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env

export function initFirebaseAdmin() {
  if (admin.apps.length === 0) {
    try {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!projectId || !clientEmail || !privateKey) {
        console.warn('⚠️ Firebase Admin missing credentials in .env! Firebase Auth will not work properly.');
        return;
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('🔥 Firebase Admin Initialized Successfully');
    } catch (error) {
      console.error('❌ Firebase Admin Initialization Error:', error);
    }
  }
}

export const firebaseAdmin = admin;
export const db = admin.firestore();
