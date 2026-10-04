import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Register'> };

export default function RegisterScreen({ navigation }: Props) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const { register, isLoading, googleLogin } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
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
      if (e.code === 'auth/email-already-in-use')  msg = 'This email is already registered.';
      else if (e.code === 'auth/invalid-email')     msg = 'Invalid email address.';
      else if (e.code === 'auth/weak-password')     msg = 'Password should be at least 6 characters.';
      else if (e.message)                           msg = e.message;
      Alert.alert('Registration Failed', msg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your wellness journey today</Text>

        {/* Full Name */}
        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={20} color="#9890B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#C4BFD8"
            value={form.fullName}
            onChangeText={v => update('fullName', v)}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={20} color="#9890B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#C4BFD8"
            value={form.email}
            onChangeText={v => update('email', v)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={20} color="#9890B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#C4BFD8"
            value={form.password}
            onChangeText={v => update('password', v)}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
            <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} size={20} color="#9890B8" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={20} color="#9890B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#C4BFD8"
            value={form.confirm}
            onChangeText={v => update('confirm', v)}
            secureTextEntry={!showPass}
          />
        </View>

        {/* Sign Up button */}
        {isLoading ? (
          <ActivityIndicator color="#6C3AE0" size="large" style={{ marginVertical: 10 }} />
        ) : (
          <TouchableOpacity style={styles.signUpBtn} activeOpacity={0.85} onPress={handleRegister}>
            <Text style={styles.signUpBtnText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75} onPress={() => googleLogin()}>
            <MaterialCommunityIcons name="google"   size={22} color="#EA4335" />
            <Text style={styles.socialLabel}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75} onPress={() => Alert.alert('Apple', 'Requires native build.')}>
            <MaterialCommunityIcons name="apple"    size={22} color="#000000" />
            <Text style={styles.socialLabel}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75} onPress={() => Alert.alert('Facebook', 'Coming soon.')}>
            <MaterialCommunityIcons name="facebook" size={22} color="#1877F2" />
            <Text style={styles.socialLabel}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.bottomArea}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F3FF' },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  title:    { fontFamily: 'Poppins-Bold',    fontSize: 26, color: '#6C3AE0', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#9890B8', textAlign: 'center', marginBottom: 32 },

  // Input fields
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
  input: { flex: 1, fontFamily: 'Poppins-Medium', fontSize: 15, color: '#1A1A2E' },
  eyeBtn: { padding: 4 },

  // Sign Up button
  signUpBtn: {
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
  signUpBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },

  // Divider
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8E4F0' },
  dividerText: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8', paddingHorizontal: 14 },

  // Social buttons
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
  socialLabel: { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#1A1A2E' },

  // Footer
  bottomArea: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  loginText:  { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9890B8' },
  loginLink:  { fontFamily: 'Poppins-Bold',    fontSize: 14, color: '#6C3AE0' },
});
