// FutureFund — CustomButton Component
import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Animated,
  View,
} from 'react-native';
import { useTheme } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'neon' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { colors, isDark, spacing, radius, fontFamilies, fontSizes } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: isDark ? colors.neonCyan : colors.primary,
            borderWidth: 0,
            ...(isDark && {
              shadowColor: colors.neonCyan,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 10,
            }),
            ...(!isDark && {
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }),
          },
          text: {
            color: isDark ? colors.background : colors.white,
          },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: isDark ? colors.neonCyan : colors.primary,
          },
          text: {
            color: isDark ? colors.neonCyan : colors.primary,
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: isDark ? 'rgba(0,245,255,0.08)' : 'rgba(160,120,48,0.08)',
            borderWidth: 0,
          },
          text: {
            color: isDark ? colors.neonCyan : colors.primary,
          },
        };
      case 'danger':
        return {
          container: {
            backgroundColor: isDark ? 'transparent' : colors.error,
            borderWidth: isDark ? 1.5 : 0,
            borderColor: isDark ? colors.errorDark : undefined,
            ...(isDark && {
              shadowColor: colors.errorDark,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 6,
            }),
          },
          text: {
            color: isDark ? colors.errorDark : colors.white,
          },
        };
      case 'neon':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: isDark ? colors.neonGreen : colors.success,
            shadowColor: isDark ? colors.neonGreen : colors.success,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.5 : 0.2,
            shadowRadius: 12,
            elevation: 6,
          },
          text: {
            color: isDark ? colors.neonGreen : colors.success,
          },
        };
      case 'gold':
        return {
          container: {
            backgroundColor: '#C9A84C',
            borderWidth: 0,
            shadowColor: '#C9A84C',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.45,
            shadowRadius: 14,
            elevation: 8,
          },
          text: {
            color: '#1A1209',
          },
        };
      default:
        return { container: {}, text: {} };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: spacing[2],
            paddingHorizontal: spacing[4],
            borderRadius: radius.md,
          },
          text: { fontSize: fontSizes.sm },
        };
      case 'md':
        return {
          container: {
            paddingVertical: spacing[3],
            paddingHorizontal: spacing[6],
            borderRadius: radius.lg,
          },
          text: { fontSize: fontSizes.base },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: spacing[4],
            paddingHorizontal: spacing[7],
            borderRadius: radius.xl,
          },
          text: { fontSize: fontSizes.md },
        };
      case 'xl':
        return {
          container: {
            paddingVertical: spacing[5],
            paddingHorizontal: spacing[8],
            borderRadius: radius['2xl'],
          },
          text: { fontSize: fontSizes.lg },
        };
      default:
        return { container: {}, text: {} };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : undefined }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
        style={[
          styles.base,
          variantStyles.container,
          sizeStyles.container,
          fullWidth && styles.fullWidth,
          (disabled || loading) && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variantStyles.text.color as string}
          />
        ) : (
          <View style={styles.content}>
            {icon && iconPosition === 'left' && (
              <View style={styles.iconLeft}>{icon}</View>
            )}
            <Text
              style={[
                styles.text,
                variantStyles.text,
                sizeStyles.text,
                { fontFamily: fontFamilies.bodySemiBold as string },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <View style={styles.iconRight}>{icon}</View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.45,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default CustomButton;