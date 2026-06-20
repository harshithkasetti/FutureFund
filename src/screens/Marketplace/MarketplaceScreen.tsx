import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MarketplaceScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Bike Dealers</Text>
        <Text>15 merchants available</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Wedding Vendors</Text>
        <Text>40 merchants available</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Travel Agencies</Text>
        <Text>22 merchants available</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Insurance Providers</Text>
        <Text>12 merchants available</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:'#F8FAFC'},
  title:{fontSize:28,fontWeight:'700',marginBottom:20},
  card:{backgroundColor:'#fff',padding:20,borderRadius:20,marginBottom:15},
  heading:{fontSize:18,fontWeight:'700'}
});