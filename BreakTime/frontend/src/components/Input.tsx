import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <Icon name={leftIcon} size={20} color={colors.textSecondary} style={styles.leftIcon} />
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
        <Icon
          name={rightIcon}
          size={20}
          color={colors.textSecondary}
          style={styles.rightIcon}
          onPress={onRightIconPress}
        />
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
