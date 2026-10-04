import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

/* ── Stylized stretching figure brand icon with high-contrast colors ── */
function SplashLogo({ size = 42 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Crisp white light contour under-layer matching the text rim */}
      <Circle cx="15" cy="9.5" r="5.6" fill="rgba(255, 255, 255, 0.95)" />
      <Path
        d="M14 20 C18 19, 25 16.5, 34 12"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="6.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M17 19 C15 25, 12 32, 10 38"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="6.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M16 26 C20 28, 23 33, 27 38"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="6.8"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M14 21 C10 24, 7.5 26, 9.5 28.5"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="5.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bright, luminous violet figure — pops effortlessly off dark/black trousers */}
      <Circle cx="15" cy="9.5" r="4.8" fill="#A78BFA" />
      <Path
        d="M14 20 C18 19, 25 16.5, 34 12"
        stroke="#A78BFA"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M17 19 C15 25, 12 32, 10 38"
        stroke="#A78BFA"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M16 26 C20 28, 23 33, 27 38"
        stroke="#A78BFA"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M14 21 C10 24, 7.5 26, 9.5 28.5"
        stroke="#A78BFA"
        strokeWidth="4.2"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // Responsive sizing for compact vs tall screens
  const isCompact = height < 720;
  const isTablet = width > 500;

  /* ── Entrance animations ── */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dynamicBottomInset = Math.max(insets.bottom + (isCompact ? 8 : 16), 28);

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* ═══════════════════════════════════════════════════════════════
          FULL-SCREEN HERO IMAGE — 100% crystal clear, unblurred,
          natural saturation, zero overlays or fogs
          ═══════════════════════════════════════════════════════════════ */}
      <Image
        source={require('../../../assets/illustrations/splash_photo.jpg')}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT LAYER — sharp, clean branding + CTAs (no blurs)
          ═══════════════════════════════════════════════════════════════ */}
      <View
        style={[
          styles.contentLayer,
          {
            paddingBottom: dynamicBottomInset,
            paddingHorizontal: isTablet ? 40 : 28,
          },
        ]}
      >
        <View style={styles.spacer} />

        <Animated.View
          style={[
            styles.bottomContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* ── Logo Row: Crisp, sharp icon + typography ── */}
          <View style={[styles.logoContainer, isCompact && styles.logoContainerCompact]}>
            <View style={styles.logoRow}>
              <SplashLogo size={isCompact ? 36 : 42} />
              <Text style={[styles.brandText, isCompact && styles.brandTextCompact]}>
                <Text style={styles.breakWord}>Break</Text>
                <Text style={styles.timeWord}>Time</Text>
              </Text>
            </View>
          </View>

          {/* ── Tagline: Small breaks. Big changes. ── */}
          <Text style={[styles.tagline, isCompact && styles.taglineCompact]}>
            Small breaks. Big changes.
          </Text>

          {/* ── Primary Action: Get Started Button ── */}
          <TouchableOpacity
            style={[styles.getStartedBtn, isCompact && styles.getStartedBtnCompact]}
            activeOpacity={0.88}
            onPress={() => navigation.navigate('Onboarding')}
          >
            <Text style={[styles.getStartedText, isCompact && styles.getStartedTextCompact]}>
              Get Started
            </Text>
          </TouchableOpacity>

          {/* ── Secondary Action: I already have an account ── */}
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={[styles.loginLink, isCompact && styles.loginLinkCompact]}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ── Root container ── */
  root: {
    flex: 1,
    backgroundColor: '#EDE8F5',
  },

  /* ── Crystal clear, unblurred full-screen hero image ── */
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  /* ── Foreground interactive content ── */
  contentLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },

  spacer: {
    flex: 1,
  },

  bottomContent: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    alignItems: 'center',
  },

  /* ── Logo row: sharp and clear with zero blur ── */
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoContainerCompact: {
    marginBottom: 4,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 6,
    elevation: 4,
  },

  brandText: {
    fontSize: 38,
    letterSpacing: -0.5,
  },
  brandTextCompact: {
    fontSize: 32,
  },

  breakWord: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontWeight: '800',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  timeWord: {
    fontFamily: 'Poppins-Bold',
    color: '#05DF72',
    fontWeight: '800',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  /* ── Tagline: Crisp text with clean 1px offset ── */
  tagline: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.25,
    marginTop: 2,
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  taglineCompact: {
    fontSize: 14.5,
    marginBottom: 16,
  },

  /* ── Primary CTA: Clean solid green pill button ── */
  getStartedBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#05DF72',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  getStartedBtnCompact: {
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
  },
  getStartedText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  getStartedTextCompact: {
    fontSize: 16.5,
  },

  /* ── Secondary CTA: Crisp white text ── */
  loginContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loginLink: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  loginLinkCompact: {
    fontSize: 14,
  },
});
