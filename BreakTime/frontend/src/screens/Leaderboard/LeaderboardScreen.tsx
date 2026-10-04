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
  Dimensions,
} from 'react-native';
import { AvatarIcon } from '../../components/icons/ActivityIcons';

const { width } = Dimensions.get('window');

type TabType = 'global' | 'friends' | 'university';

// ── Leaderboard data matching design 07 ───────────────────────────────────────
const DATA: Record<TabType, {
  id: string; rank: number; name: string;
  points: number; isMe: boolean; bgColor: string; personColor: string;
}[]> = {
  global: [
    { id: '1', rank: 1, name: 'Alex',    points: 1870, isMe: true,  bgColor: '#EAE6FF', personColor: '#6C3AE0' },
    { id: '2', rank: 2, name: 'Sarah J.', points: 2450, isMe: false, bgColor: '#FFE5EC', personColor: '#E91E63' },
    { id: '3', rank: 3, name: 'Mike T.',  points: 1560, isMe: false, bgColor: '#E3F2FD', personColor: '#1976D2' },
    { id: '4', rank: 4, name: 'Emma L.',  points: 1450, isMe: false, bgColor: '#E8F5E9', personColor: '#388E3C' },
    { id: '5', rank: 5, name: 'David K.', points: 1250, isMe: false, bgColor: '#FFF3E0', personColor: '#F57C00' },
    { id: '6', rank: 6, name: 'James P.', points: 1100, isMe: false, bgColor: '#F3E5F5', personColor: '#7B1FA2' },
  ],
  friends: [
    { id: '1', rank: 1, name: 'Alex',    points: 1870, isMe: true,  bgColor: '#EAE6FF', personColor: '#6C3AE0' },
    { id: '2', rank: 2, name: 'Sarah J.', points: 1200, isMe: false, bgColor: '#FFE5EC', personColor: '#E91E63' },
    { id: '3', rank: 3, name: 'Mike T.',  points: 890,  isMe: false, bgColor: '#E3F2FD', personColor: '#1976D2' },
  ],
  university: [
    { id: '1', rank: 1, name: 'Emma L.',  points: 3100, isMe: false, bgColor: '#E8F5E9', personColor: '#388E3C' },
    { id: '2', rank: 2, name: 'Alex',    points: 1870, isMe: true,  bgColor: '#EAE6FF', personColor: '#6C3AE0' },
    { id: '3', rank: 3, name: 'James P.', points: 1560, isMe: false, bgColor: '#F3E5F5', personColor: '#7B1FA2' },
  ],
};

// ── Podium medal colours ───────────────────────────────────────────────────────
const MEDAL: Record<number, string> = {
  1: '#F59E0B',  // gold
  2: '#C0C0C8',  // silver
  3: '#D97706',  // bronze
};

// ── Screen ─────────────────────────────────────────────────────────────────────
export default function LeaderboardScreen() {
  const [tab, setTab] = useState<TabType>('global');

  const all     = DATA[tab];
  // Podium: 3 top users, reordered: 2nd | 1st | 3rd
  const top3    = all.slice(0, 3);
  const podium  = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
  const restList = all.slice(3);

  const TABS: { key: TabType; label: string }[] = [
    { key: 'global',     label: 'Global'     },
    { key: 'friends',    label: 'Friends'    },
    { key: 'university', label: 'University' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.root}>

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

        <FlatList
          data={restList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.podiumRow}>
              {podium.map((user, idx) => {
                if (!user) return <View key={idx} style={styles.podiumCol} />;
                const isFirst    = user.rank === 1;
                const avatarSize = isFirst ? 76 : 60;
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={[styles.podiumCol, isFirst && styles.podiumColFirst]}
                    activeOpacity={0.8}
                    onPress={() => Alert.alert(user.name, `Rank #${user.rank}\n${user.points.toLocaleString()} pts`)}
                  >
                    {/* Avatar with rank badge */}
                    <View style={styles.avatarWrap}>
                      <View style={[
                        styles.avatarContainer,
                        { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
                        isFirst && styles.avatarFirst,
                      ]}>
                        <AvatarIcon size={avatarSize} bgColor={user.bgColor} personColor={user.personColor} />
                      </View>
                      {/* Rank badge circle */}
                      <View style={[styles.rankBadge, { backgroundColor: MEDAL[user.rank] }]}>
                        <Text style={styles.rankBadgeText}>{user.rank}</Text>
                      </View>
                    </View>

                    <Text style={[styles.podiumName, isFirst && styles.podiumNameFirst]}>
                      {user.name}
                    </Text>
                    <Text style={[styles.podiumPts, isFirst && styles.podiumPtsFirst]}>
                      {user.points.toLocaleString()} pts
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.rowCard, item.isMe && styles.rowCardMe]}
              activeOpacity={0.75}
              onPress={() => Alert.alert(item.name, `Rank #${item.rank}\n${item.points.toLocaleString()} pts`)}
            >
              <Text style={styles.rowRank}>{item.rank}</Text>
              <View style={styles.rowAvatar}>
                <AvatarIcon size={38} bgColor={item.bgColor} personColor={item.personColor} />
              </View>
              <Text style={[styles.rowName, item.isMe && styles.rowNameMe]}>{item.name}</Text>
              <Text style={styles.rowPts}>{item.points.toLocaleString()} pts</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  root:     { flex: 1, paddingTop: 16 },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 4,
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
  tabLabel:       { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  tabLabelActive: { fontFamily: 'Poppins-Bold',   fontSize: 13, color: '#FFFFFF' },

  list: { paddingHorizontal: 20, paddingBottom: 110 },

  // ── Podium ──
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  podiumCol: { alignItems: 'center', width: (width - 80) / 3 },
  // 1st place column pushed up
  podiumColFirst: { marginBottom: 28 },

  avatarWrap: { position: 'relative', marginBottom: 10 },
  avatarContainer: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFirst: { borderColor: '#F59E0B', borderWidth: 4 },

  rankBadge: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
    left: '50%',
    marginLeft: -11,
  },
  rankBadgeText: { fontFamily: 'Poppins-Bold', fontSize: 11, color: '#FFFFFF' },

  podiumName:      { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#1A1A2E', textAlign: 'center' },
  podiumNameFirst: { fontSize: 16 },
  podiumPts:       { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8', textAlign: 'center', marginTop: 2 },
  podiumPtsFirst:  { fontFamily: 'Poppins-Bold',   color: '#6C3AE0' },

  // ── List rows ──
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0EFF5',
  },
  // Highlight MY row
  rowCardMe: {
    backgroundColor: '#F5F3FF',
    borderColor: '#D5CCFF',
  },
  rowRank:   { fontFamily: 'Poppins-Bold',   fontSize: 15, color: '#1A1A2E', width: 24 },
  rowAvatar: { width: 38, height: 38, borderRadius: 19, overflow: 'hidden', marginHorizontal: 12 },
  rowName:   { flex: 1, fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
  rowNameMe: { fontFamily: 'Poppins-Bold', color: '#6C3AE0' },
  rowPts:    { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#9890B8' },
});
