import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function PlayScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState('stretch');
  const { colors, isDarkMode } = useTheme();

  const options = [
    { key: 'stretch', title: 'Stretching Session', icon: 'yoga', desc: 'Relieve muscle tension and improve flexibility.', points: '+15 pts', duration: '5 min', gradient: ['#43E97B', '#38F9D7'] },
    { key: 'steps', title: 'Active Walk', icon: 'shoe-sneaker', desc: 'Stand up, walk around, and clear your mind.', points: '+20 pts', duration: '2 min', gradient: ['#4FACFE', '#00F2FE'] },
    { key: 'breaks', title: 'Stair Climbing', icon: 'stairs', desc: 'Boost your heart rate by walking some flights.', points: '+20 pts', duration: '3 min', gradient: ['#FA709A', '#FEE140'] },
    { key: 'water', title: 'Hydration Break', icon: 'water', desc: 'Drink a glass of water to keep your brain active.', points: '+10 pts', duration: '1 min', gradient: ['#48C6EF', '#6F86D6'] },
  ];

  const handleStart = () => {
    navigation.navigate('ActivityBreak', { type: selected });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Play Zone</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>Choose an activity to beat sedentary logs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Play cards */}
        <View style={styles.list}>
          {options.map((opt) => {
            const isSelected = selected === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                activeOpacity={0.9}
                onPress={() => setSelected(opt.key)}
                style={[
                  styles.card,
                  { backgroundColor: colors.card, shadowColor: colors.text },
                  isSelected && { borderColor: colors.primary, borderWidth: 2 },
                  !isSelected && { borderColor: 'transparent', borderWidth: 2 }
                ]}
              >
                <LinearGradient 
                  colors={opt.gradient} 
                  style={[styles.iconWrap, !isSelected && { opacity: 0.6 }]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                >
                  <Icon name={opt.icon} size={32} color="#FFFFFF" />
                </LinearGradient>
                
                <View style={styles.info}>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{opt.title}</Text>
                  <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaBadge}>
                      <Icon name="clock-outline" size={14} color={colors.textSecondary} />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>{opt.duration}</Text>
                    </View>
                    <View style={styles.metaBadge}>
                      <Icon name="star-four-points" size={14} color={colors.accent} />
                      <Text style={[styles.metaText, { color: colors.accent, fontFamily: 'Poppins-Bold' }]}>{opt.points}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.radio, { borderColor: isDarkMode ? colors.border : '#E5E7EB' }, isSelected && { borderColor: colors.primary }]}>
                  {isSelected && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Massive Gradient Start Button */}
        <TouchableOpacity activeOpacity={0.9} onPress={handleStart} style={styles.btnShadowWrap}>
          <LinearGradient 
            colors={[colors.primary, colors.gradientEnd]} 
            style={styles.startBtn}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.startBtnText}>Start Break Now</Text>
            <Icon name="lightning-bolt" size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  title: { fontFamily: 'Poppins-Bold', fontSize: 32, fontWeight: '800' },
  sub: { fontFamily: 'Poppins-Medium', fontSize: 16, marginTop: 4 },
  content: { paddingHorizontal: 24, paddingBottom: 120, gap: 24 },
  list: { gap: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  info: { flex: 1, gap: 6 },
  cardTitle: { fontFamily: 'Poppins-Bold', fontSize: 16 },
  cardDesc: { fontFamily: 'Poppins-Regular', fontSize: 13, lineHeight: 18 },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  metaBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: 'Poppins-Medium', fontSize: 13 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  btnShadowWrap: {
    marginTop: 16,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startBtn: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: { color: '#ffffff', fontFamily: 'Poppins-Bold', fontSize: 18, fontWeight: '800' },
});
