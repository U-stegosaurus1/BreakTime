import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LeaderType = 'global' | 'friends' | 'university';

export default function LeaderboardScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<LeaderType>('global');

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', activeTab],
    queryFn: () => leaderboardApi.getGlobal().then(r => r.data.data),
  });

  const tabs: { key: LeaderType; label: string }[] = [
    { key: 'global', label: 'Global' },
    { key: 'friends', label: 'Friends' },
    { key: 'university', label: 'University' },
  ];

  // Mock data matching mockup screen 09
  const mockLeaderboard = [
    { id: '1', rank: 1, name: 'Sarah J.', points: 2450, isMe: false },
    { id: '2', rank: 2, name: 'Alex', points: 1870, isMe: true },
    { id: '3', rank: 3, name: 'Mike T.', points: 1600, isMe: false },
    { id: '4', rank: 4, name: 'Emma L.', points: 1450, isMe: false },
    { id: '5', rank: 5, name: 'David K.', points: 1250, isMe: false },
    { id: '6', rank: 6, name: 'James P.', points: 1100, isMe: false },
  ];

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return '#F59E0B';  // Gold
      case 2: return '#8B5CF6';  // Silver/Purple  
      case 3: return '#F59E0B';  // Bronze/Orange
      default: return '#1A1A2E';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Pill Switcher — mockup: grey track with purple active pill */}
      <View style={styles.switcherWrap}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity 
              key={tab.key}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={mockLeaderboard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.row, item.isMe && styles.rowMe]}>
            {/* Rank number */}
            <Text style={[styles.rankText, { color: getRankColor(item.rank) }]}>{item.rank}</Text>

            {/* Avatar */}
            <View style={[styles.avatarCircle, item.isMe && { backgroundColor: '#EAE6FF' }]}>
              <Icon name="account" size={24} color={item.isMe ? '#635BFF' : '#9890B8'} />
            </View>

            {/* Name + "You" badge */}
            <View style={styles.nameWrap}>
              <Text style={[styles.nameText, item.isMe && { color: '#635BFF' }]}>{item.name}</Text>
              {item.isMe && (
                <View style={styles.badgeYou}>
                  <Text style={styles.badgeYouText}>You</Text>
                </View>
              )}
            </View>

            {/* Points */}
            <Text style={[styles.pointsText, item.isMe && { color: '#635BFF' }]}>
              {item.points.toLocaleString()} pts
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
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
    backgroundColor: '#F5F5F9',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 4,
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
    color: '#1A1A2E',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  rowMe: {
    backgroundColor: '#F3E8FF',
  },
  rankText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    width: 24,
    textAlign: 'center',
    marginRight: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nameWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1A1A2E',
  },
  badgeYou: {
    backgroundColor: '#635BFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeYouText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  pointsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#9890B8',
  },
});
