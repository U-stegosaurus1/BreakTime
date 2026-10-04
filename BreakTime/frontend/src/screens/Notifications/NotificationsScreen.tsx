import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Notification = {
  id: string;
  type: 'achievement' | 'reminder' | 'social' | 'reward';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

// Icon config per notification type
const ICON_MAP: Record<string, { icon: string; color: string; bg: string }> = {
  achievement: { icon: 'trophy',         color: '#F59E0B', bg: '#FFF4E5' },
  reminder:    { icon: 'notifications',  color: '#6C3AE0', bg: '#EAE6FF' },
  social:      { icon: 'people',         color: '#00C897', bg: '#E6F8F3' },
  reward:      { icon: 'gift',           color: '#3B82F6', bg: '#EBF4FF' },
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'achievement', title: '7-Day Streak! 🔥',  message: "Amazing! You've completed 7 days in a row. Keep it up!", time: '2 min ago',  isRead: false },
  { id: '2', type: 'reminder',    title: 'Break Time!',        message: "You've been sitting for 45 minutes. Time for a quick stretch!", time: '1 hr ago',   isRead: false },
  { id: '3', type: 'social',      title: 'Sarah Challenged You', message: 'Sarah Jenkins sent you a "Most Steps Today" challenge!', time: '2 hrs ago',  isRead: false },
  { id: '4', type: 'reward',      title: 'Reward Unlocked',    message: 'You now have enough points for the "Campus Cafe Discount" reward!', time: '5 hrs ago', isRead: true },
  { id: '5', type: 'achievement', title: 'New Badge Earned!',  message: 'You\'ve earned the "Early Bird" badge for logging an activity before 9 AM.', time: 'Yesterday', isRead: true },
  { id: '6', type: 'reminder',    title: 'Daily Goal Progress', message: "You're 60% through your daily goal. Finish strong!", time: 'Yesterday',  isRead: true },
  { id: '7', type: 'social',      title: 'Mike Joined BreakTime', message: 'Your friend Mike Ross just joined. Add him to start competing!', time: '2 days ago', isRead: true },
];

export default function NotificationsScreen() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead    = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  const unread = notifications.filter(n => !n.isRead);
  const read   = notifications.filter(n => n.isRead);

  const renderItem = ({ item }: { item: Notification }) => {
    const meta = ICON_MAP[item.type];
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => markRead(item.id)}
        style={[styles.card, { borderLeftColor: item.isRead ? 'transparent' : '#6C3AE0' }]}
      >
        <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
          <Ionicons name={meta.icon as any} size={22} color={meta.color} />
        </View>
        <View style={styles.notifInfo}>
          <View style={styles.notifTopRow}>
            <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifMsg} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadLabel}>{unreadCount} unread</Text>
          )}
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={markAllRead} activeOpacity={0.7}>
          <Ionicons name="checkmark-done-outline" size={22} color="#6C3AE0" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...unread, ...read]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={unread.length > 0 ? (
          <Text style={styles.sectionLabel}>NEW</Text>
        ) : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="notifications-off-outline" size={64} color="#D8D3F0" />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyDesc}>You have no new notifications. Keep staying active!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20,
    borderBottomWidth: 1, borderBottomColor: '#F0EFF5',
  },
  iconBtn:     { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Poppins-Bold',   fontSize: 20, color: '#1A1A2E', textAlign: 'center' },
  unreadLabel: { fontFamily: 'Poppins-Medium', fontSize: 12, color: '#9890B8', textAlign: 'center' },

  sectionLabel: { fontFamily: 'Poppins-Bold', fontSize: 11, color: '#9890B8', letterSpacing: 1, textTransform: 'uppercase', paddingHorizontal: 24, marginBottom: 12, marginTop: 8 },
  listContent:  { paddingTop: 8, paddingBottom: 120 },
  separator:    { height: 1, backgroundColor: '#F5F3FF', marginHorizontal: 24 },

  card: {
    flexDirection: 'row', padding: 16, paddingHorizontal: 20,
    borderLeftWidth: 4, backgroundColor: '#FFFFFF',
  },
  iconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  notifInfo:   { flex: 1 },
  notifTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  notifTitle:  { fontFamily: 'Poppins-Bold',   fontSize: 14, color: '#1A1A2E', flex: 1 },
  unreadDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: '#6C3AE0', marginLeft: 8 },
  notifMsg:    { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8', lineHeight: 18, marginBottom: 6 },
  notifTime:   { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#C0BDCC' },

  emptyWrap:  { alignItems: 'center', paddingTop: 100, paddingHorizontal: 40, gap: 16 },
  emptyTitle: { fontFamily: 'Poppins-Bold',   fontSize: 20, color: '#1A1A2E' },
  emptyDesc:  { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#9890B8', textAlign: 'center', lineHeight: 22 },
});
