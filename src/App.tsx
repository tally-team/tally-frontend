import React, { useReducer, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddItem from './components/AddItem';
import AddPartyMember from './components/AddPartyMember';
import Tax from './components/Tax';
import Tip from './components/Tip';
import { DispatchActions } from './constants';
import { DispatchActionArgs, AppState } from './types';
import { submitTransaction } from './api';

const APP_CONTAINER_COLOR = '#fff';

const Stack = createNativeStackNavigator();

function HomeScreen() {
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
            price,
            purchaserList,
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
      case DispatchActions.RESET: 
        return {
          total: 0,
          items: {},
          party: [],
          tip: 0,
          tax: 0,
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const taxInputRef = useRef(null);

  const addItem = (name: string, price: number, purchaserList: Array<string>) => {
    dispatch({
      type: DispatchActions.ADD_ITEM,
      itemDetails: {
        name,
        price,
        purchaserList,
      },
    });
  };

  const addPartyMember = (name: string) => {
    dispatch({
      type: DispatchActions.ADD_PARTY_MEMBER,
      partyMemberDetails: {
        name,
      },
    });
  };

  const setTip = (amount: number) => {
    dispatch({
      type: DispatchActions.SET_TIP,
      tipDetails: {
        amount,
      },
    });
  };

  const setTax = (amount: number) => {
    dispatch({
      type: DispatchActions.SET_TAX,
      taxDetails: {
        amount,
      },
    });
  };

  const submit = () => {
    const items = Object.keys(state.items).map(itemName => {
      const itemDetails = state.items[itemName];
      return {
        name: itemName,
        cost: itemDetails.price,
        people: itemDetails.purchaserList
      }
    });

    try {
      submitTransaction({
        items, 
        tip: state.tip,
        tax: state.tax,
        party: state.party
      });

      dispatch({ type: DispatchActions.RESET });
      if (taxInputRef.current) {
        taxInputRef.current.clear();
      };
    } catch {
      // TODO: show error message
    }
  }

  return (
    <View style={styles.container}>
      <>
        <>
          <Text>Party</Text>

          {state.party.map((name) => (
            <Text key={`${name}`}>{name}</Text>
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
          <Tax tax={state.tax} setTax={setTax} ref={taxInputRef} />
          <Text>Tax: {state.tax.toFixed(2)}</Text>
          <Tip total={state.total} setTip={setTip} />
          <Text>Tip: {state.tip.toFixed(2)}</Text>
        </>
        <Text>Subtotal: {state.total}</Text>
        <Button
          onPress={submit}
          title="Submit"
        />
      </>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_CONTAINER_COLOR,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
