import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, Alert, ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { BorderRadius, Shadow } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import { authApi } from '../../services/api';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, any> };

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { colors, isDarkMode } = useTheme();

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (e: any) {
      Alert.alert('Failed', e.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      {/* Header back btn */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.card }]}>
        <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      {!sent ? (
        <View style={styles.formWrap}>
          <Text style={[styles.title, { color: colors.primary }]}>Forgot Password? 🔑</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Enter your registered email address and we'll send you instructions to reset your password.</Text>

          <View style={[styles.inputWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.inputIcon}>📧</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Email Address"
              placeholderTextColor={colors.textTertiary}
              defaultValue={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.primary }]} onPress={handleReset} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.resetBtnText}>Send Instructions</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.successWrap}>
          <Text style={styles.successEmoji}>📧</Text>
          <Text style={[styles.title, { color: colors.primary }]}>Instructions Sent!</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            We've sent password reset instructions to <Text style={[styles.boldEmail, { color: colors.text }]}>{email}</Text>. Please check your inbox.
          </Text>

          <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.primary, width: '100%' }]} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.resetBtnText}>Back to Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendBtn} onPress={() => setSent(false)}>
            <Text style={[styles.resendText, { color: colors.primary }]}>Try another email address</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 40 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    ...Shadow.sm,
  },
  backIcon: { fontSize: 18, fontWeight: '700' },
  formWrap: { flex: 1 },
  title: { fontFamily: 'Nunito-Black', fontSize: 26, marginBottom: 8 },
  subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 32 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },
  resetBtn: {
    borderRadius: BorderRadius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 16,
    ...Shadow.sm,
  },
  resetBtnText: { color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 16 },
  successWrap: { alignItems: 'center', paddingTop: 20 },
  successEmoji: { fontSize: 64, marginBottom: 24, textAlign: 'center' },
  successSub: { fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 32 },
  boldEmail: { fontWeight: '700' },
  resendBtn: { padding: 8, alignItems: 'center' },
  resendText: { fontSize: 14, fontWeight: '600' },
});
