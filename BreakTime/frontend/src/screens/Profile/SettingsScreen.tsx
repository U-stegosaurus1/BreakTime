import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch,
  TouchableOpacity, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BorderRadius, Shadow } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import { settingsApi } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/authStore';

type Props = { navigation: NativeStackNavigationProp<any> };

export default function SettingsScreen({ navigation }: Props) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuthStore();
  const queryClient = useQueryClient();

  const defaultSettings = {
    notificationsEnabled: true,
    dailyChallengeReminder: true,
    soundEnabled: true,
    vibrationEnabled: true,
  };

  const { data: settings = defaultSettings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.get().then(r => r.data.data).catch(() => defaultSettings),
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: (newSettings: object) => settingsApi.update(newSettings).catch(() => ({ data: { data: { ...settings, ...newSettings } } })),
    onSuccess: (res) => {
      queryClient.setQueryData(['settings'], res.data.data);
    },
  });

  const toggleVal = (key: string, currentVal: boolean) => {
    updateSettings({ [key]: !currentVal });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleNotImplemented = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available in the next update!`);
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingWrap, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.card, borderBottomColor: colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.textPrimary}]}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account</Text>
          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <ActionRow
              icon="account-edit-outline"
              title="Edit Profile"
              colors={colors}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ActionRow
              icon="lock-outline"
              title="Change Password"
              colors={colors}
              onPress={() => handleNotImplemented('Change Password')}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Notifications</Text>
          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <SettingRow
              icon="bell-ring-outline"
              title="Push Notifications"
              desc="Enable all app alerts and reminders"
              value={settings.notificationsEnabled}
              colors={colors}
              onToggle={() => toggleVal('notificationsEnabled', settings.notificationsEnabled)}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="target"
              title="Daily Challenge Reminders"
              desc="Remind me to complete daily active challenges"
              value={settings.dailyChallengeReminder}
              disabled={!settings.notificationsEnabled}
              colors={colors}
              onToggle={() => toggleVal('dailyChallengeReminder', settings.dailyChallengeReminder)}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>App Preferences</Text>
          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <SettingRow
              icon="weather-night"
              title="Dark Mode"
              desc="Toggle between light and dark themes"
              value={isDarkMode}
              colors={colors}
              onToggle={toggleTheme}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="volume-high"
              title="Sounds"
              desc="Play completion sounds and cheers"
              value={settings.soundEnabled}
              colors={colors}
              onToggle={() => toggleVal('soundEnabled', settings.soundEnabled)}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="vibrate"
              title="Vibration"
              desc="Haptic feedback on taps and goals"
              value={settings.vibrationEnabled}
              colors={colors}
              onToggle={() => toggleVal('vibrationEnabled', settings.vibrationEnabled)}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support & About</Text>
          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <ActionRow
              icon="help-circle-outline"
              title="Help & Support"
              colors={colors}
              onPress={() => handleNotImplemented('Help & Support')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ActionRow
              icon="file-document-outline"
              title="Terms of Service"
              colors={colors}
              onPress={() => handleNotImplemented('Terms of Service')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ActionRow
              icon="shield-check-outline"
              title="Privacy Policy"
              colors={colors}
              onPress={() => handleNotImplemented('Privacy Policy')}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ActionRow
              icon="information-outline"
              title="About BreakTime"
              colors={colors}
              onPress={() => navigation.navigate('About')}
            />
          </View>
        </View>

        {/* Danger Zone Section */}
        <View style={styles.section}>
          <View style={[styles.card, {backgroundColor: colors.card, marginTop: 10}]}>
            <TouchableOpacity style={styles.actionRow} onPress={handleLogout}>
              <Icon name="logout" size={22} color="#EF4444" style={styles.actionIcon} />
              <Text style={[styles.actionTitle, { color: '#EF4444', flex: 1 }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.version, {color: colors.textTertiary}]}>Version 1.0.0 (Production Build)</Text>
      </ScrollView>
    </View>
  );
}

interface RowProps {
  icon: string;
  title: string;
  desc?: string;
  value: boolean;
  colors: any;
  disabled?: boolean;
  onToggle: () => void;
}

function SettingRow({ icon, title, desc, value, disabled = false, onToggle, colors }: RowProps) {
  return (
    <View style={[styles.row, disabled && { opacity: 0.5 }]}>
      <Icon name={icon} size={22} color={colors.textSecondary} style={styles.rowIcon} />
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{title}</Text>
        {desc && <Text style={[styles.rowDesc, { color: colors.textSecondary }]}>{desc}</Text>}
      </View>
      <Switch
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#ffffff"
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
      />
    </View>
  );
}

interface ActionRowProps {
  icon: string;
  title: string;
  colors: any;
  onPress: () => void;
}

function ActionRow({ icon, title, colors, onPress }: ActionRowProps) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <Icon name={icon} size={22} color={colors.textSecondary} style={styles.actionIcon} />
      <Text style={[styles.actionTitle, { color: colors.textPrimary, flex: 1 }]}>{title}</Text>
      <Icon name="chevron-right" size={20} color={colors.border} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  content: { padding: 16, gap: 24, paddingBottom: 40 },
  section: { gap: 8 },
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, paddingLeft: 12 },
  card: { borderRadius: 16, paddingHorizontal: 16, ...Shadow.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  rowIcon: { marginRight: 14 },
  rowText: { flex: 1, marginRight: 16 },
  rowTitle: { fontFamily: 'Poppins-Medium', fontSize: 15 },
  rowDesc: { fontFamily: 'Poppins-Regular', fontSize: 11, marginTop: 2 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  actionIcon: { marginRight: 14 },
  actionTitle: { fontFamily: 'Poppins-Medium', fontSize: 15 },
  divider: { height: 1 },
  intervalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 4, borderRadius: 8 },
  counterBtn: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', ...Shadow.sm },
  counterBtnText: { fontSize: 18, fontFamily: 'Poppins-Bold' },
  counterValue: { fontFamily: 'Poppins-Bold', fontSize: 14, minWidth: 28, textAlign: 'center' },
  version: { textAlign: 'center', fontFamily: 'Poppins-Regular', fontSize: 11, marginTop: 12, marginBottom: 24 },
});
