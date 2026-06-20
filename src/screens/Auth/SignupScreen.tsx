// FutureFund — Signup Screen
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

// ─── Inline Icons ────────────────────────────────────────────────────────────

const UserIcon = ({ color }: { color: string }) => (
  <View style={{ width: 20, height: 22, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: 11, height: 11, borderRadius: 5.5, borderWidth: 1.5, borderColor: color }} />
    <View style={{ width: 17, height: 7, borderTopLeftRadius: 9, borderTopRightRadius: 9, borderWidth: 1.5, borderColor: color, marginTop: 2, borderBottomWidth: 0 }} />
  </View>
);

const MailIcon = ({ color }: { color: string }) => (
  <View style={{ width: 20, height: 15, borderWidth: 1.5, borderColor: color, borderRadius: 3, alignItems: 'center', overflow: 'hidden', justifyContent: 'flex-start' }}>
    <View style={{ width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderTopWidth: 7, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: color }} />
  </View>
);

const LockIcon = ({ color }: { color: string }) => (
  <View style={{ width: 20, height: 22, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 14, height: 9, borderWidth: 1.5, borderColor: color, borderRadius: 2, marginTop: 5 }} />
    <View style={{ width: 9, height: 7, borderWidth: 1.5, borderColor: color, borderRadius: 5, borderBottomWidth: 0, position: 'absolute', top: 1 }} />
  </View>
);

const EyeIcon = ({ color, closed = false }: { color: string; closed?: boolean }) => (
  <View style={{ width: 22, height: 16, justifyContent: 'center', alignItems: 'center' }}>
    {closed ? (
      <View style={{ width: 20, height: 1.5, backgroundColor: color, transform: [{ rotate: '-30deg' }], borderRadius: 1 }} />
    ) : (
      <>
        <View style={{ width: 18, height: 10, borderRadius: 9, borderWidth: 1.5, borderColor: color, position: 'absolute' }} />
        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: color }} />
      </>
    )}
  </View>
);

const ChevronDownIcon = ({ color }: { color: string }) => (
  <View style={{ width: 12, height: 8, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 8, height: 8, borderRightWidth: 1.5, borderBottomWidth: 1.5, borderColor: color, transform: [{ rotate: '45deg' }], marginTop: -4 }} />
  </View>
);

const CheckIcon = ({ color }: { color: string }) => (
  <View style={{ width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 9, height: 5, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: color, transform: [{ rotate: '-45deg' }], marginTop: -3 }} />
  </View>
);

const GlobeIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: color, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 9, height: 1.5, backgroundColor: color }} />
    <View style={{ width: 9, height: 7, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderWidth: 1.5, borderColor: color, borderBottomWidth: 0, marginTop: 1 }} />
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
}

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  selected,
  onSelect,
  onClose,
  colors,
  isDark,
  fontFamilies,
  fontSizes,
  radius,
  spacing,
}) => {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, damping: 22, stiffness: 220 }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 400, duration: 200, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const accentColor = isDark ? colors.neonCyan : colors.primary;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.modalBackdrop, { opacity: backdropAnim }]}>
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
        {/* Handle */}
        <View style={[styles.sheetHandle, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />

        <Text
          style={{
            fontFamily: fontFamilies.display,
            fontSize: fontSizes.xl,
            color: colors.textPrimary,
            marginBottom: spacing[4],
            letterSpacing: -0.4,
          }}
        >
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
                {isSelected && (
                  <View style={{ marginLeft: spacing[2] }}>
                    <CheckIcon color={accentColor} />
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </Modal>
  );
};

// ─── Custom Input ─────────────────────────────────────────────────────────────

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
  editable?: boolean;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
  radius: any;
  spacing: any;
  accentColor: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label, value, onChangeText, error, hint, leftIcon, rightElement,
  secureTextEntry = false, keyboardType = 'default', autoCapitalize = 'none',
  placeholder, prefix, onPrefixPress, editable = true,
  colors, isDark, fontFamilies, fontSizes, radius, spacing, accentColor,
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
          editable={editable}
          style={[
            styles.textInput,
            {
              fontFamily: fontFamilies.body,
              fontSize: fontSizes.base,
              color: colors.textPrimary,
              flex: 1,
            },
          ]}
        />

        {rightElement && (
          <View style={styles.rightIconContainer}>{rightElement}</View>
        )}
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

// ─── Password Input ───────────────────────────────────────────────────────────

interface PasswordInputProps extends Omit<CustomInputProps, 'secureTextEntry' | 'rightElement'> {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomInput
      {...props}
      secureTextEntry={!showPassword}
      rightElement={
        <TouchableOpacity onPress={() => setShowPassword((p) => !p)} style={{ padding: 6 }} activeOpacity={0.7}>
          <EyeIcon color={props.colors.textTertiary} closed={showPassword} />
        </TouchableOpacity>
      }
    />
  );
};

// ─── Password Strength ────────────────────────────────────────────────────────

interface StrengthProps {
  password: string;
  colors: any;
  isDark: boolean;
  fontFamilies: any;
  fontSizes: any;
  spacing: any;
}

const getStrength = (pwd: string): { level: number; label: string } => {
  if (pwd.length === 0) return { level: 0, label: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: 'Weak' };
  if (score === 2) return { level: 2, label: 'Fair' };
  if (score === 3) return { level: 3, label: 'Good' };
  return { level: 4, label: 'Strong' };
};

const PasswordStrength: React.FC<StrengthProps> = ({ password, colors, isDark, fontFamilies, fontSizes, spacing }) => {
  const { level, label } = getStrength(password);
  const segmentColors = [colors.error, colors.warning, colors.info, isDark ? colors.neonGreen : colors.success];

  if (!password) return null;

  return (
    <View style={{ marginTop: spacing[2] }}>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {[1, 2, 3, 4].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.strengthSegment,
              { backgroundColor: i <= level ? segmentColors[level - 1] : (isDark ? colors.border : colors.borderLight) },
            ]}
          />
        ))}
      </View>
      <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: level <= 1 ? colors.error : level === 2 ? colors.warning : level === 3 ? colors.info : isDark ? colors.neonGreen : colors.success, marginTop: 5 }}>
        {label} password
      </Text>
    </View>
  );
};

// ─── Main SignupScreen ────────────────────────────────────────────────────────

const SignupScreen: React.FC = () => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation<any>();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim = useRef(new Animated.Value(40)).current;
  const headerSlideAnim = useRef(new Animated.Value(-20)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const checkboxScaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlideAnim, { toValue: 0, damping: 20, stiffness: 180, useNativeDriver: true }),
      Animated.spring(cardSlideAnim, { toValue: 0, damping: 20, stiffness: 160, delay: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  const accentColor: string = isDark ? (colors.neonCyan as string) : (colors.primary as string);
  const bg: string = isDark ? (colors.background as string) : (colors.backgroundSecondary as string);

  const commonInputProps = { colors, isDark, fontFamilies, fontSizes, radius, spacing, accentColor };

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    if (!password || password.length < 8) e.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) e.terms = 'You must agree to the Terms & Privacy Policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [name, email, phone, password, confirmPassword, agreedToTerms]);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSignup = async () => {
    if (!validate()) return;

    // Button press animation
    Animated.sequence([
      Animated.spring(buttonScaleAnim, { toValue: 0.96, useNativeDriver: true, damping: 14, stiffness: 400 }),
      Animated.spring(buttonScaleAnim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 400 }),
    ]).start();

    setLoading(true);
    try {
      // await authApi.signup({ name, phone: `${selectedCountry.code}${phone}`, email, password });
      navigation.navigate('Otp', { phone: `${selectedCountry.code}${phone}`, isSignup: true });
    } catch (e: any) {
      setErrors({ submit: e.message || 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxPress = () => {
    Animated.sequence([
      Animated.spring(checkboxScaleAnim, { toValue: 0.85, useNativeDriver: true, damping: 12, stiffness: 400 }),
      Animated.spring(checkboxScaleAnim, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 400 }),
    ]).start();
    setAgreedToTerms((prev) => !prev);
    if (errors.terms) setErrors((prev) => { const n = { ...prev }; delete n.terms; return n; });
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Background decorative blobs */}
      <View style={[styles.blob1, { backgroundColor: isDark ? `${colors.neonCyan}14` : `${colors.primary}0D` }]} />
      <View style={[styles.blob2, { backgroundColor: isDark ? `${colors.neonPurple || '#7C3AED'}10` : `${colors.gold || '#D4A853'}0A` }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: isDark ? `${colors.border}80` : `${colors.white}CC`, borderColor: isDark ? colors.border : colors.borderLight }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View style={{ width: 8, height: 8, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: colors.textSecondary, transform: [{ rotate: '45deg' }], marginLeft: 4 }} />
          </TouchableOpacity>

          {/* ── Header ── */}
          <Animated.View style={[styles.header, { transform: [{ translateY: headerSlideAnim }] }]}>
            <Text style={{ fontFamily: fontFamilies.display, fontSize: fontSizes['3xl'], color: colors.textPrimary, letterSpacing: -0.8, marginBottom: 8, lineHeight: fontSizes['3xl'] * 1.2 }}>
              Create your{' '}
              <Text style={{ color: accentColor }}>account</Text>
            </Text>
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.base, color: colors.textSecondary, lineHeight: 22 }}>
              Join thousands building wealth smarter{'\n'}with FutureFund.
            </Text>
          </Animated.View>

          {/* ── Step indicator ── */}
          <View style={[styles.stepIndicator, { marginBottom: spacing[6] }]}>
            {[1, 2, 3].map((step) => (
              <View
                key={step}
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: step === 1 ? accentColor : (isDark ? colors.border : colors.borderLight),
                    width: step === 1 ? 28 : 8,
                    shadowColor: step === 1 ? accentColor : 'transparent',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: step === 1 ? 0.8 : 0,
                    shadowRadius: 8,
                    elevation: step === 1 ? 4 : 0,
                  },
                ]}
              />
            ))}
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
            <View style={{ gap: spacing[4] }}>
              {/* Full Name */}
              <CustomInput
                label="Full Name"
                value={name}
                onChangeText={(t) => { setName(t); if (errors.name) setErrors((p) => { const n = {...p}; delete n.name; return n; }); }}
                error={errors.name}
                leftIcon={<UserIcon color={colors.textTertiary!} />}
                autoCapitalize="words"
                placeholder="Harshith Kasetti"
                {...commonInputProps}
              />

              {/* Email */}
              <CustomInput
                label="Email Address"
                value={email}
                onChangeText={(t) => { setEmail(t); if (errors.email) setErrors((p) => { const n = {...p}; delete n.email; return n; }); }}
                error={errors.email}
                leftIcon={<MailIcon color={colors.textTertiary!} />}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="harshith@example.com"
                {...commonInputProps}
              />

              {/* Phone with Country Code */}
              <CustomInput
                label="Phone Number"
                value={phone}
                onChangeText={(t) => { setPhone(t.replace(/\D/g, '')); if (errors.phone) setErrors((p) => { const n = {...p}; delete n.phone; return n; }); }}
                error={errors.phone}
                keyboardType="phone-pad"
                placeholder="9876543210"
                prefix={`${selectedCountry.flag} ${selectedCountry.code}`}
                onPrefixPress={() => setShowCountryPicker(true)}
                {...commonInputProps}
              />

              {/* Password */}
              <View>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChangeText={(t) => { setPassword(t); if (errors.password) setErrors((p) => { const n = {...p}; delete n.password; return n; }); }}
                  error={errors.password}
                  leftIcon={<LockIcon color={colors.textTertiary!} />}
                  hint="Min. 8 characters with numbers & symbols"
                  {...commonInputProps}
                />
                <PasswordStrength password={password} colors={colors} isDark={isDark} fontFamilies={fontFamilies} fontSizes={fontSizes} spacing={spacing} />
              </View>

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); if (errors.confirmPassword) setErrors((p) => { const n = {...p}; delete n.confirmPassword; return n; }); }}
                error={errors.confirmPassword}
                leftIcon={<LockIcon color={colors.textTertiary!} />}
                placeholder="Re-enter password"
                {...commonInputProps}
              />
            </View>

            {/* ── Terms ── */}
            <TouchableOpacity
              style={[styles.termsRow, { marginTop: spacing[5] }]}
              onPress={handleCheckboxPress}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: agreedToTerms ? accentColor : 'transparent',
                    borderColor: errors.terms ? colors.error : agreedToTerms ? accentColor : (isDark ? colors.border : colors.borderLight),
                    shadowColor: agreedToTerms ? accentColor : 'transparent',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: agreedToTerms ? 0.55 : 0,
                    shadowRadius: 8,
                    elevation: agreedToTerms ? 4 : 0,
                    transform: [{ scale: checkboxScaleAnim }],
                  },
                ]}
              >
                {agreedToTerms && <CheckIcon color={isDark ? '#080B14' : '#fff'} />}
              </Animated.View>
              <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textSecondary, flex: 1, lineHeight: 20 }}>
                I agree to the{' '}
                <Text style={{ color: accentColor, fontFamily: fontFamilies.bodySemiBold }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: accentColor, fontFamily: fontFamilies.bodySemiBold }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {errors.terms && (
              <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.error, marginTop: 5, marginLeft: 34 }}>
                {errors.terms}
              </Text>
            )}

            {/* ── Error Banner ── */}
            {errors.submit && (
              <View style={[styles.errorBanner, { backgroundColor: isDark ? `${colors.error}18` : '#FEF2F2', borderColor: `${colors.error}60` }]}>
                <View style={{ width: 4, height: '100%', backgroundColor: colors.error, borderRadius: 2, marginRight: 10 }} />
                <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.error, flex: 1 }}>
                  {errors.submit}
                </Text>
              </View>
            )}

            {/* ── Create Account Button ── */}
            <Animated.View style={{ marginTop: spacing[6], transform: [{ scale: buttonScaleAnim }] }}>
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
                onPress={handleSignup}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    <View style={[styles.loadingDot, { backgroundColor: isDark ? '#080B14' : '#fff' }]} />
                    <View style={[styles.loadingDot, { backgroundColor: isDark ? '#080B14' : '#fff', marginHorizontal: 5 }]} />
                    <View style={[styles.loadingDot, { backgroundColor: isDark ? '#080B14' : '#fff' }]} />
                  </View>
                ) : (
                  <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.base, color: isDark ? '#080B14' : '#fff', letterSpacing: 0.3 }}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* ── Footer ── */}
          <View style={[styles.footer, { marginTop: spacing[7] }]}>
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textTertiary }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: accentColor }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>

      {/* ── Country Picker Modal ── */}
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
      />
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 48, paddingTop: 12 },

  // Background decorative blobs
  blob1: {
    position: 'absolute', top: -80, right: -60,
    width: 240, height: 240, borderRadius: 120,
  },
  blob2: {
    position: 'absolute', bottom: 200, left: -80,
    width: 200, height: 200, borderRadius: 100,
  },

  // Back button
  backButton: {
    width: 40, height: 40, borderRadius: 12,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    marginTop: 8, marginBottom: 20,
  },

  // Header
  header: { marginBottom: 24 },

  // Step dots
  stepIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepDot: { height: 8, borderRadius: 4 },

  // Form card
  formCard: { padding: 24 },

  // Input
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, minHeight: 52,
    paddingHorizontal: 14,
  },
  leftIconContainer: { marginRight: 10, opacity: 0.7 },
  rightIconContainer: { marginLeft: 8 },
  textInput: { paddingVertical: 14, paddingHorizontal: 0 },
  prefixButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingRight: 0, marginRight: 0, gap: 4,
  },

  // Strength meter
  strengthSegment: { flex: 1, height: 4, borderRadius: 2 },

  // Terms
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
    marginTop: 1, flexShrink: 0,
  },

  // Error
  errorBanner: {
    marginTop: 14, padding: 12, borderRadius: 10,
    borderWidth: 1, flexDirection: 'row', alignItems: 'center',
    overflow: 'hidden',
  },

  // Primary button
  primaryButton: {
    height: 56, alignItems: 'center', justifyContent: 'center',
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingDot: { width: 7, height: 7, borderRadius: 3.5 },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 8 },

  // Modal
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  modalSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '65%',
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2,
    alignSelf: 'center', marginBottom: 20,
  },
  countryRow: { flexDirection: 'row', alignItems: 'center' },
});

export default SignupScreen;