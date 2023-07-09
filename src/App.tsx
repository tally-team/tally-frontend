import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddItem from './components/AddItem';
import AddPartyMember from './components/AddPartyMember';
import Tax from './components/Tax';
import Tip from './components/Tip';

enum Actions {
  ADD_ITEM = 'add_item',
  ADD_PARTY_MEMBER = 'add_party_member',
  SET_TIP = 'set_tip',
  SET_TAX = 'set_tax',
}

type AppStateType = {
  total: number;
  items: {
    [name: string]: {
      price: number;
      purchaserList: string[];
    };
  };
  party: string[];
  tip: number;
  tax: number;
};

type ActionArgs = {
  type: Actions;

  // item name or party member name
  name: string;

  // item details
  price: number;
  purchaserList: string[];

  // tax or tip amount
  amount: number;
};

export default function App() {
  const initialState: AppStateType = {
    total: 0,
    items: {},
    party: [],
    tip: 0,
    tax: 0,
  };

  const reducer = (state: AppStateType, action: Partial<ActionArgs>) => {
    switch (action.type) {
      case Actions.ADD_ITEM: {
        return {
          ...state,
          items: {
            ...state.items,
            [action.name]: {
              price: action.price,
              purchaserList: action.purchaserList,
            },
          },
          total: Number((state.total + action.price).toFixed(2)),
        };
      }
      case Actions.ADD_PARTY_MEMBER: {
        return {
          ...state,
          party: [...state.party, action.name],
        };
      }
      case Actions.SET_TIP: {
        return {
          ...state,
          tip: action.amount,
        };
      }
      case Actions.SET_TAX: {
        return {
          ...state,
          tax: action.amount,
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (name: string, price: number, purchaserList: Array<string>) => {
    dispatch({
      type: Actions.ADD_ITEM,
      name: name,
      price: price,
      purchaserList: purchaserList,
    });
  };

  const addPartyMember = (name: string) => {
    dispatch({
      type: Actions.ADD_PARTY_MEMBER,
      name: name,
    });
  };

  const setTip = (amount: number) => {
    dispatch({
      type: Actions.SET_TIP,
      amount: amount,
    });
  };

  const setTax = (amount: number) => {
    dispatch({
      type: Actions.SET_TAX,
      amount: amount,
    });
  };

  return (
    <View style={styles.container}>
      <>
        <>
          <Text>Party</Text>

          {state.party.map((name, index) => (
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
          {Object.keys(state.items).map((itemName) => {
            const { price, purchaserList } = state.items[itemName];
            return (
              <View style={styles.row} key={itemName}>
                <Text>
                  {itemName}: {price}
                </Text>
                <Text>Purchasers: {purchaserList.join(', ')}</Text>
              </View>
            );
          })}
          <Text>
            {`\n`}
            {`\n`}
          </Text>
          <AddItem addItem={addItem} party={state.party} />
          <Tax tax={state.tax} setTax={setTax} />
          <Text>Tax: {state.tax.toFixed(2)}</Text>
          <Tip total={state.total} setTip={setTip} />
          <Text>Tip: {state.tip.toFixed(2)}</Text>
        </>
        <Text>Subtotal: {state.total}</Text>
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
