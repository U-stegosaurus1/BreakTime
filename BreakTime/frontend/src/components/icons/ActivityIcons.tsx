import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IconProps {
  size?: number;
}

/** Walking person icon — for Home quick actions and Challenges */
export function WalkIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="5" r="3.5" fill="#6C3AE0" />
      <Path d="M16 10 L16 20" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M16 14 L10 18" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M16 14 L22 18" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M16 20 L12 28" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M16 20 L20 28" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

/** Stretching person icon — for Home quick actions */
export function StretchIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="14" cy="5" r="3.5" fill="#7B5EC6" />
      <Path d="M14 10 L14 22" stroke="#7B5EC6" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M14 13 L8 17" stroke="#7B5EC6" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M14 12 L24 5" stroke="#7B5EC6" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M14 22 L10 29" stroke="#7B5EC6" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M14 22 L18 29" stroke="#7B5EC6" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

/** Bar chart / stats icon — for Home quick actions */
export function StatsIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Rect x="4" y="18" width="6" height="12" rx="2" fill="#6C3AE0" />
      <Rect x="13" y="10" width="6" height="20" rx="2" fill="#9B7FE6" />
      <Rect x="22" y="4" width="6" height="26" rx="2" fill="#6C3AE0" />
    </Svg>
  );
}

/** Water droplet icon — for Home quick actions */
export function WaterIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 3 C16 3, 6 15, 6 21 C6 26.5, 10.5 30, 16 30 C21.5 30, 26 26.5, 26 21 C26 15, 16 3, 16 3 Z"
        fill="#4FC3F7"
      />
      <Path
        d="M12 20 C12 20, 11 24, 14 26"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />
    </Svg>
  );
}

/** Fire/streak icon — for Home screen */
export function FireIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 2 C16 2, 8 10, 8 18 C8 23, 11.5 28, 16 28 C20.5 28, 24 23, 24 18 C24 10, 16 2, 16 2 Z"
        fill="#FF6B35"
      />
      <Path
        d="M16 12 C16 12, 12 17, 12 21 C12 24, 13.8 26, 16 26 C18.2 26, 20 24, 20 21 C20 17, 16 12, 16 12 Z"
        fill="#FFD54F"
      />
    </Svg>
  );
}

/** Coin/points icon — for Home screen */
export function CoinIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="14" fill="#FFB300" />
      <Circle cx="16" cy="16" r="11" fill="#FFD54F" />
      <Path d="M14 10 L18 10 L16 16 L19 16 L13 24 L15 18 L12 18 Z" fill="#FF8F00" />
    </Svg>
  );
}

/** Footsteps icon — for Challenges */
export function FootstepsIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path d="M10 8 C10 5, 12 3, 14 3 C16 3, 17 5, 16 8 C15 11, 12 12, 10 8 Z" fill="#6C3AE0" />
      <Path d="M18 16 C18 13, 20 11, 22 11 C24 11, 25 13, 24 16 C23 19, 20 20, 18 16 Z" fill="#6C3AE0" />
      <Circle cx="8" cy="14" r="2" fill="#6C3AE0" opacity={0.6} />
      <Circle cx="6" cy="11" r="1.5" fill="#6C3AE0" opacity={0.5} />
      <Circle cx="16" cy="22" r="2" fill="#6C3AE0" opacity={0.6} />
      <Circle cx="14" cy="19" r="1.5" fill="#6C3AE0" opacity={0.5} />
    </Svg>
  );
}

/** Stairs icon — for Challenges */
export function StairsIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path d="M4 28 L4 20 L12 20 L12 12 L20 12 L20 4 L28 4" stroke="#6C3AE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

/** Clock/Timer icon — for Stats */
export function TimerIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="18" r="12" stroke="#6C3AE0" strokeWidth="2.5" fill="none" />
      <Path d="M16 10 L16 18 L22 18" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M13 3 L19 3" stroke="#6C3AE0" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

/** Calories / fire small icon — for Stats */
export function CaloriesIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 4 C16 4, 8 12, 8 19 C8 24, 11.5 28, 16 28 C20.5 28, 24 24, 24 19 C24 12, 16 4, 16 4 Z"
        fill="#FF6B35"
      />
      <Path
        d="M16 14 C16 14, 12 18, 12 22 C12 24.5, 13.8 26.5, 16 26.5 C18.2 26.5, 20 24.5, 20 22 C20 18, 16 14, 16 14 Z"
        fill="#FFD54F"
      />
    </Svg>
  );
}

/** Breaks count icon — for Stats */
export function BreaksIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="12" fill="#EAE6FF" />
      <Path d="M11 16 L15 20 L22 12" stroke="#6C3AE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

/** Steps / shoe icon — for Stats */
export function StepsIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M10 8 C8 4, 12 2, 15 4 C17 6, 16 10, 13 12 C10 14, 8 12, 10 8 Z"
        fill="#6C3AE0"
      />
      <Path
        d="M18 18 C16 14, 20 12, 23 14 C25 16, 24 20, 21 22 C18 24, 16 22, 18 18 Z"
        fill="#6C3AE0"
      />
      <Circle cx="7" cy="13" r="2" fill="#9B7FE6" />
      <Circle cx="5.5" cy="10" r="1.5" fill="#9B7FE6" />
      <Circle cx="15" cy="23" r="2" fill="#9B7FE6" />
      <Circle cx="13.5" cy="20" r="1.5" fill="#9B7FE6" />
    </Svg>
  );
}

/** Default avatar — for Leaderboard and Profile */
export function AvatarIcon({ size = 48, bgColor = '#EAE6FF', personColor = '#6C3AE0' }: IconProps & { bgColor?: string; personColor?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx="24" cy="24" r="24" fill={bgColor} />
      <Circle cx="24" cy="18" r="8" fill={personColor} />
      <Path
        d="M10 42 C10 34, 16 28, 24 28 C32 28, 38 34, 38 42"
        fill={personColor}
      />
    </Svg>
  );
}
