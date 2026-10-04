import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const { login, googleLogin }          = useAuthStore();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Login failed', e?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        {/* ── MAIN CONTENT ── */}
        <View style={styles.content}>

          {/* Title */}
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue your journey</Text>

          {/* Email field */}
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={20} color="#9890B8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#C4BFD8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>

          {/* Password field */}
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#9890B8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#C4BFD8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#9890B8"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password — right aligned purple */}
          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login button — purple, full width */}
          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginBtnText}>{isLoading ? 'Logging in…' : 'Login'}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons row — Google | Apple | Facebook */}
          <View style={styles.socialRow}>
            {/* Google */}
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.75}
              onPress={() => googleLogin()}
            >
              <MaterialCommunityIcons name="google" size={22} color="#EA4335" />
              <Text style={styles.socialLabel}>Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.75}
              onPress={() => Alert.alert('Apple Sign-In', 'Requires native build.')}
            >
              <MaterialCommunityIcons name="apple" size={22} color="#000000" />
              <Text style={styles.socialLabel}>Apple</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.75}
              onPress={() => Alert.alert('Facebook Sign-In', 'Coming soon.')}
            >
              <MaterialCommunityIcons name="facebook" size={22} color="#1877F2" />
              <Text style={styles.socialLabel}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ── Light lavender background (matches design 03) ──
  safeArea: { flex: 1, backgroundColor: '#F5F3FF' },
  kav:      { flex: 1 },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  // Title
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#6C3AE0',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9890B8',
    textAlign: 'center',
    marginBottom: 36,
  },

  // Input fields — white card with icon prefix
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 14,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#1A1A2E',
  },
  eyeBtn: { padding: 4 },

  // Forgot password
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#6C3AE0',
  },

  // Login button — purple
  loginBtn: {
    backgroundColor: '#6C3AE0',
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  loginBtnDisabled: { opacity: 0.7 },
  loginBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  // Divider
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8E4F0' },
  dividerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#9890B8',
    paddingHorizontal: 14,
  },

  // Social buttons — 3 equal columns, white card with brand icon + label
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4F0',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  socialLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1A1A2E',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
  },
  footerText: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8' },
  footerLink: { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#6C3AE0' },
});
