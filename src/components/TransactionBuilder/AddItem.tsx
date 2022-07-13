import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

function AddItem({ addItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaser, setPurchaser] = useState('');

  const isValidItem = () => {
    return name.trim() !== '' && !isNaN(price) && price !== 0 && purchaser.trim() !== '';
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
        <TextInput placeholder="Item Name" onChangeText={(value) => setName(value)} value={name} />
        <Text>Price:</Text>
        <TextInput
          placeholder="0"
          onChangeText={(value) => setPrice(parseFloat(value))}
          defaultValue={`${price}`}
          keyboardType="numeric"
        />
        <Text>Purchaser:</Text>
        <TextInput
          placeholder="Person A"
          onChangeText={(value) => setPurchaser(value)}
          value={purchaser}
        />
      </View>
      <Button
        title="Add Item"
        onPress={() => {
          if (isValidItem()) {
            addItem(name, Number(price.toFixed(2)), purchaser);
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
