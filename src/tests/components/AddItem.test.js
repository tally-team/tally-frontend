import React from 'react';
import { Button, TextInput } from 'react-native';
import { shallow, mount } from 'enzyme';
import AddItem from '../../components/AddItem';

const mockAddItem = jest.fn();

describe('AddItem component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has three text input fields', () => {
    const wrapper = mount(<AddItem addItem={mockAddItem} />);
    expect(wrapper.find(TextInput)).toHaveLength(3);
  });

  it('valid item is added', () => {
    const wrapper = shallow(<AddItem addItem={mockAddItem} />);
    const itemNameInput = wrapper.find(TextInput).at(0);
    const itemPriceInput = wrapper.find(TextInput).at(1);
    const purchaserInput = wrapper.find(TextInput).at(2);

    itemNameInput.simulate('changeText', "itemA");
    itemPriceInput.simulate('changeText', '5.99');
    purchaserInput.simulate('changeText', 'PersonA');
    wrapper.update();

    wrapper.find(Button).simulate('press');
    
    expect(mockAddItem).toHaveBeenCalledWith("itemA", 5.99, "PersonA");
  });

  it('valid item is added with price fixed to 2 decimal places', () => {
    const wrapper = shallow(<AddItem addItem={mockAddItem} />);
    const itemNameInput = wrapper.find(TextInput).at(0);
    const itemPriceInput = wrapper.find(TextInput).at(1);
    const purchaserInput = wrapper.find(TextInput).at(2);

    itemNameInput.simulate('changeText', "itemA");
    itemPriceInput.simulate('changeText', '4.1231294');
    purchaserInput.simulate('changeText', 'PersonA');
    wrapper.update();

    wrapper.find(Button).simulate('press');
    
    expect(mockAddItem).toHaveBeenCalledWith("itemA", 4.12, "PersonA");
  });

  it('invalid item is not added: item with no name', () => {
    const wrapper = shallow(<AddItem addItem={mockAddItem} />);
    const itemPriceInput = wrapper.find(TextInput).at(1);
    const purchaserInput = wrapper.find(TextInput).at(2);

    itemPriceInput.simulate('changeText', '4.1231294');
    purchaserInput.simulate('changeText', 'PersonA');
    wrapper.update();

    wrapper.find(Button).simulate('press');
    
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('invalid item is not added: item with no purchaser', () => {
    const wrapper = shallow(<AddItem addItem={mockAddItem} />);
    const itemNameInput = wrapper.find(TextInput).at(0);
    const itemPriceInput = wrapper.find(TextInput).at(1);

    itemNameInput.simulate('changeText', "itemA");
    itemPriceInput.simulate('changeText', '4.1231294');
    wrapper.update();

    wrapper.find(Button).simulate('press');
    
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('invalid item is not added: invalid price value', () => {
    const wrapper = shallow(<AddItem addItem={mockAddItem} />);
    const itemNameInput = wrapper.find(TextInput).at(0);
    const itemPriceInput = wrapper.find(TextInput).at(1);
    const purchaserInput = wrapper.find(TextInput).at(2);

    itemNameInput.simulate('changeText', "itemA");
    itemPriceInput.simulate('changeText', 'abc123');
    purchaserInput.simulate('changeText', 'PersonA');
    wrapper.update();

    wrapper.find(Button).simulate('press');
    
    expect(mockAddItem).not.toHaveBeenCalled();
  });

});