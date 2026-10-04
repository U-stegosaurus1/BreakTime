import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Rect,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

interface Props {
  width?: number;
  height?: number;
}

/**
 * BreakTime Splash Screen Vector Illustration
 * Exact 100% faithful recreation of the reference screenshot:
 * - Background: pale soft lilac room with large window panes & window sill/bench
 * - Wall clocks: upper-left small round clock, upper-right larger round clock
 * - Potted plants: left and right lavender pots with layered lilac/lavender leaves
 * - Floor: light lavender rectangular mat with soft shadow ovals under shoes
 * - Character: young adult in purple hoodie with drawstrings & kangaroo pocket doing side stretch,
 *   curly dark navy hair, joyful open smile showing white teeth, rosy cheeks,
 *   right arm curved overhead to left, left hand on hip, dark navy pants, white sneakers with laces
 */
export default function SplashIllustration({
  width = SCREEN_W * 0.9,
  height = SCREEN_W * 1.05,
}: Props) {
  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 360 420" fill="none">
        <Defs>
          {/* Subtle room depth gradient */}
          <LinearGradient id="wallWash" x1="0" y1="0" x2="0" y2="420" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <Stop offset="60%" stopColor="#F7F5FE" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#EDE6FA" stopOpacity="0.95" />
          </LinearGradient>

          {/* Hoodie purple gradient */}
          <LinearGradient id="hoodiePurple" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#7E56F5" />
            <Stop offset="50%" stopColor="#6C3FE2" />
            <Stop offset="100%" stopColor="#5829D4" />
          </LinearGradient>

          {/* Plant leaves gradient */}
          <LinearGradient id="plantLeafGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#D9D0F8" />
            <Stop offset="100%" stopColor="#B3A2E8" />
          </LinearGradient>
          <LinearGradient id="plantLeafDark" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#C4B5F0" />
            <Stop offset="100%" stopColor="#9C88DC" />
          </LinearGradient>

          {/* Soft floor shadow */}
          <RadialGradient id="floorShad" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#C8BEE8" stopOpacity="0.9" />
            <Stop offset="65%" stopColor="#DCD4F5" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#EFEAFC" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* ═══════════════════════════════════════════════════
            1. BACKGROUND: WINDOW PANES & SILL
        ═══════════════════════════════════════════════════ */}
        {/* Soft atmospheric background fill */}
        <Rect x="0" y="0" width="360" height="420" fill="url(#wallWash)" />

        {/* Faint Window structure */}
        <G opacity={0.4}>
          {/* Vertical mullions */}
          <Rect x="110" y="110" width="3.5" height="150" rx="1.5" fill="#BFAEE8" />
          <Rect x="250" y="110" width="3.5" height="150" rx="1.5" fill="#BFAEE8" />
          {/* Horizontal transom bars */}
          <Rect x="90" y="160" width="180" height="3" rx="1.5" fill="#BFAEE8" />
          <Rect x="90" y="215" width="180" height="3" rx="1.5" fill="#BFAEE8" />
        </G>

        {/* Window Sill / Bench */}
        <Rect x="85" y="258" width="190" height="18" rx="4" fill="#DDD5F5" opacity={0.8} />
        <Rect x="88" y="256" width="184" height="6" rx="3" fill="#EBE4FA" />

        {/* ═══════════════════════════════════════════════════
            2. WALL CLOCKS (Upper-Left & Upper-Right)
        ═══════════════════════════════════════════════════ */}
        {/* Upper-Left Clock */}
        <G id="clockLeft">
          <Circle cx="76" cy="98" r="23" fill="#FFFFFF" stroke="#D7CEF2" strokeWidth="2.5" />
          <Circle cx="76" cy="98" r="19" fill="#FAF9FE" />
          {/* Faint hour ticks */}
          <Circle cx="76" cy="82" r="1" fill="#C2B2EA" />
          <Circle cx="76" cy="114" r="1" fill="#C2B2EA" />
          <Circle cx="60" cy="98" r="1" fill="#C2B2EA" />
          <Circle cx="92" cy="98" r="1" fill="#C2B2EA" />
          {/* Hands */}
          <Path d="M76 98 L67 87" stroke="#251E45" strokeWidth="2.2" strokeLinecap="round" />
          <Path d="M76 98 L85 90" stroke="#251E45" strokeWidth="1.8" strokeLinecap="round" />
          <Circle cx="76" cy="98" r="2.2" fill="#6C3FE2" />
        </G>

        {/* Upper-Right Larger Clock */}
        <G id="clockRight">
          <Circle cx="298" cy="88" r="29" fill="#FFFFFF" stroke="#D7CEF2" strokeWidth="3" />
          <Circle cx="298" cy="88" r="25" fill="#FAF9FE" />
          {/* Tick marks around perimeter */}
          <Circle cx="298" cy="67" r="1.3" fill="#A894E2" />
          <Circle cx="298" cy="109" r="1.3" fill="#A894E2" />
          <Circle cx="277" cy="88" r="1.3" fill="#A894E2" />
          <Circle cx="319" cy="88" r="1.3" fill="#A894E2" />
          <Circle cx="283" cy="73" r="1" fill="#C2B2EA" />
          <Circle cx="313" cy="73" r="1" fill="#C2B2EA" />
          <Circle cx="283" cy="103" r="1" fill="#C2B2EA" />
          <Circle cx="313" cy="103" r="1" fill="#C2B2EA" />
          {/* Hands */}
          <Path d="M298 88 L287 75" stroke="#251E45" strokeWidth="2.5" strokeLinecap="round" />
          <Path d="M298 88 L312 79" stroke="#251E45" strokeWidth="2.2" strokeLinecap="round" />
          <Circle cx="298" cy="88" r="2.6" fill="#6C3FE2" />
        </G>

        {/* ═══════════════════════════════════════════════════
            3. FLOOR MAT & SHADOWS
        ═══════════════════════════════════════════════════ */}
        {/* Lavender Perspective Floor Rug / Mat */}
        <Path
          d="M62 308 L298 308 L316 332 L44 332 Z"
          fill="#E7DFF7"
          opacity={0.8}
        />

        {/* Character foot shadow ovals */}
        <Ellipse cx="160" cy="350" rx="24" ry="7" fill="url(#floorShad)" />
        <Ellipse cx="224" cy="350" rx="24" ry="7" fill="url(#floorShad)" />
        {/* Broad floor ambient shadow */}
        <Ellipse cx="192" cy="348" rx="80" ry="12" fill="url(#floorShad)" opacity={0.6} />

        {/* ═══════════════════════════════════════════════════
            4. POTTED PLANTS (Left & Right)
        ═══════════════════════════════════════════════════ */}
        {/* Left Plant */}
        <G id="leftPlant">
          {/* Pot floor shadow */}
          <Ellipse cx="58" cy="328" rx="22" ry="6" fill="#D2C6F2" opacity={0.7} />
          {/* Plant Leaves */}
          <Path d="M58 280 C42 256, 36 232, 42 215 C54 220, 58 245, 58 280 Z" fill="url(#plantLeafGrad)" />
          <Path d="M58 280 C50 250, 54 220, 68 202 C75 218, 72 250, 58 280 Z" fill="url(#plantLeafDark)" />
          <Path d="M58 280 C70 255, 84 235, 94 222 C90 242, 76 264, 58 280 Z" fill="#9C88DC" />
          <Path d="M58 280 C36 270, 28 252, 32 242 C44 246, 52 262, 58 280 Z" fill="#B3A2E8" />
          {/* Leaf center veins */}
          <Path d="M44 224 Q52 248, 58 280" stroke="#846DC9" strokeWidth="1.2" opacity={0.4} fill="none" />
          <Path d="M66 210 Q62 242, 58 280" stroke="#846DC9" strokeWidth="1.2" opacity={0.4} fill="none" />
          {/* Tapered Lavender Pot */}
          <Path d="M42 280 L48 322 C48 324, 68 324, 68 322 L74 280 Z" fill="#D7CDF5" />
          <Rect x="40" y="276" width="36" height="8" rx="4" fill="#E6DEFA" stroke="#C4B5EE" strokeWidth="1" />
        </G>

        {/* Right Plant */}
        <G id="rightPlant">
          {/* Pot floor shadow */}
          <Ellipse cx="302" cy="328" rx="22" ry="6" fill="#D2C6F2" opacity={0.7} />
          {/* Plant Leaves */}
          <Path d="M302 280 C286 256, 280 232, 286 215 C298 220, 302 245, 302 280 Z" fill="url(#plantLeafGrad)" />
          <Path d="M302 280 C294 250, 298 220, 312 202 C319 218, 316 250, 302 280 Z" fill="url(#plantLeafDark)" />
          <Path d="M302 280 C314 255, 328 235, 338 222 C334 242, 320 264, 302 280 Z" fill="#9C88DC" />
          <Path d="M302 280 C322 268, 332 254, 328 244 C318 248, 310 262, 302 280 Z" fill="#B3A2E8" />
          {/* Veins */}
          <Path d="M288 224 Q296 248, 302 280" stroke="#846DC9" strokeWidth="1.2" opacity={0.4} fill="none" />
          <Path d="M310 210 Q306 242, 302 280" stroke="#846DC9" strokeWidth="1.2" opacity={0.4} fill="none" />
          {/* Tapered Lavender Pot */}
          <Path d="M286 280 L292 322 C292 324, 312 324, 312 322 L318 280 Z" fill="#D7CDF5" />
          <Rect x="284" y="276" width="36" height="8" rx="4" fill="#E6DEFA" stroke="#C4B5EE" strokeWidth="1" />
        </G>

        {/* ═══════════════════════════════════════════════════
            5. CHARACTER (Standing Side-Body Stretch)
        ═══════════════════════════════════════════════════ */}
        <G id="character">

          {/* ── LEGS (Dark navy fitted trousers) ── */}
          {/* Left leg (viewer left) */}
          <Path
            d="M178 246 C175 272, 164 308, 160 338"
            stroke="#1B2236"
            strokeWidth="19"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right leg (viewer right) */}
          <Path
            d="M206 246 C212 272, 222 308, 226 338"
            stroke="#1B2236"
            strokeWidth="19"
            strokeLinecap="round"
            fill="none"
          />
          {/* Trouser waist area */}
          <Path
            d="M168 236 C168 256, 216 256, 216 236 Z"
            fill="#1B2236"
          />

          {/* ── SNEAKERS (Clean white athletic shoes with laces) ── */}
          {/* Left shoe */}
          <G id="leftShoe">
            <Ellipse cx="158" cy="344" rx="16" ry="6.5" fill="#FFFFFF" />
            <Path d="M145 345 C150 349, 167 349, 172 345" stroke="#D1CBE3" strokeWidth="1.6" fill="none" />
            {/* Laces */}
            <Path d="M156 341 L161 341 M155 343 L162 343" stroke="#B3A9CE" strokeWidth="1.5" strokeLinecap="round" />
          </G>
          {/* Right shoe */}
          <G id="rightShoe">
            <Ellipse cx="228" cy="344" rx="16" ry="6.5" fill="#FFFFFF" />
            <Path d="M215 345 C220 349, 237 349, 242 345" stroke="#D1CBE3" strokeWidth="1.6" fill="none" />
            {/* Laces */}
            <Path d="M226 341 L231 341 M225 343 L232 343" stroke="#B3A9CE" strokeWidth="1.5" strokeLinecap="round" />
          </G>

          {/* ── PURPLE HOODIE TORSO (Arching sideways in stretch) ── */}
          <Path
            d="M164 162 C158 188, 155 218, 166 242 C174 248, 212 248, 220 242 C226 218, 218 188, 210 162 Z"
            fill="url(#hoodiePurple)"
          />
          {/* Lateral stretch fold shadow */}
          <Path
            d="M168 174 C163 198, 162 222, 170 238"
            stroke="#4A23BA"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity={0.3}
          />
          {/* Bottom rib hem */}
          <Path
            d="M166 240 Q193 248, 220 240"
            stroke="#441EB2"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── KANGAROO POUCH POCKET ── */}
          <Path
            d="M174 206 L180 202 L206 202 L212 206 L210 234 L176 234 Z"
            fill="#562CC7"
            opacity={0.55}
          />
          <Path
            d="M174 206 L180 202 L206 202 L212 206"
            stroke="#441EB2"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── LEFT ARM & HAND (Resting firmly on left hip) ── */}
          <Path
            d="M166 170 C148 184, 134 202, 130 214 C127 222, 136 230, 148 230 C158 230, 168 222, 172 216"
            stroke="url(#hoodiePurple)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Left sleeve cuff */}
          <Ellipse cx="152" cy="226" rx="4.5" ry="7" fill="#4B24B8" transform="rotate(-25 152 226)" />
          {/* Left hand on hip (peach) */}
          <Circle cx="160" cy="223" r="7" fill="#FCD5B4" />
          <Path d="M160 220 C165 222, 166 227, 162 229" stroke="#E0AB84" strokeWidth="1.5" fill="none" />

          {/* ── HOODIE COLLAR & DRAWSTRINGS ── */}
          <Path
            d="M172 162 C178 172, 204 172, 210 162 C212 154, 170 154, 172 162 Z"
            fill="#5227BE"
          />
          {/* White drawstrings */}
          <Path d="M184 164 L183 190" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <Path d="M196 164 L197 188" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <Circle cx="183" cy="190" r="1.6" fill="#FFFFFF" />
          <Circle cx="197" cy="188" r="1.6" fill="#FFFFFF" />

          {/* ── NECK ── */}
          <Rect x="182" y="140" width="16" height="22" rx="7" fill="#FCD5B4" />
          <Path d="M182 152 Q190 158, 198 152" stroke="#E0AB84" strokeWidth="2" fill="none" />

          {/* ── HEAD & FACE ── */}
          <Circle cx="190" cy="128" r="26" fill="#FCD5B4" />

          {/* Rosy blush cheeks */}
          <Ellipse cx="177" cy="135" rx="5.5" ry="3.5" fill="#F8A7A0" opacity={0.55} />
          <Ellipse cx="203" cy="135" rx="5.5" ry="3.5" fill="#F8A7A0" opacity={0.55} />

          {/* Small friendly nose */}
          <Path d="M190 124 Q192 129, 189 130" stroke="#DDA17B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Happy open smile with white teeth */}
          <Path
            d="M181 135 C183 146, 197 146, 199 135 Z"
            fill="#881E1E"
          />
          {/* Top white teeth */}
          <Path
            d="M182 135 C184 139, 196 139, 198 135 Z"
            fill="#FFFFFF"
          />

          {/* Eyes with specular catchlights */}
          <Circle cx="181" cy="124" r="3" fill="#1A2035" />
          <Circle cx="182" cy="123" r="1.1" fill="#FFFFFF" />
          <Circle cx="199" cy="124" r="3" fill="#1A2035" />
          <Circle cx="200" cy="123" r="1.1" fill="#FFFFFF" />

          {/* Eyebrows */}
          <Path d="M176 117 Q181 114, 186 117" stroke="#1A2035" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <Path d="M194 117 Q199 114, 204 117" stroke="#1A2035" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* ── CURLY DARK NAVY HAIR ── */}
          {/* Fluffy rounded curls framing head */}
          <Circle cx="174" cy="111" r="12" fill="#161C2E" />
          <Circle cx="190" cy="103" r="13" fill="#161C2E" />
          <Circle cx="206" cy="109" r="12" fill="#161C2E" />
          <Circle cx="166" cy="122" r="11" fill="#161C2E" />
          <Circle cx="214" cy="120" r="11" fill="#161C2E" />
          <Circle cx="164" cy="133" r="9" fill="#161C2E" />
          <Circle cx="214" cy="131" r="9" fill="#161C2E" />

          {/* Inner curl depth */}
          <Path
            d="M168 118 C175 109, 190 109, 197 116 C190 114, 178 114, 172 120 Z"
            fill="#27324D"
          />
          <Path
            d="M192 107 C198 100, 210 105, 212 113 C207 107, 201 107, 195 111 Z"
            fill="#27324D"
          />

          {/* ── RIGHT ARM & HAND (Arched high overhead in stretch to left) ── */}
          <Path
            d="M206 168 C224 152, 246 128, 240 98 C234 76, 210 64, 182 70 C168 73, 156 80, 145 87"
            stroke="url(#hoodiePurple)"
            strokeWidth="17"
            strokeLinecap="round"
            fill="none"
          />
          {/* Raised arm highlight fold */}
          <Path
            d="M222 135 C233 118, 233 96, 224 83 C216 75, 198 70, 182 72"
            stroke="#9874FA"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            opacity={0.45}
          />
          {/* Right sleeve cuff */}
          <Ellipse cx="145" cy="87" rx="4.5" ry="7.5" fill="#4B24B8" transform="rotate(35 145 87)" />

          {/* Right hand pointing leftward in stretch */}
          <Circle cx="135" cy="91" r="7.5" fill="#FCD5B4" />
          <Path
            d="M135 88 C128 91, 125 97, 130 100"
            stroke="#E0AB84"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
    </View>
  );
}
