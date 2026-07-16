import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Spacing, BorderRadius, Shadow } from '../theme';
import { useTheme } from '../theme/useTheme';

export interface ChallengeCardProps {
  icon?: string;
  title: string;
  progress?: number; // 0-100
  targetValue?: string;
  onStart?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  icon = '🏆',
  title,
  progress = 0,
  targetValue,
  onStart,
}) => {
  const { colors } = useTheme();
  const progressAnim = React.useRef(new Animated.Value(progress)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpol = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {targetValue && <Text style={[styles.target, { color: colors.textSecondary }]}>{targetValue}</Text>}
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <Animated.View style={[styles.progressFill, { width: widthInterpol, backgroundColor: colors.primary }]} />
      </View>
      {onStart && (
        <TouchableOpacity style={[styles.startBtn, { backgroundColor: colors.primary }]} onPress={onStart}>
          <Text style={styles.startBtnText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadow.sm,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  target: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  progressBar: {
    height: 8,
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
  },
  startBtn: {
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  startBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});
