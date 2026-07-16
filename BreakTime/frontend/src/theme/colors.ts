// src/theme/colors.ts
// Dual palette system – light & dark modes

/** Light theme palette (original brand colors) */
export const lightColors = {
  // Primary brand colors
  primary: '#6C5CE7',
  primaryLight: '#8A7DF0',
  secondary: '#636E72',
  secondaryLight: '#B2BEC3',
  gradientStart: '#6C5CE7',
  gradientEnd: '#8A7DF0',
  // Accent (green)
  accent: '#00C897',
  accentLight: '#B2F5EA',
  // Info
  info: '#3498DB',
  infoLight: '#D6EAF8',
  // Background colors
  background: '#F4F3FF',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  // Text colors
  textPrimary: '#1A1A2E',
  text: '#1A1A2E',
  textSecondary: '#8888AA',
  textTertiary: '#A0A0C0',
  textMuted: '#C0C0D0',
  // Additional neutrals
  error: '#EF4444',
  border: '#E8E8F0',
  glassBackground: 'rgba(255, 255, 255, 0.85)',
  glassBorder: 'rgba(232, 232, 240, 0.5)',
  // Streak orange
  streakOrange: '#FFA500',
};

/** Dark theme palette – deep purple-black aesthetic */
export const darkColors: typeof lightColors = {
  // Primary brand colors (unchanged for consistency)
  primary: '#6C5CE7',
  primaryLight: '#8A7DF0',
  secondary: '#95A5A6',
  secondaryLight: '#556063',
  gradientStart: '#6C5CE7',
  gradientEnd: '#8A7DF0',
  // Accent (unchanged)
  accent: '#00C897',
  accentLight: '#004D3A',
  // Info
  info: '#5DACE4',
  infoLight: '#1B4F72',
  // Background colors
  background: '#13111C',
  surface: '#1E1B2E',
  card: '#1E1B2E',
  // Text colors
  textPrimary: '#F0EDFF',
  text: '#F0EDFF',
  textSecondary: '#9890B8',
  textTertiary: '#6B6488',
  textMuted: '#4A4562',
  // Additional neutrals
  error: '#FF6B6B',
  border: '#2D2A3E',
  glassBackground: 'rgba(30, 27, 46, 0.85)',
  glassBorder: 'rgba(45, 42, 62, 0.5)',
  // Streak orange (slightly warmer for dark bg)
  streakOrange: '#FFB347',
};

/** Returns the active color palette for the given mode. */
export const getColors = (isDark: boolean) => (isDark ? darkColors : lightColors);

// Default export for backward compatibility (light mode)
export const colors = lightColors;
export const Colors = lightColors;
