import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';

// NOTE: On physical devices, localhost won't work.
// Set EXPO_PUBLIC_API_URL in your .env file to your machine's local IP:
// e.g. EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach Firebase ID token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;

// Auth routes for backend interaction
export const authApi = {
  // Sync the newly created Firebase user with our Postgres database
  register: (data: { email: string; fullName: string; university?: string }) =>
    api.post('/auth/register', data),
  // Optionally, if the backend needs to know when a login happens
  login: () => api.post('/auth/login'),
  // Forgot password
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
};

// Users
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: object) => api.put('/users/profile', data),
};

// Activities
export const activityApi = {
  log: (data: { activityType: string; durationMinutes?: number; notes?: string; activityType2?: string; value?: number; unit?: string; metadata?: object }) =>
    api.post('/activities', data),
  getHistory: (days?: number) => api.get(`/activities/history?days=${days || 7}`),
  getToday: () => api.get('/activities/today'),
  getStats: (period: 'day' | 'week' | 'month' = 'week') => api.get(`/activities/stats?period=${period}`),
};

// Challenges
export const challengeApi = {
  get: (type: 'daily' | 'weekly' | 'monthly' = 'daily') =>
    api.get(`/challenges?type=${type}`),
  getHistory: () => api.get('/challenges/history'),
};

// Leaderboard
export const leaderboardApi = {
  get: (type: 'global' | 'friends' | 'university' = 'global') =>
    api.get(`/leaderboard?type=${type}`),
  getGlobal: () => api.get('/leaderboard?type=global'),
  getFriends: () => api.get('/leaderboard?type=friends'),
  getUniversity: () => api.get('/leaderboard?type=university'),
};

// Badges
export const badgeApi = {
  getAll: () => api.get('/badges'),
  getMine: () => api.get('/badges/mine'),
};

// Stats
export const statsApi = {
  get: (period: 'week' | 'month' | 'year' = 'week') =>
    api.get(`/stats?period=${period}`),
};

// Notifications
export const notificationApi = {
  get: () => api.get('/notifications'),
  getAll: () => api.get('/notifications'),
  markRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

// Goals
export const goalApi = {
  getAll: () => api.get('/goals'),
  create: (data: { type: string; targetValue: number; unit: string }) =>
    api.post('/goals', data),
  update: (id: string, data: { targetValue: number }) =>
    api.put(`/goals/${id}`, data),
  delete: (id: string) => api.delete(`/goals/${id}`),
};

// Rewards
export const rewardApi = {
  getAll: () => api.get('/rewards'),
  redeem: (rewardId: string) => api.post('/rewards/redeem', { rewardId }),
};

// Friends
export const friendApi = {
  getAll: () => api.get('/friends'),
  sendRequest: (email: string) => api.post('/friends/request', { email }),
  accept: (id: string) => api.put(`/friends/${id}/accept`),
};

// Settings
export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data: object) => api.put('/settings', data),
};
