// src/components/BadgeCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { BorderRadius, Shadow, Spacing } from '../theme';
import { useTheme } from '../theme/useTheme';

interface BadgeCardProps {
  /** URL or local asset of the badge illustration */
  source: any;
  /** Badge title */
  title: string;
  /** Whether the badge is earned (true) or locked (false) */
  earned: boolean;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ source, title, earned }) => {
  const { colors } = useTheme();
  // Simple scale animation when the badge becomes earned
  const scale = React.useRef(new Animated.Value(earned ? 1.2 : 1)).current;
  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: earned ? 1.2 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [earned]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.surface, transform: [{ scale }] }]}>
      <Image source={source} style={[styles.image, !earned && styles.lockedOverlay]} />
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    ...Shadow.sm,
    margin: Spacing.xs,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  lockedOverlay: {
    opacity: 0.3,
  },
  title: {
    marginTop: Spacing.xs,
    fontSize: 11,
    textAlign: 'center',
  },
});
