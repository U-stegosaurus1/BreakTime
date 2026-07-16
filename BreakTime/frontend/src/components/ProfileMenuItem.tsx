// src/components/ProfileMenuItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { BorderRadius, Shadow, Spacing } from '../theme';
import { useTheme } from '../theme/useTheme';

interface ProfileMenuItemProps {
  label: string;
  onPress: () => void;
  status?: string;
  danger?: boolean;
  /**
   * When true, the bottom border is omitted (for the last item).
   */
  isLast?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  label,
  onPress,
  status,
  danger,
  isLast,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuRow, { borderBottomColor: colors.border }, isLast && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <Text style={[styles.menuLabel, { color: colors.textPrimary }, danger && { color: colors.error }]}>
        {label}
      </Text>
      {status ? (
        <Text style={[styles.statusText, { color: colors.accent }]}>{status}</Text>
      ) : (
        !danger && <Text style={[styles.menuChevron, { color: colors.textTertiary }]}>›</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuChevron: {
    fontSize: 20,
  },
});
