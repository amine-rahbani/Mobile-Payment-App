import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword({ navigation }) {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      // Retrieve the stored current password
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (currentPassword !== storedPassword) {
        Alert.alert('Error', 'Current password is incorrect.');
        return;
      }

      // Update the password in AsyncStorage
      await AsyncStorage.setItem('userPassword', newPassword);

      Alert.alert('Success', 'Password changed successfully.');
      // Navigate back to settings or home
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was a problem changing your password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Change Password</Text>

        {/* Current Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <TextInput
            style={styles.inputControl}
            secureTextEntry={true}
            placeholder="Enter current password"
            value={form.currentPassword}
            onChangeText={(currentPassword) =>
              setForm({ ...form, currentPassword })
            }
          />
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            style={styles.inputControl}
            secureTextEntry={true}
            placeholder="Enter new password"
            value={form.newPassword}
            onChangeText={(newPassword) =>
              setForm({ ...form, newPassword })
            }
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <TextInput
            style={styles.inputControl}
            secureTextEntry={true}
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChangeText={(confirmPassword) =>
              setForm({ ...form, confirmPassword })
            }
          />
        </View>

        {/* Change Password Button */}
        <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#075eec',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputControl: {
    backgroundColor: '#f8f9fa',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#c9d3db',
  },
  btn: {
    backgroundColor: '#075eec',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
