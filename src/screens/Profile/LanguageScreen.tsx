import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'te',
    name: 'Telugu',
    native: 'తెలుగు',
    flag: '🇮🇳',
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    flag: '🇮🇳',
  },
  {
    code: 'ur',
    name: 'Urdu',
    native: 'اردو',
    flag: '🇵🇰',
  },
  {
    code: 'ar',
    name: 'Arabic',
    native: 'العربية',
    flag: '🇦🇪',
  },
  {
    code: 'zh',
    name: 'Chinese',
    native: '中文',
    flag: '🇨🇳',
  },
  {
    code: 'es',
    name: 'Spanish',
    native: 'Español',
    flag: '🇪🇸',
  },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState('en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(
    lang =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.native.includes(search)
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Language Settings
      </Text>

      <Text style={styles.subtitle}>
        Choose your preferred app language.
      </Text>

      <View style={styles.currentCard}>
        <Text style={styles.currentLabel}>
          CURRENT LANGUAGE
        </Text>

        {LANGUAGES.filter(
          l => l.code === selected
        ).map(lang => (
          <View
            key={lang.code}
            style={styles.currentRow}
          >
            <Text style={styles.flag}>
              {lang.flag}
            </Text>

            <View>
              <Text style={styles.currentName}>
                {lang.name}
              </Text>

              <Text style={styles.currentNative}>
                {lang.native}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Search language..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <Text style={styles.sectionTitle}>
        Available Languages
      </Text>

      {filtered.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.card,
            selected === lang.code &&
              styles.selectedCard,
          ]}
          onPress={() =>
            setSelected(lang.code)
          }
        >
          <View style={styles.left}>
            <Text style={styles.flag}>
              {lang.flag}
            </Text>

            <View>
              <Text style={styles.langName}>
                {lang.name}
              </Text>

              <Text style={styles.langNative}>
                {lang.native}
              </Text>
            </View>
          </View>

          {selected === lang.code && (
            <Text style={styles.check}>
              ✓
            </Text>
          )}
        </TouchableOpacity>
      ))}
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
    marginBottom: 25,
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
    letterSpacing: 2,
  },

  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  currentName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },

  currentNative: {
    color: '#FDE68A',
    marginTop: 4,
  },

  search: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: 55,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  card: {
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
    fontSize: 28,
    marginRight: 14,
  },

  langName: {
    fontSize: 16,
    fontWeight: '700',
  },

  langNative: {
    color: '#6B7280',
    marginTop: 4,
  },

  check: {
    fontSize: 22,
    color: '#A07830',
    fontWeight: '700',
  },
});