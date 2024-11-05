import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginHistoryPage = () => {
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    // Load login history from AsyncStorage when the component mounts
    const loadLoginHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('loginHistory');
        if (history) {
          setLoginHistory(JSON.parse(history));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load login history.');
      }
    };

    loadLoginHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Login History</Text>
      {loginHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No login history available.</Text>
      ) : (
        loginHistory.map((login, index) => (
          <View key={index} style={styles.loginItem}>
            <Text style={styles.loginText}>
              Date: {new Date(login.date).toLocaleDateString()}{' '}
              {new Date(login.date).toLocaleTimeString()}
            </Text>
            <Text style={styles.loginText}>Location: {login.location}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginItem: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginHistoryPage;
