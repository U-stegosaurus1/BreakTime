import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { challengeApi } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');
type TabType = 'daily' | 'weekly' | 'monthly';

export default function ChallengesScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('daily');

  const { data: challenges } = useQuery({
    queryKey: ['challenges', activeTab],
    queryFn: () => challengeApi.get(activeTab).then(r => r.data.data).catch(() => []),
  });

  const tabs: { key: TabType; label: string }[] = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  // Mock data matching mockup screen 08 exactly
  const mockChallenges = [
    { id: '1', title: 'Complete 3 Activity Breaks', progress: 0, target: 3, points: 30, icon: 'yoga', color: '#635BFF', bg: '#F3E8FF' },
    { id: '2', title: 'Walk 2,000 Steps', progress: 1250, target: 3000, points: 20, icon: 'shoe-sneaker', color: '#00D084', bg: '#E6F8F3' },
    { id: '3', title: 'Stretch for 5 Minutes', progress: 5, target: 5, points: 15, icon: 'run-fast', color: '#00D084', bg: '#E6F8F3', isCompleted: true },
    { id: '4', title: 'Climb 10 Flights', progress: 0, target: 10, points: 25, icon: 'stairs-up', color: '#8B5CF6', bg: '#F3E8FF' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />

      {/* Header — matches mockup: back arrow + centered title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Challenges</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Pill Switcher — mockup: white bg, purple active pill */}
      <View style={[styles.switcherWrap, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity 
              key={tab.key}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive, !isActive && { color: colors.textSecondary }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Challenge List — each card has icon, title, progress bar, points */}
      <FlatList
        data={mockChallenges}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const pct = Math.min((item.progress / item.target) * 100, 100);
          return (
            <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : item.bg }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.cardTopRow}>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                  <Text style={styles.pointsText}>+{item.points} pts</Text>
                </View>
                {/* Progress bar + fraction — matches mockup */}
                <View style={styles.progressRow}>
                  <View style={[styles.progressBarBg, { backgroundColor: isDarkMode ? colors.border : '#F5F5F9' }]}>
                    <View style={[styles.progressBarFill, { width: `${pct}%` as any, backgroundColor: item.isCompleted ? '#00D084' : '#635BFF' }]} />
                  </View>
                </View>
                {item.isCompleted ? (
                  <Text style={styles.completedText}>Completed</Text>
                ) : (
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>{item.progress.toLocaleString()}/{item.target.toLocaleString()}</Text>
                )}
              </View>
            </View>
          );
        }}
      />

      {/* Footer Button — matches mockup */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>View All Challenges</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  iconBtn: { padding: 4 },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1A1A2E',
  },
  switcherWrap: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 4,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  pill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  pillActive: {
    backgroundColor: '#635BFF',
  },
  pillText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#9890B8',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  listContent: {
    paddingHorizontal: 24,
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#1A1A2E',
    flex: 1,
    marginRight: 8,
  },
  pointsText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#F59E0B',
  },
  progressRow: {
    marginBottom: 6,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F5F5F9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#9890B8',
  },
  completedText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
    color: '#00D084',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  viewAllBtn: {
    backgroundColor: '#635BFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
