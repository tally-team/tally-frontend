import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFormik } from 'formik';

import AddItem from './AddItem';
import AddPartyMember from './AddPartyMember';
import Tax from './Tax';
import Tip from './Tip';

export default function App() {
  const transactionBuilder = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState({});
  const [party, setParty] = useState([]);
  const [tip, setTip] = useState(0);
  const [tax, setTax] = useState(0);

  const addItem = (itemName: string, itemPrice: number, itemPurchaser: string) => {
    setItems({ ...items, [itemName]: [itemPrice, itemPurchaser] });
    setTotal(Number((total + itemPrice).toFixed(2)));
  };

  const addPartyMember = (memberName: string) => {
    setParty([...party, memberName]);
  };

  return (
    <View style={styles.container}>
      <>
        <>
          <Text>Party</Text>

          {party.map((name, index) => (
            <Text key={`${name}-${index}`}>{name}</Text>
          ))}
          <Text>
            {`\n`}
            {`\n`}
          </Text>
          <AddPartyMember addPartyMember={addPartyMember} />
          <Text>
            {`\n`}
            {`\n`}
          </Text>
          <Text>Item List</Text>
          {Object.keys(items).map((itemName) => {
            const [itemPrice, purchaser] = [...items[itemName]];
            return (
              <View style={styles.row} key={itemName}>
                <Text>
                  {itemName}: {itemPrice}
                </Text>
                <Text>Purchaser: {purchaser}</Text>
              </View>
            );
          })}
          <Text>
            {`\n`}
            {`\n`}
          </Text>
          <AddItem addItem={addItem} />
          <Tax tax={tax} setTax={setTax} />
          <Text>Tax: {tax.toFixed(2)}</Text>
          <Tip total={total} setTip={setTip} />
          <Text>Tip: {tip.toFixed(2)}</Text>
        </>
        <Text>Subtotal: {total}</Text>
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
