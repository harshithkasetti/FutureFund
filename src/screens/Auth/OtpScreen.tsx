// FutureFund — OTP Verification Screen
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Vibration,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme';

// ─── Constants ────────────────────────────────────────────────────────────────

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60;

// ─── Inline Icons ─────────────────────────────────────────────────────────────

const CheckIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size * 0.55,
        height: size * 0.3,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        borderColor: color,
        transform: [{ rotate: '-45deg' }],
        marginTop: -(size * 0.08),
      }}
    />
  </View>
);

const ShieldCheckIcon = ({ color, size = 36 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size * 1.1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size,
        height: size * 1.1,
        borderWidth: 2.5,
        borderColor: color,
        borderTopLeftRadius: size * 0.28,
        borderTopRightRadius: size * 0.28,
        borderBottomLeftRadius: size * 0.52,
        borderBottomRightRadius: size * 0.52,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.45,
          height: size * 0.26,
          borderLeftWidth: 2.5,
          borderBottomWidth: 2.5,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: -(size * 0.06),
        }}
      />
    </View>
  </View>
);

const MessageIcon = ({ color, size = 36 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size * 0.9, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size,
        height: size * 0.78,
        borderWidth: 2,
        borderColor: color,
        borderRadius: size * 0.16,
        justifyContent: 'flex-start',
        paddingTop: size * 0.14,
        paddingHorizontal: size * 0.14,
        overflow: 'hidden',
      }}
    >
      <View style={{ width: size * 0.55, height: 2, backgroundColor: color, borderRadius: 1, marginBottom: 5 }} />
      <View style={{ width: size * 0.72, height: 2, backgroundColor: color, borderRadius: 1, opacity: 0.5 }} />
    </View>
    {/* Tail */}
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: size * 0.16,
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.1,
        borderRightWidth: 0,
        borderTopWidth: size * 0.14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }}
    />
  </View>
);

const ArrowRightIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 14, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ width: 6, height: 6, borderRightWidth: 1.5, borderTopWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', right: 0 }} />
  </View>
);

// ─── Circular Timer ───────────────────────────────────────────────────────────

interface CircularTimerProps {
  timer: number;
  total: number;
  accentColor: string;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  timer, total, accentColor, colors, isDark, fontFamilies, fontSizes,
}) => {
  const progress = (total - timer) / total;
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // We simulate SVG arc with a border + rotation trick
  const trackBg = isDark ? colors.border : colors.borderLight;
  const fillColor = timer <= 10 ? colors.warning : accentColor;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Track circle */}
      <View
        style={{
          width: size, height: size, borderRadius: size / 2,
          borderWidth: strokeWidth, borderColor: trackBg,
          position: 'absolute',
        }}
      />
      {/* Progressed arc — rendered with 4 quadrant clips */}
      {[0, 1, 2, 3].map((q) => {
        const qProgress = Math.min(1, Math.max(0, progress * 4 - q));
        if (qProgress === 0) return null;
        const rotate = q * 90;
        return (
          <View
            key={q}
            style={{
              position: 'absolute',
              width: size, height: size,
              overflow: 'hidden',
              transform: [{ rotate: `${rotate}deg` }],
            }}
          >
            <View style={{ width: size / 2, height: size, overflow: 'hidden' }}>
              <View
                style={{
                  width: size, height: size, borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: 'transparent',
                  borderRightColor: fillColor,
                  borderBottomColor: qProgress > 0.5 ? fillColor : 'transparent',
                  transform: [{ rotate: `${-90 + qProgress * 90}deg` }],
                  position: 'absolute',
                }}
              />
            </View>
          </View>
        );
      })}
      {/* Center label */}
      <Text style={{
        fontFamily: fontFamilies.bodySemiBold,
        fontSize: fontSizes.sm,
        color: timer <= 10 ? colors.warning : colors.textPrimary,
        lineHeight: fontSizes.sm * 1.2,
      }}>
        {timer}s
      </Text>
    </View>
  );
};

// ─── OTP Cell ─────────────────────────────────────────────────────────────────

interface OtpCellProps {
  index: number;
  value: string;
  isActive: boolean;
  hasError: boolean;
  isSuccess: boolean;
  scaleAnim: Animated.Value;
  inputRef: (ref: TextInput | null) => void;
  onChange: (text: string, index: number) => void;
  onKeyPress: (e: any, index: number) => void;
  onFocus: (index: number) => void;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
  accentColor: string;
}

const OtpCell: React.FC<OtpCellProps> = ({
  index, value, isActive, hasError, isSuccess,
  scaleAnim, inputRef, onChange, onKeyPress, onFocus,
  colors, isDark, fontFamilies, fontSizes, accentColor,
}) => {
  const isFilled = value.length > 0;

  const borderColor = hasError
    ? colors.error
    : isSuccess
    ? (isDark ? colors.neonGreen : colors.success)
    : isActive
    ? accentColor
    : isFilled
    ? `${accentColor}70`
    : isDark
    ? colors.border
    : colors.borderLight;

  const bgColor = isSuccess
    ? (isDark ? `${colors.neonGreen}18` : `${colors.success}12`)
    : isFilled && !hasError
    ? (isDark ? `${accentColor}10` : `${accentColor}08`)
    : isDark
    ? colors.surface
    : colors.white;

  return (
    <Animated.View
      style={[
        styles.otpBox,
        {
          transform: [{ scale: scaleAnim }],
          backgroundColor: bgColor,
          borderColor,
          borderWidth: isActive ? 2 : 1.5,
          shadowColor: isActive ? accentColor : hasError ? colors.error : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: isActive ? (isDark ? 0.55 : 0.22) : 0,
          shadowRadius: 12,
          elevation: isActive ? 5 : 0,
        },
      ]}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t, index)}
        onKeyPress={(e) => onKeyPress(e, index)}
        onFocus={() => onFocus(index)}
        style={[
          styles.otpInput,
          {
            fontFamily: fontFamilies.monoBold ?? fontFamilies.bodySemiBold,
            fontSize: fontSizes['2xl'],
            color: isSuccess
              ? (isDark ? colors.neonGreen : colors.success)
              : isFilled
              ? accentColor
              : colors.textPrimary,
          },
        ]}
        keyboardType="number-pad"
        maxLength={1}
        selectionColor={accentColor}
        caretHidden
      />
    </Animated.View>
  );
};

// ─── Main OtpScreen ───────────────────────────────────────────────────────────

const OtpScreen: React.FC = () => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone, isSignup, isForgotPassword } = route.params ?? {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
  const [resending, setResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim = useRef(new Animated.Value(40)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnims = useRef(
    Array.from({ length: OTP_LENGTH }, () => new Animated.Value(1))
  ).current;

  // ── Mount animation ──
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerAnim, { toValue: 1, damping: 20, stiffness: 180, useNativeDriver: true }),
      Animated.spring(cardSlideAnim, { toValue: 0, damping: 20, stiffness: 160, delay: 120, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => inputRefs.current[0]?.focus(), 400);
    return () => clearTimeout(t);
  }, []);

  // ── Countdown ──
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const accentColor: string = isDark ? (colors.neonCyan as string) : (colors.primary as string);
  const bg: string = isDark ? (colors.background as string) : (colors.backgroundSecondary as string);

  // Mask phone: +91 ••••••1234
  const maskedPhone = phone
    ? `${phone.slice(0, phone.indexOf(' ') + 1) || ''}${'•'.repeat(Math.max(0, phone.replace(/\s/g, '').length - 7))}${phone.slice(-4)}`
    : '';

  // ── Shake animation ──
  const shake = useCallback(() => {
    Vibration.vibrate(200);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  // ── Cell pop animation ──
  const popCell = useCallback(
    (index: number) => {
      Animated.sequence([
        Animated.timing(scaleAnims[index], { toValue: 1.18, duration: 75, useNativeDriver: true }),
        Animated.spring(scaleAnims[index], { toValue: 1, speed: 28, bounciness: 10, useNativeDriver: true }),
      ]).start();
    },
    [scaleAnims]
  );

  // ── Input handler ──
  const handleChange = useCallback(
    (text: string, index: number) => {
      const val = text.replace(/[^0-9]/g, '').slice(-1);
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      setError('');

      if (val) {
        popCell(index);
        if (index < OTP_LENGTH - 1) {
          inputRefs.current[index + 1]?.focus();
          setActiveIndex(index + 1);
        } else {
          inputRefs.current[index]?.blur();
          handleVerify(newOtp.join(''));
        }
      }
    },
    [otp, popCell]
  );

  // ── Backspace handler ──
  const handleKeyPress = useCallback(
    (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    },
    [otp]
  );

  // ── Verify ──
  const handleVerify = useCallback(
    async (code?: string) => {
      const finalCode = code ?? otp.join('');
      if (finalCode.length < OTP_LENGTH) {
        setError('Enter all 6 digits to continue');
        shake();
        return;
      }

      Animated.sequence([
        Animated.spring(buttonScaleAnim, { toValue: 0.96, useNativeDriver: true, damping: 14, stiffness: 400 }),
        Animated.spring(buttonScaleAnim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 400 }),
      ]).start();

      setLoading(true);
      try {
        // await authApi.verifyOtp(phone, finalCode);
        await new Promise((r) => setTimeout(r, 700)); // simulate
        setIsVerified(true);

        // Success flash on all cells
        scaleAnims.forEach((anim, i) => {
          setTimeout(() => {
            Animated.sequence([
              Animated.timing(anim, { toValue: 1.12, duration: 80, useNativeDriver: true }),
              Animated.spring(anim, { toValue: 1, speed: 26, bounciness: 8, useNativeDriver: true }),
            ]).start();
          }, i * 50);
        });

        Animated.timing(successAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();

        setTimeout(() => {
          if (isForgotPassword) {
            navigation.replace('ResetPassword', { phone });
          } else {
            navigation.replace('Main');
          }
        }, 1200);
      } catch (e: any) {
        setError(e.message || 'Invalid code — please try again.');
        shake();
        setOtp(Array(OTP_LENGTH).fill(''));
        setTimeout(() => {
          inputRefs.current[0]?.focus();
          setActiveIndex(0);
        }, 50);
      } finally {
        setLoading(false);
      }
    },
    [otp, phone, isForgotPassword, shake, scaleAnims, successAnim, navigation, buttonScaleAnim]
  );

  // ── Resend ──
  const handleResend = useCallback(async () => {
    if (resendTimer > 0 || resending) return;
    setResending(true);
    try {
      // await authApi.resendOtp(phone);
      await new Promise((r) => setTimeout(r, 600));
      setResendTimer(RESEND_TIMEOUT);
      setOtp(Array(OTP_LENGTH).fill(''));
      setError('');
      setIsVerified(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
        setActiveIndex(0);
      }, 50);
    } catch (e: any) {
      setError(e.message || 'Failed to resend. Try again.');
    } finally {
      setResending(false);
    }
  }, [resendTimer, resending, phone]);

  const isComplete = otp.every((d) => d !== '');

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Background blobs */}
      <View style={[styles.blob1, { backgroundColor: isDark ? `${accentColor}0F` : `${accentColor}0C` }]} />
      <View style={[styles.blob2, { backgroundColor: isDark ? `${colors.neonPurple || '#7C3AED'}0C` : `${colors.gold || '#D4A853'}09` }]} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>

          {/* Back Button */}
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: isDark ? `${colors.border}80` : `${colors.white}CC`,
                borderColor: isDark ? colors.border : colors.borderLight,
              },
            ]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View style={{ width: 8, height: 8, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: colors.textSecondary, transform: [{ rotate: '45deg' }], marginLeft: 4 }} />
          </TouchableOpacity>

          {/* ── Header ── */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerAnim,
                transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-22, 0] }) }],
              },
            ]}
          >
            {/* Icon container */}
            <View style={styles.iconWrap}>
              {/* Outer glow ring */}
              <Animated.View
                style={[
                  styles.iconGlowRing,
                  {
                    borderColor: isVerified
                      ? (isDark ? colors.neonGreen : colors.success)
                      : `${accentColor}30`,
                    backgroundColor: isVerified
                      ? (isDark ? `${colors.neonGreen}10` : `${colors.success}10`)
                      : `${accentColor}0A`,
                    opacity: fadeAnim,
                  },
                ]}
              />
              {/* Inner icon box */}
              <View
                style={[
                  styles.iconInner,
                  {
                    backgroundColor: isDark ? `${accentColor}18` : `${accentColor}14`,
                    borderColor: isDark ? `${accentColor}35` : `${accentColor}28`,
                  },
                ]}
              >
                {isVerified ? (
                  <ShieldCheckIcon color={isDark ? colors.neonGreen : colors.success} size={32} />
                ) : (
                  <MessageIcon color={accentColor} size={32} />
                )}
              </View>

              {/* Success ripple overlay */}
              <Animated.View
                style={[
                  styles.successOverlay,
                  {
                    backgroundColor: isDark ? `${colors.neonGreen}22` : `${colors.success}18`,
                    borderColor: isDark ? colors.neonGreen : colors.success,
                    opacity: successAnim,
                    transform: [{ scale: successAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
                  },
                ]}
              />
            </View>

            {/* Title */}
            <Text
              style={{
                fontFamily: fontFamilies.display,
                fontSize: fontSizes['3xl'],
                color: colors.textPrimary,
                letterSpacing: -0.6,
                textAlign: 'center',
                marginBottom: 8,
                lineHeight: fontSizes['3xl'] * 1.2,
              }}
            >
              {isVerified ? 'Verified ' : 'Verify your '}
              <Text style={{ color: isVerified ? (isDark ? colors.neonGreen : colors.success) : accentColor }}>
                {isVerified ? 'successfully' : 'number'}
              </Text>
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontFamily: fontFamilies.body,
                fontSize: fontSizes.base,
                color: colors.textSecondary,
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              {isVerified
                ? 'Taking you in…'
                : (
                  <>
                    {`We sent a ${OTP_LENGTH}-digit code to\n`}
                    <Text style={{ fontFamily: fontFamilies.bodySemiBold, color: colors.textPrimary }}>
                      {maskedPhone || phone}
                    </Text>
                  </>
                )}
            </Text>
          </Animated.View>

          {/* ── OTP Card ── */}
          <Animated.View
            style={[
              styles.otpCard,
              {
                backgroundColor: isDark ? `${colors.surface}E8` : `${colors.white}F0`,
                borderRadius: radius['3xl'],
                borderWidth: 1,
                borderColor: isVerified
                  ? (isDark ? `${colors.neonGreen}40` : `${colors.success}40`)
                  : isDark
                  ? `${colors.border}80`
                  : `${colors.borderLight}CC`,
                shadowColor: isVerified
                  ? (isDark ? colors.neonGreen : colors.success)
                  : isDark
                  ? accentColor
                  : colors.primary,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: isDark ? 0.14 : 0.09,
                shadowRadius: 32,
                elevation: 10,
                transform: [{ translateX: shakeAnim }, { translateY: cardSlideAnim }],
              },
            ]}
          >
            {/* Delivery info badge */}
            <View style={[
              styles.deliveryBadge,
              {
                backgroundColor: isDark ? `${accentColor}14` : `${accentColor}10`,
                borderColor: isDark ? `${accentColor}28` : `${accentColor}22`,
              }
            ]}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: accentColor, marginRight: 7 }} />
              <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.textSecondary }}>
                Code sent via{' '}
                <Text style={{ fontFamily: fontFamilies.bodySemiBold, color: colors.textPrimary }}>SMS</Text>
              </Text>
            </View>

            {/* OTP cells */}
            <View style={[styles.otpRow, { marginTop: spacing[5], marginBottom: spacing[2] }]}>
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <OtpCell
                  key={i}
                  index={i}
                  value={otp[i]}
                  isActive={activeIndex === i}
                  hasError={!!error}
                  isSuccess={isVerified}
                  scaleAnim={scaleAnims[i]}
                  inputRef={(ref) => { inputRefs.current[i] = ref; }}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  onFocus={(idx) => setActiveIndex(idx)}
                  colors={colors}
                  isDark={isDark}
                  fontFamilies={fontFamilies}
                  fontSizes={fontSizes}
                  accentColor={accentColor}
                />
              ))}
            </View>

            {/* Separator dots between groups of 3 */}
            <View style={styles.dotGroupIndicator}>
              <View style={[styles.groupDot, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
            </View>

            {/* Error */}
            {error && (
              <Animated.View
                style={[
                  styles.errorBanner,
                  {
                    backgroundColor: isDark ? `${colors.error}18` : '#FEF2F2',
                    borderColor: `${colors.error}50`,
                    marginTop: spacing[4],
                  },
                ]}
              >
                <View style={{ width: 3, alignSelf: 'stretch', backgroundColor: colors.error, borderRadius: 2, marginRight: 10 }} />
                <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.error, flex: 1 }}>
                  {error}
                </Text>
              </Animated.View>
            )}

            {/* ── Verify Button ── */}
            <Animated.View style={{ marginTop: spacing[6], transform: [{ scale: buttonScaleAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  {
                    backgroundColor: isVerified
                      ? (isDark ? colors.neonGreen : colors.success)
                      : accentColor,
                    borderRadius: radius['2xl'],
                    shadowColor: isVerified
                      ? (isDark ? colors.neonGreen : colors.success)
                      : accentColor,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: loading ? 0.2 : 0.45,
                    shadowRadius: 20,
                    elevation: 8,
                    opacity: loading || isVerified ? 0.88 : 1,
                  },
                ]}
                onPress={() => handleVerify()}
                disabled={loading || isVerified}
                activeOpacity={0.9}
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    {[0, 1, 2].map((i) => (
                      <View
                        key={i}
                        style={[
                          styles.loadingDot,
                          { backgroundColor: isDark ? '#080B14' : '#fff', marginHorizontal: i === 1 ? 5 : 0 },
                        ]}
                      />
                    ))}
                  </View>
                ) : isVerified ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <CheckIcon color={isDark ? '#080B14' : '#fff'} size={18} />
                    <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.base, color: isDark ? '#080B14' : '#fff', letterSpacing: 0.3 }}>
                      Verified!
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.base, color: isDark ? '#080B14' : '#fff', letterSpacing: 0.3 }}>
                      Verify & Continue
                    </Text>
                    <ArrowRightIcon color={isDark ? '#080B14' : '#fff'} />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* ── Resend section ── */}
            <View style={[styles.resendSection, { marginTop: spacing[6] }]}>
              <View style={{ alignItems: 'center', gap: 12 }}>
                {resendTimer > 0 ? (
                  <>
                    <CircularTimer
                      timer={resendTimer}
                      total={RESEND_TIMEOUT}
                      accentColor={accentColor}
                      colors={colors}
                      isDark={isDark}
                      fontFamilies={fontFamilies}
                      fontSizes={fontSizes}
                    />
                    <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textTertiary }}>
                      Didn't receive it? Resend available in{' '}
                      <Text style={{ fontFamily: fontFamilies.bodySemiBold, color: resendTimer <= 10 ? colors.warning : colors.textSecondary }}>
                        {resendTimer}s
                      </Text>
                    </Text>
                  </>
                ) : (
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textTertiary }}>
                      Didn't receive the code?
                    </Text>
                    <TouchableOpacity
                      onPress={handleResend}
                      disabled={resending}
                      activeOpacity={0.7}
                      style={[
                        styles.resendButton,
                        {
                          backgroundColor: isDark ? `${accentColor}14` : `${accentColor}10`,
                          borderColor: isDark ? `${accentColor}30` : `${accentColor}25`,
                          borderRadius: radius.xl,
                        },
                      ]}
                    >
                      {resending ? (
                        <View style={styles.loadingRow}>
                          {[0, 1, 2].map((i) => (
                            <View key={i} style={[styles.loadingDot, { backgroundColor: accentColor, width: 5, height: 5, marginHorizontal: i === 1 ? 3 : 0 }]} />
                          ))}
                        </View>
                      ) : (
                        <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: accentColor }}>
                          Resend Code
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* ── Progress bar ── */}
            <View style={[styles.progressTrack, { backgroundColor: isDark ? colors.border : colors.borderLight, marginTop: spacing[5] }]}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: isVerified
                      ? (isDark ? colors.neonGreen : colors.success)
                      : accentColor,
                    width: `${(otp.filter((d) => d !== '').length / OTP_LENGTH) * 100}%`,
                    opacity: 0.7,
                  },
                ]}
              />
            </View>
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.textTertiary, textAlign: 'center', marginTop: 6 }}>
              {otp.filter((d) => d !== '').length} of {OTP_LENGTH} digits entered
            </Text>

          </Animated.View>

          {/* ── Footer hint ── */}
          <View style={[styles.footerHint, { marginTop: spacing[6] }]}>
            <View style={[styles.hintDot, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.textTertiary, textAlign: 'center', lineHeight: 18 }}>
              By verifying, you agree to receive SMS messages from FutureFund.{'\n'}Standard rates may apply.
            </Text>
            <View style={[styles.hintDot, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
          </View>

        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 48, paddingTop: 12 },

  // Blobs
  blob1: { position: 'absolute', top: -80, right: -60, width: 240, height: 240, borderRadius: 120 },
  blob2: { position: 'absolute', bottom: 160, left: -80, width: 200, height: 200, borderRadius: 100 },

  // Back button
  backButton: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 20 },

  // Header
  header: { alignItems: 'center', marginBottom: 28 },
  iconWrap: { width: 110, height: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 22, position: 'relative' },
  iconGlowRing: { position: 'absolute', width: 108, height: 108, borderRadius: 30, borderWidth: 1.5 },
  iconInner: { width: 80, height: 80, borderRadius: 22, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  successOverlay: { position: 'absolute', width: 80, height: 80, borderRadius: 22, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },

  // OTP Card
  otpCard: { padding: 24 },
  deliveryBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, alignSelf: 'center' },

  // OTP grid
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  otpBox: { width: 46, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  otpInput: { width: '100%', textAlign: 'center', padding: 0 },
  dotGroupIndicator: { alignItems: 'center', marginVertical: 4 },
  groupDot: { width: 4, height: 4, borderRadius: 2 },

  // Error
  errorBanner: { padding: 12, borderRadius: 10, borderWidth: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },

  // Button
  primaryButton: { height: 56, alignItems: 'center', justifyContent: 'center' },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingDot: { width: 7, height: 7, borderRadius: 3.5 },

  // Resend
  resendSection: { alignItems: 'center' },
  resendButton: { paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1 },

  // Progress
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },

  // Footer
  footerHint: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 8 },
  hintDot: { width: 4, height: 4, borderRadius: 2, flexShrink: 0 },
});

export default OtpScreen;