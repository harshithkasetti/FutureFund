// FutureFund Typography System
// Display: Cormorant Garamond — luxury editorial serif
// Heading: Syne — geometric futuristic sans
// Body: DM Sans — clean legible workhorse
// Mono: JetBrains Mono — for numbers & data

import { StyleSheet, Platform } from 'react-native';

export const fontFamilies = {
  display: Platform.select({
    ios: 'CormorantGaramond-SemiBold',
    android: 'CormorantGaramond-SemiBold',
  }),
  displayItalic: Platform.select({
    ios: 'CormorantGaramond-SemiBoldItalic',
    android: 'CormorantGaramond-SemiBoldItalic',
  }),
  heading: Platform.select({
    ios: 'Syne-Bold',
    android: 'Syne-Bold',
  }),
  headingMedium: Platform.select({
    ios: 'Syne-Medium',
    android: 'Syne-Medium',
  }),
  body: Platform.select({
    ios: 'DMSans-Regular',
    android: 'DMSans-Regular',
  }),
  bodyMedium: Platform.select({
    ios: 'DMSans-Medium',
    android: 'DMSans-Medium',
  }),
  bodySemiBold: Platform.select({
    ios: 'DMSans-SemiBold',
    android: 'DMSans-SemiBold',
  }),
  bodyBold: Platform.select({
    ios: 'DMSans-Bold',
    android: 'DMSans-Bold',
  }),
  mono: Platform.select({
    ios: 'JetBrainsMono-Regular',
    android: 'JetBrainsMono-Regular',
  }),
  monoBold: Platform.select({
    ios: 'JetBrainsMono-Bold',
    android: 'JetBrainsMono-Bold',
  }),
};

export const fontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 42,
  '5xl': 52,
  '6xl': 64,
};

export const lineHeights = {
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.8,
};

export const letterSpacings = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.6,
  wider: 1.2,
  widest: 2.5,
  caps: 3,
};

export const typography = StyleSheet.create({
  displayXL: {
    fontFamily: fontFamilies.display as string,
    fontSize: fontSizes['6xl'],
    lineHeight: fontSizes['6xl'] * lineHeights.tight,
    letterSpacing: letterSpacings.tighter,
  },
  displayLG: {
    fontFamily: fontFamilies.display as string,
    fontSize: fontSizes['5xl'],
    lineHeight: fontSizes['5xl'] * lineHeights.tight,
    letterSpacing: letterSpacings.tighter,
  },
  displayMD: {
    fontFamily: fontFamilies.display as string,
    fontSize: fontSizes['4xl'],
    lineHeight: fontSizes['4xl'] * lineHeights.snug,
    letterSpacing: letterSpacings.tight,
  },
  displaySM: {
    fontFamily: fontFamilies.displayItalic as string,
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.snug,
    letterSpacing: letterSpacings.tight,
  },
  h1: {
    fontFamily: fontFamilies.heading as string,
    fontSize: fontSizes['2xl'],
    lineHeight: fontSizes['2xl'] * lineHeights.snug,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: fontFamilies.heading as string,
    fontSize: fontSizes.xl,
    lineHeight: fontSizes.xl * lineHeights.snug,
    letterSpacing: letterSpacings.normal,
  },
  h3: {
    fontFamily: fontFamilies.heading as string,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },
  h4: {
    fontFamily: fontFamilies.headingMedium as string,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },
  bodyLG: {
    fontFamily: fontFamilies.body as string,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.relaxed,
    letterSpacing: letterSpacings.normal,
  },
  bodyMD: {
    fontFamily: fontFamilies.body as string,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.relaxed,
    letterSpacing: letterSpacings.normal,
  },
  bodySM: {
    fontFamily: fontFamilies.body as string,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },
  bodyXS: {
    fontFamily: fontFamilies.body as string,
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },
  labelLG: {
    fontFamily: fontFamilies.bodySemiBold as string,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    letterSpacing: letterSpacings.wide,
  },
  labelMD: {
    fontFamily: fontFamilies.bodySemiBold as string,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacings.wide,
  },
  labelSM: {
    fontFamily: fontFamilies.bodyBold as string,
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.normal,
    letterSpacing: letterSpacings.caps,
    textTransform: 'uppercase' as const,
  },
  mono: {
    fontFamily: fontFamilies.mono as string,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    letterSpacing: letterSpacings.normal,
  },
  monoLG: {
    fontFamily: fontFamilies.monoBold as string,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.normal,
    letterSpacing: letterSpacings.tight,
  },
  monoXL: {
    fontFamily: fontFamilies.monoBold as string,
    fontSize: fontSizes['2xl'],
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
    letterSpacing: letterSpacings.tighter,
  },
});