import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Tip({ total, setTip }) {
  const [tipPercentage, setTipPercentage] = useState(0);
  const [useCustomTip, setUseCustomTip] = useState(false);

  const isTipValid = (tipPercentageInput: number) => {
    return tipPercentageInput >= 0 && tipPercentageInput < 100;
  };

  const changeTipValues = (total: number, tipPercentageInput: number) => {
    const tipAmount = ((total * tipPercentageInput) / 100).toFixed(2);

    setTipPercentage(tipPercentageInput);
    setTip(parseFloat(tipAmount));
  };

  const validTipPercentages = [15, 18, 20];

  const getValidPercentageString = (validTipPercentage: number) => `${validTipPercentage}%`;

  return (
    <>
      <View style={styles.row}>
        {validTipPercentages.map((validTipPercentage, index) => {
          const validTipPercentageString = getValidPercentageString(validTipPercentage);
          return (
            <Button
              key={index}
              title={validTipPercentageString}
              onPress={() => {
                if (isTipValid(validTipPercentage)) {
                  changeTipValues(total, validTipPercentage);
                  setUseCustomTip(false);
                }
              }}
            />
          );
        })}
        <Button
          key={validTipPercentages.length}
          title="Custom"
          onPress={() => setUseCustomTip(!useCustomTip)}
        />
      </View>
      {useCustomTip && (
        <View>
          <Text>Enter percentage here:</Text>
          <TextInput
            onChangeText={(tipPercentageInput) => {
              const tipPercentageInputInt = parseInt(tipPercentageInput);
              if (isTipValid(tipPercentageInputInt)) {
                changeTipValues(total, tipPercentageInputInt);
              }
            }}
            defaultValue={tipPercentage.toString()}
            maxLength={2}
            keyboardType="numeric"
            testID="custom-tip-input"
          />
        </View>
      )}
    </>
  );
}

Tip.propTypes = {
  total: PropTypes.number.isRequired,
  setTip: PropTypes.func.isRequired,
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
