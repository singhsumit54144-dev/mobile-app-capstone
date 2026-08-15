import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen({ darkMode, saveSettings }) {
  return (
    <View style={styles.content}>
      <Text style={[styles.sectionTitle, darkMode && styles.whiteText]}>Settings Menu & Options</Text>
      <View style={styles.card}>
        <Text style={styles.menuItem}>• Account Settings</Text>
        <Text style={styles.menuItem}>• Notification Preferences</Text>
        <Text style={styles.menuItem}>• Local Storage Data: {darkMode ? 'Dark Theme' : 'Light Theme'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, darkMode && styles.whiteText]}>Enable Dark Mode Persistence</Text>
        <Switch value={darkMode} onValueChange={saveSettings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, flex: 1 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  whiteText: { color: '#FFF' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 12 },
  menuItem: { fontSize: 16, paddingVertical: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  label: { fontSize: 16, fontWeight: '500' },
});
