// FutureFund — Splash Screen
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const { colors, isDark, fontFamilies } = useTheme();
  const navigation = useNavigation<any>();

  // Animations
  const gemScale = useRef(new Animated.Value(0)).current;
  const gemRotate = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslate = useRef(new Animated.Value(30)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const circleScale1 = useRef(new Animated.Value(0)).current;
  const circleScale2 = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      // Glow circles appear
      Animated.parallel([
        Animated.timing(circleScale1, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Gem pops in
      Animated.spring(gemScale, {
        toValue: 1,
        speed: 12,
        bounciness: 14,
        useNativeDriver: true,
      }),
      // Second ring
      Animated.timing(circleScale2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Logo slides up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslate, {
          toValue: 0,
          speed: 14,
          bounciness: 6,
          useNativeDriver: true,
        }),
      ]),
      // Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(1200),
      // Fade out
      Animated.timing(exitOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    // Gem slow rotation
    Animated.loop(
      Animated.timing(gemRotate, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    sequence.start(() => {
      navigation.replace('Auth');
    });
  }, []);

  const gemRotateInterp = gemRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const accentColor = isDark ? '#00F5FF' : '#C9A84C';
  const accent2 = isDark ? '#BF5FFF' : '#A07830';
  const bgColor = isDark ? '#080B14' : '#F8F6F1';

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: bgColor, opacity: exitOpacity }]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bgColor} />

      {/* Background ambient glow */}
      <Animated.View
        style={[
          styles.glowCircle1,
          {
            backgroundColor: accentColor,
            opacity: Animated.multiply(glowOpacity, new Animated.Value(isDark ? 0.08 : 0.12)),
            transform: [{ scale: circleScale1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glowCircle2,
          {
            backgroundColor: accent2,
            opacity: Animated.multiply(glowOpacity, new Animated.Value(isDark ? 0.06 : 0.08)),
            transform: [{ scale: circleScale2 }],
          },
        ]}
      />

      {/* Gem icon */}
      <Animated.View
        style={[
          styles.gemContainer,
          {
            transform: [{ scale: gemScale }, { rotate: gemRotateInterp }],
            shadowColor: accentColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: isDark ? 0.9 : 0.5,
            shadowRadius: 30,
            elevation: 20,
          },
        ]}
      >
        <View
          style={[
            styles.gem,
            {
              backgroundColor: accentColor,
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)',
            },
          ]}
        />
        <View
          style={[
            styles.gemInner,
            { backgroundColor: isDark ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.5)' },
          ]}
        />
      </Animated.View>

      {/* Logo text */}
      <Animated.View
        style={[
          styles.logoBlock,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslate }],
          },
        ]}
      >
        <Text
          style={[
            styles.logoText,
            {
              fontFamily: fontFamilies.heading as string,
              color: isDark ? '#E8F0FF' : '#1A150E',
            },
          ]}
        >
          FUTURE
          <Text style={{ color: accentColor }}>FUND</Text>
        </Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: taglineOpacity,
            fontFamily: fontFamilies.displayItalic as string,
            color: isDark ? 'rgba(232,240,255,0.5)' : 'rgba(60,40,20,0.5)',
          },
        ]}
      >
        Your wealth, your future.
      </Animated.Text>

      {/* Bottom wordmark */}
      <Animated.Text
        style={[
          styles.version,
          {
            opacity: taglineOpacity,
            fontFamily: fontFamilies.mono as string,
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          },
        ]}
      >
        v1.0.0
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle1: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    top: -width * 0.4,
    left: -width * 0.1,
  },
  glowCircle2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    bottom: -width * 0.2,
    right: -width * 0.1,
  },
  gemContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  gem: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    transform: [{ rotate: '45deg' }],
  },
  gemInner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
  },
  logoBlock: {
    marginBottom: 12,
  },
  logoText: {
    fontSize: 36,
    letterSpacing: 5,
  },
  tagline: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: 11,
    letterSpacing: 2,
  },
});

export default SplashScreen;