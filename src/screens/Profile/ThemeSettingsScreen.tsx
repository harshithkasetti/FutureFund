import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../../theme';

export default function ThemeSettingsScreen() {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>

      <TouchableOpacity
        style={styles.item}
        onPress={() => setThemeMode('light')}
      >
        <Text>☀️ Light Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => setThemeMode('dark')}
      >
        <Text>🌙 Dark Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => setThemeMode('system')}
      >
        <Text>📱 Follow Device Theme</Text>
      </TouchableOpacity>

      <Text style={styles.current}>
        Current: {themeMode}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },

  item: {
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },

  current: {
    marginTop: 20,
    fontSize: 16,
  },
});