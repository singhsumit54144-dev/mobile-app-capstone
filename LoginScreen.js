import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ email, setEmail, password, setPassword, errorMsg, setErrorMsg, handleLogin, setScreen }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  authContainer: { padding: 30, justifyContent: 'center', flex: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 12 },
  errorText: { color: '#D9534F', fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  linkText: { color: '#007AFF', textAlign: 'center', marginTop: 15 },
});
