// FutureFund — Forgot Password Screen
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Modal,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';

// ─── Inline Icons ─────────────────────────────────────────────────────────────

const GlobeIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 9, height: 1.5, backgroundColor: color }} />
    <View style={{ width: 9, height: 7, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 1.5, borderColor: color, borderBottomWidth: 0, marginTop: 1 }} />
  </View>
);

const ChevronDownIcon = ({ color }: { color: string }) => (
  <View style={{ width: 12, height: 8, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 7, height: 7, borderRightWidth: 1.5, borderBottomWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], marginTop: -4 }} />
  </View>
);

const CheckIcon = ({ color }: { color: string }) => (
  <View style={{ width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 9, height: 5, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: color, transform: [{ rotate: '-45deg' }], marginTop: -3 }} />
  </View>
);

const PhoneIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 22, borderWidth: 1.5, borderColor: color, borderRadius: 4, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 3 }}>
    <View style={{ width: 5, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

const ShieldIcon = ({ color, size = 48 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size * 1.1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: size, height: size * 1.1,
        borderWidth: 2.5, borderColor: color,
        borderTopLeftRadius: size * 0.25,
        borderTopRightRadius: size * 0.25,
        borderBottomLeftRadius: size * 0.5,
        borderBottomRightRadius: size * 0.5,
        justifyContent: 'center', alignItems: 'center',
      }}
    >
      <View style={{ width: size * 0.3, height: size * 0.22, borderWidth: 2, borderColor: color, borderRadius: 3, marginTop: size * 0.06 }} />
      <View style={{ width: size * 0.2, height: size * 0.18, borderWidth: 2, borderColor: color, borderRadius: size * 0.12, borderBottomWidth: 0, position: 'absolute', top: size * 0.22 }} />
    </View>
  </View>
);

const ArrowRightIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 14, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ width: 6, height: 6, borderRightWidth: 1.5, borderTopWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', right: 0 }} />
  </View>
);

// ─── Country Data ─────────────────────────────────────────────────────────────

interface Country {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
];

// ─── Country Picker Modal ─────────────────────────────────────────────────────

interface CountryPickerModalProps {
  visible: boolean;
  selected: Country;
  onSelect: (c: Country) => void;
  onClose: () => void;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
  radius: any;
  spacing: any;
  accentColor: string;
}

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible, selected, onSelect, onClose,
  colors, isDark, fontFamilies, fontSizes, radius, spacing, accentColor,
}) => {
  const slideAnim = useRef(new Animated.Value(500)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, damping: 22, stiffness: 220 }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 500, duration: 220, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.55)', opacity: backdropAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.modalSheet,
          {
            backgroundColor: isDark ? colors.surface : colors.white,
            borderTopLeftRadius: radius['3xl'],
            borderTopRightRadius: radius['3xl'],
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={[styles.sheetHandle, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
        <Text style={{ fontFamily: fontFamilies.display, fontSize: fontSizes.xl, color: colors.textPrimary, marginBottom: spacing[4], letterSpacing: -0.4 }}>
          Select Country
        </Text>
        <FlatList
          data={COUNTRIES}
          keyExtractor={(item) => item.code}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: isDark ? colors.border : colors.borderLight, marginHorizontal: 4 }} />
          )}
          renderItem={({ item }) => {
            const isSelected = item.code === selected.code;
            return (
              <TouchableOpacity
                style={[
                  styles.countryRow,
                  {
                    backgroundColor: isSelected ? (isDark ? `${accentColor}18` : `${accentColor}12`) : 'transparent',
                    borderRadius: radius.xl,
                    paddingVertical: spacing[3],
                    paddingHorizontal: spacing[3],
                  },
                ]}
                onPress={() => { onSelect(item); onClose(); }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 26, marginRight: spacing[3] }}>{item.flag}</Text>
                <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.base, color: colors.textPrimary, flex: 1 }}>
                  {item.name}
                </Text>
                <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: isSelected ? accentColor : colors.textTertiary }}>
                  {item.code}
                </Text>
                {isSelected && <View style={{ marginLeft: spacing[2] }}><CheckIcon color={accentColor} /></View>}
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </Modal>
  );
};

// ─── Custom Input (self-contained) ────────────────────────────────────────────

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  placeholder?: string;
  prefix?: string;
  onPrefixPress?: () => void;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
  radius: any;
  accentColor: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label, value, onChangeText, error, hint, leftIcon, rightElement,
  secureTextEntry = false, keyboardType = 'default', autoCapitalize = 'none',
  placeholder, prefix, onPrefixPress,
  colors, isDark, fontFamilies, fontSizes, radius, accentColor,
}) => {
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.spring(borderAnim, { toValue: 1, useNativeDriver: false, damping: 18, stiffness: 200 }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.spring(borderAnim, { toValue: 0, useNativeDriver: false, damping: 18, stiffness: 200 }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? colors.error : (isDark ? colors.border : colors.borderLight),
      error ? colors.error : accentColor,
    ],
  });
  const shadowOpacity = borderAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.18] });

  return (
    <View>
      <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: 7, letterSpacing: 0.1 }}>
        {label}
      </Text>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor,
            borderRadius: radius.xl,
            backgroundColor: isDark ? `${colors.background}CC` : colors.backgroundSecondary,
            shadowColor: accentColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity,
            shadowRadius: 10,
            elevation: focused ? 3 : 0,
          },
        ]}
      >
        {prefix ? (
          <TouchableOpacity style={styles.prefixButton} onPress={onPrefixPress} activeOpacity={0.7}>
            <GlobeIcon color={colors.textTertiary} />
            <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: colors.textSecondary, marginLeft: 5 }}>
              {prefix}
            </Text>
            <ChevronDownIcon color={colors.textTertiary} />
            <View style={{ width: 1, height: 20, backgroundColor: isDark ? colors.border : colors.borderLight, marginLeft: 10 }} />
          </TouchableOpacity>
        ) : leftIcon ? (
          <View style={styles.leftIconContainer}>{leftIcon}</View>
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder ?? ''}
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.textInput,
            { fontFamily: fontFamilies.body, fontSize: fontSizes.base, color: colors.textPrimary },
          ]}
        />
        {rightElement && <View style={styles.rightIconContainer}>{rightElement}</View>}
      </Animated.View>

      {error ? (
        <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.error, marginTop: 5, marginLeft: 4 }}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.textTertiary, marginTop: 5, marginLeft: 4 }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
};

// ─── Progress Step Pill ───────────────────────────────────────────────────────

const StepPill = ({
  step, label, active, done,
  colors, isDark, fontFamilies, fontSizes, accentColor,
}: {
  step: number; label: string; active: boolean; done: boolean;
  colors: any; isDark: boolean; fontFamilies: any; fontSizes: any; accentColor: string;
}) => {
  const pillBg = done
    ? accentColor
    : active
    ? (isDark ? `${accentColor}28` : `${accentColor}18`)
    : (isDark ? colors.border : colors.borderLight);

  const textColor = done
    ? (isDark ? '#080B14' : '#fff')
    : active
    ? accentColor
    : colors.textTertiary;

  return (
    <View style={[styles.stepPill, { backgroundColor: pillBg, borderColor: active || done ? accentColor : 'transparent', borderWidth: 1 }]}>
      {done ? (
        <CheckIcon color={isDark ? '#080B14' : '#fff'} />
      ) : (
        <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.xs, color: textColor }}>
          {step}
        </Text>
      )}
      {(active || done) && (
        <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.xs, color: textColor, marginLeft: 5 }}>
          {label}
        </Text>
      )}
    </View>
  );
};

// ─── Main ForgotPasswordScreen ────────────────────────────────────────────────

type Step = 'phone' | 'otp' | 'success';

const ForgotPasswordScreen: React.FC = () => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation<any>();

  const [step, setStep] = useState<Step>('phone');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim = useRef(new Animated.Value(40)).current;
  const headerSlideAnim = useRef(new Animated.Value(-20)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const successScaleAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlideAnim, { toValue: 0, damping: 20, stiffness: 180, useNativeDriver: true }),
      Animated.spring(cardSlideAnim, { toValue: 0, damping: 20, stiffness: 160, delay: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  const animateToNextStep = (cb: () => void) => {
    Animated.parallel([
      Animated.timing(cardSlideAnim, { toValue: -30, duration: 180, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      cb();
      cardSlideAnim.setValue(50);
      Animated.parallel([
        Animated.spring(cardSlideAnim, { toValue: 0, damping: 20, stiffness: 160, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
    });
  };

  const accentColor: string = isDark ? (colors.neonCyan as string) : (colors.primary as string);
  const bg: string = isDark ? (colors.background as string) : (colors.backgroundSecondary as string);

  const commonInputProps = { colors, isDark, fontFamilies, fontSizes, radius, accentColor };

  const validatePhone = useCallback(() => {
    const e: Record<string, string> = {};
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [phone]);

  const handleSendOtp = async () => {
    if (!validatePhone()) return;

    Animated.sequence([
      Animated.spring(buttonScaleAnim, { toValue: 0.96, useNativeDriver: true, damping: 14, stiffness: 400 }),
      Animated.spring(buttonScaleAnim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 400 }),
    ]).start();

    setLoading(true);
    try {
      // await authApi.forgotPassword(`${selectedCountry.code}${phone}`);
      await new Promise((r) => setTimeout(r, 800)); // simulate API
      animateToNextStep(() => setStep('otp'));
      navigation.navigate('Otp', {
        phone: `${selectedCountry.code}${phone}`,
        isSignup: false,
        isForgotPassword: true,
      });
    } catch (e: any) {
      setErrors({ submit: e.message || 'Could not send OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Step metadata
  const stepMeta = {
    phone: { title: 'Reset your\n', accent: 'password', subtitle: 'Enter the phone number linked to your\nFutureFund account.' },
    otp: { title: 'Verify your\n', accent: 'identity', subtitle: 'We sent a 6-digit code to\n' },
    success: { title: 'All done!', accent: '', subtitle: 'Your password has been reset.' },
  };

  const meta = stepMeta[step];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Background decorative blobs */}
      <View style={[styles.blob1, { backgroundColor: isDark ? `${colors.neonCyan}10` : `${colors.primary}0C` }]} />
      <View style={[styles.blob2, { backgroundColor: isDark ? `${colors.neonPurple || '#7C3AED'}0C` : `${colors.gold || '#D4A853'}09` }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, {
              backgroundColor: isDark ? `${colors.border}80` : `${colors.white}CC`,
              borderColor: isDark ? colors.border : colors.borderLight,
            }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View style={{ width: 8, height: 8, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: colors.textSecondary, transform: [{ rotate: '45deg' }], marginLeft: 4 }} />
          </TouchableOpacity>

          {/* ── Header ── */}
          <Animated.View style={[styles.header, { transform: [{ translateY: headerSlideAnim }] }]}>
            {/* Shield Icon */}
            <View style={[styles.iconCircle, {
              backgroundColor: isDark ? `${accentColor}16` : `${accentColor}12`,
              borderColor: isDark ? `${accentColor}30` : `${accentColor}20`,
            }]}>
              <ShieldIcon color={accentColor} size={28} />
            </View>

            <Text style={{
              fontFamily: fontFamilies.display,
              fontSize: fontSizes['3xl'],
              color: colors.textPrimary,
              letterSpacing: -0.8,
              marginBottom: 8,
              lineHeight: fontSizes['3xl'] * 1.2,
            }}>
              {meta.title}
              {meta.accent ? <Text style={{ color: accentColor }}>{meta.accent}</Text> : null}
            </Text>

            <Text style={{
              fontFamily: fontFamilies.body,
              fontSize: fontSizes.base,
              color: colors.textSecondary,
              lineHeight: 22,
            }}>
              {meta.subtitle}
              {step === 'otp' && (
                <Text style={{ fontFamily: fontFamilies.bodySemiBold, color: colors.textPrimary }}>
                  {selectedCountry.code} {phone}
                </Text>
              )}
            </Text>
          </Animated.View>

          {/* ── Step Indicators ── */}
          <View style={[styles.stepsRow, { marginBottom: spacing[6] }]}>
            <StepPill step={1} label="Phone" active={step === 'phone'} done={step === 'otp' || step === 'success'} colors={colors} isDark={isDark} fontFamilies={fontFamilies} fontSizes={fontSizes} accentColor={accentColor} />
            <View style={[styles.stepConnector, { backgroundColor: (step === 'otp' || step === 'success') ? accentColor : (isDark ? colors.border : colors.borderLight) }]} />
            <StepPill step={2} label="Verify" active={step === 'otp'} done={step === 'success'} colors={colors} isDark={isDark} fontFamilies={fontFamilies} fontSizes={fontSizes} accentColor={accentColor} />
            <View style={[styles.stepConnector, { backgroundColor: step === 'success' ? accentColor : (isDark ? colors.border : colors.borderLight) }]} />
            <StepPill step={3} label="Done" active={step === 'success'} done={false} colors={colors} isDark={isDark} fontFamilies={fontFamilies} fontSizes={fontSizes} accentColor={accentColor} />
          </View>

          {/* ── Form Card ── */}
          <Animated.View
            style={[
              styles.formCard,
              {
                backgroundColor: isDark ? `${colors.surface}E8` : `${colors.white}F0`,
                borderRadius: radius['3xl'],
                borderWidth: 1,
                borderColor: isDark ? `${colors.border}80` : `${colors.borderLight}CC`,
                shadowColor: isDark ? colors.neonCyan : colors.primary,
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: isDark ? 0.12 : 0.08,
                shadowRadius: 32,
                elevation: 10,
                transform: [{ translateY: cardSlideAnim }],
              },
            ]}
          >
            {/* Phone Step */}
            {step === 'phone' && (
              <View>
                <CustomInput
                  label="Phone Number"
                  value={phone}
                  onChangeText={(t) => {
                    setPhone(t.replace(/\D/g, ''));
                    if (errors.phone) setErrors((p) => { const n = {...p}; delete n.phone; return n; });
                  }}
                  error={errors.phone}
                  keyboardType="phone-pad"
                  placeholder="9876543210"
                  hint="We'll send a one-time code to this number"
                  prefix={`${selectedCountry.flag} ${selectedCountry.code}`}
                  onPrefixPress={() => setShowCountryPicker(true)}
                  {...commonInputProps}
                />

                {errors.submit && (
                  <View style={[styles.errorBanner, { backgroundColor: isDark ? `${colors.error}18` : '#FEF2F2', borderColor: `${colors.error}60` }]}>
                    <View style={{ width: 4, alignSelf: 'stretch', backgroundColor: colors.error, borderRadius: 2, marginRight: 10 }} />
                    <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.error, flex: 1 }}>
                      {errors.submit}
                    </Text>
                  </View>
                )}

                {/* Info box */}
                <View style={[styles.infoBox, {
                  backgroundColor: isDark ? `${accentColor}0E` : `${accentColor}0A`,
                  borderColor: isDark ? `${accentColor}28` : `${accentColor}22`,
                  marginTop: spacing[4],
                }]}>
                  <View style={[styles.infoDot, { backgroundColor: accentColor }]} />
                  <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textSecondary, flex: 1, lineHeight: 20 }}>
                    Make sure this number is linked to your account and can receive SMS messages.
                  </Text>
                </View>

                {/* Send OTP Button */}
                <Animated.View style={{ marginTop: spacing[7], transform: [{ scale: buttonScaleAnim }] }}>
                  <TouchableOpacity
                    style={[
                      styles.primaryButton,
                      {
                        backgroundColor: accentColor,
                        borderRadius: radius['2xl'],
                        shadowColor: accentColor,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: loading ? 0.2 : 0.45,
                        shadowRadius: 20,
                        elevation: 8,
                        opacity: loading ? 0.85 : 1,
                      },
                    ]}
                    onPress={handleSendOtp}
                    disabled={loading}
                    activeOpacity={0.9}
                  >
                    {loading ? (
                      <View style={styles.loadingRow}>
                        {[0, 1, 2].map((i) => (
                          <View key={i} style={[styles.loadingDot, { backgroundColor: isDark ? '#080B14' : '#fff', marginHorizontal: i === 1 ? 5 : 0 }]} />
                        ))}
                      </View>
                    ) : (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.base, color: isDark ? '#080B14' : '#fff', letterSpacing: 0.3 }}>
                          Send Reset Code
                        </Text>
                        <ArrowRightIcon color={isDark ? '#080B14' : '#fff'} />
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </Animated.View>

          {/* ── Footer ── */}
          <View style={[styles.footer, { marginTop: spacing[7] }]}>
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textTertiary }}>
              Remember your password?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: accentColor }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>

      {/* Country Picker Modal */}
      <CountryPickerModal
        visible={showCountryPicker}
        selected={selectedCountry}
        onSelect={setSelectedCountry}
        onClose={() => setShowCountryPicker(false)}
        colors={colors}
        isDark={isDark}
        fontFamilies={fontFamilies}
        fontSizes={fontSizes}
        radius={radius}
        spacing={spacing}
        accentColor={accentColor}
      />
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 48, paddingTop: 12 },

  // Blobs
  blob1: { position: 'absolute', top: -80, right: -60, width: 240, height: 240, borderRadius: 120 },
  blob2: { position: 'absolute', bottom: 220, left: -80, width: 200, height: 200, borderRadius: 100 },

  // Back
  backButton: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 20 },

  // Header
  header: { marginBottom: 24 },
  iconCircle: { width: 64, height: 64, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },

  // Steps
  stepsRow: { flexDirection: 'row', alignItems: 'center' },
  stepPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  stepConnector: { flex: 1, height: 1.5, marginHorizontal: 4 },

  // Form card
  formCard: { padding: 24 },

  // Input
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, minHeight: 52, paddingHorizontal: 14,
  },
  leftIconContainer: { marginRight: 10, opacity: 0.7 },
  rightIconContainer: { marginLeft: 8 },
  textInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 0 },
  prefixButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },

  // Info box
  infoBox: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  infoDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },

  // Error banner
  errorBanner: {
    marginTop: 14, padding: 12, borderRadius: 10,
    borderWidth: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden',
  },

  // Button
  primaryButton: { height: 56, alignItems: 'center', justifyContent: 'center' },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingDot: { width: 7, height: 7, borderRadius: 3.5 },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },

  // Modal
  modalSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '65%',
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  countryRow: { flexDirection: 'row', alignItems: 'center' },
});

export default ForgotPasswordScreen;