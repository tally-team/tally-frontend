import React from 'react';
import { render, fireEvent, within } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import App from '../../App';
import '@testing-library/jest-native';

describe('App page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setUpParty = () => {
    const partyMemberNameInput = wrapper.getByPlaceholderText('Name');
    const addPartyMemberButton = wrapper.getByText('Add Party Member');

    fireEvent.changeText(partyMemberNameInput, 'Person A');
    fireEvent.press(addPartyMemberButton);

    fireEvent.changeText(partyMemberNameInput, 'Person B');
    fireEvent.press(addPartyMemberButton);
  };

  const setUpItems = (itemsList) => {
    const itemNameInput = wrapper.getByPlaceholderText('Item Name');
    const priceInput = wrapper.getByPlaceholderText('0.00');
    const addItemButton = wrapper.getByText('Add Item');
    const partyMemberList = wrapper.root.findByType(FlatList);

    itemsList.forEach((itemDetails) => {
      const [name, price, purchaserList] = itemDetails;

      fireEvent.changeText(priceInput, price);
      fireEvent.changeText(itemNameInput, name);

      purchaserList.forEach((purchaser) => {
        const partyMember = within(partyMemberList).getByText(purchaser);
        fireEvent.press(partyMember);
      });

      fireEvent.press(addItemButton);
    });
  };

  it('loads all the expected components', () => {
    // adding party member shows
    expect(wrapper.queryByText('Add Party Member')).toBeOnTheScreen();

    // adding party item shows
    expect(wrapper.queryByText('Add Item')).toBeOnTheScreen();

    // tip section shows
    expect(wrapper.queryByText('15%')).toBeOnTheScreen();

    // submit button shows
    expect(wrapper.getByText('Submit')).toBeOnTheScreen();
  });

  it('shows correct subtotal', () => {
    setUpParty();

    const itemsList = [
      ['pokeball', '20.50', ['Person A']],
      ['riceball', '13.24', ['Person B']],
    ];
    setUpItems(itemsList);
    expect(wrapper.getByText(/Subtotal/)).toHaveTextContent('33.74');
  });

  it('shows correct subtotal after repricing an item', () => {
    setUpParty();

    const itemsList = [
      ['pokeball', '20.50', ['Person A']],
      ['riceball', '13.24', ['Person B']],
      ['pokeball', '21.53', ['Person A']],
    ];
    setUpItems(itemsList);
    expect(wrapper.queryByText(/Subtotal/)).toHaveTextContent('34.77');
  });
});
