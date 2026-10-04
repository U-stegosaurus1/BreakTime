import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, SafeAreaView, StatusBar, Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

type Props = { navigation: NativeStackNavigationProp<any> };

const AVATAR_COLORS = ['#6C3AE0', '#00C897', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#E91E8C'];

export default function EditProfileScreen({ navigation }: Props) {
  const { user, updateUser } = useAuthStore();

  const [fullName,    setFullName]    = useState(user?.fullName   || 'Alex Johnson');
  const [email,       setEmail]       = useState(user?.email      || 'alex@example.com');
  const [university,  setUniversity]  = useState(user?.university || 'University of Ghana');
  const [bio,         setBio]         = useState('Student, fitness enthusiast 💪 | Trying to stay active between lectures');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [isSaving,    setIsSaving]    = useState(false);

  const initial = fullName.trim()[0]?.toUpperCase() || 'A';

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name.');
      return;
    }
    setIsSaving(true);
    try {
      updateUser({ fullName: fullName.trim(), university });
      await new Promise(resolve => setTimeout(resolve, 600));
      Alert.alert('✅ Saved!', 'Your profile has been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
          <Text style={[styles.saveText, { opacity: isSaving ? 0.5 : 1 }]}>
            {isSaving ? 'Saving…' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarCircle, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </View>
          <Text style={styles.avatarHint}>Choose avatar colour</Text>
          <View style={styles.colorRow}>
            {AVATAR_COLORS.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.colorDot, { backgroundColor: c }, c === avatarColor && styles.colorDotActive]}
                onPress={() => setAvatarColor(c)}
              >
                {c === avatarColor && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Full Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={18} color="#9890B8" style={styles.fieldIcon} />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full name"
                placeholderTextColor="#C4BFD8"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={18} color="#9890B8" style={styles.fieldIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor="#C4BFD8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* University */}
          <View style={styles.field}>
            <Text style={styles.label}>University / Institution</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="school-outline" size={18} color="#9890B8" style={styles.fieldIcon} />
              <TextInput
                style={styles.input}
                value={university}
                onChangeText={setUniversity}
                placeholder="Your university"
                placeholderTextColor="#C4BFD8"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Bio */}
          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>
            <View style={[styles.inputWrap, styles.bioWrap]}>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Write a short bio..."
                placeholderTextColor="#C4BFD8"
                multiline
                numberOfLines={3}
                maxLength={150}
              />
            </View>
            <Text style={styles.charCount}>{bio.length}/150</Text>
          </View>
        </View>

        {/* Stats (read-only) */}
        <Text style={styles.sectionTitle}>YOUR STATS</Text>
        <View style={styles.statsCard}>
          {[
            { label: 'Level',       value: String(user?.level        || 6),          icon: 'flash',         iconColor: '#F59E0B' },
            { label: 'Total XP',    value: String(user?.xp           || 1250),        icon: 'star',          iconColor: '#6C3AE0' },
            { label: 'Total Points',value: String(user?.totalPoints  || 0),           icon: 'medal-outline', iconColor: '#00C897' },
            { label: 'Best Streak', value: `${user?.longestStreak   || 0} days`,      icon: 'flame',         iconColor: '#F59E0B' },
          ].map((s, i) => (
            <View key={i} style={[styles.statRow, i < 3 && styles.statRowBorder]}>
              <View style={styles.statLeft}>
                <Ionicons name={s.icon as any} size={18} color={s.iconColor} />
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              <Text style={[styles.statValue, { color: s.iconColor }]}>{s.value}</Text>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, { opacity: isSaving ? 0.7 : 1 }]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>{isSaving ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.dangerBtn}
          onPress={() =>
            Alert.alert('Delete Account', 'This action is permanent and cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive' },
            ])
          }
        >
          <Text style={styles.dangerText}>Delete Account</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:  { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: '#F0EFF5',
  },
  iconBtn:     { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold',   fontSize: 18, color: '#1A1A2E' },
  saveText:    { fontFamily: 'Poppins-Bold',   fontSize: 15, color: '#6C3AE0' },

  content: { paddingHorizontal: 20, paddingBottom: 120, gap: 20, paddingTop: 20 },

  // Avatar
  avatarSection: { alignItems: 'center', paddingVertical: 8, gap: 12 },
  avatarCircle: {
    width: 96, height: 96, borderRadius: 48,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
  },
  avatarInitial: { fontFamily: 'Poppins-Bold', fontSize: 40, color: '#fff' },
  avatarHint:    { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  colorRow:      { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  colorDot:      { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  colorDotActive:{ borderWidth: 3, borderColor: 'rgba(255,255,255,0.7)' },

  // Form Card
  formCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    borderWidth: 1, borderColor: '#F0EFF5',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
    overflow: 'hidden',
  },
  field:    { padding: 16 },
  label:    { fontFamily: 'Poppins-Bold', fontSize: 11, color: '#9890B8', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 },
  inputWrap:{ flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#F0EFF5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#FAFAFA' },
  fieldIcon:{ marginRight: 10 },
  input:    { flex: 1, fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
  bioWrap:  { alignItems: 'flex-start', paddingTop: 14 },
  bioInput: { height: 72, textAlignVertical: 'top' },
  charCount:{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#9890B8', textAlign: 'right', marginTop: 4 },
  divider:  { height: 1, backgroundColor: '#F0EFF5', marginHorizontal: 16 },

  // Stats
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 11, color: '#9890B8', letterSpacing: 0.8, marginBottom: -8, marginLeft: 4 },
  statsCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    borderWidth: 1, borderColor: '#F0EFF5',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
    overflow: 'hidden',
  },
  statRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  statRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F0EFF5' },
  statLeft:      { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statLabel:     { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
  statValue:     { fontFamily: 'Poppins-Bold',   fontSize: 15 },

  // Save button
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#6C3AE0', borderRadius: 16, paddingVertical: 18,
    shadowColor: '#6C3AE0', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6,
  },
  saveBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' },

  // Danger
  dangerBtn:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  dangerText: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#EF4444' },
});
