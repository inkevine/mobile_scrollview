import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My scroll view of rainbow</Text>

      <View style={[styles.box, { backgroundColor: 'red' }]}>
        <Text style={styles.text}>Red</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'orange' }]}>
        <Text style={styles.text}>Orange</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'yellow' }]}>
        <Text style={[styles.text, { color: '#333' }]}>Yellow</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'green' }]}>
        <Text style={styles.text}>Green</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'blue' }]}>
        <Text style={styles.text}>Blue</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'indigo' }]}>
        <Text style={styles.text}>Indigo</Text>
      </View>

      <View style={[styles.box, { backgroundColor: 'violet' }]}>
        <Text style={styles.text}>Violet</Text>
      </View>

      <Text style={styles.title}>Thank you</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  box: {
    height: 120,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
