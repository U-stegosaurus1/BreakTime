import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Shadow } from '../theme';
import { useTheme } from '../theme/useTheme';

/**
 * StatCard – shows an icon/emoji, a title and a numeric/value.
 * Used on the Home dashboard for steps, calories, etc.
 */
export const StatCard: React.FC<{
  icon: string;
  title: string;
  value: string | number;
}> = ({ icon, title, value }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadow.sm,
  },
  icon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
  },
});
