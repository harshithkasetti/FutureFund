import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GroupGoalsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Group Goals</Text>

      <View style={styles.card}>
        <Text style={styles.goal}>Goa Trip 2026</Text>
        <Text>Target: ₹1,00,000</Text>
        <Text>Saved: ₹65,000</Text>
        <Text>Members: 5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.goal}>Wedding Fund</Text>
        <Text>Target: ₹5,00,000</Text>
        <Text>Saved: ₹2,10,000</Text>
        <Text>Members: 8</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:'#F8FAFC'},
  title:{fontSize:28,fontWeight:'700',marginBottom:20},
  card:{backgroundColor:'#fff',padding:20,borderRadius:20,marginBottom:15},
  goal:{fontSize:18,fontWeight:'700',marginBottom:10}
});