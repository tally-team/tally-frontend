import React, { ForwardedRef, forwardRef } from 'react';
import { Text, View, TextInput } from 'react-native';

type TaxProps = {
  tax: number,
  setTax: (tax: number) => void,
};

export default forwardRef(({ tax, setTax }: TaxProps, ref: ForwardedRef<TextInput>) => {
  const isTaxAmountValid = (amount: string) => {
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    return regex.test(amount);
  };

  const roundToNearestCent = (amount: string) => Math.round(parseFloat(amount) * 100) / 100;

  return (
    <View>
      <Text>Enter tax here:</Text>
      <TextInput
        ref={ref}
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
});

