import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { notificationApi } from '../../services/api';

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.get().then(r => r.data.data),
  });

  const notifications = data || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="check-all" size={24} color="#635BFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => (
          <View style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}>
            <View style={[styles.iconWrap, { backgroundColor: item.isRead ? '#F5F5F9' : '#EAE6FF' }]}>
              <Icon name="bell-ring" size={24} color={item.isRead ? '#9890B8' : '#635BFF'} />
            </View>
            <View style={styles.notifInfo}>
              <Text style={styles.notifTitle}>{item.title}</Text>
              <Text style={styles.notifMsg}>{item.message}</Text>
              <Text style={styles.notifTime}>2 hrs ago</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
        )}
        ListEmptyComponent={() => !isLoading ? (
          <View style={styles.empty}>
            <Icon name="bell-sleep-outline" size={64} color="#EAE6FF" />
            <Text style={styles.emptyText}>You're all caught up!</Text>
          </View>
        ) : null}
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
  
  listContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  notifCardUnread: {
    borderLeftColor: '#635BFF',
  },
  iconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  notifInfo: { flex: 1, paddingRight: 8 },
  notifTitle: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E', marginBottom: 4 },
  notifMsg: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8', lineHeight: 18, marginBottom: 8 },
  notifTime: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#9890B8' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#635BFF', marginTop: 4 },
  empty: { alignItems: 'center', paddingTop: 100, gap: 16 },
  emptyText: { fontFamily: 'Poppins-Medium', fontSize: 16, color: '#9890B8' },
});
