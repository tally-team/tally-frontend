import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Tax({ tax, setTax }) {
  const isTaxAmountValid = (amount: string) => {
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    return regex.test(amount);
  };

  const roundToNearestCent = (amount: string) => {
    return Math.round(parseFloat(amount) * 100) / 100;
  };

  return (
    <View>
      <Text>Enter tax here:</Text>
      <TextInput
        placeholder="0"
        onChangeText={(taxAmountInput) => {
          if (isTaxAmountValid(taxAmountInput)) {
            const taxAmount = roundToNearestCent(taxAmountInput);
            setTax(taxAmount);
          }
        }}
        defaultValue={tax.toString()}
        keyboardType="numeric"
      />
    </View>
  );
}

Tax.propTypes = {
  tax: PropTypes.number.isRequired,
  setTax: PropTypes.func.isRequired,
};

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
