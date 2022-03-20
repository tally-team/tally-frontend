import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Tip({
  amount,
  setTipAmount
}) {
  const [tipPercentage, setTipPercentage] = useState(0)
  const [useCustomTip, setUseCustomTip] = useState(false)

  const isTipValid = (amount) => {
    const numAmount = parseInt(amount);
    return (numAmount >= 0) && (numAmount < 100);
  }

  const changePercentage = (amount, tipPercentage, isCustomPercentage) => {
    const tipAmount = (amount*tipPercentage/100).toFixed(2);
    setTipPercentage(tipPercentage);
    setTipAmount(tipAmount);
    !isCustomPercentage && setUseCustomTip(false)
  }

  const validTipPercentages = [15, 18, 20]

  const getValidPercentageString = (validTipPercentage) => {
    return `${validTipPercentage}%`
  }

  return(
    <>
      <View class='tip-header'>
        <Text>
          Tip Amount: ${(amount*tipPercentage/100).toFixed(2)}
        </Text>
      </View>
      <View class='tip-options' style={styles.row}>
        {
          Object.entries(validTipPercentages).map(([index, validTipPercentage]) => {
            const validTipPercentageString = getValidPercentageString(validTipPercentage);
            return(
              <Button
                key={index}
                class='tip-percentage'
                title={validTipPercentageString}
                onPress={() => {
                  if (isTipValid(validTipPercentage)) {
                    changePercentage(amount, validTipPercentage, false)
                  }
                }}
              />
            )
          })
        }

        <Button
          key={validTipPercentages.length}
          class='tip-percentage'
          title="Custom"
          onPress={() => setUseCustomTip(!!!useCustomTip)}
        />
      </View>
      {useCustomTip && (
        <View class='custom-tip-percentage'>
            <Text>
                Enter percentage here: 
            </Text>
            <TextInput
                onChangeText={(value) => {
                    let tipPercentage = parseInt(value)
                    if (isTipValid(tipPercentage)) { 
                        changePercentage(amount, tipPercentage, true) 
                    }
                }}
                value={tipPercentage.toFixed(2)}
                maxLength={2}
                keyboardType="numeric"
            />
            <Text>%</Text>
        </View>
      )}
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