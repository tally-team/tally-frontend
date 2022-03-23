import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Tip({
  total,
  setTip
}) {
  const [tipPercentage, setTipPercentage] = useState(0)
  const [useCustomTip, setUseCustomTip] = useState(false)

  const isTipValid = (tipPerecentageInput) => {
    const numTip = parseInt(tipPerecentageInput);
    return (numTip >= 0) && (numTip < 100);
  }

  const changePercentage = (total, tipPerecentageInput, isCustomPercentage) => {
    const tipPerecentageFloat = parseFloat(tipPerecentageInput);
    const tipAmount = parseFloat(total*tipPerecentageFloat/100).toFixed(2);

    setTipPercentage(parseInt(tipPerecentageFloat));
    setTip(tipAmount);

    !isCustomPercentage && setUseCustomTip(false)
  }

  const validTipPercentages = [15, 18, 20];

  const getValidPercentageString = (validTipPercentage) => `${validTipPercentage}%`;

  return (
    <>
      <View class='tip-options' style={styles.row}>
        {
          validTipPercentages.map((validTipPercentage, index) => {
            const validTipPercentageString = getValidPercentageString(validTipPercentage);
            return(
              <Button
                key={index}
                class='tip-percentage'
                title={validTipPercentageString}
                onPress={() => {
                  if (isTipValid(validTipPercentage)) {
                    changePercentage(total, validTipPercentage, false)
                  }
                }}
              />
            )
          })
        }
        <Button
          key={validTipPercentages.length}
          class="tip-percentage"
          title="Custom"
          onPress={() => setUseCustomTip(!useCustomTip)}
        />
      </View>
      {useCustomTip && (
        <View class='custom-tip-percentage'>
            <Text>
                Enter percentage here: 
            </Text>
            <TextInput
              onChangeText={(tipPerecentageInput) => {
                if (isTipValid(tipPerecentageInput)) {
                  changePercentage(total, tipPerecentageInput, true)
                }
              }}
              defaultValue={tipPercentage.toString()}
              maxLength={2}
              keyboardType="numeric"
            />
        </View>
      )}
    </>
  );
}

Tip.propTypes = {
  amount: PropTypes.number.isRequired,
  setTipAmount: PropTypes.func.isRequired,
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
