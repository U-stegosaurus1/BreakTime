import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BorderRadius, Shadow } from '../../theme';
import { useTheme } from '../../theme/useTheme';

type Props = { navigation: NativeStackNavigationProp<any> };

export default function AboutScreen({ navigation }: Props) {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.card} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About BreakTime ℹ️</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* App Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primaryLight }]}>
            <Text style={styles.logoText}>⏰</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>BreakTime</Text>
          <Text style={[styles.appTagline, { color: colors.textSecondary }]}>A Persuasive Mobile Game to Reduce Sedentary Behavior Among University Students</Text>
          <Text style={[styles.version, { color: colors.textTertiary }]}>Version 1.0.0 (Production)</Text>
        </View>

        {/* Academic Purpose */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Project Abstract</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.bodyText, { color: colors.text }]}>
              University students spend a significant amount of time sitting during lectures, study sessions, and exams. Prolonged sedentary behavior poses long-term cardiovascular and metabolic health risks. 
            </Text>
            <Text style={[styles.bodyText, { marginTop: 10, color: colors.text }]}>
              <Text style={{ fontWeight: '700', color: colors.primary }}>BreakTime</Text> is an innovative mobile health application designed as a persuasive game. By integrating haptic reminder schedules, habit-triggering gamification, customizable activity goals, point economies, and university-wide leaderboard challenges, BreakTime turns stretch breaks into a fun, cooperative campus game!
            </Text>
          </View>
        </View>

        {/* Core Pillars */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Core Persuasive Pillars</Text>
          <View style={styles.pillarsContainer}>
            <PillarCard icon="🧘" title="Habit Building" desc="Custom alerts prompt you to stand up and log breaks like stretches or hydration cycles." colors={colors} />
            <PillarCard icon="🪙" title="Reward Economy" desc="Earn points on activity completion and spend them on exciting rewards in the store." colors={colors} />
            <PillarCard icon="🏆" title="Campus Competition" desc="Compete globally, among friends, or against your university colleagues in real-time." colors={colors} />
            <PillarCard icon="🔥" title="Streak Strengths" desc="Maintain daily logins and exercise break compliance to lock in active multipliers." colors={colors} />
          </View>
        </View>

        {/* Tech Stack */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Technology Stack</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TechRow label="Frontend Framework" value="React Native + TypeScript" colors={colors} />
            <View style={[styles.techDivider, { backgroundColor: colors.border }]} />
            <TechRow label="State & Queries" value="Zustand + React Query" colors={colors} />
            <View style={[styles.techDivider, { backgroundColor: colors.border }]} />
            <TechRow label="Backend API" value="Node.js + Express (TypeScript)" colors={colors} />
            <View style={[styles.techDivider, { backgroundColor: colors.border }]} />
            <TechRow label="Database Layer" value="PostgreSQL + Prisma ORM" colors={colors} />
            <View style={[styles.techDivider, { backgroundColor: colors.border }]} />
            <TechRow label="Notification Alerts" value="Firebase Cloud Messaging" colors={colors} />
          </View>
        </View>

        {/* Credentials */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Project Team</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.bodyText, { color: colors.text }]}>
              Developed and submitted as a final-year Capstone Project in Computer Science and Software Engineering.
            </Text>
            <Text style={[styles.bodyText, { marginTop: 8, fontStyle: 'italic', color: colors.textSecondary }]}>
              © 2026 BreakTime Research Group. All rights reserved.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

function PillarCard({ icon, title, desc, colors }: { icon: string; title: string; desc: string; colors: any }) {
  return (
    <View style={[styles.pillarCard, { backgroundColor: colors.card }]}>
      <Text style={styles.pillarIcon}>{icon}</Text>
      <Text style={[styles.pillarTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>{desc}</Text>
    </View>
  );
}

function TechRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={styles.techRow}>
      <Text style={[styles.techLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.techValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 18, fontWeight: '700' },
  headerTitle: { fontFamily: 'Nunito-Black', fontSize: 18 },
  content: { padding: 16, gap: 20 },
  infoCard: {
    borderRadius: BorderRadius.lg,
    padding: 24,
    alignItems: 'center',
    ...Shadow.sm,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: { fontSize: 36 },
  appName: { fontFamily: 'Nunito-Black', fontSize: 22 },
  appTagline: { fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 18 },
  version: { fontSize: 11, marginTop: 12, fontWeight: '600' },
  section: { gap: 8 },
  sectionTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5, paddingLeft: 4 },
  card: { borderRadius: BorderRadius.lg, padding: 16, ...Shadow.sm },
  bodyText: { fontSize: 13, lineHeight: 20 },
  pillarsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pillarCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: BorderRadius.lg,
    padding: 14,
    ...Shadow.sm,
    gap: 6,
  },
  pillarIcon: { fontSize: 24 },
  pillarTitle: { fontFamily: 'Nunito-Bold', fontSize: 14 },
  pillarDesc: { fontSize: 10, lineHeight: 14 },
  techRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  techLabel: { fontSize: 12, fontWeight: '500' },
  techValue: { fontSize: 12, fontWeight: '700' },
  techDivider: { height: 1 },
});
