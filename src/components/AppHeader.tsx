// FutureFund — AppHeader Component
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  transparent?: boolean;
  style?: ViewStyle;
  titleStyle?: object;
  variant?: 'default' | 'large' | 'minimal';
}

const BackArrowIcon = ({ color }: { color: string }) => (
  <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: 10,
        height: 10,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { translateX: 2 }],
      }}
    />
  </View>
);

const FutureFundLogo = ({ isDark }: { isDark: boolean }) => (
  <View style={styles.logoContainer}>
    <View
      style={[
        styles.logoGem,
        {
          backgroundColor: isDark ? '#00F5FF' : '#A07830',
          shadowColor: isDark ? '#00F5FF' : '#C9A84C',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.8 : 0.4,
          shadowRadius: 8,
          elevation: 4,
        },
      ]}
    />
    <Text
      style={[
        styles.logoText,
        {
          color: isDark ? '#E8F0FF' : '#241E16',
        },
      ]}
    >
      FUTURE<Text style={{ color: isDark ? '#00F5FF' : '#A07830' }}>FUND</Text>
    </Text>
  </View>
);

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showLogo = false,
  rightContent,
  leftContent,
  transparent = false,
  style,
  titleStyle,
  variant = 'default',
}) => {
  const { colors, isDark, spacing, fontFamilies, fontSizes } = useTheme();
  const navigation = useNavigation();

  const statusBarStyle = isDark ? 'light-content' : 'dark-content';

  const headerBg = transparent
    ? 'transparent'
    : isDark
    ? colors.background
    : colors.surface;

  if (variant === 'large') {
    return (
      <>
        <StatusBar barStyle={statusBarStyle} backgroundColor={headerBg as string} />
        <View style={[styles.largeHeader, { backgroundColor: headerBg as string, paddingHorizontal: spacing[5] }, style]}>
          <View style={styles.largeTop}>
            <View style={styles.left}>
              {showBack && (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', marginRight: spacing[3] }]}
                >
                  <BackArrowIcon color={colors.textPrimary!} />
                </TouchableOpacity>
              )}
              {leftContent}
            </View>
            <View style={styles.right}>{rightContent}</View>
          </View>
          <View style={{ marginTop: spacing[4] }}>
            {title && (
              <Text
                style={[
                  styles.largeTitle,
                  {
                    fontFamily: fontFamilies.display as string,
                    fontSize: fontSizes['4xl'],
                    color: colors.textPrimary,
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  {
                    fontFamily: fontFamilies.body as string,
                    fontSize: fontSizes.base,
                    color: colors.textSecondary,
                    marginTop: spacing[1],
                  },
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      </>
    );
  }

  if (variant === 'minimal') {
    return (
      <>
        <StatusBar barStyle={statusBarStyle} backgroundColor={headerBg as string} />
        <View
          style={[
            styles.minimalHeader,
            {
              backgroundColor: headerBg as string,
              paddingHorizontal: spacing[5],
            },
            style,
          ]}
        >
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
            >
              <BackArrowIcon color={colors.textPrimary!} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: 'center' }}>
            {title && (
              <Text
                style={[
                  styles.centeredTitle,
                  {
                    fontFamily: fontFamilies.heading as string,
                    fontSize: fontSizes.md,
                    color: colors.textPrimary,
                    letterSpacing: 0.5,
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
            )}
          </View>
          <View style={{ width: 40 }}>{rightContent}</View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={headerBg as string} />
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBg as string,
            paddingHorizontal: spacing[5],
            borderBottomWidth: transparent ? 0 : 1,
            borderBottomColor: colors.borderLight,
          },
          !transparent && isDark && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          },
          style,
        ]}
      >
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
            >
              <BackArrowIcon color={colors.textPrimary!} />
            </TouchableOpacity>
          )}
          {showLogo && <FutureFundLogo isDark={isDark} />}
          {leftContent}
          {!showLogo && !showBack && !leftContent && title && (
            <View>
              <Text
                style={[
                  styles.title,
                  {
                    fontFamily: fontFamilies.heading as string,
                    fontSize: fontSizes.xl,
                    color: colors.textPrimary,
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  style={{
                    fontFamily: fontFamilies.body as string,
                    fontSize: fontSizes.xs,
                    color: colors.textTertiary,
                    marginTop: 2,
                    letterSpacing: 0.3,
                  }}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.right}>{rightContent}</View>
      </View>
    </>
  );
};

const HEADER_HEIGHT = Platform.OS === 'ios' ? 56 : 60;

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  largeHeader: {
    paddingTop: Platform.OS === 'ios' ? 8 : 12,
    paddingBottom: 20,
  },
  largeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minimalHeader: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    letterSpacing: -0.3,
  },
  centeredTitle: {},
  largeTitle: {
    letterSpacing: -1,
  },
  subtitle: {
    letterSpacing: 0.1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoGem: {
    width: 10,
    height: 10,
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    fontFamily: 'Syne-Bold',
    fontSize: 16,
    letterSpacing: 1.5,
  },
});

export default AppHeader;