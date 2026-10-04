import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  StepsIcon,
  TimerIcon,
  BreaksIcon,
  CaloriesIcon,
} from '../../components/icons/ActivityIcons';

const { width } = Dimensions.get('window');

type TabType = 'day' | 'week' | 'month';

// ── Bar chart data per tab ─────────────────────────────────────────────────────
const CHART_DATA: Record<TabType, { label: string; value: number }[]> = {
  day: [
    { label: '6am', value: 0.2 }, { label: '9am', value: 0.5 },
    { label: '12pm', value: 0.9 }, { label: '3pm', value: 0.6 },
    { label: '6pm', value: 0.3 }, { label: '9pm', value: 0.1 },
  ],
  week: [
    { label: 'M', value: 0.4 }, { label: 'T', value: 0.5 },
    { label: 'W', value: 1.0 }, { label: 'T', value: 0.35 },
    { label: 'F', value: 0.6 }, { label: 'S', value: 0.3 },
    { label: 'S', value: 0.25 },
  ],
  month: [
    { label: 'W1', value: 0.6 }, { label: 'W2', value: 0.8 },
    { label: 'W3', value: 0.5 }, { label: 'W4', value: 0.9 },
  ],
};

const OVERVIEW: Record<TabType, {
  steps: string; stepsTarget: string;
  activeTime: string; activeTarget: string;
  breaks: string; breaksTarget: string;
  calories: string;
  dateRange: string;
}> = {
  day:   { steps: '1,250', stepsTarget: '/2,000', activeTime: '6', activeTarget: '/15 mins', breaks: '1', breaksTarget: '/3', calories: '120', dateRange: 'Today, May 30' },
  week:  { steps: '1,250', stepsTarget: '/2,000', activeTime: '6', activeTarget: '/15 mins', breaks: '1', breaksTarget: '/3', calories: '120', dateRange: 'May 24 – May 30, 2025' },
  month: { steps: '22,400', stepsTarget: '/60,000', activeTime: '42', activeTarget: '/300 mins', breaks: '18', breaksTarget: '/90', calories: '980', dateRange: 'May 2025' },
};

const BAR_HEIGHT = 140;

export default function StatsScreen() {
  const [tab, setTab] = useState<TabType>('week');
  const overview = OVERVIEW[tab];
  const bars     = CHART_DATA[tab];

  const TABS: { key: TabType; label: string }[] = [
    { key: 'day',   label: 'Day'   },
    { key: 'week',  label: 'Week'  },
    { key: 'month', label: 'Month' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── TAB BAR ── */}
        <View style={styles.tabRow}>
          {TABS.map(t => {
            const active = tab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tabPill, active && styles.tabPillActive]}
                activeOpacity={0.8}
                onPress={() => setTab(t.key)}
              >
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── OVERVIEW HEADER ── */}
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.dateRange}>{overview.dateRange}</Text>
        </View>

        {/* ── 2×2 STATS GRID ── */}
        <View style={styles.grid}>
          {/* Steps */}
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIconBg, { backgroundColor: '#EAE6FF' }]}>
                <StepsIcon size={20} />
              </View>
              <Text style={styles.cardLabel}>Steps</Text>
            </View>
            <View style={styles.cardValueRow}>
              <Text style={styles.cardValue}>{overview.steps}</Text>
              <Text style={styles.cardTarget}>{overview.stepsTarget}</Text>
            </View>
          </TouchableOpacity>

          {/* Active Time */}
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIconBg, { backgroundColor: '#F5F3FF' }]}>
                <TimerIcon size={20} />
              </View>
              <Text style={styles.cardLabel}>Active Time</Text>
            </View>
            <View style={styles.cardValueRow}>
              <Text style={styles.cardValue}>{overview.activeTime}</Text>
              <Text style={styles.cardTarget}>{overview.activeTarget}</Text>
            </View>
          </TouchableOpacity>

          {/* Breaks */}
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIconBg, { backgroundColor: '#E6F8F3' }]}>
                <BreaksIcon size={20} />
              </View>
              <Text style={styles.cardLabel}>Breaks</Text>
            </View>
            <View style={styles.cardValueRow}>
              <Text style={styles.cardValue}>{overview.breaks}</Text>
              <Text style={styles.cardTarget}>{overview.breaksTarget}</Text>
            </View>
          </TouchableOpacity>

          {/* Calories */}
          <TouchableOpacity style={styles.gridCard} activeOpacity={0.8}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIconBg, { backgroundColor: '#FFF6E5' }]}>
                <CaloriesIcon size={20} />
              </View>
              <Text style={styles.cardLabel}>Calories</Text>
            </View>
            <View style={styles.cardValueRow}>
              <Text style={styles.cardValue}>{overview.calories}</Text>
              <Text style={styles.cardTarget}> kcal</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── BAR CHART ── */}
        <Text style={styles.activityTitle}>Activity</Text>
        <View style={styles.chartWrap}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            {['100%', '75%', '25%', '0%'].map(l => (
              <Text key={l} style={styles.yLabel}>{l}</Text>
            ))}
          </View>

          {/* Bars */}
          <View style={styles.barsArea}>
            {/* Horizontal guide lines */}
            <View style={[styles.guideLine, { bottom: BAR_HEIGHT * 1.0 }]} />
            <View style={[styles.guideLine, { bottom: BAR_HEIGHT * 0.75 }]} />
            <View style={[styles.guideLine, { bottom: BAR_HEIGHT * 0.25 }]} />
            <View style={[styles.guideLine, { bottom: 0 }]} />

            {/* Bar columns */}
            <View style={styles.barColumns}>
              {bars.map((bar, idx) => (
                <View key={idx} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: `${bar.value * 100}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{bar.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  content:  { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120 },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabPill: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabPillActive: {
    backgroundColor: '#6C3AE0',
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  tabLabel:       { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8' },
  tabLabelActive: { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#FFFFFF' },

  // Overview header
  overviewHeader: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 16 },
  overviewTitle:  { fontFamily: 'Poppins-Bold',   fontSize: 18, color: '#1A1A2E' },
  dateRange:      { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9890B8' },

  // 2×2 grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  gridCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0EFF5',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconRow:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardIconBg:   { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cardLabel:    { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  cardValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  cardValue:    { fontFamily: 'Poppins-Bold',   fontSize: 26, color: '#1A1A2E' },
  cardTarget:   { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#9890B8' },

  // Activity bar chart
  activityTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#1A1A2E', marginBottom: 16 },
  chartWrap:     { flexDirection: 'row', height: BAR_HEIGHT + 28 },

  yAxis: {
    width: 36,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingBottom: 24,
  },
  yLabel: { fontFamily: 'Poppins-Regular', fontSize: 10, color: '#9890B8' },

  barsArea: {
    flex: 1,
    position: 'relative',
    paddingBottom: 24,
  },
  guideLine: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    backgroundColor: '#F0EFF5',
  },
  barColumns: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: BAR_HEIGHT,
    justifyContent: 'space-between',
  },
  barCol:   { alignItems: 'center', flex: 1 },
  barTrack: {
    width: 10,
    height: BAR_HEIGHT,
    backgroundColor: '#EAE6FF',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill:  { width: '100%', backgroundColor: '#6C3AE0', borderRadius: 6 },
  barLabel: { fontFamily: 'Poppins-Regular', fontSize: 10, color: '#9890B8' },
});
