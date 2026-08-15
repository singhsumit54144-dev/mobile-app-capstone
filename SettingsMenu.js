import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SettingsMenu({ setScreen }) {
  return (
    <View style={styles.navBar}>
      <Text style={styles.logoText}>🚀 Taskify App</Text>
      <TouchableOpacity onPress={() => setScreen('Home')}>
        <Text style={styles.menuIcon}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Settings')}>
        <Text style={styles.menuIcon}>⚙️ Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007AFF', padding: 15 },
  logoText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  menuIcon: { color: '#FFF', fontWeight: '600' },
});
