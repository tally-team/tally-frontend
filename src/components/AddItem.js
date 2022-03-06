import React, { useState } from 'react';
import { StyleSheet, Text, Button, TextInput } from 'react-native';

const AddItem = ({
  addItem
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const changePrice = (inputPrice) => {
    setPrice(inputPrice);
  }

  const reset = () => {
    setName("");
    setPrice(0);
  }

  return (
    <>
      <Text>
        Name:
      </Text>
      <TextInput 
        onChangeText={(value) => setName(value)}
        value={name}
      />
      <Text>
        Price:
      </Text>
      <TextInput
        onChangeText={(value) => changePrice(value)}
        value={price}
        keyboardType="numeric"
      />
      <Button
        class='add-item'
        title="Add Item"
        onPress={() => {
          const numberPrice = parseFloat(price);
          if (!isNaN(numberPrice) && numberPrice !== 0) {
            addItem(name, Number(numberPrice.toFixed(2)));
            reset();
          }
        }}
      />
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

export default AddItem;