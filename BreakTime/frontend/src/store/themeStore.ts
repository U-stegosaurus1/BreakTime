// src/store/themeStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ThemeStore manages a simple dark‑mode flag and persists it across app launches.
 * The store is deliberately tiny – only a boolean and a toggle function –
 * but it can be expanded later (e.g., custom accent colors, font size, etc.).
 */
interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  loadStoredTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDarkMode: false,
  toggleTheme: () => {
    const next = !get().isDarkMode;
    set({ isDarkMode: next });
    // Persist the preference for future launches.
    AsyncStorage.setItem('theme:isDarkMode', JSON.stringify(next)).catch(() => {});
  },
  loadStoredTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem('theme:isDarkMode');
      if (stored !== null) {
        set({ isDarkMode: JSON.parse(stored) });
      }
    } catch {
      // Silently ignore errors – fallback to default light mode.
    }
  },
}));
