import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export default function DetailScreen({ selectedTask, darkMode }) {
  return (
    <View style={styles.content}>
      <Text style={[styles.sectionTitle, darkMode && styles.whiteText]}>Item Details Screen</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Item ID: {selectedTask.id}</Text>
        <Text style={styles.cardBody}>Title: {selectedTask.title}</Text>
        <Text style={styles.cardBody}>Completed: {selectedTask.completed ? 'Yes' : 'No'}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Configure Task Notification" onPress={() => Alert.alert('Notification Setup', 'Notification triggers configured successfully!')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Trigger Test Notification Alert" onPress={() => Alert.alert('Notification Alert', '🔔 Task reminder alert triggered successfully!')} color="#28A745" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, flex: 1 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  whiteText: { color: '#FFF' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardBody: { fontSize: 14, color: '#555', marginTop: 5 },
});
