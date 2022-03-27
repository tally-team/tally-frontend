import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddItem from './components/AddItem';
import Tax from './components/Tax';
import Tip from './components/Tip';

export default function App() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});
  const [tip, setTip] = useState(0);
  const [tax, setTax] = useState(0);

  const addItem = (itemName, itemPrice, itemPurchaser) => {
    setItems({ ...items, [itemName]: [itemPrice, itemPurchaser] });
    setTotal(Number((total + itemPrice).toFixed(2)));
  };

  return (
    <View style={styles.container}>
      <>
        <>
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
          <Tax tax={tax} setTax={setTax}/>
          <Text>
            Tax: {tax}
          </Text>
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