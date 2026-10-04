import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, StatusBar, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BorderRadius, Shadow } from '../../theme';
import { useTheme } from '../../theme/useTheme';
import { activityApi } from '../../services/api';

type Props = { navigation: NativeStackNavigationProp<any> };

export default function ActivityHistoryScreen({ navigation }: Props) {
  const { colors, isDarkMode } = useTheme();

  const ACTIVITY_META: Record<string, { icon: string; title: string; color: string; bgColor: string }> = {
    steps: { icon: 'shoe-sneaker', title: 'Walking Steps', color: colors.primary, bgColor: isDarkMode ? '#2D2B3F' : '#EAE6FF' },
    stretch: { icon: 'yoga', title: 'Stretching Break', color: '#00C897', bgColor: isDarkMode ? '#0D2E25' : '#E6F8F3' },
    STRETCH: { icon: 'yoga', title: 'Stretching Break', color: '#00C897', bgColor: isDarkMode ? '#0D2E25' : '#E6F8F3' },
    water: { icon: 'water', title: 'Water Intake', color: '#3B82F6', bgColor: isDarkMode ? '#1E2D40' : '#EBF4FF' },
    WATER: { icon: 'water', title: 'Water Intake', color: '#3B82F6', bgColor: isDarkMode ? '#1E2D40' : '#EBF4FF' },
    breaks: { icon: 'run-fast', title: 'Active Break', color: '#00C897', bgColor: isDarkMode ? '#0D2E25' : '#E6F8F3' },
    STAIRS: { icon: 'stairs', title: 'Stair Climbing', color: '#F59E0B', bgColor: isDarkMode ? '#2E1E0D' : '#FFF3E8' },
    active_minutes: { icon: 'lightning-bolt', title: 'Active Time', color: '#EF4444', bgColor: isDarkMode ? '#2D1010' : '#FEE2E2' },
  };

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['activityHistory'],
    queryFn: () => activityApi.getHistory(14).then(r => r.data.data).catch(() => []),
  });

  const groupLogsByDate = (logsList: any[]) => {
    const groups: Record<string, any[]> = {};
    logsList.forEach(log => {
      const dateStr = (log.loggedAt || '').substring(0, 10);
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(log);
    });
    return Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(date => ({
      date,
      title: getFriendlyDateTitle(date),
      data: groups[date],
    }));
  };

  const getFriendlyDateTitle = (dateStr: string) => {
    const today = new Date().toISOString().substring(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().substring(0, 10);
    if (dateStr === today) return 'Today';
    if (dateStr === yesterday) return 'Yesterday';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // Use mock data if API returns empty
  const mockLogs = [
    { id: '1', activityType: 'STRETCH', value: 5, unit: 'min', loggedAt: new Date().toISOString(), pointsEarned: 25 },
    { id: '2', activityType: 'WATER', value: 500, unit: 'ml', loggedAt: new Date(Date.now() - 3600000).toISOString(), pointsEarned: 10 },
    { id: '3', activityType: 'STAIRS', value: 3, unit: 'flights', loggedAt: new Date(Date.now() - 86400000).toISOString(), pointsEarned: 20 },
    { id: '4', activityType: 'STRETCH', value: 5, unit: 'min', loggedAt: new Date(Date.now() - 86400000 - 3600000).toISOString(), pointsEarned: 25 },
  ];

  const grouped = groupLogsByDate(logs.length ? logs : mockLogs);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 100 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Activity History</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={grouped}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No activities logged yet</Text>
            <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
              Get moving and start logging your progress to earn points and badges!
            </Text>
            <TouchableOpacity
              style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.emptyBtnText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.sectionWrap}>
            <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>{item.title}</Text>
            <View style={[styles.cardWrap, { backgroundColor: colors.card, ...Shadow.sm }]}>
              {item.data.map((log: any, i: number) => {
                const meta = ACTIVITY_META[log.activityType] || ACTIVITY_META['breaks'];
                const time = log.loggedAt
                  ? new Date(log.loggedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                  : '';
                return (
                  <View
                    key={log.id}
                    style={[
                      styles.logRow,
                      i < item.data.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                    ]}
                  >
                    <View style={[styles.iconWrap, { backgroundColor: meta.bgColor }]}>
                      
                    </View>
                    <View style={styles.logInfo}>
                      <Text style={[styles.logTitle, { color: colors.textPrimary }]}>{meta.title}</Text>
                      <Text style={[styles.logSub, { color: colors.textSecondary }]}>
                        {log.value} {log.unit}{time ? ` · ${time}` : ''}
                      </Text>
                    </View>
                    <View style={[styles.pointsWrap, { backgroundColor: isDarkMode ? '#2D2B3F' : '#EAE6FF' }]}>
                      <Text style={[styles.pointsText, { color: colors.primary }]}>
                        +{log.pointsEarned || 0} pts
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
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
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18 },
  listContent: { padding: 20, paddingBottom: 100 },
  sectionWrap: { marginBottom: 24 },
  sectionHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    marginBottom: 10,
    paddingLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardWrap: { borderRadius: BorderRadius.lg, paddingHorizontal: 16 },
  logRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInfo: { flex: 1, marginLeft: 14 },
  logTitle: { fontFamily: 'Poppins-Bold', fontSize: 14 },
  logSub: { fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 2 },
  pointsWrap: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  pointsText: { fontFamily: 'Poppins-Bold', fontSize: 12 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingHorizontal: 24 },
  emptyTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 16, marginBottom: 8 },
  emptyDesc: { fontFamily: 'Poppins-Medium', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  emptyBtn: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14 },
  emptyBtnText: { color: '#ffffff', fontFamily: 'Poppins-Bold', fontSize: 14 },
});
