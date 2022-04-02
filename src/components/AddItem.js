import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

function Item({ item, onPress, backgroundColor, textColor }) {
  return <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item}</Text>
  </TouchableOpacity>
}

function AddItem({ addItem, party }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaserList, setPurchaserList] = useState([]);

  const isValidItem = () => {
    const numberPrice = parseFloat(price);
    return (
      name.trim() !== '' && !isNaN(numberPrice) && numberPrice !== 0 && purchaserList.length !== 0
    );
  };

  const reset = () => {
    setName('');
    setPrice(0);
    setPurchaserList([]);
  };

  const renderItem = ({ item }) => {
    console.log(item);
    const backgroundColor = purchaserList.includes(item) ? '#6e3b6e' : '#f9c2ff';
    const color = purchaserList.includes(item) ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          if (purchaserList.includes(item)) {
            setPurchaserList(purchaserList.filter((purchaser) => purchaser !== item));
          } else {
            setPurchaserList([...purchaserList, item]);
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <View style={styles.row}>
        <Text>Name:</Text>
        <TextInput onChangeText={(value) => setName(value)} value={name} placeholder="Item Name" />
        <Text>Price:</Text>
        <TextInput
          onChangeText={(value) => setPrice(value)}
          value={`${price}`}
          keyboardType="numeric"
          placeholder="0.00"
        />
        <Text>Purchasers:</Text>
        <SafeAreaView style={styles.container2}>
          <FlatList data={party} renderItem={renderItem} extraData={party} />
        </SafeAreaView>
      </View>
      <Button
        class="add-item"
        title="Add Item"
        onPress={() => {
          if (isValidItem()) {
            const numberPrice = parseFloat(price);
            addItem(name, Number(numberPrice.toFixed(2)), purchaserList);
            reset();
          }
        }}
      />
    </>
  );
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  party: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Item.propTypes = {
  item: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default AddItem;
