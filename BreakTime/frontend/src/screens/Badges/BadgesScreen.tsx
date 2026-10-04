import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  StarterBadge,
  StreakBadge,
  EarlyBirdBadge,
  Streak14Badge,
  Streak30Badge,
  MarathonBadge,
} from '../../components/icons/BadgeIcons';

const { width } = Dimensions.get('window');
const BADGE_SIZE = (width - 80) / 3;

// ── Badge data matching design 08 ─────────────────────────────────────────────
const EARNED_BADGES = [
  { id: '1', title: 'Starter',      status: 'Earned', component: StarterBadge },
  { id: '2', title: '7 Day Streak', status: 'Earned', component: StreakBadge  },
  { id: '3', title: 'Early Bird',   status: 'Earned', component: EarlyBirdBadge },
];

const LOCKED_BADGES = [
  { id: '4', title: '14 Day Streak', status: 'Keep Going',  component: Streak14Badge },
  { id: '5', title: '30 Day Streak', status: 'Keep Going',  component: Streak30Badge },
  { id: '6', title: 'Marathon',      status: 'Walk 100 km', component: MarathonBadge },
];

export default function BadgesScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── MY BADGES ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Badges</Text>
          <TouchableOpacity onPress={() => Alert.alert('Badges', 'All badges coming soon!')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeRow}>
          {EARNED_BADGES.map(badge => {
            const BadgeComp = badge.component;
            return (
              <TouchableOpacity
                key={badge.id}
                style={bs.wrap}
                activeOpacity={0.8}
                onPress={() => Alert.alert(`🏅 ${badge.title}`, `Status: ${badge.status}`)}
              >
                <View style={bs.iconContainer}>
                  <BadgeComp size={BADGE_SIZE - 12} earned={true} />
                </View>
                <Text style={bs.title}>{badge.title}</Text>
                <Text style={bs.status}>{badge.status}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── LOCKED BADGES ── */}
        <View style={[styles.sectionHeader, { marginTop: 36 }]}>
          <Text style={styles.sectionTitle}>Locked Badges</Text>
        </View>

        <View style={styles.badgeRow}>
          {LOCKED_BADGES.map(badge => {
            const BadgeComp = badge.component;
            return (
              <TouchableOpacity
                key={badge.id}
                style={bs.wrap}
                activeOpacity={0.8}
                onPress={() => Alert.alert(`🔒 ${badge.title}`, `How to earn: ${badge.status}`)}
              >
                <View style={bs.iconContainer}>
                  <BadgeComp size={BADGE_SIZE - 12} earned={false} />
                </View>
                <Text style={bs.title}>{badge.title}</Text>
                <Text style={bs.status}>{badge.status}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const bs = StyleSheet.create({
  wrap: { alignItems: 'center', width: BADGE_SIZE },
  iconContainer: {
    width: BADGE_SIZE - 12,
    height: BADGE_SIZE - 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title:  { fontFamily: 'Poppins-Bold',    fontSize: 13, color: '#1A1A2E', textAlign: 'center', marginBottom: 2 },
  status: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#9890B8', textAlign: 'center' },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  content:  { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E' },
  viewAllText:  { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#6C3AE0' },

  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
