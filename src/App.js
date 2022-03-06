import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Tip from './components/Tip';
import AddItem from './components/AddItem';

export default function App() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});

  const addItem = (itemName, itemPrice) => {
    setItems({...items, [itemName]: itemPrice});
    setTotal(Number((total + itemPrice).toFixed(2)));
  }

  return (
    <View style={styles.container}>
      <>
        <>
        {Object.entries(items).map(item => (
          <Text>
            {`${item[0]}: ${item[1]}`}
          </Text>
        ))}
        <AddItem addItem={addItem}/>
            <Text>
              Amount: 10
            </Text>
            <Tip amount={10}/>
        </>

        <Text>
        {`Total: ${total}`}
        </Text>
        
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