import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendVerificationCode } from './utils'; // Utility function for sending the 2FA code

export default function SignIn({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const saveLoginEvent = async () => {
    try {
      const loginHistory = await AsyncStorage.getItem('loginHistory');
      const history = loginHistory ? JSON.parse(loginHistory) : [];
      const newLogin = {
        date: new Date().toISOString(),
        location: 'Unknown',  // Optionally, you can replace this with real location data
      };
      history.push(newLogin);
      await AsyncStorage.setItem('loginHistory', JSON.stringify(history));
      console.log('Login history saved:', history);
    } catch (error) {
      Alert.alert('Error', 'Failed to save login history.');
      console.log('Error saving login history:', error);
    }
  };

  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Retrieve the stored credentials
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
      const is2FAEnabled = await AsyncStorage.getItem('2FAEnabled') === 'true';

      // Validate credentials
      if (email === storedEmail && password === storedPassword) {
        // Save login event
        await saveLoginEvent();

        if (is2FAEnabled) {
          // Generate a 6-digit code for 2FA
          const code = Math.floor(100000 + Math.random() * 900000).toString();
          await sendVerificationCode(email, code); // Send the verification code

          // Navigate to the Verification Screen with the generated code and email
          navigation.navigate('Verification', { email, code });
        } else {
          // Directly navigate to Home if 2FA is not enabled
          navigation.navigate('Home');
        }
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was a problem signing in.');
      console.log('Error during sign in:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
            />
            <Text style={styles.title}>
              Sign in to <Text style={{ color: '#075eec' }}>Payment App</Text>
            </Text>
            <Text style={styles.subtitle}>Keep Your Money Safe</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="aminebadr@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
