import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn'; 
import SignUp from './screens/SignUp'; 
import Home from './screens/Home';
import TransfersPage from './screens/Transfers';
import SettingsPage from './screens/Settingsz';
import ChangePassword from './screens/ChangePassword';
import UpdateEmailPhone from './screens/UpdateEmailPhone';
import TwoFactorAuth from './screens/TwoFactorAuth';
import Verification from './screens/Verificationz';
import LoginHistory from './screens/LoginHistory';
import BankCard from './screens/BankCard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transfers" component={TransfersPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="UpdateEmailPhone" component={UpdateEmailPhone} />
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuth} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="LoginHistory" component={LoginHistory} />
        <Stack.Screen name="BankCard" component={BankCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
