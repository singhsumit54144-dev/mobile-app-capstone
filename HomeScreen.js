import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ apiData, darkMode, setSelectedTask, setScreen }) {
  return (
    <View style={styles.content}>
      <Text style={[styles.sectionTitle, darkMode && styles.whiteText]}>Task Dashboard (API Integration)</Text>
      <FlatList
        data={apiData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => { setSelectedTask(item); setScreen('Detail'); }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.navLink}>➡️ View Details Navigation</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, flex: 1 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  whiteText: { color: '#FFF' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  navLink: { color: '#007AFF', marginTop: 8, fontSize: 12 },
});
