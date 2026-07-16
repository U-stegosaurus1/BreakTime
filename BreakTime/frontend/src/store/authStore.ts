import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authApi, userApi } from '../services/api';

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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true, // Start true while onAuthStateChanged runs
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Mock login delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const dummyUser: User = {
        id: 'dummy-id',
        email,
        fullName: 'Test User',
        level: 1,
        xp: 0,
        totalPoints: 100,
        currentStreak: 1,
        longestStreak: 5,
      };
      await AsyncStorage.setItem('user', JSON.stringify(dummyUser));
      set({ user: dummyUser, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  googleLogin: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const dummyUser: User = {
        id: 'dummy-google-id',
        email: 'google@example.com',
        fullName: 'Google User',
        level: 5,
        xp: 250,
        totalPoints: 500,
        currentStreak: 3,
        longestStreak: 10,
      };
      await AsyncStorage.setItem('user', JSON.stringify(dummyUser));
      set({ user: dummyUser, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (registerData) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const dummyUser: User = {
        id: 'new-user-id',
        email: registerData.email,
        fullName: registerData.fullName,
        university: registerData.university,
        level: 1,
        xp: 0,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
      };
      await AsyncStorage.setItem('user', JSON.stringify(dummyUser));
      set({ user: dummyUser, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  forgotPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Mock password reset sent to:', email);
  },

  loadStoredAuth: async () => {
    try {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        set({ user: JSON.parse(stored), isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (e) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUser: (updates) => {
    const current = get().user;
    if (current) {
      const updated = { ...current, ...updates };
      set({ user: updated });
      AsyncStorage.setItem('user', JSON.stringify(updated));
    }
  },
}));
