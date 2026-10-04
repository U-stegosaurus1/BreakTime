import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { authApi, userApi } from '../services/api';
import { Alert } from 'react-native';

export interface User {
  id: string;
  email: string;
  fullName: string;
  university?: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; fullName: string; university?: string }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

/** Build a minimal User from a Firebase user when the backend is unreachable */
const fallbackUser = (firebaseUser: any): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email ?? '',
  fullName: firebaseUser.displayName ?? 'User',
  level: 1,
  xp: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Bypassing Firebase auth for local testing
      // await signInWithEmailAndPassword(auth, email, password);
      
      // Simulating a successful login with a mock user
      set({ 
        user: {
          id: 'mock-user-id',
          email: email,
          fullName: 'Test User',
          level: 1,
          xp: 0,
          totalPoints: 0,
          currentStreak: 0,
          longestStreak: 0
        }, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (registerData) => {
    set({ isLoading: true });
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password,
      );

      // Sync the new user to our backend (Firestore via API)
      try {
        await authApi.register({
          email: registerData.email,
          fullName: registerData.fullName,
          university: registerData.university,
        });
        const { data } = await userApi.getProfile();
        if (data?.success && data?.data) {
          set({ user: data.data as User, isAuthenticated: true });
        } else {
          set({ user: fallbackUser(firebaseUser), isAuthenticated: true });
        }
      } catch (apiError) {
        console.warn('Backend sync failed — using Firebase fallback:', apiError);
        set({ user: fallbackUser(firebaseUser), isAuthenticated: true });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },

  googleLogin: async () => {
    Alert.alert(
      'Google Sign-In',
      'Google login requires a native build. Please use email/password for now.',
      [{ text: 'OK' }],
    );
  },

  loadStoredAuth: async () => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Try to sync login timestamp & fetch profile from backend
            await authApi.login().catch(() => {});
            const { data } = await userApi.getProfile();
            if (data?.success && data?.data) {
              set({ user: data.data as User, isAuthenticated: true, isLoading: false });
            } else {
              set({ user: fallbackUser(firebaseUser), isAuthenticated: true, isLoading: false });
            }
          } catch {
            set({ user: fallbackUser(firebaseUser), isAuthenticated: true, isLoading: false });
          }
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
        resolve();
        unsubscribe(); // only listen once on startup
      });
    });
  },

  updateUser: (updates) => {
    const current = get().user;
    if (current) {
      set({ user: { ...current, ...updates } });
      userApi.updateProfile(updates).catch(console.error);
    }
  },
}));
