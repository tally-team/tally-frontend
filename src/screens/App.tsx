import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TransactionBuilder from '../components/TransactionBuilder';

export default function App() {
  return (
    <View style={styles.container}>
      <TransactionBuilder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
