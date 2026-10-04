import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/useTheme';

interface InputProps extends TextInputProps {
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({ leftIcon, rightIcon, onRightIconPress, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {leftIcon && (
        <Ionicons name={leftIcon as any} size={20} color={colors.textSecondary} style={styles.leftIcon} />
      )}
      <TextInput
        style={[
          styles.input,
          { color: colors.text },
          leftIcon ? { paddingLeft: 8 } : {},
          rightIcon ? { paddingRight: 8 } : {}
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
          <Ionicons name={rightIcon as any} size={20} color={colors.textSecondary} style={styles.rightIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
