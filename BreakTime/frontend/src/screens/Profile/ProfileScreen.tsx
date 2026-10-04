import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { AvatarIcon } from '../../components/icons/ActivityIcons';

// ── Menu items matching design 10 ─────────────────────────────────────────────
const MENU_ITEMS: {
  id: string;
  title: string;
  route?: string;
  value?: string;
  isDestructive?: boolean;
}[] = [
  { id: '1', title: 'Edit Profile',     route: 'EditProfile'    },
  { id: '2', title: 'Activity History', route: 'ActivityHistory' },
  { id: '3', title: 'Goals',            route: 'Goals'           },
  { id: '4', title: 'Reminders',        route: 'Settings', value: 'On' },
  { id: '5', title: 'Connected Apps',   route: 'Settings'        },
  { id: '6', title: 'Settings',         route: 'Settings'        },
  { id: '7', title: 'Logout',           isDestructive: true      },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();

  const name   = user?.fullName?.split(' ')[0] || 'Alex';
  const level  = user?.level  ?? 6;
  const xp     = user?.xp    ?? 1230;
  const xpGoal = 2000;
  const xpPct  = Math.min(xp / xpGoal, 1);

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => { await logout(); } },
    ]);
  }

  function handleMenuPress(item: typeof MENU_ITEMS[0]) {
    if (item.isDestructive) handleLogout();
    else if (item.route) navigation.navigate(item.route);
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#6C3AE0" />

      {/* ── PURPLE HERO HEADER ── */}
      <View style={styles.hero}>
        <SafeAreaView>
          <View style={styles.heroContent}>

            {/* Row: avatar + info + edit icon */}
            <View style={styles.heroRow}>
              {/* Avatar */}
              {user?.avatarUrl ? (
                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarWrap}>
                  <AvatarIcon size={64} bgColor="#EAE6FF" personColor="#6C3AE0" />
                </View>
              )}

              {/* Name + level */}
              <View style={styles.heroInfo}>
                <Text style={styles.heroName}>{name}</Text>
                <Text style={styles.heroLevel}>Level {level}</Text>
              </View>

              {/* Edit icon — top right */}
              <TouchableOpacity
                style={styles.editBtn}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Ionicons name="create-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* XP bar */}
            <View style={styles.xpRow}>
              <View style={styles.xpBarBg}>
                <View style={[styles.xpBarFill, { width: `${xpPct * 100}%` }]} />
              </View>
              <Text style={styles.xpLabel}>{xp.toLocaleString()} / {xpGoal.toLocaleString()} XP</Text>
            </View>

          </View>
        </SafeAreaView>
      </View>

      {/* ── MENU LIST ── */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map((item, idx) => {
          const isLast = idx === MENU_ITEMS.length - 1;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuRow, !isLast && styles.menuRowBorder]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item)}
            >
              <Text style={[styles.menuTitle, item.isDestructive && styles.menuTitleDestructive]}>
                {item.title}
              </Text>
              <View style={styles.menuRight}>
                {item.value && (
                  <Text style={styles.menuValue}>{item.value}</Text>
                )}
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={item.isDestructive ? '#EF4444' : '#C0BDCC'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  // ── Hero ──
  hero: { backgroundColor: '#6C3AE0' },
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 24,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 3, borderColor: '#FFFFFF',
    marginRight: 16,
    backgroundColor: '#EAE6FF',
  },
  avatarWrap: {
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 3, borderColor: '#FFFFFF',
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#EAE6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInfo:  { flex: 1 },
  heroName:  { fontFamily: 'Poppins-Bold',   fontSize: 24, color: '#FFFFFF', marginBottom: 2 },
  heroLevel: { fontFamily: 'Poppins-Medium', fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  editBtn:   { padding: 8 },

  // XP bar
  xpRow:     { gap: 8 },
  xpBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  xpLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'right',
  },

  // ── Menu ──
  listContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F0EFF5' },
  menuTitle:            { fontFamily: 'Poppins-Medium', fontSize: 15, color: '#1A1A2E' },
  menuTitleDestructive: { color: '#EF4444' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuValue: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
});
