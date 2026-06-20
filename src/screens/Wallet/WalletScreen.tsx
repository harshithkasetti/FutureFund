
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme';

const transactions = [
  {
    id: 1,
    title: 'Salary Credit',
    subtitle: 'Bank Transfer',
    amount: '+ ₹75,000',
    type: 'income',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Emergency Fund',
    subtitle: 'Goal Contribution',
    amount: '- ₹5,000',
    type: 'expense',
    icon: '🎯',
  },
  {
    id: 3,
    title: 'Auto Save',
    subtitle: 'Weekly Rule',
    amount: '- ₹1,500',
    type: 'expense',
    icon: '🔄',
  },
  {
    id: 4,
    title: 'Vault Deposit',
    subtitle: 'Secure Savings',
    amount: '- ₹10,000',
    type: 'expense',
    icon: '🔐',
  },
];

export default function WalletScreen() {
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
            styles.welcome,
            {
              color: isDark
                ? colors.neonCyan
                : '#A07830',
            },
          ]}
        >
          FutureFund Wallet
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Manage Your Money
        </Text>
      </View>

      {/* Balance Card */}
      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#A07830',
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.balanceLabel,
            {
              color: isDark
                ? colors.textSecondary
                : '#D4B76A',
            },
          ]}
        >
          Available Balance
        </Text>

        <Text
          style={[
            styles.balanceAmount,
            {
              color: isDark
                ? colors.neonCyan
                : '#FFFFFF',
            },
          ]}
        >
          ₹1,25,500
        </Text>

        <Text
          style={[
            styles.balanceGrowth,
            {
              color: isDark
                ? colors.neonGreen
                : '#22C55E',
            },
          ]}
        >
          ↑ 12.4% this month
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionRow}>
        {[
          { emoji: '➕', label: 'Deposit' },
          { emoji: '💸', label: 'Withdraw' },
          { emoji: '🔄', label: 'Transfer' },
          { emoji: '🎯', label: 'Goal' },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.actionCard,
              {
                backgroundColor: isDark
                  ? colors.surface
                  : '#FFFFFF',
                borderWidth: isDark ? 1 : 0,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={styles.actionEmoji}>
              {item.emoji}
            </Text>

            <Text
              style={[
                styles.actionText,
                {
                  color: colors.textPrimary,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
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
            ₹45K
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Total Saved
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
                  ? colors.neonPurple
                  : '#A07830',
              },
            ]}
          >
            ₹20K
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Goals
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
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
                  ? colors.neonGreen
                  : '#A07830',
              },
            ]}
          >
            ₹78K
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Vault
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
            92%
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Savings Score
          </Text>
        </View>
      </View>

      {/* Insights */}
      <View
        style={[
          styles.insightCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text
          style={[
            styles.insightTitle,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          Monthly Insights
        </Text>

        <Text
          style={[
            styles.insightText,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          You saved ₹18,500 more than last month. Keep going and you'll
          reach your goals 2 months earlier.
        </Text>
      </View>

      {/* Transactions */}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.textPrimary,
          },
        ]}
      >
        Recent Transactions
      </Text>

      {transactions.map((item) => (
        <View
          key={item.id}
          style={[
            styles.transactionCard,
            {
              backgroundColor: isDark
                ? colors.surface
                : '#FFFFFF',
            },
          ]}
        >
          <View style={styles.leftSection}>
            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <View>
              <Text
                style={[
                  styles.transactionTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.transactionSub,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  item.type === 'income'
                    ? (isDark
                        ? colors.neonGreen
                        : '#16A34A')
                    : '#DC2626',
              },
            ]}
          >
            {item.amount}
          </Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  welcome: {
    fontSize: 14,
    fontWeight: '600',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
  },

  balanceCard: {
    margin: 24,
    borderRadius: 28,
    padding: 25,
  },

  balanceLabel: {
    fontSize: 14,
  },

  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 10,
  },

  balanceGrowth: {
    marginTop: 10,
    fontWeight: '600',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  actionCard: {
    width: '23%',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },

  actionEmoji: {
    fontSize: 24,
  },

  actionText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statCard: {
    width: '48%',
    borderRadius: 22,
    padding: 20,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },

  statLabel: {
    marginTop: 6,
  },

  insightCard: {
    margin: 20,
    borderRadius: 24,
    padding: 22,
  },

  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  insightText: {
    marginTop: 10,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  transactionCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
    marginRight: 14,
  },

  transactionTitle: {
    fontWeight: '700',
  },

  transactionSub: {
    marginTop: 4,
    fontSize: 13,
  },

  transactionAmount: {
    fontWeight: '700',
    fontSize: 15,
  },
});

