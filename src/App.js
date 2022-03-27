import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tip from './components/Tip';
import AddItem from './components/AddItem';
import AddPartyMember from './components/AddPartyMember';

export default function App() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});
  const [party, setParty] = useState([]);
  const [tip, setTip] = useState(0);

  const addItem = (itemName, itemPrice, itemPurchaser) => {
    setItems({ ...items, [itemName]: [itemPrice, itemPurchaser] });
    setTotal(Number((total + itemPrice).toFixed(2)));
  };

  const addPartyMember = (memberName) => {
    setParty([...party, memberName]);
  };

  return (
    <View style={styles.container}>
      <>
        <>
          Party
          {party.map((name) => (
            <Text>{name}</Text>
          ))}
          <br />
          <br />
          <AddPartyMember addPartyMember={addPartyMember} />
          <br />
          <br />
          Item List
          {Object.keys(items).map((itemName) => {
            const [itemPrice, purchaser] = [...items[itemName]];
            return (
              <View style={styles.row}>
                <Text>
                  {itemName}: {itemPrice}
                </Text>
                <Text>Purchaser: {purchaser}</Text>
              </View>
            );
          })}
          <br />
          <br />
          <AddItem addItem={addItem} />
          <Tip amount={total} setTipAmount={setTip} />
        </>
        <Text>Total: {total}</Text>
      </>
    </View>
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
});
