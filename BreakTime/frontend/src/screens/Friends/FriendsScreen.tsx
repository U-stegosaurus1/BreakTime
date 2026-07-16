import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FriendsScreen() {
  const navigation = useNavigation();

  // Mock Data
  const friends = [
    { id: '1', name: 'Sarah Jenkins', university: 'Stanford Univ', points: 4200, isOnline: true },
    { id: '2', name: 'Mike Ross', university: 'Harvard Law', points: 3850, isOnline: false },
    { id: '3', name: 'Jessica Pearson', university: 'Columbia', points: 5100, isOnline: true },
    { id: '4', name: 'Harvey Specter', university: 'Harvard Law', points: 8900, isOnline: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="account-plus-outline" size={28} color="#635BFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarBg}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              {item.isOnline && <View style={styles.onlineDot} />}
            </View>
            
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendUni}>{item.university}</Text>
            </View>

            <View style={styles.pointsWrap}>
              <Icon name="star-four-points" size={16} color="#F59E0B" />
              <Text style={styles.pointsText}>{item.points}</Text>
            </View>
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
  
  listContent: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrap: { marginRight: 16, position: 'relative' },
  avatarBg: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#EAE6FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#635BFF' },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00D084',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendInfo: { flex: 1, paddingRight: 12 },
  friendName: { fontFamily: 'Poppins-Bold', fontSize: 15, color: '#1A1A2E', marginBottom: 2 },
  friendUni: { fontFamily: 'Poppins-Medium', fontSize: 13, color: '#9890B8' },
  pointsWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pointsText: { fontFamily: 'Poppins-Bold', fontSize: 14, color: '#1A1A2E' },
});
