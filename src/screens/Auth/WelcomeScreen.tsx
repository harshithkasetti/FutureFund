import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// ─── Design Tokens ─────────────────────────────────────────────────────────────
// Both LIGHT and DARK share IDENTICAL keys — TypeScript sees a single unified
// type for C, so every C.xxx access is always valid regardless of theme.

interface ScreenTokens {
  bg:         string;
  bgDeep:     string;
  surface:    string;
  gold:       string;
  goldBright: string;
  goldDeep:   string;
  ink:        string;
  inkMid:     string;
  inkSoft:    string;
  inkFaint:   string;
  white:      string;
  cream:      string;   // light = warm cream,  dark = darkened surface stand-in
  neonCyan:   string;   // light = goldDark,     dark = #00F0FF
  neonGlow:   string;   // light = gold rgba,    dark = cyan rgba
}

const LIGHT: ScreenTokens = {
  bg:         '#F5EFE4',
  bgDeep:     '#EDE3D0',
  surface:    '#FDFAF4',
  gold:       '#B8913A',
  goldBright: '#D4A84B',
  goldDeep:   '#8A6820',
  ink:        '#1A1209',
  inkMid:     '#3D2E14',
  inkSoft:    '#7A6340',
  inkFaint:   '#B5A07A',
  white:      '#FFFFFF',
  cream:      '#F9F3E8',
  neonCyan:   '#8A6820',               // maps to goldDeep — same primary-action role
  neonGlow:   'rgba(212,168,75,0.10)', // warm gold ambient in light mode
};

const DARK: ScreenTokens = {
  bg:         '#08090F',
  bgDeep:     '#0D1018',
  surface:    '#111520',
  gold:       '#D4A84B',
  goldBright: '#F0C060',
  goldDeep:   '#A07830',
  ink:        '#EEE8FF',
  inkMid:     '#C0B8D8',
  inkSoft:    '#7A7898',
  inkFaint:   '#3A3858',
  white:      '#FFFFFF',
  cream:      '#1A1F30',               // darkened surface stand-in for dark mode
  neonCyan:   '#00F0FF',
  neonGlow:   'rgba(0,240,255,0.12)',
};

// ─── Geometric Art: Animated Diamond Constellation ─────────────────────────────
const DiamondOrb: React.FC<{
  size:        number;
  x:           number;
  y:           number;
  delay:       number;
  color:       string;
  borderColor: string;  // ← prop is named borderColor (not border)
  rotate?:     boolean;
}> = ({ size, x, y, delay, color, borderColor, rotate = false }) => {
  const floatAnim   = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(floatAnim,   { toValue: 1, speed: 3, bounciness: 8, useNativeDriver: true }),
      ]),
    ]).start();

    if (rotate) {
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 12000, useNativeDriver: true })
      ).start();
    } else {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: 1.12, duration: 2800 + delay * 0.3, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0.88, duration: 2800 + delay * 0.3, useNativeDriver: true }),
        ])
      ).start();
    }
  }, []);

  const rotateInterp = rotateAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['45deg', '405deg'],
  });

  const translateY = floatAnim.interpolate({
    inputRange:  [0, 1, 1.12],
    outputRange: [20, 0, -8],
  });

  return (
    <Animated.View
      style={{
        position:  'absolute',
        left:      x,
        top:       y,
        width:     size,
        height:    size,
        opacity:   opacityAnim,
        transform: [{ translateY }, { rotate: rotate ? rotateInterp : '45deg' }],
      }}
    >
      <View
        style={{
          width:           size,
          height:          size,
          backgroundColor: color,
          borderWidth:     1,
          borderColor:     borderColor,
          borderRadius:    size * 0.15,
        }}
      />
    </Animated.View>
  );
};

// ─── Animated Line Connector ────────────────────────────────────────────────────
const ConnectorLine: React.FC<{
  x:      number;
  y:      number;
  w:      number;
  rotate: string;
  color:  string;
  delay:  number;
}> = ({ x, y, w, rotate, color, delay }) => {
  const scaleAnim   = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scaleAnim,   { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position:        'absolute',
        left:            x,
        top:             y,
        width:           w,
        height:          1,
        backgroundColor: color,
        opacity:         opacityAnim,
        transform:       [{ scaleX: scaleAnim }, { rotate }],
      }}
    />
  );
};

// ─── Main Screen ───────────────────────────────────────────────────────────────
const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const scheme     = useColorScheme();
  const isDark     = scheme === 'dark';
  const C: ScreenTokens = isDark ? DARK : LIGHT; // fully typed — all keys always exist

  // Entrance animations
  const logoScale      = useRef(new Animated.Value(0)).current;
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const wordmarkOpacity= useRef(new Animated.Value(0)).current;
  const wordmarkY      = useRef(new Animated.Value(16)).current;
  const headingOpacity = useRef(new Animated.Value(0)).current;
  const headingY       = useRef(new Animated.Value(24)).current;
  const subtitleOpacity= useRef(new Animated.Value(0)).current;
  const subtitleY      = useRef(new Animated.Value(20)).current;
  const pillsOpacity   = useRef(new Animated.Value(0)).current;
  const btnOpacity     = useRef(new Animated.Value(0)).current;
  const btnY           = useRef(new Animated.Value(30)).current;
  const footerOpacity  = useRef(new Animated.Value(0)).current;
  const btnPressScale  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(logoScale,  { toValue: 1, speed: 10, bounciness: 14, useNativeDriver: true }),
        Animated.timing(logoOpacity,{ toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(wordmarkOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.spring(wordmarkY,       { toValue: 0, speed: 14, bounciness: 4, useNativeDriver: true }),
      ]),
      Animated.delay(80),
      Animated.parallel([
        Animated.timing(headingOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(headingY,       { toValue: 0, speed: 12, bounciness: 4, useNativeDriver: true }),
      ]),
      Animated.delay(60),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.spring(subtitleY,       { toValue: 0, speed: 14, bounciness: 4, useNativeDriver: true }),
      ]),
      Animated.timing(pillsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(btnY,       { toValue: 0, speed: 12, bounciness: 6, useNativeDriver: true }),
      ]),
      Animated.timing(footerOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(btnPressScale, { toValue: 0.96, useNativeDriver: true, speed: 40, bounciness: 4 }).start();

  const handlePressOut = () =>
    Animated.spring(btnPressScale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

  // Diamond data — key is borderColor (matches DiamondOrb prop name exactly)
  const diamonds = isDark
    ? [
        { size: 56, x: width*0.68, y: 52,          delay: 300, color:'rgba(0,240,255,0.07)',  borderColor:'rgba(0,240,255,0.25)',  rotate:true  },
        { size: 30, x: width*0.82, y: 140,          delay: 450, color:'rgba(212,168,75,0.08)', borderColor:'rgba(212,168,75,0.35)', rotate:false },
        { size: 18, x: width*0.72, y: 190,          delay: 550, color:'rgba(0,240,255,0.05)',  borderColor:'rgba(0,240,255,0.2)',   rotate:false },
        { size: 44, x: -8,         y: 120,          delay: 400, color:'rgba(212,168,75,0.06)', borderColor:'rgba(212,168,75,0.28)', rotate:true  },
        { size: 22, x: 16,         y: 230,          delay: 520, color:'rgba(0,240,255,0.04)',  borderColor:'rgba(0,240,255,0.18)',  rotate:false },
        { size: 14, x: width*0.88, y: 88,           delay: 600, color:'rgba(212,168,75,0.1)',  borderColor:'rgba(212,168,75,0.4)',  rotate:false },
        { size: 36, x: width*0.05, y: height*0.58,  delay: 480, color:'rgba(0,240,255,0.06)',  borderColor:'rgba(0,240,255,0.2)',   rotate:true  },
        { size: 20, x: width*0.78, y: height*0.62,  delay: 560, color:'rgba(212,168,75,0.08)', borderColor:'rgba(212,168,75,0.32)', rotate:false },
      ]
    : [
        { size: 56, x: width*0.68, y: 52,          delay: 300, color:'rgba(184,145,58,0.08)', borderColor:'rgba(184,145,58,0.3)',  rotate:true  },
        { size: 30, x: width*0.82, y: 140,          delay: 450, color:'rgba(212,168,75,0.1)',  borderColor:'rgba(212,168,75,0.35)', rotate:false },
        { size: 18, x: width*0.72, y: 190,          delay: 550, color:'rgba(184,145,58,0.06)', borderColor:'rgba(184,145,58,0.22)', rotate:false },
        { size: 44, x: -8,         y: 120,          delay: 400, color:'rgba(212,168,75,0.07)', borderColor:'rgba(212,168,75,0.25)', rotate:true  },
        { size: 22, x: 16,         y: 230,          delay: 520, color:'rgba(184,145,58,0.05)', borderColor:'rgba(184,145,58,0.2)',  rotate:false },
        { size: 14, x: width*0.88, y: 88,           delay: 600, color:'rgba(212,168,75,0.12)', borderColor:'rgba(212,168,75,0.4)',  rotate:false },
        { size: 36, x: width*0.05, y: height*0.58,  delay: 480, color:'rgba(184,145,58,0.07)', borderColor:'rgba(184,145,58,0.22)', rotate:true  },
        { size: 20, x: width*0.78, y: height*0.62,  delay: 560, color:'rgba(212,168,75,0.09)', borderColor:'rgba(212,168,75,0.3)',  rotate:false },
      ];

  const connectors = isDark
    ? [
        { x: width*0.695, y: 80,  w: 38, rotate:'-28deg', color:'rgba(0,240,255,0.15)',  delay: 500 },
        { x: 20,          y: 145, w: 50, rotate:'18deg',  color:'rgba(212,168,75,0.15)', delay: 580 },
      ]
    : [
        { x: width*0.695, y: 80,  w: 38, rotate:'-28deg', color:'rgba(184,145,58,0.2)',  delay: 500 },
        { x: 20,          y: 145, w: 50, rotate:'18deg',  color:'rgba(212,168,75,0.2)',  delay: 580 },
      ];

  const featurePills = ['Smart Goals', 'AutoSave', 'Vault Rewards', 'Group Savings'];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: C.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={C.bg}
      />

      {/* ── Ambient background layers ── */}
      <View
        pointerEvents="none"
        style={[styles.ambientTop, { backgroundColor: C.neonGlow }]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.ambientBottom,
          { backgroundColor: isDark ? 'rgba(212,168,75,0.06)' : 'rgba(184,145,58,0.08)' },
        ]}
      />
      <View pointerEvents="none" style={[styles.grainA, { backgroundColor: isDark ? 'rgba(255,255,255,0.008)' : 'rgba(0,0,0,0.012)' }]} />
      <View pointerEvents="none" style={[styles.grainB, { backgroundColor: isDark ? 'rgba(255,255,255,0.005)' : 'rgba(0,0,0,0.008)' }]} />

      {/* ── Floating geometric constellation ── */}
      <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
        {diamonds.map((d, i) => (
          <DiamondOrb key={i} {...d} />
        ))}
        {connectors.map((c, i) => (
          <ConnectorLine key={i} {...c} />
        ))}
      </View>

      {/* ── Main content ── */}
      <View style={styles.content}>

        {/* Logo Mark */}
        <Animated.View
          style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        >
          <View
            style={[
              styles.logoRing,
              { borderColor: isDark ? 'rgba(0,240,255,0.2)' : 'rgba(184,145,58,0.2)' },
            ]}
          />
          <View
            style={[
              styles.logoRingMid,
              { borderColor: isDark ? 'rgba(0,240,255,0.12)' : 'rgba(184,145,58,0.12)' },
            ]}
          />
          <View
            style={[
              styles.logoGemOuter,
              {
                backgroundColor: isDark ? C.surface : C.cream,
                borderColor:     isDark ? 'rgba(0,240,255,0.25)' : 'rgba(184,145,58,0.3)',
                shadowColor:     isDark ? C.neonCyan : C.goldBright,
                shadowOffset:    { width: 0, height: 0 },
                shadowOpacity:   isDark ? 0.7 : 0.45,
                shadowRadius:    isDark ? 28 : 22,
                elevation:       20,
              },
            ]}
          >
            <View
              style={[
                styles.gem,
                {
                  backgroundColor: C.gold,
                  shadowColor:     isDark ? C.gold : C.goldDeep,
                  shadowOffset:    { width: 0, height: 2 },
                  shadowOpacity:   0.6,
                  shadowRadius:    8,
                  elevation:       6,
                },
              ]}
            />
            <View
              style={[
                styles.gemHighlight,
                { backgroundColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.55)' },
              ]}
            />
            <Text style={[styles.logoLetters, { color: isDark ? C.bg : C.white }]}>
              FF
            </Text>
          </View>
        </Animated.View>

        {/* Wordmark */}
        <Animated.View
          style={{ opacity: wordmarkOpacity, transform: [{ translateY: wordmarkY }], alignItems: 'center', marginTop: 22 }}
        >
          <View style={styles.eyebrowRow}>
            <View style={[styles.eyebrowLine, { backgroundColor: C.gold }]} />
            <Text style={[styles.eyebrow, { color: isDark ? C.gold : C.goldDeep }]}>
              WEALTH · REDEFINED
            </Text>
            <View style={[styles.eyebrowLine, { backgroundColor: C.gold }]} />
          </View>
          <Text style={[styles.appName, { color: C.ink }]}>
            Future<Text style={{ color: C.gold }}>Fund</Text>
          </Text>
        </Animated.View>

        {/* Heading */}
        <Animated.View
          style={{ opacity: headingOpacity, transform: [{ translateY: headingY }], marginTop: 28, width: '100%' }}
        >
          <View style={[styles.headingAccent, { backgroundColor: C.gold }]} />
          <Text style={[styles.heading, { color: C.ink }]}>
            Turn Savings{'\n'}Into{' '}
            <Text style={{ color: isDark ? C.gold : C.goldDeep, fontStyle: 'italic' }}>
              Freedom.
            </Text>
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          style={[
            styles.subtitle,
            { color: isDark ? C.inkMid : C.inkSoft, opacity: subtitleOpacity, transform: [{ translateY: subtitleY }] },
          ]}
        >
          Save smarter. Invest consistently.{'\n'}
          Reach every financial goal with precision and purpose.
        </Animated.Text>

        {/* Feature pills */}
        <Animated.View style={[styles.pillsRow, { opacity: pillsOpacity }]}>
          {featurePills.map((label, i) => {
            const isEven = i % 2 === 0;
            const pillBg = isDark
              ? isEven ? 'rgba(0,240,255,0.07)'  : 'rgba(212,168,75,0.08)'
              : isEven ? 'rgba(184,145,58,0.09)' : 'rgba(212,168,75,0.07)';
            const pillBorder = isDark
              ? isEven ? 'rgba(0,240,255,0.2)'   : 'rgba(212,168,75,0.22)'
              : isEven ? 'rgba(184,145,58,0.25)' : 'rgba(212,168,75,0.2)';
            // C.neonCyan is always defined — gold in light, #00F0FF in dark
            const dotColor  = isDark ? (isEven ? C.neonCyan : C.gold) : C.gold;
            const textColor = isDark ? (isEven ? C.neonCyan : C.gold) : C.goldDeep;

            return (
              <View key={i} style={[styles.pill, { backgroundColor: pillBg, borderColor: pillBorder }]}>
                <View
                  style={[
                    styles.pillDot,
                    { backgroundColor: dotColor, shadowColor: dotColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 4 },
                  ]}
                />
                <Text style={[styles.pillText, { color: textColor }]}>{label}</Text>
              </View>
            );
          })}
        </Animated.View>

        {/* CTA Button */}
        <Animated.View
          style={{ width: '100%', opacity: btnOpacity, transform: [{ translateY: btnY }, { scale: btnPressScale }], marginTop: 36 }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('Login')}
            style={[
              styles.btn,
              {
                backgroundColor: isDark ? C.neonCyan : C.gold,
                shadowColor:     isDark ? C.neonCyan : C.gold,
                shadowOffset:    { width: 0, height: 10 },
                shadowOpacity:   isDark ? 0.55 : 0.38,
                shadowRadius:    24,
                elevation:       14,
              },
            ]}
          >
            <View
              style={[
                styles.btnOrnamentLeft,
                { backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.18)' },
              ]}
            />
            <Text style={[styles.btnText, { color: isDark ? C.bg : C.white }]}>
              Begin Your Journey
            </Text>
            <View style={[styles.btnArrow, { borderColor: isDark ? C.bg : C.white }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.ghostBtn}>
            <Text style={[styles.ghostText, { color: isDark ? C.inkSoft : C.inkFaint }]}>
              Already have an account?{' '}
              <Text style={{ color: isDark ? C.gold : C.goldDeep, fontWeight: '600' }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <View style={styles.footerOrnament}>
          <View style={[styles.footerLine, { backgroundColor: C.inkFaint }]} />
          <View style={[styles.footerDiamond, { backgroundColor: C.gold, opacity: 0.5 }]} />
          <View style={[styles.footerLine, { backgroundColor: C.inkFaint }]} />
        </View>
        <Text style={[styles.footerText, { color: C.inkFaint }]}>
          Crafted with care by{' '}
          <Text style={{ color: isDark ? C.goldBright : C.gold, fontWeight: '600' }}>
            Harshith Kasetti
          </Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1 },

  ambientTop: {
    position: 'absolute', width: width * 1.4, height: width * 1.4,
    borderRadius: width * 0.7, top: -width * 0.65, alignSelf: 'center',
  },
  ambientBottom: {
    position: 'absolute', width: width * 1.2, height: width * 1.2,
    borderRadius: width * 0.6, bottom: -width * 0.5, right: -width * 0.2,
  },
  grainA: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  grainB: { position: 'absolute', top: 2, left: 1, right: 1, bottom: 1 },

  content: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 28, paddingTop: 12,
  },

  logoWrap:    { width: 120, height: 120, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  logoRing:    { position: 'absolute', width: 120, height: 120, borderRadius: 60,  borderWidth: 1 },
  logoRingMid: { position: 'absolute', width: 102, height: 102, borderRadius: 51,  borderWidth: 1 },
  logoGemOuter:{
    width: 86, height: 86, borderRadius: 22, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
  },
  gem:          { position: 'absolute', width: 86, height: 86, borderRadius: 22 },
  gemHighlight: { position: 'absolute', top: 0, left: 0, width: 86, height: 43 },
  logoLetters:  { fontSize: 28, fontWeight: '800', letterSpacing: 1, zIndex: 2 },

  eyebrowRow:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  eyebrowLine: { width: 24, height: 1, opacity: 0.6 },
  eyebrow:     { fontSize: 9, fontWeight: '700', letterSpacing: 3 },
  appName:     { fontSize: 38, fontWeight: '300', letterSpacing: -0.5 },

  headingAccent: { width: 32, height: 3, borderRadius: 2, marginBottom: 10, opacity: 0.8 },
  heading:       { fontSize: 36, fontWeight: '700', lineHeight: 44, letterSpacing: -0.8 },

  subtitle: {
    fontSize: 15, lineHeight: 24, marginTop: 16,
    fontWeight: '400', letterSpacing: 0.1, width: '100%',
  },

  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22, width: '100%' },
  pill:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20, borderWidth: 1, gap: 5 },
  pillDot:  { width: 5, height: 5, borderRadius: 2.5 },
  pillText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },

  btn: {
    width: '100%', paddingVertical: 19, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row', overflow: 'hidden', position: 'relative',
  },
  btnOrnamentLeft: { position: 'absolute', left: -30, top: -30, width: 100, height: 100, borderRadius: 50 },
  btnText:  { fontSize: 17, fontWeight: '700', letterSpacing: 0.3, zIndex: 1 },
  btnArrow: { width: 8, height: 8, borderTopWidth: 2, borderRightWidth: 2, transform: [{ rotate: '45deg' }], marginLeft: 10, zIndex: 1 },
  ghostBtn: { marginTop: 18, alignItems: 'center', paddingVertical: 4 },
  ghostText:{ fontSize: 13.5, letterSpacing: 0.1 },

  footer:         { paddingBottom: 28, alignItems: 'center', gap: 10 },
  footerOrnament: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerLine:     { width: 32, height: 1, opacity: 0.4 },
  footerDiamond:  { width: 5, height: 5, borderRadius: 1, transform: [{ rotate: '45deg' }] },
  footerText:     { fontSize: 12, letterSpacing: 0.2 },
});