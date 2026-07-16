import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing } from '../theme';
import { useTheme } from '../theme/useTheme';

/**
 * ErrorBanner – displays an error message with optional retry button.
 * It uses the primary color scheme and matches the glass‑morphism design.
 */
export const ErrorBanner: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.error }]}>
      <Text style={styles.message}>⚠️ {message}</Text>
      {onRetry && (
        <Text style={styles.retry} onPress={onRetry}>
          Retry
        </Text>
      )}
    </View>
  );
};

export default ErrorBanner;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: 8,
    marginVertical: Spacing.sm,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  retry: {
    color: '#fff',
    marginTop: Spacing.xs,
    textDecorationLine: 'underline',
  },
});
