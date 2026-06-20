import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const currencies = [
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
];

export default function CurrencyScreen() {
  const [selected, setSelected] = useState('INR');
  const [search, setSearch] = useState('');

  const filtered = currencies.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Currency Settings</Text>

      <Text style={styles.subtitle}>
        Choose how balances, goals and reports are displayed.
      </Text>

      {/* Current Currency Card */}
      <View style={styles.currentCard}>
        <Text style={styles.currentLabel}>
          CURRENT CURRENCY
        </Text>

        {currencies
          .filter(c => c.code === selected)
          .map(currency => (
            <View key={currency.code} style={styles.currentRow}>
              <Text style={styles.flag}>
                {currency.flag}
              </Text>

              <View>
                <Text style={styles.currentName}>
                  {currency.name}
                </Text>

                <Text style={styles.currentCode}>
                  {currency.code} • {currency.symbol}
                </Text>
              </View>
            </View>
          ))}
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search currency..."
        placeholderTextColor="#999"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionTitle}>
        Popular Currencies
      </Text>

      {filtered.map(currency => (
        <TouchableOpacity
          key={currency.code}
          style={[
            styles.currencyCard,
            selected === currency.code &&
              styles.selectedCard,
          ]}
          onPress={() => setSelected(currency.code)}
        >
          <View style={styles.left}>
            <Text style={styles.flag}>
              {currency.flag}
            </Text>

            <View>
              <Text style={styles.currencyName}>
                {currency.name}
              </Text>

              <Text style={styles.currencyCode}>
                {currency.code} • {currency.symbol}
              </Text>
            </View>
          </View>

          {selected === currency.code && (
            <Text style={styles.check}>
              ✓
            </Text>
          )}
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
    paddingHorizontal: 20,
  },

  title: {
    marginTop: 70,
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },

  subtitle: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },

  currentCard: {
    backgroundColor: '#A07830',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  currentLabel: {
    color: '#FDE68A',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 16,
  },

  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  currentName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },

  currentCode: {
    color: '#FDE68A',
    marginTop: 4,
  },

  search: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 55,
    marginBottom: 24,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },

  currencyCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: '#A07830',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    fontSize: 30,
    marginRight: 14,
  },

  currencyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  currencyCode: {
    marginTop: 4,
    color: '#6B7280',
  },

  check: {
    fontSize: 22,
    color: '#A07830',
    fontWeight: '700',
  },
});