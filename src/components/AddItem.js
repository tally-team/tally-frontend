import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

function AddItem({ addItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaser, setPurchaser] = useState('');

  const isValidItem = () => {
    const numberPrice = parseFloat(price);
    return (
      name.trim() !== '' && !isNaN(numberPrice) && numberPrice !== 0 && purchaser.trim() !== ''
    );
  };

  const reset = () => {
    setName('');
    setPrice(0);
    setPurchaser('');
  };

  return (
    <>
      <View style={styles.row}>
        <Text>Name:</Text>
        <TextInput onChangeText={(value) => setName(value)} value={name} />
        <Text>Price:</Text>
        <TextInput
          onChangeText={(value) => setPrice(value)}
          value={`${price}`}
          keyboardType="numeric"
        />
        <Text>Purchaser:</Text>
        <TextInput onChangeText={(value) => setPurchaser(value)} value={purchaser} />
      </View>
      <Button
        class="add-item"
        title="Add Item"
        onPress={() => {
          if (isValidItem()) {
            const numberPrice = parseFloat(price);
            addItem(name, Number(numberPrice.toFixed(2)), purchaser);
            reset();
          }
        }}
      />
    </>
  );
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
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

export default AddItem;
