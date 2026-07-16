// src/components/ProgressCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Shadow } from '../theme';
import { useTheme } from '../theme/useTheme';

export interface ProgressCardProps {
  title: string;
  progressPct: number; // 0-100
  label?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ title, progressPct, label }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <View style={styles.ringContainer}>
        <View style={[styles.ring, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.pct, { color: colors.primary }]}>{progressPct}%</Text>
          {label && <Text style={[styles.ringLabel, { color: colors.textSecondary }]}>{label}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.sm,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  ringContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pct: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  ringLabel: {
    fontSize: 10,
  },
});
