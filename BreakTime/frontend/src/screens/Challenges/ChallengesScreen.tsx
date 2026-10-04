import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  WalkIcon,
  FootstepsIcon,
  StretchIcon,
  StairsIcon,
  WaterIcon,
} from '../../components/icons/ActivityIcons';

type TabType = 'daily' | 'weekly' | 'monthly';

type Challenge = {
  id: string;
  title: string;
  progress: number;
  target: number;
  points: number;
  iconComp: React.ComponentType<{ size?: number }>;
  iconBg: string;
  isCompleted: boolean;
};

// ── Challenge data matching design 06 ─────────────────────────────────────────
const CHALLENGES: Record<TabType, Challenge[]> = {
  daily: [
    { id: '1', title: 'Complete 3 Activity Breaks', progress: 0,    target: 3,    points: 30, iconComp: WalkIcon,      iconBg: '#F0EDFF', isCompleted: false },
    { id: '2', title: 'Walk 2,000 Steps',           progress: 1250, target: 2000, points: 20, iconComp: FootstepsIcon, iconBg: '#E6F8F3', isCompleted: false },
    { id: '3', title: 'Stretch for 5 Minutes',      progress: 5,    target: 5,    points: 15, iconComp: StretchIcon,   iconBg: '#FFF6E5', isCompleted: true  },
    { id: '4', title: 'Climb 10 Flights',            progress: 0,    target: 10,   points: 20, iconComp: StairsIcon,    iconBg: '#F5F3FF', isCompleted: false },
  ],
  weekly: [
    { id: '5', title: 'Walk 15,000 Steps',        progress: 4200, target: 15000, points: 50,  iconComp: FootstepsIcon, iconBg: '#E6F8F3', isCompleted: false },
    { id: '6', title: 'Complete 15 Breaks',       progress: 6,    target: 15,    points: 60,  iconComp: WalkIcon,      iconBg: '#F0EDFF', isCompleted: false },
    { id: '7', title: 'Drink 14 Glasses of Water',progress: 5,    target: 14,    points: 40,  iconComp: WaterIcon,     iconBg: '#EBF4FF', isCompleted: false },
  ],
  monthly: [
    { id: '8', title: 'Walk 50,000 Steps',   progress: 21000, target: 50000, points: 200, iconComp: FootstepsIcon, iconBg: '#E6F8F3', isCompleted: false },
    { id: '9', title: 'Complete 60 Breaks',  progress: 28,    target: 60,    points: 150, iconComp: WalkIcon,      iconBg: '#F0EDFF', isCompleted: false },
  ],
};

// ── Progress sub-label ────────────────────────────────────────────────────────
function ProgressLabel({ item }: { item: Challenge }) {
  if (item.isCompleted) return <Text style={styles.completedText}>Completed</Text>;
  const hasProgress = item.progress > 0;
  return (
    <Text style={hasProgress ? styles.progressActive : styles.progressGrey}>
      {item.progress.toLocaleString()}/{item.target.toLocaleString()}
    </Text>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────
export default function ChallengesScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const TABS: { key: TabType; label: string }[] = [
    { key: 'daily',   label: 'Daily'   },
    { key: 'weekly',  label: 'Weekly'  },
    { key: 'monthly', label: 'Monthly' },
  ];

  const challenges = CHALLENGES[activeTab];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.root}>

        {/* ── TAB BAR ── */}
        <View style={styles.tabRow}>
          {TABS.map(tab => {
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabPill, active && styles.tabPillActive]}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── CHALLENGE LIST ── */}
        <FlatList
          data={challenges}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const IconComp = item.iconComp;
            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.75}
                onPress={() =>
                  Alert.alert(
                    item.title,
                    item.isCompleted
                      ? '✅ You completed this challenge!'
                      : `Progress: ${item.progress}/${item.target}\nReward: +${item.points} pts`,
                  )
                }
              >
                {/* SVG Icon */}
                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                  <IconComp size={26} />
                </View>

                {/* Text */}
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <ProgressLabel item={item} />
                </View>

                {/* Points */}
                <Text style={styles.pts}>+{item.points} pts</Text>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.viewAllBtn}
              activeOpacity={0.85}
              onPress={() => Alert.alert('Challenges', 'Full challenge list coming soon!')}
            >
              <Text style={styles.viewAllBtnText}>View All Challenges</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  root:     { flex: 1, paddingTop: 16 },

  // Tab bar
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 4,
  },
  tabPill:       { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabPillActive: { backgroundColor: '#6C3AE0', shadowColor: '#6C3AE0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  tabLabel:       { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8' },
  tabLabelActive: { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#FFFFFF' },

  // List
  list:      { paddingHorizontal: 20, paddingBottom: 110 },
  separator: { height: 12 },

  // Challenge card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0EFF5',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  // Icon box
  iconBox: {
    width: 48, height: 48,
    borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },

  // Text
  cardBody:       { flex: 1 },
  cardTitle:      { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#1A1A2E', marginBottom: 3 },
  progressGrey:   { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  progressActive: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#00C897' },
  completedText:  { fontFamily: 'Poppins-Bold',   fontSize: 13, color: '#00C897' },

  // Points
  pts: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#F59E0B', marginLeft: 8 },

  // View All button
  viewAllBtn: {
    backgroundColor: '#6C3AE0',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  viewAllBtnText: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },
});
