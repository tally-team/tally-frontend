import React from 'react';
import AddItem from '../../components/AddItem';
import { render, fireEvent } from '@testing-library/react-native';

const mockAddItem = jest.fn();

describe('AddItem component', () => {
  let wrapper;
  let nameInput;
  let priceInput;
  let partyMemberA;
  let partyMemberB;
  let addItemButton;

  beforeEach(() => {
    wrapper = render(<AddItem addItem={mockAddItem} party={['Person A', 'Person B']} />);
    nameInput = wrapper.getByPlaceholderText('Item Name');
    priceInput = wrapper.getByPlaceholderText('0.00');
    partyMemberA = wrapper.getAllByTestId('party-member')[0];
    partyMemberB = wrapper.getAllByTestId('party-member')[1];
    addItemButton = wrapper.getByText('Add Item');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('valid item is added with first purchaser', () => {
    fireEvent.changeText(priceInput, '5.99');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(partyMemberA);
    fireEvent.press(addItemButton);
    expect(mockAddItem).toHaveBeenCalledWith('itemA', 5.99, ['Person A']);
  });

  it('valid item is added with second purchaser', () => {
    fireEvent.changeText(priceInput, '5.99');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(partyMemberB);
    fireEvent.press(addItemButton);
    expect(mockAddItem).toHaveBeenCalledWith('itemA', 5.99, ['Person B']);
  });

  it('valid item is added both purchasers', () => {
    fireEvent.changeText(priceInput, '5.99');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(partyMemberA);
    fireEvent.press(partyMemberB);
    fireEvent.press(addItemButton);
    expect(mockAddItem).toHaveBeenCalledWith('itemA', 5.99, ['Person A', 'Person B']);
  });

  it('valid item is added with price fixed to 2 decimal places', () => {
    fireEvent.changeText(priceInput, '4.1231294');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(partyMemberA);
    fireEvent.press(addItemButton);

    expect(mockAddItem).toHaveBeenCalledWith('itemA', 4.12, ['Person A']);
  });

  it('invalid item is not added: item with no name', () => {
    fireEvent.changeText(priceInput, '4.1231294');
    fireEvent.press(partyMemberA);
    fireEvent.press(addItemButton);

    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('invalid item is not added: item with no purchaser', () => {
    fireEvent.changeText(priceInput, '4.1231294');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(addItemButton);

    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('invalid item is not added: invalid price value', () => {
    fireEvent.changeText(priceInput, 'abc123');
    fireEvent.changeText(nameInput, 'itemA');
    fireEvent.press(partyMemberA);
    fireEvent.press(addItemButton);

    expect(mockAddItem).not.toHaveBeenCalled();
  });
});
