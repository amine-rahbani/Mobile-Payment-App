import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function Transfers() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transferHistory, setTransferHistory] = useState([]);
  const [balance, setBalance] = useState(1000);  // Starting balance for demo purposes

  const handleTransfer = () => {
    const parsedAmount = parseFloat(amount);

    if (!recipient || !amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter valid recipient and amount.');
      return;
    }

    if (parsedAmount > balance) {
      alert('Insufficient balance.');
      return;
    }

    const newTransfer = {
      id: Date.now().toString(),
      recipient,
      amount: parsedAmount.toFixed(2),
      date: new Date().toLocaleString(),
    };

    setTransferHistory([...transferHistory, newTransfer]);
    setBalance(prevBalance => prevBalance - parsedAmount);
    setRecipient('');
    setAmount('');
  };

  const renderTransfer = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyLeft}>
        <Text style={styles.historyRecipient}>To: {item.recipient}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text style={styles.historyAmount}>- ${item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceTitle}>Your Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>

        <View style={styles.transferSection}>
          <Text style={styles.sectionTitle}>Make a Transfer</Text>
          <TextInput
            style={styles.input}
            placeholder="Recipient"
            value={recipient}
            onChangeText={setRecipient}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
            <Text style={styles.transferButtonText}>Transfer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Transfer History</Text>
          {transferHistory.length > 0 ? (
            <FlatList
              data={transferHistory}
              renderItem={renderTransfer}
              keyExtractor={item => item.id}
              style={styles.historyList}
            />
          ) : (
            <Text style={styles.noHistoryText}>No transfers made yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    padding: 16,
  },
  balanceSection: {
    backgroundColor: '#075eec',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  transferSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  transferButton: {
    backgroundColor: '#075eec',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  historySection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  historyList: {
    marginTop: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  historyLeft: {
    flexDirection: 'column',
  },
  historyRecipient: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
  noHistoryText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
