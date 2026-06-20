import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme';

export default function VaultScreen() {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background
            : '#F8F6F1',
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? colors.neonCyan
                : '#A07830',
            },
          ]}
        >
          Future Vault
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: isDark
                ? colors.textSecondary
                : '#6B7280',
            },
          ]}
        >
          Protect your savings and stay committed
          to every financial goal.
        </Text>
      </View>

      {/* Balance Card */}
      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text
          style={[
            styles.balanceLabel,
            {
              color: isDark
                ? colors.textSecondary
                : '#6B7280',
            },
          ]}
        >
          Total Protected Savings
        </Text>

        <Text
          style={[
            styles.balance,
            {
              color: isDark
                ? colors.neonCyan
                : '#A07830',
            },
          ]}
        >
          ₹2,45,000
        </Text>

        <Text style={styles.interest}>
          + ₹12,850 Saved From Impulse Spending
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.depositBtn}>
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.withdrawBtn,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
              borderColor: isDark
                ? colors.neonCyan
                : '#C9A84C',
            },
          ]}
        >
          <Text
            style={[
              styles.withdrawText,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#A07830',
              },
            ]}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vault Types */}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDark
              ? colors.textPrimary
              : '#111827',
          },
        ]}
      >
        Goal Protection Vaults
      </Text>

      <View
        style={[
          styles.vaultCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text style={styles.icon}>🔓</Text>

        <View style={styles.vaultContent}>
          <Text
            style={[
              styles.vaultTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Flex Vault
          </Text>

          <Text
            style={[
              styles.vaultDesc,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Withdraw anytime without any penalty.
          </Text>
        </View>

        <Text style={styles.freeBadge}>FREE</Text>
      </View>

      <View
        style={[
          styles.vaultCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text style={styles.icon}>🔒</Text>

        <View style={styles.vaultContent}>
          <Text
            style={[
              styles.vaultTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Smart Lock
          </Text>

          <Text
            style={[
              styles.vaultDesc,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Withdraw before goal completion with only 2% penalty.
          </Text>
        </View>

        <Text style={styles.smartBadge}>2%</Text>
      </View>

      <View
        style={[
          styles.vaultCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text style={styles.icon}>🛡️</Text>

        <View style={styles.vaultContent}>
          <Text
            style={[
              styles.vaultTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Iron Lock
          </Text>

          <Text
            style={[
              styles.vaultDesc,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Maximum protection. Funds stay locked until goal completion.
          </Text>
        </View>

        <Text style={styles.ironBadge}>5%</Text>
      </View>

      {/* Stats */}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDark
              ? colors.textPrimary
              : '#111827',
          },
        ]}
      >
        Protection Statistics
      </Text>

      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#A07830',
              },
            ]}
          >
            ₹1.8L
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Protected Funds
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#A07830',
              },
            ]}
          >
            12
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Active Goals
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#A07830',
              },
            ]}
          >
            8
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Iron Locks
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <Text
            style={[
              styles.statValue,
              {
                color: isDark
                  ? colors.neonCyan
                  : '#A07830',
              },
            ]}
          >
            96%
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: isDark
                  ? colors.textSecondary
                  : '#6B7280',
              },
            ]}
          >
            Success Rate
          </Text>
        </View>
      </View>

      {/* Transactions */}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDark
              ? colors.textPrimary
              : '#111827',
          },
        ]}
      >
        Protected Goal Deposits
      </Text>

      <View
        style={[
          styles.transactionCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.transactionTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Dream Bike Fund
          </Text>

          <Text style={styles.goalVault}>
            Iron Lock Vault
          </Text>
        </View>

        <Text style={styles.transactionAmount}>
          ₹50,000
        </Text>
      </View>

      <View
        style={[
          styles.transactionCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.transactionTitle,
              {
                color: isDark
                  ? colors.textPrimary
                  : '#111827',
              },
            ]}
          >
            Europe Trip
          </Text>

          <Text style={styles.goalVault}>
            Smart Lock Vault
          </Text>
        </View>

        <Text style={styles.transactionAmount}>
          ₹1,20,000
        </Text>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    lineHeight: 22,
  },

  balanceCard: {
    margin: 20,
    borderRadius: 25,
    padding: 24,
    elevation: 4,
  },

  balanceLabel: {
    fontSize: 15,
  },

  balance: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 8,
  },

  interest: {
    marginTop: 8,
    color: '#22C55E',
    fontWeight: '600',
  },

  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  depositBtn: {
    flex: 1,
    backgroundColor: '#14F195',
    paddingVertical: 15,
    borderRadius: 18,
    marginRight: 10,
  },

  depositText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
  },

  withdrawBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 18,
    borderWidth: 1,
  },

  withdrawText: {
    textAlign: 'center',
    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
  },

  vaultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 20,
    padding: 18,
  },

  icon: {
    fontSize: 28,
    marginRight: 15,
  },

  vaultContent: {
    flex: 1,
  },

  vaultTitle: {
    fontSize: 17,
    fontWeight: '700',
  },

  vaultDesc: {
    marginTop: 5,
    lineHeight: 20,
  },

  freeBadge: {
    color: '#22C55E',
    fontWeight: '700',
  },

  smartBadge: {
    color: '#F59E0B',
    fontWeight: '700',
  },

  ironBadge: {
    color: '#EF4444',
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },

  statCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },

  statLabel: {
    marginTop: 5,
  },

  transactionCard: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  transactionTitle: {
    fontWeight: '700',
  },

  goalVault: {
    marginTop: 5,
    color: '#14F195',
    fontWeight: '600',
  },

  transactionAmount: {
    color: '#22C55E',
    fontWeight: '700',
  },
});