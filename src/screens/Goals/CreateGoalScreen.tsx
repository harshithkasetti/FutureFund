import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function CreateGoalScreen() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [deadline, setDeadline] = useState('');
  const [autoSave, setAutoSave] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>
      <Text style={styles.subtitle}>
        Build your future one goal at a time
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Goal Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Dream Car"
          value={goalName}
          onChangeText={setGoalName}
        />

        <Text style={styles.label}>Target Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="₹500000"
          keyboardType="numeric"
          value={targetAmount}
          onChangeText={setTargetAmount}
        />

        <Text style={styles.label}>Initial Deposit</Text>
        <TextInput
          style={styles.input}
          placeholder="₹10000"
          keyboardType="numeric"
          value={deposit}
          onChangeText={setDeposit}
        />

        <Text style={styles.label}>Deadline</Text>
        <TextInput
          style={styles.input}
          placeholder="Dec 2027"
          value={deadline}
          onChangeText={setDeadline}
        />

        <Text style={styles.label}>Monthly AutoSave</Text>
        <TextInput
          style={styles.input}
          placeholder="₹5000"
          keyboardType="numeric"
          value={autoSave}
          onChangeText={setAutoSave}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            ✨ Create Goal
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 50,
  },

  subtitle: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
  },

  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#475569',
    marginTop: 16,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 55,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  button: {
    backgroundColor: '#A07830',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});