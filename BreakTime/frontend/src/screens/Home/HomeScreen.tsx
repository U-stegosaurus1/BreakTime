import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? colors.background : '#F7F7FA' }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={isDarkMode ? colors.background : '#F7F7FA'} />

      {/* Top Brand Bar — matches mockup: logo left, avatar right */}
      <View style={styles.brandBar}>
        <View style={styles.logoWrap}>
          <Image 
            source={require('../../../assets/logo/breaktime-logo.png')}
            style={{ width: 28, height: 28, resizeMode: 'contain' }}
          />
          <Text style={[styles.brandText, { color: isDarkMode ? '#FFFFFF' : '#1A1A2E' }]}>Break<Text style={{ color: '#00D084' }}>Time</Text></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)} style={[styles.avatarBtn, { backgroundColor: isDarkMode ? '#2D2B3F' : '#EAE6FF' }]}>
          <Icon name="account" size={24} color="#635BFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting — matches mockup: single line */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.textPrimary }]}>Good Morning,{'\n'}Alex! 👋</Text>
          <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>Ready to make today amazing?</Text>
        </View>

        {/* Daily Goal Card — matches mockup exactly */}
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Daily Goal</Text>
          <View style={styles.goalRow}>
            
            {/* Progress Ring */}
            <View style={styles.ringContainer}>
              <View style={[styles.ringTrack, { borderColor: isDarkMode ? colors.border : '#F3F4F6' }]}>
                <View style={[styles.ringFill, { borderColor: '#635BFF' }]} />
                <View style={styles.ringInner}>
                  <Text style={[styles.ringPct, { color: colors.textPrimary }]}>40%</Text>
                  <Text style={[styles.ringLabel, { color: colors.textSecondary }]}>Complete</Text>
                </View>
              </View>
            </View>

            {/* Metrics Column — matches mockup right side */}
            <View style={styles.metricsCol}>
              <View style={styles.metricRow}>
                <View style={[styles.metricIconWrap, { backgroundColor: '#E6F8F3' }]}>
                  <Icon name="run-fast" size={18} color="#00D084" />
                </View>
                <View>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Breaks</Text>
                  <Text style={[styles.metricValue, { color: colors.textPrimary }]}>1/3</Text>
                </View>
              </View>
              <View style={styles.metricRow}>
                <View style={[styles.metricIconWrap, { backgroundColor: '#E6F8F3' }]}>
                  <Icon name="shoe-sneaker" size={18} color="#00D084" />
                </View>
                <View>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Steps</Text>
                  <Text style={[styles.metricValue, { color: colors.textPrimary }]}>1.2k/2k</Text>
                </View>
              </View>
              <View style={styles.metricRow}>
                <View style={[styles.metricIconWrap, { backgroundColor: '#FFF3E8' }]}>
                  <Icon name="clock-outline" size={18} color="#F59E0B" />
                </View>
                <View>
                  <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Active</Text>
                  <Text style={[styles.metricValue, { color: colors.textPrimary }]}>6/15m</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* Stats Row — matches mockup: Current Streak + Total Points side-by-side */}
        <View style={styles.statsRow}>
          <View style={[styles.halfCard, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={[styles.statIconBg, { backgroundColor: '#FFF4E5' }]}>
              <Icon name="fire" size={24} color="#F59E0B" />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Current Streak</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>7 Days</Text>
          </View>

          <View style={[styles.halfCard, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={[styles.statIconBg, { backgroundColor: '#F3E8FF' }]}>
              <Icon name="star-four-points" size={24} color="#8B5CF6" />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Points</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>850</Text>
          </View>
        </View>

        {/* Next Up Card — matches mockup: icon, "NEXT UP" label, title, description, play button */}
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text, flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }]}>
          <View style={[styles.nextUpIconBg, { backgroundColor: isDarkMode ? '#2D2B3F' : '#F5F5FA' }]}>
            <Icon name="yoga" size={28} color="#C4B5FD" />
          </View>
          <View style={styles.nextUpInfo}>
            <Text style={[styles.nextUpLabel, { color: '#635BFF' }]}>NEXT UP</Text>
            <Text style={[styles.nextUpTitle, { color: colors.textPrimary }]}>Stretch Break</Text>
            <Text style={[styles.nextUpDesc, { color: colors.textSecondary }]}>5 minutes · +15 pts</Text>
          </View>
          <TouchableOpacity 
            style={styles.playBtn}
            onPress={() => navigation.navigate('ActivityBreak' as never, { type: 'stretch' } as never)}
          >
            <Icon name="play" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Quick Access — Leaderboard & Badges */}
        <View style={styles.statsRow}>
          <TouchableOpacity 
            style={[styles.halfCard, { backgroundColor: colors.card, shadowColor: colors.text }]}
            onPress={() => navigation.navigate('Leaderboard' as never)}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconBg, { backgroundColor: '#EBF4FF' }]}>
              <Icon name="trophy" size={24} color="#3B82F6" />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Leaderboard</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontSize: 16 }]}>View Rankings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.halfCard, { backgroundColor: colors.card, shadowColor: colors.text }]}
            onPress={() => navigation.navigate('Badges' as never)}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconBg, { backgroundColor: '#FFF4E5' }]}>
              <Icon name="medal" size={24} color="#F59E0B" />
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>My Badges</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontSize: 16 }]}>3 Earned</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  brandBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circle avatar like mockup
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
    gap: 20,
  },
  header: {
    marginBottom: 4,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 4,
  },
  subGreeting: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    marginBottom: 16,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringContainer: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  ringTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 12,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  ringInner: { alignItems: 'center' },
  ringPct: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    fontWeight: '800',
  },
  ringLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginTop: -2,
  },
  metricsCol: {
    flex: 1,
    gap: 14,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginBottom: -2,
  },
  metricValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: '800',
  },

  nextUpIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  nextUpInfo: { flex: 1 },
  nextUpLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nextUpTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  nextUpDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  // Mockup: solid purple circle play button
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#635BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
