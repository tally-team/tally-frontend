import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddItem from './components/AddItem';
import AddPartyMember from './components/AddPartyMember';
import Tax from './components/Tax';
import Tip from './components/Tip';

export default function App() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});
  const [party, setParty] = useState([]);
  const [tip, setTip] = useState(0);
  const [tax, setTax] = useState(0);

  const addItem = (itemName, itemPrice, itemPurchaserList) => {
    setItems({ ...items, [itemName]: [itemPrice, itemPurchaserList] });
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
          <AddItem addItem={addItem} party={party} />
          <Tax tax={tax} setTax={setTax} />
          <Text>Tax: {tax}</Text>
          <Tip total={total} setTip={setTip} />
          <Text>Tip: {tip}</Text>
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
