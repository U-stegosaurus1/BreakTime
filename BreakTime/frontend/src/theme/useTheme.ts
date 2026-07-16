// src/theme/useTheme.ts
import { useMemo } from 'react';
import { getColors } from './colors';
import { useThemeStore } from '../store/themeStore';

/**
 * Hook that returns the active color palette and theme controls.
 * Colors automatically reflect dark / light mode.
 */
export const useTheme = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const theme = useMemo(
    () => ({
      colors: getColors(isDarkMode),
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode],
  );
  return theme;
};
