import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

// Mock function to fetch transaction history
const fetchTransactionHistory = async () => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { type: 'Transfer', amount: -50, date: '2024-09-10', description: 'Sent to User123' },
        { type: 'Deposit', amount: 200, date: '2024-09-09', description: 'Salary Payment' },
        { type: 'Withdraw', amount: -100, date: '2024-09-08', description: 'Withdrawn to Bank Account' },
        { type: 'Transfer', amount: -75, date: '2024-09-05', description: 'Sent to User456' },
      ]);
    }, 2000); // Simulate network delay
  });
};

const BalancePage = ({ navigation }) => {
  const [availableBalance, setAvailableBalance] = useState(500); // Example balance
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadTransactionHistory = async () => {
      try {
        const history = await fetchTransactionHistory(); // Fetch transaction history
        setTransactionHistory(history);
      } catch (error) {
        console.error('Failed to fetch transaction history:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadTransactionHistory();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Your Balance</Text>

      {/* Display Available Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance:</Text>
        <Text style={styles.balanceValue}>${availableBalance.toFixed(2)}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Transfers')} // Navigate to Transfers page
        >
          <Text style={styles.buttonText}>Go to Transfers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')} // Navigate to Settings page
        >
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('BankCard')} // Navigate to BankCard page
>
  <Text style={styles.buttonText}>Link Your BankCard</Text>
</TouchableOpacity>


      {/* Transaction History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#3498DB" />
        ) : transactionHistory.length > 0 ? (
          transactionHistory.map((transaction, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>
                {transaction.type}: {transaction.description} | Amount: 
                <Text style={transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount}>
                  ${transaction.amount.toFixed(2)}
                </Text> | Date: {transaction.date}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No transaction history available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F6F9', // Light gray background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 18,
    color: '#7F8C8D',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#27AE60',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  historyText: {
    color: '#34495E',
    fontSize: 16,
  },
  positiveAmount: {
    color: '#27AE60', // Green for positive amounts (deposits)
    fontWeight: 'bold',
  },
  negativeAmount: {
    color: '#C0392B', // Red for negative amounts (withdrawals or transfers)
    fontWeight: 'bold',
  },
  noHistoryText: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 16,
  },
});

export default BalancePage;
