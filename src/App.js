import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Tip from './components/Tip';

export default function App() {

  return (
    <View style={styles.container}>
      <>
        <>
            <Text>
              Amount: 10
            </Text>
            <Tip amount={10}/>
        </>
        
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});