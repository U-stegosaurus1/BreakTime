import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/authStore';

export default function RewardsScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();

  const rewards = [
    { id: '1', title: '5% Campus Cafe Discount', cost: 500, icon: 'coffee', bg: '#F3E8FF', color: '#8B5CF6' },
    { id: '2', title: 'Free Print Credits (10 Pgs)', cost: 1000, icon: 'printer', bg: '#EBF4FF', color: '#3B82F6' },
    { id: '3', title: 'University Merch Voucher', cost: 5000, icon: 'tshirt-crew', bg: '#E6F8F3', color: '#00D084' },
    { id: '4', title: 'Library Study Room Priority', cost: 2000, icon: 'bookshelf', bg: '#FFF3E8', color: '#F59E0B' },
  ];

  const handleRedeem = (item: any) => {
    if ((user?.totalPoints || 0) < item.cost) {
      Alert.alert('Not enough points', `You need ${item.cost} points to redeem this reward.`);
      return;
    }
    Alert.alert('Redeem Reward', `Are you sure you want to redeem "${item.title}" for ${item.cost} pts?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Redeem', onPress: () => Alert.alert('Success', 'Reward redeemed!') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Points Balance Banner */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Points Balance</Text>
        <View style={styles.balanceRow}>
          <Icon name="star-four-points" size={32} color="#635BFF" style={{ marginRight: 12 }} />
          <Text style={styles.balanceValue}>{user?.totalPoints || 850}</Text>
        </View>
      </View>

      <FlatList
        data={rewards}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.rewardCard}>
            <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
              <Icon name={item.icon} size={28} color={item.color} />
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>{item.title}</Text>
              <Text style={styles.rewardCost}>{item.cost} pts</Text>
            </View>
            <TouchableOpacity
              style={styles.redeemBtn}
              onPress={() => handleRedeem(item)}
            >
              <Text style={styles.redeemBtnText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    paddingBottom: 24 
  },
  iconBtn: { padding: 4 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#1A1A2E' },
  
  balanceCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', marginBottom: 8 },
  balanceRow: { flexDirection: 'row', alignItems: 'center' },
  balanceValue: { fontFamily: 'Poppins-Bold', fontSize: 40, color: '#1A1A2E' },
  
  listContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rewardInfo: { flex: 1, paddingRight: 12 },
  rewardTitle: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E', marginBottom: 4 },
  rewardCost: { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#635BFF' },
  redeemBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#EAE6FF',
  },
  redeemBtnText: { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#635BFF' },
});
