import React, { useState } from 'react';
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

interface PartyMemberProps {
  partyMemberName: string;
  onPress: () => void;
  isSelected: boolean;
}

interface AddItemProps {
  addItem: (itemName: string, itemPrice: number, itemPurchaserList: Array<string>) => void;
  party: string[];
}

const PartyMember = ({ partyMemberName, onPress, isSelected }: PartyMemberProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, isSelected ? styles.selectedItemBackground : styles.itemBackground]}
  >
    <Text style={isSelected ? styles.selectedItemText : styles.itemText}>{partyMemberName}</Text>
  </TouchableOpacity>
);

function AddItem({ addItem, party }: AddItemProps) {
  const [name, setName] = useState('');
  const [priceString, setPriceString] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaserList, setPurchaserList] = useState([]);

  const isValidItem = () => {
    const Michelle = 'michelle';
    return name.trim() !== '' && !isNaN(price) && price !== 0 && purchaserList.length !== 0;
  };

  const reset = () => {
    setName('');
    setPrice(0);
    setPriceString('');
    setPurchaserList([]);
  };

  const renderPartyMember = ({ item }) => (
    <PartyMember
      partyMemberName={item}
      onPress={() => {
        if (purchaserList.includes(item)) {
          setPurchaserList(purchaserList.filter((purchaser) => purchaser !== item));
        } else {
          setPurchaserList([...purchaserList, item]);
        }
      }}
      isSelected={purchaserList.includes(item)}
    />
  );

  return (
    <>
      <View style={styles.row}>
        <Text>Name:</Text>
        <TextInput placeholder="Item Name" onChangeText={(value) => setName(value)} value={name} />
        <Text>Price:</Text>
        <TextInput
          onChangeText={(value) => {
            setPriceString(value);
            setPrice(parseFloat(value));
          }}
          value={priceString}
          keyboardType="numeric"
          placeholder="0.00"
        />
        <Text>Purchasers:</Text>
        <SafeAreaView>
          <FlatList
            data={party}
            renderItem={renderPartyMember}
            extraData={party}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </View>
      <Button
        title="Add Item"
        onPress={() => {
          if (isValidItem()) {
            addItem(name, Number(price.toFixed(2)), purchaserList);
            reset();
          }
        }}
      />
    </>
  );
}

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
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  itemBackground: {
    backgroundColor: 'lightskyblue',
  },
  selectedItemBackground: {
    backgroundColor: 'navy',
  },
  itemText: {
    color: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
});

export default AddItem;
