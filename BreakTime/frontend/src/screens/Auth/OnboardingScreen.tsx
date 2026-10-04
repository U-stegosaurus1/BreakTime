import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingIllustration from '../../components/illustrations/OnboardingIllustration';

const { width } = Dimensions.get('window');

// ── Onboarding slide data ─────────────────────────────────────────────────────
const SLIDES = [
  {
    id: '1',
    title: 'Take Breaks. Level Up!',
    subtitle: 'Short breaks improve your health,\nfocus, and productivity.',
  },
  {
    id: '2',
    title: 'Earn Points & Badges',
    subtitle: 'Complete challenges and unlock\nexclusive rewards and achievements.',
  },
  {
    id: '3',
    title: 'Stay Active All Day',
    subtitle: 'Quick exercises keep you energized\nand focused throughout the day.',
  },
];

// ── Single slide component ─────────────────────────────────────────────────────
function Slide({ item }: { item: typeof SLIDES[0] }) {
  return (
    <View style={slide.container}>
      {/* Illustration area — SVG illustration */}
      <View style={slide.illustrationArea}>
        <OnboardingIllustration width={260} height={260} />
      </View>

      {/* Text */}
      <Text style={slide.title}>{item.title}</Text>
      <Text style={slide.subtitle}>{item.subtitle}</Text>
    </View>
  );
}

const slide = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  illustrationArea: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 24,
    marginBottom: 36,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#9890B8',
    textAlign: 'center',
    lineHeight: 24,
  },
});

// ── Main Onboarding Screen ─────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const navigation  = useNavigation<any>();
  const [current, setCurrent] = useState(0);
  const flatRef = useRef<FlatList>(null);

  function handleNext() {
    if (current < SLIDES.length - 1) {
      const next = current + 1;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrent(next);
    } else {
      navigation.navigate('Login');
    }
  }

  function handleSkip() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 48 }}
      />

      {/* Dot indicators — active = filled purple pill, inactive = small grey dot */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              idx === current ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Bottom bar: Skip left | Next right */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {current === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot:         { borderRadius: 4 },
  dotActive:   { width: 24, height: 8, backgroundColor: '#6C3AE0', borderRadius: 4 },
  dotInactive: { width: 8,  height: 8, backgroundColor: '#D8D3F0', borderRadius: 4 },

  // Bottom bar — Skip left | Next right
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingBottom: 36,
    paddingTop: 8,
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#9890B8',
  },
  nextBtn: {
    backgroundColor: '#6C3AE0',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
