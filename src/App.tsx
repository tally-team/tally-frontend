import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddItem from './components/AddItem';
import AddPartyMember from './components/AddPartyMember';
import Tax from './components/Tax';
import Tip from './components/Tip';
import { DispatchActions } from './constants';
import { DispatchActionArgs, AppState } from './types';

export default function App() {
  const initialState: AppState = {
    total: 0,
    items: {},
    party: [],
    tip: 0,
    tax: 0,
  };

  const reducer = (state: AppState, action: Partial<DispatchActionArgs>) => {
    switch (action.type) {
      case DispatchActions.ADD_ITEM: {
        const { name, price, purchaserList } = action.itemDetails;
        const updatedItems = {
          ...state.items,
          [name]: {
            price: price,
            purchaserList: purchaserList,
          },
        };
        const total = Object.values(updatedItems).reduce(
          (sum, itemDetail) => sum + itemDetail.price,
          0
        );

        return {
          ...state,
          items: updatedItems,
          total: Number(total.toFixed(2)),
        };
      }
      case DispatchActions.ADD_PARTY_MEMBER: {
        const { name } = action.partyMemberDetails;
        return {
          ...state,
          party: [...state.party, name],
        };
      }
      case DispatchActions.SET_TIP: {
        const { amount } = action.tipDetails;
        return {
          ...state,
          tip: amount,
        };
      }
      case DispatchActions.SET_TAX: {
        const { amount } = action.taxDetails;
        return {
          ...state,
          tax: amount,
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (name: string, price: number, purchaserList: Array<string>) => {
    dispatch({
      type: DispatchActions.ADD_ITEM,
      itemDetails: {
        name: name,
        price: price,
        purchaserList: purchaserList,
      },
    });
  };

  const addPartyMember = (name: string) => {
    dispatch({
      type: DispatchActions.ADD_PARTY_MEMBER,
      partyMemberDetails: {
        name: name,
      },
    });
  };

  const setTip = (amount: number) => {
    dispatch({
      type: DispatchActions.SET_TIP,
      tipDetails: {
        amount: amount,
      },
    });
  };

  const setTax = (amount: number) => {
    dispatch({
      type: DispatchActions.SET_TAX,
      taxDetails: {
        amount: amount,
      },
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
