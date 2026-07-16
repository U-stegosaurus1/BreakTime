import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { BorderRadius, Spacing, Shadow } from '../theme';

/**
 * LoadingSpinner – a centered activity indicator that matches the app's theme.
 * Uses the theme's primary color for the spinner and applies a subtle glass‑morphism backdrop.
 */
export const LoadingSpinner: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.glassBackground }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    margin: Spacing.md,
    ...Shadow.sm,
  },
});
