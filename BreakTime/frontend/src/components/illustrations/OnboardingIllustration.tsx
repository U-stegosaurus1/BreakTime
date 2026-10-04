import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Circle, Ellipse, Rect, G, Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

interface Props {
  width?: number;
  height?: number;
}

/**
 * SVG illustration for the Onboarding Screen.
 * Recreates: A golden trophy with a star, a purple game controller on the left,
 * a purple ball/orb on the right, plus decorative stars and confetti.
 */
export default function OnboardingIllustration({ width = SCREEN_W * 0.7, height = SCREEN_W * 0.7 }: Props) {
  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 300 300" fill="none">
        <Defs>
          <LinearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD54F" />
            <Stop offset="0.5" stopColor="#FFC107" />
            <Stop offset="1" stopColor="#FF8F00" />
          </LinearGradient>
          <LinearGradient id="trophyDark" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#F9A825" />
            <Stop offset="1" stopColor="#E65100" />
          </LinearGradient>
        </Defs>

        {/* Decorative small stars */}
        <Path d="M50 40 L52 46 L58 46 L53 50 L55 56 L50 52 L45 56 L47 50 L42 46 L48 46 Z" fill="#6C3AE0" opacity={0.4} />
        <Path d="M250 50 L251.5 54 L256 54 L252.5 57 L254 61 L250 58 L246 61 L247.5 57 L244 54 L248.5 54 Z" fill="#FFD54F" opacity={0.6} />
        <Path d="M70 250 L71.5 254 L76 254 L72.5 257 L74 261 L70 258 L66 261 L67.5 257 L64 254 L68.5 254 Z" fill="#6C3AE0" opacity={0.3} />
        <Path d="M230 240 L231.5 244 L236 244 L232.5 247 L234 251 L230 248 L226 251 L227.5 247 L224 244 L228.5 244 Z" fill="#FFD54F" opacity={0.5} />
        
        {/* Small decorative circles/confetti */}
        <Circle cx="40" cy="120" r="4" fill="#E8E4FF" />
        <Circle cx="260" cy="130" r="3" fill="#FFE0B2" />
        <Circle cx="90" cy="60" r="3" fill="#D0CAE8" />
        <Circle cx="210" cy="70" r="4" fill="#E8E4FF" />
        <Circle cx="55" cy="200" r="3" fill="#FFE0B2" />
        <Circle cx="245" cy="190" r="3" fill="#D0CAE8" />

        {/* ═══ GAME CONTROLLER (left side) ═══ */}
        <G>
          {/* Controller body */}
          <Path
            d="M30 140 C30 125, 50 115, 70 118 L80 120 C85 121, 90 125, 90 130 L92 150 C93 160, 85 168, 75 168 L45 168 C35 168, 27 160, 28 150 Z"
            fill="#6C3AE0"
          />
          {/* Left stick (D-pad) */}
          <Rect x="42" y="133" width="14" height="4" rx="1" fill="#E8E4FF" />
          <Rect x="47" y="128" width="4" height="14" rx="1" fill="#E8E4FF" />
          {/* Right buttons */}
          <Circle cx="75" cy="135" r="3" fill="#FFD54F" />
          <Circle cx="82" cy="140" r="3" fill="#FF6B6B" />
          {/* Joysticks bumps */}
          <Circle cx="50" cy="152" r="5" fill="#5533B8" />
          <Circle cx="72" cy="152" r="5" fill="#5533B8" />
        </G>

        {/* ═══ TROPHY (center) ═══ */}
        <G>
          {/* Trophy base */}
          <Rect x="120" y="240" width="60" height="12" rx="3" fill="#3D2C1A" />
          <Rect x="130" y="232" width="40" height="12" rx="2" fill="#5D4030" />
          
          {/* Trophy stem */}
          <Rect x="142" y="210" width="16" height="26" rx="3" fill="url(#trophyDark)" />

          {/* Trophy cup body */}
          <Path
            d="M110 120 C110 100, 120 95, 150 95 C180 95, 190 100, 190 120 L185 185 C183 200, 170 210, 150 210 C130 210, 117 200, 115 185 Z"
            fill="url(#trophyGold)"
          />
          {/* Shine highlight on cup */}
          <Path
            d="M125 110 C125 105, 135 100, 145 100 L145 180 C135 178, 125 170, 123 160 Z"
            fill="#FFE082"
            opacity={0.4}
          />
          
          {/* Left handle */}
          <Path
            d="M110 120 C95 120, 88 135, 90 150 C92 165, 100 170, 112 165"
            stroke="url(#trophyGold)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right handle */}
          <Path
            d="M190 120 C205 120, 212 135, 210 150 C208 165, 200 170, 188 165"
            stroke="url(#trophyGold)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          {/* Star on the trophy */}
          <Path
            d="M150 125 L156 142 L174 142 L160 153 L165 170 L150 160 L135 170 L140 153 L126 142 L144 142 Z"
            fill="#FFFFFF"
            opacity={0.9}
          />
        </G>

        {/* ═══ PURPLE ORB (right side) ═══ */}
        <G>
          <Circle cx="245" cy="155" r="25" fill="#7B5EC6" />
          <Circle cx="245" cy="155" r="18" fill="#9B7FE6" opacity={0.5} />
          {/* Shine */}
          <Circle cx="238" cy="148" r="6" fill="#B8A4F0" opacity={0.5} />
          {/* Small star on orb */}
          <Path
            d="M245 145 L247 150 L252 150 L248 153 L249 158 L245 155 L241 158 L242 153 L238 150 L243 150 Z"
            fill="#FFFFFF"
            opacity={0.7}
          />
        </G>
      </Svg>
    </View>
  );
}
