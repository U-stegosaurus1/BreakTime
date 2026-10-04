import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch,
  TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { settingsApi } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

type Props = { navigation: NativeStackNavigationProp<any> };

export default function SettingsScreen({ navigation }: Props) {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  const defaultSettings = {
    notificationsEnabled:   true,
    dailyChallengeReminder: true,
    soundEnabled:           true,
    vibrationEnabled:       true,
  };

  const { data: settings = defaultSettings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.get().then(r => r.data.data).catch(() => defaultSettings),
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: (newSettings: object) =>
      settingsApi.update(newSettings).catch(() => ({ data: { data: { ...settings, ...newSettings } } })),
    onSuccess: (res) => { queryClient.setQueryData(['settings'], res.data.data); },
  });

  const toggleVal = (key: string, currentVal: boolean) => updateSettings({ [key]: !currentVal });

  const handleLogout = () =>
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);

  const handleNotImplemented = (feature: string) =>
    Alert.alert('Coming Soon', `${feature} will be available in the next update!`);

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#6C3AE0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <ActionRow icon="person-circle-outline" title="Edit Profile"      onPress={() => navigation.navigate('EditProfile')} />
            <View style={styles.divider} />
            <ActionRow icon="lock-closed-outline"   title="Change Password"   onPress={() => handleNotImplemented('Change Password')} />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SettingRow
              iconName="notifications-outline"
              title="Push Notifications"
              desc="Enable all app alerts and reminders"
              value={settings.notificationsEnabled}
              onToggle={() => toggleVal('notificationsEnabled', settings.notificationsEnabled)}
            />
            <View style={styles.divider} />
            <SettingRow
              iconName="flag-outline"
              title="Daily Challenge Reminders"
              desc="Remind me to complete daily active challenges"
              value={settings.dailyChallengeReminder}
              disabled={!settings.notificationsEnabled}
              onToggle={() => toggleVal('dailyChallengeReminder', settings.dailyChallengeReminder)}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.card}>
            <SettingRow
              iconName="volume-high-outline"
              title="Sounds"
              desc="Play completion sounds and cheers"
              value={settings.soundEnabled}
              onToggle={() => toggleVal('soundEnabled', settings.soundEnabled)}
            />
            <View style={styles.divider} />
            <SettingRow
              iconName="phone-portrait-outline"
              title="Vibration"
              desc="Haptic feedback on taps and goals"
              value={settings.vibrationEnabled}
              onToggle={() => toggleVal('vibrationEnabled', settings.vibrationEnabled)}
            />
          </View>
        </View>

        {/* Support & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          <View style={styles.card}>
            <ActionRow icon="help-circle-outline"    title="Help & Support"    onPress={() => handleNotImplemented('Help & Support')} />
            <View style={styles.divider} />
            <ActionRow icon="document-text-outline"  title="Terms of Service"  onPress={() => handleNotImplemented('Terms of Service')} />
            <View style={styles.divider} />
            <ActionRow icon="shield-checkmark-outline" title="Privacy Policy"  onPress={() => handleNotImplemented('Privacy Policy')} />
            <View style={styles.divider} />
            <ActionRow icon="information-circle-outline" title="About BreakTime" onPress={() => navigation.navigate('About')} />
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.actionRow} onPress={handleLogout} activeOpacity={0.7}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" style={{ marginRight: 14 }} />
              <Text style={[styles.actionTitle, { color: '#EF4444' }]}>Log Out</Text>
              <Ionicons name="chevron-forward" size={18} color="#EF4444" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>Version 1.0.0 (Production Build)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Row sub-components ─────────────────────────────────────────────────────────
interface SettingRowProps {
  iconName: string; title: string; desc?: string;
  value: boolean; disabled?: boolean; onToggle: () => void;
}
function SettingRow({ iconName, title, desc, value, disabled = false, onToggle }: SettingRowProps) {
  return (
    <View style={[styles.row, disabled && { opacity: 0.5 }]}>
      <Ionicons name={iconName as any} size={22} color="#6C3AE0" style={styles.rowIcon} />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {desc && <Text style={styles.rowDesc}>{desc}</Text>}
      </View>
      <Switch
        trackColor={{ false: '#E8E4F0', true: '#6C3AE0' }}
        thumbColor="#ffffff"
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
      />
    </View>
  );
}

interface ActionRowProps { icon: string; title: string; onPress: () => void; }
function ActionRow({ icon, title, onPress }: ActionRowProps) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon as any} size={22} color="#6C3AE0" style={{ marginRight: 14 }} />
      <Text style={[styles.actionTitle, { flex: 1 }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color="#C0BDCC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#FFFFFF' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0EFF5',
  },
  backBtn:     { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#1A1A2E' },

  content:      { padding: 16, gap: 24, paddingBottom: 40 },
  section:      { gap: 8 },
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 11, color: '#9890B8', textTransform: 'uppercase', letterSpacing: 0.5, paddingLeft: 4, marginBottom: -4 },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#F0EFF5',
    shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  divider: { height: 1, backgroundColor: '#F0EFF5' },

  row:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  rowIcon: { marginRight: 14 },
  rowText: { flex: 1, marginRight: 16 },
  rowTitle:{ fontFamily: 'Poppins-Medium', fontSize: 15, color: '#1A1A2E' },
  rowDesc: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#9890B8', marginTop: 2 },

  actionRow:   { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  actionTitle: { fontFamily: 'Poppins-Medium', fontSize: 15, color: '#1A1A2E' },

  version: { textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 11, color: '#9890B8', marginTop: 12, marginBottom: 24 },
});
