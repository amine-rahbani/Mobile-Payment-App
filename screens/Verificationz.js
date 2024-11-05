import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Verification({ route, navigation }) {
  const { email, code } = route.params; // Get the email and generated code from navigation params
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyCode = () => {
    if (verificationCode === code) {
      Alert.alert('Success', '2FA authentication successful!');
      navigation.navigate('Home'); // Navigate to Home after successful 2FA
    } else {
      Alert.alert('Error', 'Invalid verification code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Two-Factor Authentication</Text>
        <Text style={styles.subtitle}>Enter the verification code sent to {email}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Verification Code</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            onChangeText={setVerificationCode}
            placeholder="Enter 6-digit code"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={verificationCode}
          />
        </View>

        <TouchableOpacity onPress={handleVerifyCode}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Verify</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#e8ecf4',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  btn: {
    backgroundColor: '#075eec',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
