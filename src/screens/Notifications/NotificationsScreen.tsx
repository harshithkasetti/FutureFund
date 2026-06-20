import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const notifications = [
  {
    id:'1',
    title:'Goal Updated',
    message:'Your Bike Goal increased by ₹5,000'
  },
  {
    id:'2',
    title:'Auto Save Executed',
    message:'₹500 saved successfully'
  },
  {
    id:'3',
    title:'New Recommendation',
    message:'Increase monthly savings by 10%'
  }
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:'#F8FAFC'},
  title:{fontSize:28,fontWeight:'700',marginBottom:20},
  card:{backgroundColor:'#fff',padding:18,borderRadius:18,marginBottom:12},
  cardTitle:{fontSize:16,fontWeight:'700',marginBottom:5}
});