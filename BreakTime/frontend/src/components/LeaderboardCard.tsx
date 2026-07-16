// src/components/LeaderboardCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderRadius, Shadow, Spacing } from '../theme';
import { useTheme } from '../theme/useTheme';

interface LeaderboardCardProps {
  rank: number;
  name: string;
  points: number;
  avatar?: any; // image source
  isCurrentUser?: boolean;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ rank, name, points, avatar, isCurrentUser }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, isCurrentUser && { backgroundColor: colors.primaryLight }]}>
      <Text style={[styles.rank, { color: colors.textPrimary }]}>#{rank}</Text>
      {/* Avatar placeholder */}
      <View style={[styles.avatar, { backgroundColor: colors.border }]} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
        <Text style={[styles.points, { color: colors.textSecondary }]}>{points} pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginVertical: Spacing.xs,
    ...Shadow.sm,
  },
  rank: {
    width: 30,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: Spacing.sm,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  points: {
    fontSize: 13,
  },
});
