import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

/**
 * Reusable StatRow component used throughout the app to display an emoji, a label and a value.
 */
export const StatRow: React.FC<{ emoji: string; label: string; value: string }> = ({ emoji, label, value }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
};

export default StatRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: 11,
  },
  value: {
    fontSize: 12,
    fontWeight: '700',
  },
});
