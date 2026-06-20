import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from '../../theme';

const AutoSaveScreen = () => {
  const { colors, isDark, fontFamilies, fontSizes, radius, spacing } = useTheme();

  const [enabled, setEnabled] = useState(true);
  const [amount, setAmount] = useState('500');
  const [frequency, setFrequency] = useState('Daily');

  const yearlySavings =
    frequency === 'Daily'
      ? Number(amount) * 365
      : frequency === 'Weekly'
      ? Number(amount) * 52
      : Number(amount) * 12;

  const accentColor = isDark ? colors.neonCyan : '#C9A84C';

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background
            : colors.backgroundSecondary,
        },
      ]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={[
          styles.title,
          {
            color: accentColor,
            fontFamily: fontFamilies.heading as string,
          },
        ]}
      >
        Auto Save
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
            fontFamily: fontFamilies.body as string,
          },
        ]}
      >
        Automate your savings and build wealth effortlessly.
      </Text>

      {/* Main Card */}
      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : colors.white,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.row}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.textPrimary,
                fontFamily: fontFamilies.heading as string,
              },
            ]}
          >
            Enable Auto Save
          </Text>

          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{
              false: colors.border,
              true: accentColor,
            }}
            thumbColor="#fff"
          />
        </View>

        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilies.bodyMedium as string,
            },
          ]}
        >
          Savings Amount
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark
                ? colors.darkSurface
                : colors.white,
              color: colors.textPrimary,
              borderColor: colors.border,
            },
          ]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          placeholderTextColor={colors.textTertiary}
        />

        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilies.bodyMedium as string,
            },
          ]}
        >
          Frequency
        </Text>

        <View style={styles.frequencyRow}>
          {['Daily', 'Weekly', 'Monthly'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.frequencyBtn,
                {
                  backgroundColor:
                    frequency === item
                      ? accentColor
                      : isDark
                      ? colors.darkSurface
                      : '#F3F4F6',
                },
              ]}
              onPress={() => setFrequency(item)}
            >
              <Text
                style={[
                  styles.frequencyText,
                  {
                    color:
                      frequency === item
                        ? '#fff'
                        : colors.textPrimary,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.saveBtn,
            {
              backgroundColor: accentColor,
            },
          ]}
        >
          <Text style={styles.saveBtnText}>
            Save Rule
          </Text>
        </TouchableOpacity>
      </View>

      {/* Projection Card */}
      <View
        style={[
          styles.projectionCard,
          {
            backgroundColor: accentColor,
          },
        ]}
      >
        <Text
          style={[
            styles.projectionTitle,
            {
              fontFamily: fontFamilies.body as string,
            },
          ]}
        >
          Savings Projection
        </Text>

        <Text
          style={[
            styles.bigNumber,
            {
              fontFamily: fontFamilies.heading as string,
            },
          ]}
        >
          ₹{yearlySavings.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.smallText,
            {
              fontFamily: fontFamilies.body as string,
            },
          ]}
        >
          Estimated savings in 1 year
        </Text>
      </View>

      {/* Next Auto Save */}
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : colors.white,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Next Auto Save
        </Text>

        <Text
          style={[
            styles.infoValue,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Tomorrow • ₹{amount}
        </Text>
      </View>

      {/* Active Rule */}
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : colors.white,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Active Rule
        </Text>

        <Text
          style={[
            styles.infoValue,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Save ₹{amount} {frequency.toLowerCase()}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 25,
  },

  mainCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 18,
  },

  label: {
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    fontSize: 18,
  },

  frequencyRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  frequencyBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },

  frequencyText: {
    fontWeight: '600',
  },

  saveBtn: {
    marginTop: 25,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  projectionCard: {
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
  },

  projectionTitle: {
    color: '#fff',
    fontSize: 16,
  },

  bigNumber: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginTop: 10,
  },

  smallText: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },

  infoCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
  },

  infoTitle: {
    fontSize: 14,
  },

  infoValue: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default AutoSaveScreen;