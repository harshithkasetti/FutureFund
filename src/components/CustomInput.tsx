import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  prefix?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  prefix,
  ...inputProps
}) => {
  const {
    colors,
    isDark,
    spacing,
    radius,
    fontFamilies,
    fontSizes,
  } = useTheme();

  const accentColor = isDark
    ? colors.neonCyan
    : colors.primary;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text
          style={{
            fontFamily: fontFamilies.bodyMedium as string,
            fontSize: fontSizes.sm,
            color: colors.textSecondary,
            marginBottom: 8,
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark
              ? colors.surface
              : colors.white,

            borderColor: error
              ? colors.error
              : colors.border,

            borderRadius: radius.lg,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        {prefix && (
          <Text
            style={{
              color: colors.textPrimary,
              fontFamily:
                fontFamilies.bodyMedium as string,
              fontSize: fontSizes.base,
              marginRight: 8,
            }}
          >
            {prefix}
          </Text>
        )}

        <TextInput
          {...inputProps}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontFamily:
                fontFamilies.body as string,
              fontSize: fontSizes.base,
            },
          ]}
          placeholder={label}
          placeholderTextColor={colors.textTertiary}
          selectionColor={accentColor}
          cursorColor={accentColor}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.rightIcon}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {(error || hint) && (
        <Text
          style={{
            marginTop: 6,
            marginLeft: 4,
            color: error
              ? colors.error
              : colors.textTertiary,
            fontSize: fontSizes.xs,
            fontFamily:
              fontFamilies.body as string,
          }}
        >
          {error || hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    minHeight: 58,
    paddingHorizontal: 16,
  },

  leftIcon: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightIcon: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    height: 58,
  },
});

export default CustomInput;