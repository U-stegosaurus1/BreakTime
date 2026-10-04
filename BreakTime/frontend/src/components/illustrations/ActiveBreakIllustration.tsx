import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Circle, Ellipse, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

interface Props {
  width?: number;
  height?: number;
}

/**
 * SVG illustration for the Active Break Screen.
 * Recreates: A person doing a side stretch (identical pose to splash but slightly different angle),
 * purple top, dark pants, white shoes, light teal/green background environment.
 */
export default function ActiveBreakIllustration({ width = SCREEN_W * 0.65, height = SCREEN_W * 0.7 }: Props) {
  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 300 340" fill="none">
        <Defs>
          <LinearGradient id="abBg" x1="0" y1="0" x2="300" y2="340">
            <Stop offset="0" stopColor="#E6FFF5" />
            <Stop offset="1" stopColor="#F0FFFE" />
          </LinearGradient>
        </Defs>

        {/* Shadow under person */}
        <Ellipse cx="150" cy="320" rx="55" ry="8" fill="#C8E0D8" opacity={0.4} />

        {/* ═══ PERSON — Side stretch ═══ */}
        <G>
          {/* === LEGS (dark navy pants) === */}
          <Path
            d="M135 255 C133 275, 128 300, 125 312"
            stroke="#1A1A2E"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M160 255 C162 275, 167 300, 170 312"
            stroke="#1A1A2E"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* === SHOES (white) === */}
          <Ellipse cx="122" cy="318" rx="16" ry="7" fill="#FFFFFF" />
          <Ellipse cx="173" cy="318" rx="16" ry="7" fill="#FFFFFF" />
          <Path d="M108 320 Q122 327, 136 320" stroke="#D0D0D0" strokeWidth="1.5" fill="none" />
          <Path d="M159 320 Q173 327, 187 320" stroke="#D0D0D0" strokeWidth="1.5" fill="none" />

          {/* === TORSO (purple top) === */}
          <Path
            d="M125 165 C123 190, 122 220, 128 245 C132 258, 165 258, 168 245 C174 220, 173 190, 170 165 Z"
            fill="#7B5EC6"
          />
          
          {/* Stretch curve on torso */}
          <Path
            d="M130 175 C128 200, 126 230, 130 248"
            stroke="#6A4EB5"
            strokeWidth="2"
            fill="none"
            opacity={0.3}
          />

          {/* === LEFT ARM (resting on hip) === */}
          <Path
            d="M125 180 C115 190, 105 200, 100 205"
            stroke="#7B5EC6"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx="98" cy="207" r="7" fill="#E8C4A0" />

          {/* === RIGHT ARM (raised above head in stretch) === */}
          <Path
            d="M170 175 C180 155, 195 130, 210 105"
            stroke="#7B5EC6"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx="213" cy="100" r="8" fill="#E8C4A0" />

          {/* === NECK === */}
          <Rect x="140" y="148" width="16" height="20" rx="6" fill="#E8C4A0" />

          {/* === HEAD === */}
          <Circle cx="148" cy="130" r="32" fill="#E8C4A0" />

          {/* === HAIR (dark, slightly wavy) === */}
          <Path
            d="M118 120 C118 98, 135 82, 152 82 C169 82, 182 96, 182 118 C182 106, 172 92, 152 89 C132 92, 120 106, 118 120 Z"
            fill="#2D2D3D"
          />
          <Path d="M118 120 C116 126, 115 134, 118 138" stroke="#2D2D3D" strokeWidth="7" strokeLinecap="round" fill="none" />
          <Path d="M148 83 C152 74, 164 72, 172 78" stroke="#2D2D3D" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* === FACE === */}
          <Circle cx="138" cy="128" r="3.5" fill="#2D2D3D" />
          <Circle cx="160" cy="128" r="3.5" fill="#2D2D3D" />
          <Circle cx="139" cy="127" r="1.2" fill="#FFFFFF" />
          <Circle cx="161" cy="127" r="1.2" fill="#FFFFFF" />
          <Path d="M140 140 Q148 148, 158 140" stroke="#2D2D3D" strokeWidth="2" strokeLinecap="round" fill="none" />
          <Path d="M133 122 Q138 118, 143 122" stroke="#2D2D3D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <Path d="M155 122 Q160 118, 165 122" stroke="#2D2D3D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <Ellipse cx="132" cy="135" rx="5" ry="3" fill="#F5B0A0" opacity={0.3} />
          <Ellipse cx="165" cy="135" rx="5" ry="3" fill="#F5B0A0" opacity={0.3} />
        </G>
      </Svg>
    </View>
  );
}
