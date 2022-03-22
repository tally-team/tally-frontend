import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Tip from './components/Tip';
import AddItem from './components/AddItem';

export default function App() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});
  const [tip, setTip] = useState(0);

  const addItem = (itemName, itemPrice, itemPurchaser) => {
    setItems({...items, [itemName]: [itemPrice, itemPurchaser]});
    setTotal(Number((total + itemPrice).toFixed(2)));
  }

  return (
    <View style={styles.container}>
      <>
        <>
          <Text>
            Item List
          </Text>
          {Object.keys(items).map(itemName => {
            const [itemPrice, purchaser] = [...items[itemName]];
            return (
              <View style={styles.row}>
                <Text>
                  {itemName}: {itemPrice}
                </Text>
                <Text>
                Purchaser: {purchaser}
                </Text>
              </View>
            )
          })}
          <AddItem addItem={addItem}/>
          <Tip total={total} tip={tip} setTip={setTip}/>
          <Text>
            Tip: {tip}
          </Text>
        </>
        <View class='tip-header'>
          <Text>
            Total: {total}
          </Text>
        </View>
      </>
    </View>
  );
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