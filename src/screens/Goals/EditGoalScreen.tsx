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

export default function EditGoalScreen() {
  const [goalName, setGoalName] = useState('Emergency Fund');
  const [targetAmount, setTargetAmount] = useState('100000');
  const [savedAmount, setSavedAmount] = useState('45000');
  const [targetDate, setTargetDate] = useState('31 Dec 2026');

  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveAmount, setAutoSaveAmount] = useState('2000');

  const [vaultType, setVaultType] = useState('smart');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Edit Goal
        </Text>

        <Text style={styles.subtitle}>
          Manage your savings strategy
        </Text>
      </View>

      {/* Goal Info */}

      <View style={styles.card}>
        <Text style={styles.label}>
          Goal Name
        </Text>

        <TextInput
          value={goalName}
          onChangeText={setGoalName}
          style={styles.input}
        />

        <Text style={styles.label}>
          Target Amount
        </Text>

        <TextInput
          value={targetAmount}
          onChangeText={setTargetAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>
          Current Saved
        </Text>

        <TextInput
          value={savedAmount}
          onChangeText={setSavedAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>
          Target Date
        </Text>

        <TextInput
          value={targetDate}
          onChangeText={setTargetDate}
          style={styles.input}
        />
      </View>

      {/* AutoSave */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>
            AutoSave
          </Text>

          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{
              false: '#D1D5DB',
              true: '#A07830',
            }}
          />
        </View>

        {autoSave && (
          <>
            <Text style={styles.label}>
              Monthly Amount
            </Text>

            <TextInput
              value={autoSaveAmount}
              onChangeText={setAutoSaveAmount}
              keyboardType="numeric"
              style={styles.input}
            />
          </>
        )}
      </View>

      {/* Vault Type */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Vault Type
        </Text>

        <TouchableOpacity
          style={[
            styles.vaultCard,
            vaultType === 'flex' &&
              styles.selectedVault,
          ]}
          onPress={() => setVaultType('flex')}
        >
          <Text style={styles.vaultTitle}>
            ⚡ Flex Vault
          </Text>

          <Text style={styles.vaultDesc}>
            Withdraw anytime without restrictions.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.vaultCard,
            vaultType === 'smart' &&
              styles.selectedVault,
          ]}
          onPress={() => setVaultType('smart')}
        >
          <Text style={styles.vaultTitle}>
            🔒 Smart Lock Vault
          </Text>

          <Text style={styles.vaultDesc}>
            Early withdrawal penalty: 2%.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.vaultCard,
            vaultType === 'iron' &&
              styles.selectedVault,
          ]}
          onPress={() => setVaultType('iron')}
        >
          <Text style={styles.vaultTitle}>
            🛡 Iron Lock Vault
          </Text>

          <Text style={styles.vaultDesc}>
            Locked until goal completion.
            Force exit penalty: 5%.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },

  header: {
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#A07830',
  },

  subtitle: {
    color: '#6B7280',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 22,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 15,
  },

  label: {
    marginBottom: 8,
    color: '#6B7280',
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  vaultCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },

  selectedVault: {
    borderColor: '#A07830',
    backgroundColor: '#FFF8EA',
  },

  vaultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  vaultDesc: {
    color: '#6B7280',
    marginTop: 6,
    lineHeight: 20,
  },

  saveButton: {
    marginHorizontal: 20,
    backgroundColor: '#A07830',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});