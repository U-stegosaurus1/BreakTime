import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { activityApi } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

type PeriodType = 'day' | 'week' | 'month';

export default function StatsScreen() {
  const [period, setPeriod] = useState<PeriodType>('week');
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const { data: stats } = useQuery({
    queryKey: ['stats', period],
    queryFn: () => activityApi.getStats(period).then(r => r.data.data),
  });

  const tabs: { key: PeriodType; label: string }[] = [
    { key: 'day', label: 'Day' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
  ];

  const weekData = [20, 50, 30, 70, 40, 10, 60];
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxVal = Math.max(...weekData);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Stats & Progress</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Pill Switcher */}
      <View style={[styles.switcherWrap, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        {tabs.map((tab) => {
          const isActive = period === tab.key;
          return (
            <TouchableOpacity 
              key={tab.key}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setPeriod(tab.key)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive, !isActive && { color: colors.textSecondary }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Overview <Text style={[styles.sectionTitleMuted, { color: colors.textSecondary }]}>May 24 - May 30</Text></Text>
        
        {/* 2x2 Grid */}
        <View style={styles.grid}>
          {/* Steps */}
          <View style={[styles.gridBox, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.gridHeader}>
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : '#EBF4FF' }]}>
                <Icon name="shoe-sneaker" size={16} color="#3B82F6" />
              </View>
              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Steps</Text>
            </View>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>1,250<Text style={[styles.gridUnit, { color: colors.textSecondary }]}>/2,000</Text></Text>
          </View>
          
          {/* Active Time */}
          <View style={[styles.gridBox, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.gridHeader}>
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : '#FFF3E8' }]}>
                <Icon name="clock-outline" size={16} color="#F59E0B" />
              </View>
              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Active Time</Text>
            </View>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>6 <Text style={[styles.gridUnit, { color: colors.textSecondary }]}>/15 min</Text></Text>
          </View>
          
          {/* Breaks */}
          <View style={[styles.gridBox, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.gridHeader}>
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : '#E6F8F3' }]}>
                <Icon name="run-fast" size={16} color="#00D084" />
              </View>
              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Breaks</Text>
            </View>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>1<Text style={[styles.gridUnit, { color: colors.textSecondary }]}>/3</Text></Text>
          </View>

          {/* Calories */}
          <View style={[styles.gridBox, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.gridHeader}>
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : '#F3E8FF' }]}>
                <Icon name="fire" size={16} color="#F59E0B" />
              </View>
              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Calories</Text>
            </View>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>120 <Text style={[styles.gridUnit, { color: colors.textSecondary }]}>kcal</Text></Text>
          </View>
        </View>

        {/* Activity Chart */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Activity</Text>
        <View style={[styles.chartArea, { backgroundColor: colors.card, shadowColor: colors.text }]}>
          {weekDays.map((day, i) => {
            const val = weekData[i];
            const heightPct = Math.max((val / maxVal) * 100, 10);
            return (
              <View key={i} style={styles.barCol}>
                <View style={[styles.barTrack, { backgroundColor: isDarkMode ? colors.border : '#F5F5F9' }]}>
                  <View style={[styles.barFill, { height: `${heightPct}%` as any }]} />
                </View>
                <Text style={[styles.barLabel, { color: colors.textPrimary }]}>{day}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
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
    borderRadius: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 4,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  pill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
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
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#1A1A2E',
    marginBottom: 16,
  },
  sectionTitleMuted: {
    color: '#9890B8',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  gridBox: {
    width: (width - 48 - 16) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  gridLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#9890B8',
  },
  gridValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1A1A2E',
  },
  gridUnit: {
    fontSize: 12,
    color: '#9890B8',
  },
  chartArea: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  barCol: { 
    alignItems: 'center', 
    flex: 1,
  },
  barTrack: { 
    width: 16, 
    height: 100, 
    borderRadius: 8, 
    backgroundColor: '#F5F5F9',
    justifyContent: 'flex-end', 
    overflow: 'hidden' 
  },
  barFill: { 
    width: '100%', 
    borderRadius: 6,
    backgroundColor: '#635BFF',
  },
  barLabel: { 
    fontFamily: 'Poppins-Medium', 
    fontSize: 12, 
    color: '#1A1A2E',
    marginTop: 12 
  },
});
