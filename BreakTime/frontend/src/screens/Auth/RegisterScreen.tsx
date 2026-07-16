import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Register'> };

export default function RegisterScreen({ navigation }: Props) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const { register, isLoading, googleLogin } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }
    if (form.password !== form.confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await register({ email: form.email, password: form.password, fullName: form.fullName });
      navigation.replace('Main');
    } catch (e: any) {
      let msg = 'Something went wrong';
      if (e.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered.';
      } else if (e.code === 'auth/invalid-email') {
        msg = 'Invalid email address.';
      } else if (e.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (e.message) {
        msg = e.message;
      }
      Alert.alert('Registration Failed', msg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.primary }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Start your wellness journey today</Text>

        <View style={styles.formSection}>
          <Input
            placeholder="Full Name"
            leftIcon="account-outline"
            value={form.fullName}
            onChangeText={(v) => update('fullName', v)}
            autoCapitalize="words"
          />

          <Input
            placeholder="Email"
            leftIcon="email-outline"
            value={form.email}
            onChangeText={(v) => update('email', v)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            placeholder="Password"
            leftIcon="lock-outline"
            value={form.password}
            onChangeText={(v) => update('password', v)}
            secureTextEntry={!showPass}
            rightIcon={showPass ? 'eye-outline' : 'eye-off-outline'}
            onRightIconPress={() => setShowPass(!showPass)}
          />

          <Input
            placeholder="Confirm Password"
            leftIcon="lock-outline"
            value={form.confirm}
            onChangeText={(v) => update('confirm', v)}
            secureTextEntry={!showPass}
          />

          {isLoading ? (
            <ActivityIndicator color={colors.primary} size="large" style={{ marginVertical: 10 }} />
          ) : (
            <PrimaryButton title="Sign Up" onPress={handleRegister} />
          )}

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or continue with</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border, backgroundColor: colors.card }]} onPress={googleLogin}>
              <Icon name="google" size={24} color="#DB4437" />
              <Text style={[styles.socialText, { color: colors.textPrimary }]}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Icon name="apple" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
              <Text style={[styles.socialText, { color: colors.textPrimary }]}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Icon name="facebook" size={24} color="#4267B2" />
              <Text style={[styles.socialText, { color: colors.textPrimary }]}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomArea}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: colors.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 32,
  },
  formSection: {
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  socialText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  bottomArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  loginLink: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});
