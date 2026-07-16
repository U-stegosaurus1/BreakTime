import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function BadgesScreen() {
  const navigation = useNavigation();

  // Mocked data replacing API
  const myBadges = [
    { id: '1', name: 'Starter', status: 'Earned', icon: 'star', color: '#FFFFFF', bg: '#00D084' },
    { id: '2', name: '7 Day Streak', status: 'Earned', icon: 'fire', color: '#FFFFFF', bg: '#F59E0B' },
    { id: '3', name: 'Early Bird', status: 'Earned', icon: 'weather-sunny', color: '#FFFFFF', bg: '#635BFF' },
  ];

  const lockedBadges = [
    { id: '4', name: '14 Day Streak', status: 'Keep Going', icon: 'star', color: '#9890B8', bg: '#EAE6FF' },
    { id: '5', name: '30 Day Streak', status: 'Keep Going', icon: 'seal', color: '#9890B8', bg: '#EAE6FF' },
    { id: '6', name: 'Marathon', status: 'Walk 100 km', icon: 'walk', color: '#9890B8', bg: '#EAE6FF' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 28 }} />
        <Text style={styles.headerTitle}>My Badges</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* My Badges Row */}
        <View style={styles.badgeRow}>
          {myBadges.map((badge) => (
            <View key={badge.id} style={styles.badgeCol}>
              <View style={[styles.badgeCircle, { backgroundColor: badge.bg }]}>
                <Icon name={badge.icon} size={32} color={badge.color} />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeStatus}>{badge.status}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Locked Badges</Text>

        {/* Locked Badges Row */}
        <View style={styles.badgeRow}>
          {lockedBadges.map((badge) => (
            <View key={badge.id} style={styles.badgeCol}>
              <View style={[styles.badgeCircle, { backgroundColor: badge.bg }]}>
                <Icon name={badge.icon} size={32} color={badge.color} />
                <View style={styles.lockOverlay}>
                  <Icon name="lock" size={16} color="#1A1A2E" />
                </View>
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeStatus}>{badge.status}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1A1A2E',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#635BFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  badgeCol: {
    alignItems: 'center',
    width: (width - 48) / 3,
  },
  badgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#EAE6FF',
  },
  badgeName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#1A1A2E',
    textAlign: 'center',
  },
  badgeStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#9890B8',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#1A1A2E',
    marginBottom: 24,
  },
});
