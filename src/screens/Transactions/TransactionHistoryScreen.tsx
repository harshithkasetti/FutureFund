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
    title: 'Salary Credited',
    category: 'Income',
    amount: '+ ₹75,000',
    date: 'Today • 09:15 AM',
    icon: '💰',
    positive: true,
  },
  {
    id: 2,
    title: 'Emergency Fund',
    category: 'Goal Deposit',
    amount: '- ₹5,000',
    date: 'Today • 08:00 AM',
    icon: '🛡️',
    positive: false,
  },
  {
    id: 3,
    title: 'Auto Save',
    category: 'Auto Transfer',
    amount: '- ₹1,500',
    date: 'Yesterday',
    icon: '🔄',
    positive: false,
  },
  {
    id: 4,
    title: 'Vault Deposit',
    category: 'Secure Vault',
    amount: '- ₹10,000',
    date: 'Yesterday',
    icon: '🔐',
    positive: false,
  },
  {
    id: 5,
    title: 'Goal Completed',
    category: 'Rewards',
    amount: '+ ₹2,500',
    date: '3 Jun',
    icon: '🎉',
    positive: true,
  },
];

export default function TransactionHistoryScreen() {
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
          Transaction History
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
          Complete overview of your financial activity
        </Text>
      </View>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: isDark
              ? colors.surface
              : '#FFFFFF',
          },
        ]}
      >
        <Text
          style={[
            styles.summaryLabel,
            {
              color: isDark
                ? colors.textSecondary
                : '#6B7280',
            },
          ]}
        >
          Total Transactions
        </Text>

        <Text
          style={[
            styles.summaryValue,
            {
              color: isDark
                ? colors.neonCyan
                : '#A07830',
            },
          ]}
        >
          1,248
        </Text>

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.green}>₹4.2L</Text>
            <Text
              style={[
                styles.small,
                {
                  color: isDark
                    ? colors.textSecondary
                    : '#6B7280',
                },
              ]}
            >
              Money Added
            </Text>
          </View>

          <View>
            <Text style={styles.red}>₹2.8L</Text>
            <Text
              style={[
                styles.small,
                {
                  color: isDark
                    ? colors.textSecondary
                    : '#6B7280',
                },
              ]}
            >
              Money Used
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <TouchableOpacity style={styles.activeFilter}>
          <Text style={styles.activeFilterText}>All</Text>
        </TouchableOpacity>

        {['Income', 'Goals', 'Vault', 'AutoSave'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filter,
              {
                backgroundColor: isDark
                  ? colors.surface
                  : '#FFFFFF',
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: isDark
                    ? colors.textPrimary
                    : '#374151',
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.list}>
        {transactions.map(item => (
          <TouchableOpacity
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
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: isDark
                    ? colors.background
                    : '#F5F5F5',
                },
              ]}
            >
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
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
                {item.title}
              </Text>

              <Text
                style={[
                  styles.transactionCategory,
                  {
                    color: isDark
                      ? colors.textSecondary
                      : '#6B7280',
                  },
                ]}
              >
                {item.category}
              </Text>

              <Text
                style={[
                  styles.date,
                  {
                    color: isDark
                      ? colors.textSecondary
                      : '#9CA3AF',
                  },
                ]}
              >
                {item.date}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                {
                  color: item.positive
                    ? '#16A34A'
                    : '#DC2626',
                },
              ]}
            >
              {item.amount}
            </Text>
          </TouchableOpacity>
        ))}
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
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
  },

  summaryCard: {
    margin: 20,
    borderRadius: 24,
    padding: 24,
    elevation: 4,
  },

  summaryLabel: {
    fontSize: 14,
  },

  summaryValue: {
    fontSize: 42,
    fontWeight: '700',
    marginTop: 8,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  green: {
    color: '#16A34A',
    fontSize: 20,
    fontWeight: '700',
  },

  red: {
    color: '#DC2626',
    fontSize: 20,
    fontWeight: '700',
  },

  small: {
    marginTop: 4,
  },

  filterRow: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  activeFilter: {
    backgroundColor: '#14F195',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },

  activeFilterText: {
    color: '#000',
    fontWeight: '700',
  },

  filter: {
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },

  filterText: {
    fontWeight: '600',
  },

  list: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  transactionCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  icon: {
    fontSize: 24,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  transactionCategory: {
    marginTop: 3,
  },

  date: {
    marginTop: 5,
    fontSize: 12,
  },

  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});