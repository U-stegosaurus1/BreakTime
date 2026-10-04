import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, StatusBar, Alert, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');

type Reward = {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  bg: string;
  color: string;
  category: 'campus' | 'wellness' | 'digital';
};

const REWARDS: Reward[] = [
  { id: '1', title: '5% Campus Cafe Discount',      description: 'Valid at any campus cafe for one purchase.', cost: 500,  icon: 'coffee',        bg: '#F3E8FF', color: '#8B5CF6', category: 'campus'   },
  { id: '2', title: 'Free Print Credits (10 Pages)', description: 'Print anywhere on campus for free.',          cost: 1000, icon: 'printer',       bg: '#EBF4FF', color: '#3B82F6', category: 'campus'   },
  { id: '3', title: 'Library Study Room Priority',   description: '2-hour priority booking on any study room.', cost: 2000, icon: 'bookshelf',     bg: '#FFF3E8', color: '#F59E0B', category: 'campus'   },
  { id: '4', title: 'University Merch Voucher',      description: '£5 voucher for the campus merch store.',     cost: 5000, icon: 'tshirt-crew',   bg: '#E6F8F3', color: '#00C897', category: 'campus'   },
  { id: '5', title: 'Spotify Premium (1 Month)',     description: 'Enjoy ad-free music for a whole month.',     cost: 3000, icon: 'music-circle',  bg: '#E6F8F3', color: '#1DB954', category: 'digital'  },
  { id: '6', title: 'Duolingo Plus (1 Week)',        description: 'Boost your language skills without ads.',    cost: 800,  icon: 'translate',     bg: '#FFF3E8', color: '#FF4B4B', category: 'digital'  },
  { id: '7', title: 'Gym Day Pass',                  description: 'One-day access to campus fitness centre.',   cost: 1500, icon: 'dumbbell',      bg: '#EBF4FF', color: '#3B82F6', category: 'wellness' },
  { id: '8', title: 'Massage Session (15 min)',      description: 'Relax at the campus wellness centre.',       cost: 4000, icon: 'spa',           bg: '#F3E8FF', color: '#8B5CF6', category: 'wellness' },
];

type Category = 'all' | 'campus' | 'digital' | 'wellness';

export default function RewardsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();
  const [category, setCategory]     = useState<Category>('all');
  const [redeemedIds, setRedeemedIds] = useState<Set<string>>(new Set());

  const userPoints = user?.totalPoints || 850;
  const filtered = category === 'all' ? REWARDS : REWARDS.filter(r => r.category === category);

  const handleRedeem = (item: Reward) => {
    if (redeemedIds.has(item.id)) {
      Alert.alert('Already Redeemed', 'You have already redeemed this reward.');
      return;
    }
    if (userPoints < item.cost) {
      Alert.alert('Not Enough Points', `You need ${(item.cost - userPoints).toLocaleString()} more points to redeem this reward.`);
      return;
    }
    Alert.alert('Confirm Redemption', `Redeem "${item.title}" for ${item.cost.toLocaleString()} pts?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Redeem', onPress: () => {
        setRedeemedIds(prev => new Set([...prev, item.id]));
        Alert.alert('🎉 Reward Redeemed!', 'Check your email or campus app for your reward code.');
      }},
    ]);
  };

  const cats: { key: Category; label: string; ionIcon: string }[] = [
    { key: 'all',      label: 'All',      ionIcon: 'grid-outline'        },
    { key: 'campus',   label: 'Campus',   ionIcon: 'school-outline'      },
    { key: 'digital',  label: 'Digital',  ionIcon: 'laptop-outline'      },
    { key: 'wellness', label: 'Wellness', ionIcon: 'heart-outline'       },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Points Balance Banner */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.balanceLabel}>Your Points Balance</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="star" size={24} color="#F59E0B" style={{ marginRight: 8 }} />
            <Text style={styles.balanceValue}>{userPoints.toLocaleString()}</Text>
            <Text style={styles.balanceSuffix}> pts</Text>
          </View>
          <Text style={styles.balanceHint}>Earn more by completing breaks & challenges</Text>
        </View>
        <Ionicons name="gift" size={40} color="rgba(255,255,255,0.4)" />
      </View>

      {/* Category Filter */}
      <View style={styles.catScrollRow}>
        <View style={styles.catRowInner}>
          {cats.map(c => (
            <TouchableOpacity
              key={c.key}
              style={[styles.catPill, category === c.key && styles.catPillActive]}
              onPress={() => setCategory(c.key)}
            >
              <Ionicons name={c.ionIcon as any} size={16} color={category === c.key ? '#fff' : '#9890B8'} />
              <Text style={[styles.catText, category === c.key && styles.catTextActive]}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isRedeemed = redeemedIds.has(item.id);
          const canAfford  = userPoints >= item.cost;
          return (
            <View style={[styles.rewardCard, isRedeemed && { opacity: 0.7 }]}>
              <View style={[styles.rewardIconWrap, { backgroundColor: item.bg }]}>
                <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />
              </View>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{item.title}</Text>
                <Text style={styles.rewardDesc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.costRow}>
                  <Ionicons name="star" size={14} color="#6C3AE0" />
                  <Text style={styles.costText}>{item.cost.toLocaleString()} pts</Text>
                  {!canAfford && !isRedeemed && (
                    <Text style={styles.shortText}>· need {(item.cost - userPoints).toLocaleString()} more</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.redeemBtn,
                  isRedeemed ? { backgroundColor: '#E6F8F3' }
                    : canAfford ? { backgroundColor: '#6C3AE0' }
                    : { backgroundColor: '#F0EFF5' },
                ]}
                onPress={() => handleRedeem(item)}
              >
                {isRedeemed ? (
                  <Ionicons name="checkmark-circle" size={20} color="#00C897" />
                ) : (
                  <Text style={[styles.redeemBtnText, { color: canAfford ? '#fff' : '#9890B8' }]}>
                    {canAfford ? 'Redeem' : 'Locked'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:    { flex: 1, backgroundColor: '#FFFFFF' },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F0EFF5' },
  iconBtn:     { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E' },

  balanceCard:  { marginHorizontal: 20, borderRadius: 24, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 16, backgroundColor: '#6C3AE0' },
  balanceLabel: { fontFamily: 'Poppins-Medium', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  balanceRow:   { flexDirection: 'row', alignItems: 'baseline', marginBottom: 6 },
  balanceValue: { fontFamily: 'Poppins-Bold', fontSize: 36, color: '#fff' },
  balanceSuffix:{ fontFamily: 'Poppins-Medium', fontSize: 18, color: 'rgba(255,255,255,0.8)' },
  balanceHint:  { fontFamily: 'Poppins-Medium', fontSize: 11, color: 'rgba(255,255,255,0.6)' },

  catScrollRow: { paddingHorizontal: 20, marginBottom: 16 },
  catRowInner:  { flexDirection: 'row', gap: 8 },
  catPill:       { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: '#F5F3FF' },
  catPillActive: { backgroundColor: '#6C3AE0' },
  catText:       { fontFamily: 'Poppins-Bold', fontSize: 12, color: '#9890B8' },
  catTextActive: { color: '#FFFFFF' },

  listContent:   { paddingHorizontal: 20, gap: 12, paddingTop: 4, paddingBottom: 120 },
  rewardCard:    { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0EFF5', shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  rewardIconWrap:{ width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  rewardInfo:    { flex: 1, paddingRight: 10 },
  rewardTitle:   { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E', marginBottom: 4 },
  rewardDesc:    { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8', lineHeight: 16, marginBottom: 8 },
  costRow:       { flexDirection: 'row', alignItems: 'center', gap: 4 },
  costText:      { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#6C3AE0' },
  shortText:     { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#EF4444' },
  redeemBtn:     { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, minWidth: 72, alignItems: 'center' },
  redeemBtnText: { fontFamily: 'Poppins-Bold', fontSize: 13 },
});
