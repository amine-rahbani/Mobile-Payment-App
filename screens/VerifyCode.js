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

export default function VerifyCode({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState('');

  const handleVerifyCode = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }

    try {
      // This is where you'd check the verification code
      // For the demo, we simulate the verification process
      const isValidCode = code === '123456'; // Hardcoded for now, replace with actual logic

      if (isValidCode) {
        Alert.alert('Success', '2FA authentication successful!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid verification code.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was a problem verifying the code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Verify Code</Text>

        {/* Verification Code Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          value={code}
          onChangeText={(text) => setCode(text)}
          keyboardType="numeric"
        />

        {/* Verify Button */}
        <TouchableOpacity style={styles.btn} onPress={handleVerifyCode}>
          <Text style={styles.btnText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e8ecf4',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#075eec',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#c9d3db',
    marginBottom: 20,
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
