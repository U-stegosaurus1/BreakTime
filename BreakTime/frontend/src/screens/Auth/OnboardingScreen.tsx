import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    subtitle: 'Small breaks. Big changes.',
    icon: 'human-handsup',
    isIntro: true,
  },
  {
    id: '2',
    titleLine1: 'Take Breaks,\n',
    titleLine2: 'Level Up!',
    subtitle: 'Short breaks improve your health, focus, and productivity.',
    icon: 'trophy-award',
    isIntro: false,
  },
  {
    id: '3',
    titleLine1: 'Track Progress,\n',
    titleLine2: 'Stay Motivated!',
    subtitle: 'Complete goals, earn points, and build healthy habits.',
    icon: 'chart-bar',
    isIntro: false,
  },
  {
    id: '4',
    titleLine1: 'Stay Active,\n',
    titleLine2: 'Feel Great!',
    subtitle: 'Move more throughout the day to boost your energy levels.',
    icon: 'run',
    isIntro: false,
  }
];

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.round(x / width));
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  const renderSlide = ({ item, index }: any) => {
    if (item.isIntro) {
      return (
        <View style={styles.slide}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../../assets/images/splash-illustration.png')} 
              style={styles.backgroundImage} 
              resizeMode="contain" 
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.logoRow}>
              <Image source={require('../../../assets/logo/breaktime-logo.png')} style={{ width: 40, height: 40, marginRight: 8, resizeMode: 'contain' }} />
              <Text style={styles.brandTitle}>Break<Text style={{ color: '#00D084' }}>Time</Text></Text>
            </View>
            <Text style={styles.introSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#635BFF' }]} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={[styles.linkText, { color: '#635BFF' }]}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <View style={styles.textContainerTop}>
          <Text style={styles.title}>
            {item.titleLine1}
            <Text style={{ color: '#635BFF' }}>{item.titleLine2}</Text>
          </Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.illustrationContainerCentered}>
          <View style={styles.mockIllustration}>
            <Icon name={item.icon} size={150} color="#635BFF" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      />

      {/* Bottom Nav (Hidden on first intro slide) */}
      {currentIndex > 0 && (
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.dotsRow}>
            {SLIDES.slice(1).map((_, i) => (
              <View key={i} style={[styles.dot, i === currentIndex - 1 ? styles.dotActive : styles.dotInactive]} />
            ))}
          </View>

          <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA', // Matches mockup
  },
  slide: {
    width,
    flex: 1,
  },
  illustrationContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  illustrationContainerCentered: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockIllustration: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#EAE6FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.8,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  textContainerTop: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#1A1A2E',
    marginLeft: 8,
  },
  introSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#9890B8',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#1A1A2E',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#9890B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#635BFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  linkText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#635BFF',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    height: 100,
  },
  skipBtn: {
    paddingVertical: 12,
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1A2E',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: { width: 24, backgroundColor: '#635BFF' },
  dotInactive: { backgroundColor: '#EAE6FF' },
  nextBtn: {
    backgroundColor: '#635BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  nextText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
