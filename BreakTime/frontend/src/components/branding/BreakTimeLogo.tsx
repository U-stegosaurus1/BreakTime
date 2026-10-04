import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface Props {
  size?: number;
}

/** The purple stylized stretching-person logo icon from the reference design */
function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Head */}
      <Circle cx="16" cy="10" r="4.5" fill="#6C3AE0" />
      
      {/* Upper body & raised right arm reaching up-right */}
      <Path
        d="M14 20 C18 19, 26 17, 34 13"
        stroke="#6C3AE0"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Torso & left leg */}
      <Path
        d="M17 19 C15 25, 12 32, 11 37"
        stroke="#6C3AE0"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right leg stretching out */}
      <Path
        d="M16 26 C20 28, 24 33, 26 37"
        stroke="#6C3AE0"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left arm bent to hip */}
      <Path
        d="M14 21 C10 24, 8 26, 10 28"
        stroke="#6C3AE0"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export default function BreakTimeLogo({ size = 32 }: Props) {
  return (
    <View style={styles.row}>
      <LogoIcon size={size * 1.15} />
      <Text style={[styles.text, { fontSize: size }]}>
        <Text style={styles.breakWord}>Break</Text>
        <Text style={styles.timeWord}>Time</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    letterSpacing: -0.5,
  },
  breakWord: {
    fontFamily: 'Poppins-Bold',
    color: '#0F172A',
    fontWeight: '800',
  },
  timeWord: {
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
    fontWeight: '800',
  },
});
