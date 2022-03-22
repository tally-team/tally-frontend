import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Tax({
  tax,
  setTax
}) {
  const isTaxAmountValid = (amount) => {
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    return (regex.test(amount));
  }

  return(
    <>
      <View class='tax-amount'>
        <Text>
          Enter tax here: 
        </Text>
        <TextInput
          onChangeText={(taxAmountInput) => {
            if (isTaxAmountValid(taxAmountInput)) {
              setTax(parseFloat(taxAmountInput).toFixed(2));
            }
          }}
          defaultValue={tax.toString()}
          keyboardType="numeric"
        />
      </View>
    </>
  )   
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