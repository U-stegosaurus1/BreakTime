import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useActivityStore } from '../../store/activityStore';
import {
  WalkIcon,
  StretchIcon,
  StatsIcon,
  WaterIcon,
  FireIcon,
  CoinIcon,
} from '../../components/icons/ActivityIcons';

const { width } = Dimensions.get('window');

// ─── Quick Actions data ────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: WalkIcon,    label: 'Walk',    type: 'steps',   bgColor: '#E6F8F3' },
  { icon: StretchIcon, label: 'Stretch', type: 'stretch', bgColor: '#F5F3FF' },
  { icon: StatsIcon,   label: 'Stats',   route: 'Stats',  bgColor: '#EAE6FF' },
  { icon: WaterIcon,   label: 'Water',   type: 'water',   bgColor: '#EBF4FF' },
];

// ─── Greeting helper ──────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// ─── Animated circular progress (CSS border-trick) ───────────────────────────
function CircularProgress({ pct }: { pct: number }) {
  return (
    <View style={ring.container}>
      <View style={ring.track} />
      <View style={[ring.fill, {
        borderTopColor:    '#6C3AE0',
        borderRightColor:  pct > 25 ? '#6C3AE0' : '#EAE6FF',
        borderBottomColor: pct > 50 ? '#6C3AE0' : '#EAE6FF',
        borderLeftColor:   pct > 75 ? '#6C3AE0' : '#EAE6FF',
      }]} />
      <View style={ring.inner}>
        <Text style={ring.pctText}>{pct}%</Text>
        <Text style={ring.pctLabel}>Daily Goal</Text>
      </View>
    </View>
  );
}

const ring = StyleSheet.create({
  container: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
  track:     { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 10, borderColor: '#EAE6FF' },
  fill:      { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 10, transform: [{ rotate: '-45deg' }] },
  inner:     { alignItems: 'center' },
  pctText:   { fontFamily: 'Poppins-Bold',    fontSize: 20, color: '#1A1A2E' },
  pctLabel:  { fontFamily: 'Poppins-Regular', fontSize: 9,  color: '#9890B8', marginTop: -2 },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();
  const { goals, todayStats, fetchDashboardData } = useActivityStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const firstName = user?.fullName?.split(' ')[0] || 'Alex';

  const breaksGoal  = goals.find(g => g.type === 'breaks')?.targetValue         || 3;
  const stepsGoal   = goals.find(g => g.type === 'steps')?.targetValue          || 3000;
  const activeGoal  = goals.find(g => g.type === 'active_minutes')?.targetValue || 15;

  const breaks  = todayStats.breaksTaken   || 0;
  const steps   = todayStats.stepsWalked   || 1250;
  const active  = todayStats.activeMinutes || 6;
  const streak  = user?.currentStreak      || 7;
  const points  = user?.totalPoints        || 850;

  const progressPct = useMemo(() => {
    const bp = Math.min(breaks / breaksGoal, 1);
    const sp = Math.min(steps  / stepsGoal,  1);
    const ap = Math.min(active / activeGoal,  1);
    return Math.round(((bp + sp + ap) / 3) * 100) || 40;
  }, [breaks, steps, active, breaksGoal, stepsGoal, activeGoal]);

  const nextActivities = [
    { title: 'Stretch Break', duration: '5 min', icon: 'yoga'         as const, type: 'stretch', iconColor: '#6C3AE0' },
    { title: 'Active Walk',   duration: '3 min', icon: 'shoe-sneaker' as const, type: 'steps',   iconColor: '#00C897' },
    { title: 'Water Break',   duration: '1 min', icon: 'water'        as const, type: 'water',   iconColor: '#3B82F6' },
  ];
  const nextUp = nextActivities[breaks % nextActivities.length];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── GREETING ROW ── */}
        <View style={styles.greetingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{getGreeting()}, {firstName}! 👋</Text>
            <Text style={styles.subGreeting}>Ready to make today amazing?</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications" size={22} color="#FFFFFF" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ── TODAY'S PROGRESS CARD ── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Progress</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressRow}>
            <CircularProgress pct={progressPct} />

            <View style={styles.metricsCol}>
              {/* Breaks */}
              <View style={styles.metricRow}>
                <View style={[styles.metricIcon, { backgroundColor: '#E6F8F3' }]}>
                  <MaterialCommunityIcons name="run-fast" size={14} color="#00C897" />
                </View>
                <Text style={styles.metricLabel}>Breaks</Text>
                <Text style={styles.metricVal}>{breaks}/{breaksGoal}</Text>
              </View>

              {/* Steps */}
              <View style={styles.metricRow}>
                <View style={[styles.metricIcon, { backgroundColor: '#FFF6E5' }]}>
                  <MaterialCommunityIcons name="shoe-sneaker" size={14} color="#F59E0B" />
                </View>
                <Text style={styles.metricLabel}>Steps</Text>
                <Text style={styles.metricVal}>{steps.toLocaleString()}/{stepsGoal.toLocaleString()}</Text>
              </View>

              {/* Active Time */}
              <View style={styles.metricRow}>
                <View style={[styles.metricIcon, { backgroundColor: '#EAE6FF' }]}>
                  <Ionicons name="time-outline" size={14} color="#6C3AE0" />
                </View>
                <Text style={styles.metricLabel}>Active Time</Text>
                <Text style={styles.metricVal}>{active}/{activeGoal} mins</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── STREAK + POINTS ── */}
        <View style={styles.twoCol}>
          {/* Streak */}
          <TouchableOpacity style={styles.halfCard} activeOpacity={0.85} onPress={() => navigation.navigate('Stats')}>
            <Text style={styles.halfLabel}>Current Streak</Text>
            <View style={styles.halfValueRow}>
              <FireIcon size={26} />
              <Text style={[styles.halfValue, { marginLeft: 8 }]}>{streak}</Text>
              <Text style={styles.halfSub}> days</Text>
            </View>
          </TouchableOpacity>

          {/* Points */}
          <TouchableOpacity style={styles.halfCard} activeOpacity={0.85} onPress={() => navigation.navigate('Leaderboard')}>
            <Text style={styles.halfLabel}>Points</Text>
            <View style={styles.halfValueRow}>
              <Text style={styles.halfValue}>{points}</Text>
              <View style={{ marginLeft: 8 }}>
                <CoinIcon size={26} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── NEXT UP ── */}
        <Text style={styles.sectionTitle}>Next Up</Text>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.nextIcon}>
              <MaterialCommunityIcons name={nextUp.icon} size={26} color={nextUp.iconColor} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nextTitle}>{nextUp.title}</Text>
              <Text style={styles.nextSub}>{nextUp.duration}</Text>
            </View>

            <TouchableOpacity
              style={styles.startBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ActivityBreak', { type: nextUp.type })}
            >
              <Text style={styles.startBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickRow}>
          {QUICK_ACTIONS.map(action => {
            const IconComp = action.icon;
            return (
              <TouchableOpacity
                key={action.label}
                style={styles.quickItem}
                activeOpacity={0.75}
                onPress={() => {
                  if (action.route) navigation.navigate(action.route);
                  else navigation.navigate('ActivityBreak', { type: action.type });
                }}
              >
                <View style={[styles.quickIconBox, { backgroundColor: action.bgColor }]}>
                  <IconComp size={32} />
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  content:  { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 120 },

  // Greeting
  greetingRow:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  greeting:     { fontFamily: 'Poppins-Bold',    fontSize: 22, color: '#1A1A2E', lineHeight: 30, marginBottom: 2 },
  subGreeting:  { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#9890B8' },
  profileBtn:   {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#6C3AE0',
    alignItems: 'center', justifyContent: 'center',
    marginLeft: 12, marginTop: 2,
  },
  notifDot: {
    position: 'absolute', top: 2, right: 0,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#FFFFFF',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0EFF5',
    marginBottom: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardTitle:   { fontFamily: 'Poppins-Bold',   fontSize: 16, color: '#1A1A2E' },
  viewAllText: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#6C3AE0' },

  // Progress
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  metricsCol:  { flex: 1, gap: 12 },
  metricRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metricIcon:  { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  metricLabel: { flex: 1, fontFamily: 'Poppins-Bold',   fontSize: 13, color: '#1A1A2E' },
  metricVal:   {          fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8' },

  // Streak / Points
  twoCol:       { flexDirection: 'row', gap: 12, marginBottom: 16 },
  halfCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0EFF5',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  halfLabel:    { fontFamily: 'Poppins-Bold',   fontSize: 13, color: '#1A1A2E', marginBottom: 8 },
  halfValueRow: { flexDirection: 'row', alignItems: 'center' },
  halfValue:    { fontFamily: 'Poppins-Bold',   fontSize: 26, color: '#1A1A2E' },
  halfSub:      { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8', alignSelf: 'flex-end', marginBottom: 3 },

  // Section title
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#1A1A2E', marginBottom: 12 },

  // Next Up
  nextIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: '#F5F3FF',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  nextTitle:    { fontFamily: 'Poppins-Bold',    fontSize: 15, color: '#1A1A2E', marginBottom: 2 },
  nextSub:      { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#9890B8' },
  startBtn:     { backgroundColor: '#6C3AE0', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 12 },
  startBtnText: { fontFamily: 'Poppins-Bold',    fontSize: 14, color: '#FFFFFF' },

  // Quick Actions
  quickRow:     { flexDirection: 'row', justifyContent: 'space-between' },
  quickItem:    { alignItems: 'center', width: (width - 60) / 4 },
  quickIconBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLabel:   { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#1A1A2E' },
});
