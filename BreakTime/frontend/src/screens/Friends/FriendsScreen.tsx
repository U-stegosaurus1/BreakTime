import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView,
  StatusBar, TextInput, Modal, Alert, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Friend = {
  id: string;
  name: string;
  university: string;
  points: number;
  streak: number;
  isOnline: boolean;
  avatarColor: string;
};

type Tab = 'friends' | 'requests';

const INITIAL_FRIENDS: Friend[] = [
  { id: '1', name: 'Sarah Jenkins', university: 'Stanford University', points: 4200, streak: 12, isOnline: true,  avatarColor: '#E91E8C' },
  { id: '2', name: 'Mike Ross',     university: 'Harvard Law School',  points: 3850, streak: 5,  isOnline: false, avatarColor: '#3B82F6' },
  { id: '3', name: 'Jessica Pearson', university: 'Columbia University', points: 5100, streak: 20, isOnline: true,  avatarColor: '#F59E0B' },
  { id: '4', name: 'Harvey Specter', university: 'Harvard Law School',  points: 8900, streak: 34, isOnline: false, avatarColor: '#00C897' },
  { id: '5', name: 'Louis Litt',    university: 'NYU Stern',           points: 2300, streak: 3,  isOnline: true,  avatarColor: '#8B5CF6' },
];

const FRIEND_REQUESTS = [
  { id: '101', name: 'Donna Paulsen', university: 'Boston University', avatarColor: '#EF4444' },
  { id: '102', name: 'Rachel Zane',   university: 'Columbia Law',      avatarColor: '#6C3AE0' },
];

export default function FriendsScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<Tab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [requests, setRequests] = useState(FRIEND_REQUESTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addEmail, setAddEmail] = useState('');

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccept = (id: string) => {
    const req = requests.find(r => r.id === id)!;
    const newFriend: Friend = { ...req, points: 0, streak: 0, isOnline: false };
    setFriends(prev => [newFriend, ...prev]);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleAddFriend = () => {
    if (!addEmail.trim()) return;
    Alert.alert('Request Sent!', `Friend request sent to ${addEmail}`);
    setAddEmail('');
    setShowAddModal(false);
  };

  const renderFriend = ({ item }: { item: Friend }) => (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatarBg, { backgroundColor: item.avatarColor + '25' }]}>
          <Text style={[styles.avatarText, { color: item.avatarColor }]}>{item.name[0]}</Text>
        </View>
        {item.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUni} numberOfLines={1}>{item.university}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Ionicons name="flame" size={14} color="#F59E0B" />
            <Text style={styles.statText}>{item.streak}d streak</Text>
          </View>
          <View style={styles.statChip}>
            <Ionicons name="star" size={14} color="#6C3AE0" />
            <Text style={styles.statText}>{item.points.toLocaleString()} pts</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.challengeBtn}
        onPress={() => Alert.alert('Challenge Sent!', `You challenged ${item.name}!`)}
        activeOpacity={0.7}
      >
        <Ionicons name="flash" size={14} color="#6C3AE0" />
        <Text style={styles.challengeText}>Challenge</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRequest = ({ item }: { item: typeof FRIEND_REQUESTS[0] }) => (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatarBg, { backgroundColor: item.avatarColor + '25' }]}>
          <Text style={[styles.avatarText, { color: item.avatarColor }]}>{item.name[0]}</Text>
        </View>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUni}>{item.university}</Text>
      </View>
      <View style={styles.requestBtns}>
        <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item.id)} activeOpacity={0.7}>
          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item.id)} activeOpacity={0.7}>
          <Ionicons name="close" size={20} color="#1A1A2E" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)} activeOpacity={0.85}>
          <Ionicons name="person-add" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, tab === 'friends' && styles.tabActive]}
          onPress={() => setTab('friends')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, tab === 'friends' && styles.tabTextActive]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'requests' && styles.tabActive]}
          onPress={() => setTab('requests')}
          activeOpacity={0.7}
        >
          <View style={styles.tabInner}>
            <Text style={[styles.tabText, tab === 'requests' && styles.tabTextActive]}>Requests</Text>
            {requests.length > 0 && (
              <View style={[styles.badge, tab === 'requests' ? { backgroundColor: '#FFFFFF' } : { backgroundColor: '#6C3AE0' }]}>
                <Text style={[styles.badgeText, tab === 'requests' ? { color: '#6C3AE0' } : { color: '#FFFFFF' }]}>
                  {requests.length}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      {tab === 'friends' && (
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#9890B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="#C4BFD8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
              <Ionicons name="close-circle" size={20} color="#9890B8" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={tab === 'friends' ? filtered : requests as any}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={tab === 'friends' ? renderFriend : renderRequest as any}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name={tab === 'friends' ? "people-outline" : "mail-open-outline"} size={64} color="#D8D3F0" />
            <Text style={styles.emptyTitle}>
              {tab === 'friends' ? 'No friends found' : 'No friend requests'}
            </Text>
            <Text style={styles.emptyDesc}>
              {tab === 'friends' ? 'Invite your friends to BreakTime and compete!' : 'When someone adds you, it will appear here.'}
            </Text>
          </View>
        }
      />

      {/* Add Friend Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Add a Friend</Text>
            <Text style={styles.modalDesc}>Enter their email or username to send a friend request.</Text>
            
            <View style={styles.modalInput}>
              <Ionicons name="mail-outline" size={20} color="#9890B8" />
              <TextInput
                style={styles.modalTextInput}
                placeholder="Email or username"
                placeholderTextColor="#C4BFD8"
                value={addEmail}
                onChangeText={setAddEmail}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={handleAddFriend} activeOpacity={0.85}>
              <Text style={styles.sendBtnText}>Send Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowAddModal(false)} style={{ padding: 8 }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  iconBtn:  { padding: 4, width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E' },
  addBtn:   { width: 36, height: 36, borderRadius: 12, backgroundColor: '#6C3AE0', alignItems: 'center', justifyContent: 'center' },

  tabBar:   { flexDirection: 'row', marginHorizontal: 20, borderRadius: 16, padding: 4, marginBottom: 16, backgroundColor: '#F5F3FF' },
  tab:      { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabActive:{ backgroundColor: '#6C3AE0' },
  tabInner: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tabText:  { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#9890B8' },
  tabTextActive: { color: '#FFFFFF' },
  badge:    { width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  badgeText:{ fontFamily: 'Poppins-Bold', fontSize: 10 },

  searchWrap: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10, borderWidth: 1.5, borderColor: '#E8E4F0', backgroundColor: '#FAFAFA' },
  searchInput:{ flex: 1, fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },

  listContent: { paddingHorizontal: 20, gap: 12, paddingTop: 4, paddingBottom: 120 },
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0EFF5', shadowColor: '#1A1A2E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  
  avatarWrap: { marginRight: 14, position: 'relative' },
  avatarBg:   { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins-Bold', fontSize: 20 },
  onlineDot:  { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#00C897', borderWidth: 2, borderColor: '#FFFFFF' },
  
  friendInfo: { flex: 1, paddingRight: 8 },
  friendName: { fontFamily: 'Poppins-Bold', fontSize: 15, color: '#1A1A2E', marginBottom: 2 },
  friendUni:  { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8', marginBottom: 6 },
  
  statsRow: { flexDirection: 'row', gap: 10 },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#9890B8' },
  
  challengeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1.5, borderColor: '#E8E4F0', backgroundColor: '#F5F3FF', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  challengeText:{ fontFamily: 'Poppins-Bold', fontSize: 12, color: '#6C3AE0' },
  
  requestBtns: { flexDirection: 'row', gap: 8 },
  acceptBtn:   { width: 36, height: 36, borderRadius: 10, backgroundColor: '#6C3AE0', alignItems: 'center', justifyContent: 'center' },
  declineBtn:  { width: 36, height: 36, borderRadius: 10, borderWidth: 1.5, borderColor: '#E8E4F0', alignItems: 'center', justifyContent: 'center' },

  emptyWrap:  { alignItems: 'center', paddingTop: 80, paddingHorizontal: 40, gap: 16 },
  emptyTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E' },
  emptyDesc:  { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', textAlign: 'center', lineHeight: 22 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet:   { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28, paddingBottom: 48, backgroundColor: '#FFFFFF' },
  modalTitle:   { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1A2E', marginBottom: 8 },
  modalDesc:    { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', marginBottom: 24, lineHeight: 20 },
  modalInput:   { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: '#E8E4F0', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16, backgroundColor: '#FAFAFA' },
  modalTextInput:{ flex: 1, fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1A1A2E' },
  sendBtn:      { backgroundColor: '#6C3AE0', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12, shadowColor: '#6C3AE0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 5 },
  sendBtnText:  { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#FFFFFF' },
  cancelText:   { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', textAlign: 'center' },
});
