import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    // Call the API to change the password
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
  };

  return (
    <View>
      <TextInput
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
}
