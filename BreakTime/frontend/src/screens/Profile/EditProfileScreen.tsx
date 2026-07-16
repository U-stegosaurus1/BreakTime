import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, StatusBar, Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/authStore';

type Props = { navigation: NativeStackNavigationProp<any> };

export default function EditProfileScreen({ navigation }: Props) {
  const { colors, isDarkMode } = useTheme();
  const { user } = useAuthStore();
  
  const [name, setName] = useState(user?.fullName || 'Alex');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');

  const handleSave = () => {
    // Mock save
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.card, borderBottomColor: colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.textPrimary}]}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Icon name="account" size={60} color="#635BFF" />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.textPrimary, borderColor: colors.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={colors.textTertiary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.textPrimary, borderColor: colors.border }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textTertiary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'flex-start', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18 },
  content: { padding: 24, gap: 24 },
  avatarSection: { alignItems: 'center', marginBottom: 16 },
  avatarWrap: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#EAE6FF',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative'
  },
  editAvatarBtn: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#635BFF', width: 32, height: 32,
    borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF'
  },
  formGroup: { gap: 8 },
  label: { fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 4 },
  input: {
    height: 52, borderRadius: 12, borderWidth: 1,
    paddingHorizontal: 16, fontFamily: 'Poppins-Regular', fontSize: 15
  },
  saveBtn: {
    backgroundColor: '#635BFF', height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 16,
    shadowColor: '#635BFF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4
  },
  saveBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },
});
