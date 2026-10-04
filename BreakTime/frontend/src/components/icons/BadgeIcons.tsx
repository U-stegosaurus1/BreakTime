import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface BadgeProps {
  size?: number;
  earned?: boolean;
}

/** Starter badge — green star on purple circle */
export function StarterBadge({ size = 64, earned = true }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#6C3AE0" stroke="#5533B8" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#7B5EC6" />
      <Path
        d="M40 18 L45 30 L58 30 L48 38 L51 50 L40 43 L29 50 L32 38 L22 30 L35 30 Z"
        fill="#FFD54F"
      />
    </Svg>
  );
}

/** 7 Day Streak badge — flame on orange circle */
export function StreakBadge({ size = 64, earned = true }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#FF6B35" stroke="#E05500" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#FF8A50" />
      <Path
        d="M40 16 C40 16, 28 28, 28 38 C28 46, 33 52, 40 52 C47 52, 52 46, 52 38 C52 28, 40 16, 40 16 Z"
        fill="#FFD54F"
      />
      <Path
        d="M40 30 C40 30, 34 36, 34 42 C34 46, 36.5 48, 40 48 C43.5 48, 46 46, 46 42 C46 36, 40 30, 40 30 Z"
        fill="#FFFFFF"
        opacity={0.6}
      />
    </Svg>
  );
}

/** Early Bird badge — sun/sunrise on purple circle */
export function EarlyBirdBadge({ size = 64, earned = true }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#9B59B6" stroke="#7D3C98" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#AF7AC5" />
      {/* Person icon */}
      <Circle cx="40" cy="28" r="7" fill="#FFFFFF" />
      <Path d="M30 55 C30 45, 34 40, 40 40 C46 40, 50 45, 50 55" fill="#FFFFFF" />
      {/* Movement lines */}
      <Path d="M26 32 L20 28" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
      <Path d="M54 32 L60 28" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
      <Path d="M40 18 L40 12" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

/** 14 Day Streak badge — double flame (locked style) */
export function Streak14Badge({ size = 64, earned = false }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#4A5568" stroke="#2D3748" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#5A6578" />
      <Path
        d="M40 16 C40 16, 28 28, 28 38 C28 46, 33 52, 40 52 C47 52, 52 46, 52 38 C52 28, 40 16, 40 16 Z"
        fill="#718096"
      />
      <Path
        d="M40 30 C40 30, 34 36, 34 42 C34 46, 36.5 48, 40 48 C43.5 48, 46 46, 46 42 C46 36, 40 30, 40 30 Z"
        fill="#A0AEC0"
        opacity={0.5}
      />
    </Svg>
  );
}

/** 30 Day Streak badge (locked style) */
export function Streak30Badge({ size = 64, earned = false }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#4A5568" stroke="#2D3748" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#5A6578" />
      <Path
        d="M32 18 C32 18, 22 28, 22 36 C22 42, 26 46, 32 46 C38 46, 42 42, 42 36 C42 28, 32 18, 32 18 Z"
        fill="#718096"
      />
      <Path
        d="M48 22 C48 22, 38 32, 38 40 C38 46, 42 50, 48 50 C54 50, 58 46, 58 40 C58 32, 48 22, 48 22 Z"
        fill="#718096"
      />
    </Svg>
  );
}

/** Marathon badge — person running (locked style) */
export function MarathonBadge({ size = 64, earned = false }: BadgeProps) {
  const opacity = earned ? 1 : 0.35;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" opacity={opacity}>
      <Circle cx="40" cy="40" r="38" fill="#4A5568" stroke="#2D3748" strokeWidth="3" />
      <Circle cx="40" cy="40" r="30" fill="#5A6578" />
      {/* Running person */}
      <Circle cx="40" cy="24" r="6" fill="#A0AEC0" />
      <Path d="M40 30 L40 42" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
      <Path d="M40 34 L32 40" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
      <Path d="M40 34 L48 28" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
      <Path d="M40 42 L34 52" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
      <Path d="M40 42 L48 50" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}
