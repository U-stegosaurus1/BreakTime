import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '../theme/useTheme';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'caption';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ variant = 'body', style, children, ...rest }) => {
  const { colors } = useTheme();

  const colorMap: Record<TypographyVariant, string> = {
    h1: colors.textPrimary,
    h2: colors.textPrimary,
    h3: colors.textPrimary,
    subtitle: colors.textSecondary,
    body: colors.textPrimary,
    caption: colors.textTertiary,
  };

  const textStyle = [styles[variant], { color: colorMap[variant] }, style];
  return (
    <Text style={textStyle} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 16,
  },
});
