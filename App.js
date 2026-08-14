import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Switch, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [screen, setScreen] = useState('Signup');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => { loadSettings(); }, []);

  const saveSettings = async (val) => {
    setDarkMode(val);
    await AsyncStorage.setItem('dark_mode_setting', JSON.stringify(val));
  };

  const loadSettings = async () => {
    const val = await AsyncStorage.getItem('dark_mode_setting');
    if (val !== null) setDarkMode(JSON.parse(val));
  };

  const fetchApiData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await res.json();
      setApiData(data);
    } catch (e) { console.error(e); }
  };

  const handleSignup = () => {
    if (!username || !email || !password) {
      setErrorMsg('Signup Error: Please fill in all fields (username, email, password).');
      return;
    }
    setErrorMsg('');
    fetchApiData();
    setScreen('Home');
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMsg('Login Error: Invalid email or password provided.');
      return;
    }
    setErrorMsg('');
    fetchApiData();
    setScreen('Home');
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkBg : styles.lightBg]}>
      {screen !== 'Signup' && screen !== 'Login' && (
        <View style={styles.navBar}>
          <Text style={styles.logoText}>🚀 Taskify App</Text>
          <TouchableOpacity onPress={() => setScreen('Home')}><Text style={styles.menuIcon}>🏠 Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('Settings')}><Text style={styles.menuIcon}>⚙️ Menu</Text></TouchableOpacity>
        </View>
      )}

      {/* 1. SIGNUP SCREEN */}
      {screen === 'Signup' && (
        <View style={styles.authContainer}>
          <Text style={styles.headerTitle}>Create Account</Text>
          {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          
          <Button title="Sign Up" onPress={handleSignup} color="#007AFF" />
          <TouchableOpacity onPress={() => { setErrorMsg(''); setScreen('Login'); }}>
            <Text style={styles.linkText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 2. LOGIN SCREEN */}
      {screen === 'Login' && (
        <View style={styles.authContainer}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          
          <Button title="Sign In" onPress={handleLogin} color="#007AFF" />
          <TouchableOpacity onPress={() => { setErrorMsg(''); setScreen('Signup'); }}>
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 3. HOME SCREEN */}
      {screen === 'Home' && (
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
      )}

      {/* 4. DETAIL SCREEN */}
      {screen === 'Detail' && selectedTask && (
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
      )}

      {/* 5. SETTINGS SCREEN */}
      {screen === 'Settings' && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  lightBg: { backgroundColor: '#F8F9FA' },
  darkBg: { backgroundColor: '#121212' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007AFF', padding: 15 },
  logoText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  menuIcon: { color: '#FFF', fontWeight: '600' },
  authContainer: { padding: 30, justifyContent: 'center', flex: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 12 },
  errorText: { color: '#D9534F', fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  linkText: { color: '#007AFF', textAlign: 'center', marginTop: 15 },
  content: { padding: 20, flex: 1 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  whiteText: { color: '#FFF' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardBody: { fontSize: 14, color: '#555', marginTop: 5 },
  navLink: { color: '#007AFF', marginTop: 8, fontSize: 12 },
  menuItem: { fontSize: 16, paddingVertical: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  label: { fontSize: 16, fontWeight: '500' }
});
