// FutureFund — Login Screen
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

const PhoneIcon = ({ color }: { color: string }) => (
  <View style={{ width: 18, height: 22, borderWidth: 1.5, borderColor: color, borderRadius: 4, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 3 }}>
    <View style={{ width: 5, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
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

// ─── Social Brand Icons ───────────────────────────────────────────────────────

const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.9, height: size * 0.9, borderRadius: (size * 0.9) / 2, borderWidth: 1.8, borderColor: '#4285F4', borderTopColor: '#DB4437', borderRightColor: '#F4B400', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.4, height: 1.8, backgroundColor: '#4285F4', position: 'absolute', right: 2 }} />
    </View>
  </View>
);

const AppleIcon = ({ color, size = 18 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size + 2, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.7, height: size * 0.85, borderRadius: 3, borderWidth: 1.5, borderColor: color }} />
    <View style={{ width: 5, height: 4, borderTopLeftRadius: 4, borderTopRightRadius: 4, borderWidth: 1.5, borderColor: color, borderBottomWidth: 0, position: 'absolute', top: 0, right: size * 0.25 }} />
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
  label, value, onChangeText, error, leftIcon, rightElement,
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
      ) : null}
    </View>
  );
};

// ─── Main LoginScreen ─────────────────────────────────────────────────────────

const LoginScreen: React.FC = () => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation<any>();

  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Animations
  const headerAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.stagger(120, [
      Animated.spring(headerAnim, { toValue: 1, useNativeDriver: true, damping: 20, stiffness: 180 }),
      Animated.spring(formAnim, { toValue: 1, useNativeDriver: true, damping: 20, stiffness: 160 }),
    ]).start();
  }, []);

  const accentColor: string = isDark ? (colors.neonCyan as string) : (colors.primary as string);
  const bg: string = isDark ? (colors.background as string) : (colors.backgroundSecondary as string);

  const commonInputProps = { colors, isDark, fontFamilies, fontSizes, radius, accentColor };

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [phone, password]);

  const handleLogin = async () => {
    if (!validate()) return;

    Animated.sequence([
      Animated.spring(buttonScaleAnim, { toValue: 0.96, useNativeDriver: true, damping: 14, stiffness: 400 }),
      Animated.spring(buttonScaleAnim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 400 }),
    ]).start();

    setLoading(true);
    try {
      // await authApi.login(`${selectedCountry.code}${phone}`, password);
      navigation.replace('Main');
    } catch (e: any) {
      setErrors({ submit: e.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Decorative blobs */}
      <View style={[styles.blob1, { backgroundColor: isDark ? `${colors.neonCyan}12` : `${colors.primary}0D` }]} />
      <View style={[styles.blob2, { backgroundColor: isDark ? `${colors.neonPurple || '#7C3AED'}0C` : `${colors.gold || '#D4A853'}0A` }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [-24, 0] }) }],
            },
          ]}
        >
          {/* Brand gem + wordmark */}
          <View style={styles.gemRow}>
            <View
              style={[
                styles.headerGem,
                {
                  backgroundColor: accentColor,
                  shadowColor: accentColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isDark ? 0.85 : 0.45,
                  shadowRadius: 12,
                  elevation: 6,
                },
              ]}
            />
            <Text style={{ fontFamily: fontFamilies.heading, fontSize: fontSizes.sm, letterSpacing: 4, color: colors.textTertiary }}>
              FUTUREFUND
            </Text>
          </View>

          <Text
            style={{
              fontFamily: fontFamilies.display,
              fontSize: fontSizes['4xl'],
              color: colors.textPrimary,
              letterSpacing: -1,
              lineHeight: fontSizes['4xl'] * 1.2,
              marginBottom: 10,
            }}
          >
            Welcome{'\n'}
            <Text style={{ color: accentColor }}>back.</Text>
          </Text>

          <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.base, color: colors.textSecondary, lineHeight: 22 }}>
            Sign in to continue building{'\n'}your financial future.
          </Text>
        </Animated.View>

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
              opacity: formAnim,
              transform: [{ translateY: formAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            },
          ]}
        >
          <View style={{ gap: spacing[5] }}>
            {/* Phone + Country Picker */}
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
            <CustomInput
              label="Password"
              value={password}
              onChangeText={(t) => { setPassword(t); if (errors.password) setErrors((p) => { const n = {...p}; delete n.password; return n; }); }}
              error={errors.password}
              secureTextEntry={!showPassword}
              leftIcon={<LockIcon color={colors.textTertiary!} />}
              rightElement={
                <TouchableOpacity onPress={() => setShowPassword((p) => !p)} style={{ padding: 6 }} activeOpacity={0.7}>
                  <EyeIcon color={colors.textTertiary!} closed={!showPassword} />
                </TouchableOpacity>
              }
              placeholder="••••••••"
              {...commonInputProps}
            />
          </View>

          {/* Forgot password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', marginTop: spacing[3] }}
            activeOpacity={0.7}
          >
            <Text style={{ fontFamily: fontFamilies.bodyMedium, fontSize: fontSizes.sm, color: accentColor }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Error banner */}
          {errors.submit && (
            <View style={[styles.errorBanner, { backgroundColor: isDark ? `${colors.error}18` : '#FEF2F2', borderColor: `${colors.error}60` }]}>
              <View style={{ width: 4, alignSelf: 'stretch', backgroundColor: colors.error, borderRadius: 2, marginRight: 10 }} />
              <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.error, flex: 1 }}>
                {errors.submit}
              </Text>
            </View>
          )}

          {/* Sign In Button */}
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
              onPress={handleLogin}
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
                <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.base, color: isDark ? '#080B14' : '#fff', letterSpacing: 0.3 }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <View style={[styles.divider, { marginVertical: spacing[6] }]}>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
            <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.xs, color: colors.textTertiary, marginHorizontal: spacing[3], letterSpacing: 0.8 }}>
              OR
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? colors.border : colors.borderLight }]} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : colors.white,
                  borderColor: isDark ? colors.border : colors.borderLight,
                  borderRadius: radius.xl,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0.3 : 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                },
              ]}
              activeOpacity={0.75}
            >
              <GoogleIcon size={20} />
              <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: colors.textSecondary, marginLeft: 8 }}>
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialBtn,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : colors.white,
                  borderColor: isDark ? colors.border : colors.borderLight,
                  borderRadius: radius.xl,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0.3 : 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                },
              ]}
              activeOpacity={0.75}
            >
              <AppleIcon color={colors.textSecondary!} size={18} />
              <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: colors.textSecondary, marginLeft: 8 }}>
                Apple
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <View style={[styles.footer, { marginTop: spacing[7] }]}>
          <Text style={{ fontFamily: fontFamilies.body, fontSize: fontSizes.sm, color: colors.textTertiary }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} activeOpacity={0.7}>
            <Text style={{ fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm, color: accentColor }}>
              Create one
            </Text>
          </TouchableOpacity>
        </View>
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
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 56, paddingBottom: 48 },

  // Background blobs
  blob1: { position: 'absolute', top: -90, right: -70, width: 260, height: 260, borderRadius: 130 },
  blob2: { position: 'absolute', bottom: 180, left: -90, width: 220, height: 220, borderRadius: 110 },

  // Header
  header: { marginBottom: 32 },
  gemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 22 },
  headerGem: { width: 10, height: 10, borderRadius: 3, transform: [{ rotate: '45deg' }] },

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
  prefixButton: { flexDirection: 'row', alignItems: 'center', paddingRight: 0, marginRight: 0, gap: 4 },

  // Error
  errorBanner: {
    marginTop: 14, padding: 12, borderRadius: 10,
    borderWidth: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden',
  },

  // Button
  primaryButton: { height: 56, alignItems: 'center', justifyContent: 'center' },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingDot: { width: 7, height: 7, borderRadius: 3.5 },

  // Divider
  divider: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, height: 1 },

  // Social
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: { flex: 1, height: 50, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },

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

export default LoginScreen;