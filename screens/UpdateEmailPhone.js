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

export default function ChangeEmail({ navigation }) {
  const [form, setForm] = useState({
    currentEmail: '',
    newEmail: '',
    confirmEmail: '',
  });

  const handleChangeEmail = async () => {
    const { currentEmail, newEmail, confirmEmail } = form;

    if (!currentEmail || !newEmail || !confirmEmail) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newEmail !== confirmEmail) {
      Alert.alert('Error', 'New email addresses do not match.');
      return;
    }

    try {
      // Retrieve the stored current email
      const storedEmail = await AsyncStorage.getItem('userEmail');

      if (currentEmail !== storedEmail) {
        Alert.alert('Error', 'Current email is incorrect.');
        return;
      }

      // Update the email in AsyncStorage
      await AsyncStorage.setItem('userEmail', newEmail);

      Alert.alert('Success', 'Email changed successfully.');
      // Navigate back to settings or home
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was a problem changing your email.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Change Email</Text>

        {/* Current Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Email</Text>
          <TextInput
            style={styles.inputControl}
            keyboardType="email-address"
            placeholder="Enter current email"
            value={form.currentEmail}
            onChangeText={(currentEmail) =>
              setForm({ ...form, currentEmail })
            }
          />
        </View>

        {/* New Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Email</Text>
          <TextInput
            style={styles.inputControl}
            keyboardType="email-address"
            placeholder="Enter new email"
            value={form.newEmail}
            onChangeText={(newEmail) =>
              setForm({ ...form, newEmail })
            }
          />
        </View>

        {/* Confirm New Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm New Email</Text>
          <TextInput
            style={styles.inputControl}
            keyboardType="email-address"
            placeholder="Confirm new email"
            value={form.confirmEmail}
            onChangeText={(confirmEmail) =>
              setForm({ ...form, confirmEmail })
            }
          />
        </View>

        {/* Change Email Button */}
        <TouchableOpacity style={styles.btn} onPress={handleChangeEmail}>
          <Text style={styles.btnText}>Change Email</Text>
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
