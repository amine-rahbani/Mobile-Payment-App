import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the hook for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const navigation = useNavigation();  // Get the navigation object

  useEffect(() => {
    // Load the 2FA status from AsyncStorage when the component mounts
    const load2FAStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('2FAEnabled');
        setIs2FAEnabled(status === 'true');
      } catch (error) {
        Alert.alert('Error', 'Failed to load 2FA status.');
      }
    };

    load2FAStatus();
  }, []);

  const toggle2FA = async () => {
    try {
      const newStatus = !is2FAEnabled;
      await AsyncStorage.setItem('2FAEnabled', newStatus.toString());
      setIs2FAEnabled(newStatus);
      Alert.alert('Success', `Two-Factor Authentication has been ${newStatus ? 'enabled' : 'disabled'}.`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update 2FA status.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('UpdateEmailPhone')}>
          <Text style={styles.optionText}>Update Email</Text>
        </TouchableOpacity>
      </View>

      {/* Security Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Two-Factor Authentication</Text>
          <Switch
            value={is2FAEnabled}
            onValueChange={toggle2FA}
          />
        </View>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('LoginHistory')}>
          <Text style={styles.optionText}>Manage Login History</Text>
        </TouchableOpacity>
      </View>
      
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
});

export default SettingsPage;
