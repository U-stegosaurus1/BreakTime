import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Alert, ActivityIndicator, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { authApi } from '../../services/api';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await authApi.forgotPassword(email.trim());
      setSent(true);
    } catch (e: any) {
      Alert.alert('Failed', e.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

      <View style={styles.content}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>

        {!sent ? (
          /* ── Request form ── */
          <View style={styles.formWrap}>
            <Text style={styles.title}>Forgot Password? 🔑</Text>
            <Text style={styles.subtitle}>
              Enter your registered email address and we'll send you instructions to reset your password.
            </Text>

            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={20} color="#9890B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#C4BFD8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, loading && { opacity: 0.7 }]}
              onPress={handleReset}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.actionBtnText}>Send Instructions</Text>
              }
            </TouchableOpacity>
          </View>
        ) : (
          /* ── Success state ── */
          <View style={styles.successWrap}>
            <Text style={styles.successEmoji}>📧</Text>
            <Text style={styles.title}>Instructions Sent!</Text>
            <Text style={styles.successSub}>
              We've sent password reset instructions to{' '}
              <Text style={styles.boldEmail}>{email}</Text>.{'\n'}Please check your inbox.
            </Text>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>Back to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn} onPress={() => setSent(false)}>
              <Text style={styles.resendText}>Try another email address</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F3FF' },
  content:  { flex: 1, padding: 24, paddingTop: Platform.OS === 'android' ? 16 : 12 },

  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  formWrap: { flex: 1 },

  title:    { fontFamily: 'Poppins-Bold',    fontSize: 24, color: '#6C3AE0', marginBottom: 8 },
  subtitle: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9890B8', lineHeight: 22, marginBottom: 32 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E4F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 20,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontFamily: 'Poppins-Medium', fontSize: 15, color: '#1A1A2E' },

  actionBtn: {
    backgroundColor: '#6C3AE0',
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  actionBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },

  successWrap:  { flex: 1, alignItems: 'center', paddingTop: 20 },
  successEmoji: { fontSize: 64, marginBottom: 24, textAlign: 'center' },
  successSub:   { fontFamily: 'Poppins-Regular', fontSize: 15, color: '#9890B8', lineHeight: 22, textAlign: 'center', marginBottom: 32 },
  boldEmail:    { fontFamily: 'Poppins-Bold', color: '#1A1A2E' },

  resendBtn:  { padding: 8 },
  resendText: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#6C3AE0' },
});
