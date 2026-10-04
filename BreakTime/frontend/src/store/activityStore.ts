import { create } from 'zustand';
import { activityApi, goalApi } from '../services/api';

export interface Goal {
  id: string;
  type: string;
  targetValue: number;
  unit: string;
  isActive: boolean;
  currentValue?: number;
  percentage?: number;
}

export interface TodayStats {
  breaksTaken: number;
  stepsWalked: number;
  activeMinutes: number;
  waterConsumed: number;
}

interface ActivityState {
  goals: Goal[];
  todayStats: TodayStats;
  isLoading: boolean;
  fetchDashboardData: () => Promise<void>;
}

const defaultStats: TodayStats = {
  breaksTaken: 0,
  stepsWalked: 0,
  activeMinutes: 0,
  waterConsumed: 0,
};

export const useActivityStore = create<ActivityState>((set) => ({
  goals: [],
  todayStats: defaultStats,
  isLoading: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const [goalsRes, todayRes] = await Promise.all([
        goalApi.getAll(),
        activityApi.getToday(),
      ]);

      // Goal list
      const goals: Goal[] = goalsRes.data?.data || [];

      // Today's summary — backend returns { summary: Record<type, number>, goals: [...] }
      const summary = todayRes.data?.data?.summary || {};
      const todayStats: TodayStats = {
        breaksTaken: summary['breaks'] || 0,
        stepsWalked: Math.round(summary['steps'] || 0),
        activeMinutes: Math.round(summary['active_minutes'] || 0),
        waterConsumed: Math.round(summary['water'] || 0),
      };

      set({ goals, todayStats, isLoading: false });
    } catch (error) {
      console.warn('Failed to fetch dashboard data (backend may be offline):', error);
      set({ isLoading: false });
    }
  },
}));
