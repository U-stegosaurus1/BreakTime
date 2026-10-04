import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import ActiveBreakIllustration from '../../components/illustrations/ActiveBreakIllustration';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// ── Activity configs ───────────────────────────────────────────────────────────
const CONFIGS: Record<string, {
  title: string;
  color: string;
  bgColor: string;
  duration: number;
  points: number;
}> = {
  stretch: {
    title: 'Stretch Break',
    color: '#6C3AE0',
    bgColor: '#F0EDFF',
    duration: 5 * 60,
    points: 25,
  },
  steps: {
    title: 'Active Walk',
    color: '#00C897',
    bgColor: '#E6F8F3',
    duration: 2 * 60,
    points: 20,
  },
  water: {
    title: 'Hydration Break',
    color: '#3B82F6',
    bgColor: '#EBF4FF',
    duration: 60,
    points: 10,
  },
  breaks: {
    title: 'Stair Climbing',
    color: '#F59E0B',
    bgColor: '#FFF6E5',
    duration: 3 * 60,
    points: 20,
  },
};

// ── Circular progress ring ─────────────────────────────────────────────────────
function ProgressRing({ done, total }: { done: number; total: number }) {
  const pct = Math.round((done / total) * 100);
  return (
    <View style={ring.wrap}>
      <View style={ring.track} />
      <View style={[ring.fill, {
        borderTopColor:    '#6C3AE0',
        borderRightColor:  pct > 25  ? '#6C3AE0' : '#EAE6FF',
        borderBottomColor: pct > 50  ? '#6C3AE0' : '#EAE6FF',
        borderLeftColor:   pct > 75  ? '#6C3AE0' : '#EAE6FF',
      }]} />
      <View style={ring.inner}>
        <Text style={ring.label}>{done}/{total}</Text>
      </View>
    </View>
  );
}

const ring = StyleSheet.create({
  wrap:  { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  track: { position: 'absolute', width: 52, height: 52, borderRadius: 26, borderWidth: 4, borderColor: '#EAE6FF' },
  fill:  { position: 'absolute', width: 52, height: 52, borderRadius: 26, borderWidth: 4, transform: [{ rotate: '-45deg' }] },
  inner: { alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: 'Poppins-Bold', fontSize: 12, color: '#6C3AE0' },
});

// ── Main screen ────────────────────────────────────────────────────────────────
export default function ActivityBreakScreen() {
  const route      = useRoute();
  const navigation = useNavigation<any>();
  const { type }   = (route.params as any) ?? { type: 'stretch' };
  const config     = CONFIGS[type] ?? CONFIGS.stretch;

  const totalSteps   = Math.ceil(config.duration / 60);
  const [timeLeft,   setTimeLeft]   = useState(config.duration);
  const [isActive,   setIsActive]   = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Bounce animation for the illustration
  const bounceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isFinished) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -12, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0,   duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    } else {
      bounceAnim.setValue(0);
    }
  }, [isFinished]);

  // Countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !isFinished) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft, isFinished]);

  const completedSteps = totalSteps - Math.ceil(timeLeft / 60);
  const displayDone    = isFinished ? totalSteps : completedSteps;

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── HEADER: back arrow | title | progress ring ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{config.title}</Text>

        {/* Circular step counter — "5/5" in purple ring */}
        <ProgressRing done={displayDone} total={totalSteps} />
      </View>

      {/* ── ILLUSTRATION AREA ── */}
      <View style={styles.illustrationArea}>
        <Animated.View style={[styles.characterCircle, { backgroundColor: config.bgColor, transform: [{ translateY: bounceAnim }] }]}>
          <ActiveBreakIllustration width={220} height={220} />
        </Animated.View>
      </View>

      {/* ── BOTTOM SECTION ── */}
      <View style={styles.bottomSection}>
        {isFinished ? (
          /* ── Completed: "Great Job!" ── */
          <View style={styles.completedBox}>
            <Text style={styles.completedTitle}>Great Job!</Text>
            <Text style={styles.completedSub}>You completed this break.</Text>
            <Text style={styles.pointsText}>+ {config.points} Points</Text>
          </View>
        ) : (
          /* ── In-progress: timer ── */
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{mm}:{ss}</Text>
            <Text style={styles.timerLabel}>remaining</Text>
          </View>
        )}

        {/* Finish / Skip button */}
        <TouchableOpacity
          style={styles.finishBtn}
          activeOpacity={0.85}
          onPress={() => {
            if (isFinished) {
              navigation.goBack();
            } else {
              setIsActive(false);
              setIsFinished(true);
              setTimeLeft(0);
            }
          }}
        >
          <Text style={styles.finishBtnText}>{isFinished ? 'Finish' : 'Skip'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header row
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#F5F3FF',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold', fontSize: 18, color: '#1A1A2E',
    flex: 1, textAlign: 'center', marginHorizontal: 8,
  },

  // Illustration
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  characterCircle: {
    width: width * 0.7,
    height: width * 0.8,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Completed
  completedBox:   { alignItems: 'center', marginBottom: 28 },
  completedTitle: { fontFamily: 'Poppins-Bold',    fontSize: 28, color: '#1A1A2E', marginBottom: 6 },
  completedSub:   { fontFamily: 'Poppins-Regular', fontSize: 15, color: '#9890B8', marginBottom: 10 },
  pointsText:     { fontFamily: 'Poppins-Bold',    fontSize: 18, color: '#F59E0B' },

  // Timer
  timerBox:   { alignItems: 'center', marginBottom: 28 },
  timerText:  { fontFamily: 'Poppins-Bold',    fontSize: 48, color: '#1A1A2E', lineHeight: 56 },
  timerLabel: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9890B8' },

  // Finish / Skip button — full width purple
  finishBtn: {
    backgroundColor: '#6C3AE0',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#6C3AE0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  finishBtnText: { fontFamily: 'Poppins-Bold', fontSize: 17, color: '#FFFFFF' },
});
