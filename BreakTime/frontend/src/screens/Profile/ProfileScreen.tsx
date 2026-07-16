import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Switch, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuthStore } from '../../store/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../../services/api';
import { useTheme } from '../../theme/useTheme';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();
  const { colors, isDarkMode } = useTheme();

  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});
  const [appleHealthEnabled, setAppleHealthEnabled] = useState(true);
  const [googleFitEnabled, setGoogleFitEnabled] = useState(false);

  const defaultSettings = {
    notificationsEnabled: true,
    dailyChallengeReminder: true,
    soundEnabled: true,
    vibrationEnabled: true,
    breakReminders: true,
  };

  const { data: fetchedSettings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.get().then(r => r.data.data).catch(() => null),
  });

  const settings = fetchedSettings || defaultSettings;

  const { mutate: updateSettings } = useMutation({
    mutationFn: (newSettings: object) => settingsApi.update(newSettings).catch(() => ({ data: { data: { ...settings, ...newSettings } } })),
    onSuccess: (res) => {
      queryClient.setQueryData(['settings'], res.data.data);
    },
  });

  const toggleVal = (key: string, currentVal: boolean) => {
    updateSettings({ [key]: !currentVal });
  };

  const handleLogout = async () => {
    await logout();
    // AppNavigator automatically swaps the navigation stack to Auth when user logs out.
  };

  const toggleTab = (id: string) => {
    setExpandedTabs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: 'account-outline', route: 'EditProfile' },
    { id: '2', title: 'Activity History', icon: 'history', route: 'ActivityHistory' },
    { id: '3', title: 'Goals', icon: 'flag-outline', route: 'Goals' },
    { id: '4', title: 'Reminders', icon: 'bell-outline', type: 'accordion' },
    { id: '5', title: 'Connected Apps', icon: 'link-variant', type: 'accordion' },
    { id: '6', title: 'Settings', icon: 'cog-outline', route: 'Settings' },
    { id: '7', title: 'Logout', icon: 'logout', route: 'Logout', isDestructive: true },
  ];

  const renderAccordionContent = (item: any) => {
    if (item.title === 'Reminders') {
      if (isLoading) return <ActivityIndicator size="small" color="#635BFF" style={{ padding: 16 }} />;
      return (
        <View style={[styles.accordionContent, { backgroundColor: isDarkMode ? colors.background : '#FBFBFF' }]}>
          <View style={styles.accordionRow}>
            <Text style={[styles.accordionText, { color: colors.textPrimary }]}>Push Notifications</Text>
            <Switch
              trackColor={{ false: '#EAE6FF', true: '#635BFF' }}
              thumbColor="#ffffff"
              value={settings.notificationsEnabled}
              onValueChange={() => toggleVal('notificationsEnabled', settings.notificationsEnabled)}
            />
          </View>
          <View style={styles.accordionRow}>
            <Text style={[styles.accordionText, { color: colors.textPrimary }]}>Daily Challenge Reminders</Text>
            <Switch
              trackColor={{ false: '#EAE6FF', true: '#635BFF' }}
              thumbColor="#ffffff"
              value={settings.dailyChallengeReminder}
              onValueChange={() => toggleVal('dailyChallengeReminder', settings.dailyChallengeReminder)}
              disabled={!settings.notificationsEnabled}
            />
          </View>
          <View style={styles.accordionRow}>
            <Text style={[styles.accordionText, { color: colors.textPrimary }]}>Sedentary Alert</Text>
            <Switch
              trackColor={{ false: '#EAE6FF', true: '#635BFF' }}
              thumbColor="#ffffff"
              value={settings.breakReminders}
              onValueChange={() => toggleVal('breakReminders', settings.breakReminders)}
            />
          </View>
        </View>
      );
    }
    
    if (item.title === 'Connected Apps') {
      return (
        <View style={[styles.accordionContent, { backgroundColor: isDarkMode ? colors.background : '#FBFBFF' }]}>
          <View style={styles.accordionRow}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Icon name="apple" size={20} color={colors.textPrimary} />
              <Text style={[styles.accordionText, { color: colors.textPrimary }]}>Apple Health</Text>
            </View>
            <Switch trackColor={{ false: '#EAE6FF', true: '#635BFF' }} thumbColor="#ffffff" value={appleHealthEnabled} onValueChange={setAppleHealthEnabled} />
          </View>
          <View style={styles.accordionRow}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Icon name="google-fit" size={20} color={colors.textPrimary} />
              <Text style={[styles.accordionText, { color: colors.textPrimary }]}>Google Fit</Text>
            </View>
            <Switch trackColor={{ false: '#EAE6FF', true: '#635BFF' }} thumbColor="#ffffff" value={googleFitEnabled} onValueChange={setGoogleFitEnabled} />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#635BFF" />
      
      {/* Purple Header Block */}
      <View style={styles.headerBlock}>
        <View style={styles.headerContent}>
          <View style={styles.avatarWrap}>
            <Icon name="account" size={60} color="#635BFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.fullName || 'Alex'}</Text>
            <Text style={styles.userLevel}>Level 6</Text>
            
            <View style={styles.progressWrap}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>1,250/2,000</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.menuContainer, { backgroundColor: colors.card, shadowColor: colors.text }]}>
          {menuItems.map((item, index) => {
            const isLast = index === menuItems.length - 1;
            const isExpanded = expandedTabs[item.id];
            
            return (
              <View key={item.id}>
                <TouchableOpacity 
                  style={[styles.menuRow, isLast && !isExpanded && styles.menuRowLast, { borderBottomColor: isDarkMode ? colors.border : '#F7F7FA' }]}
                  onPress={() => {
                    if (item.isDestructive) handleLogout();
                    else if (item.type === 'accordion') toggleTab(item.id);
                    else navigation.navigate(item.route as any);
                  }}
                >
                  <View style={styles.menuLeft}>
                    <Icon name={item.icon} size={24} color={item.isDestructive ? "#EF4444" : colors.textPrimary} />
                    <Text style={[styles.menuTitle, { color: colors.textPrimary }, item.isDestructive && {color: "#EF4444"}]}>{item.title}</Text>
                  </View>
                  {item.type === 'accordion' ? (
                    <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#9890B8" />
                  ) : (
                    <Icon name="chevron-right" size={24} color="#9890B8" />
                  )}
                </TouchableOpacity>
                {item.type === 'accordion' && isExpanded && renderAccordionContent(item)}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FA' },
  headerBlock: {
    backgroundColor: '#635BFF',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAE6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userLevel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#EAE6FF',
    marginBottom: 12,
  },
  progressWrap: {
    alignItems: 'flex-end',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#EAE6FF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100, // Space for bottom tab
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F7FA',
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#1A1A2E',
  },
  accordionContent: {
    backgroundColor: '#FBFBFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginTop: -8,
  },
  accordionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  accordionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1A2E',
  },
});
