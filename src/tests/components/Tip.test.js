import React from 'react';
import { shallow } from 'enzyme';
import { Button, View, Text, TextInput } from 'react-native';
import Tip from '../../components/Tip';

const mockSetTipAmount = jest.fn();

describe('Tip component', () => {
  let wrapper;
  const amount = 15;

  beforeEach(() => {
    wrapper = shallow(<Tip amount={amount} setTipAmount={mockSetTipAmount} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const calculateTip = (perecentage) => (perecentage * amount).toFixed(2);

  const setUpCustomTestScenarios = () => {
    const tipOptions = wrapper.find(View).at(1);
    const selectCustomTip = tipOptions.find(Button).at(3);

    selectCustomTip.simulate('press');
  };

  it('has four tip buttons', () => {
    expect(wrapper.find(Button)).toHaveLength(4);
  });

  it('valid tip is not calculated when no percentage or amount is selected', () => {
    const tipHeaderText = wrapper.find(Text).at(0).shallow().text();
    expect(tipHeaderText.includes('$0.00')).toBe(true);
  });

  it('valid tip is calculated when selecting 15%', () => {
    const tipOptions = wrapper.find(View).at(1);
    const fifteenPercentTip = tipOptions.find(Button).at(0);
    const expectedTip = calculateTip(0.15);

    fifteenPercentTip.simulate('press');

    wrapper.update();

    const tipHeaderText = wrapper.find(Text).at(0).shallow().text();
    expect(tipHeaderText.includes(expectedTip)).toBe(true);
    expect(mockSetTipAmount).toHaveBeenCalledWith('2.25');
  });

  it('valid custom tip is enabled when selecting custom tip', () => {
    const tipOptions = wrapper.find(View).at(1);
    const selectCustomTip = tipOptions.find(Button).at(3);

    expect(wrapper.find(View)).toHaveLength(2);
    selectCustomTip.simulate('press');
    expect(wrapper.find(View)).toHaveLength(3);
  });

  it('valid custom tip is calculated when entering tip percentage', () => {
    setUpCustomTestScenarios();
    const customTip = wrapper.find(View).at(2);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '12');
    const expectedTip = calculateTip(0.12);

    expect(mockSetTipAmount).toHaveBeenCalledWith(expectedTip);
  });

  it('invalid custom tip is not calculated when entering a tip percentage larger than 100', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(2);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();
    customTipTextInput.simulate('changeText', '344');

    expect(mockSetTipAmount).not.toHaveBeenCalled();
  });

  it('invalid custom tip is not calculated when entering a non numeric tip percentage', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(2);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();
    customTipTextInput.simulate('changeText', '@#!@#dfwerc');

    expect(mockSetTipAmount).not.toHaveBeenCalled();
  });

  it('valid custom tip remains after invalid tip was entered', () => {
    const tipOptions = wrapper.find(View).at(1);
    const selectCustomTip = tipOptions.find(Button).at(3);

    selectCustomTip.simulate('press');

    const customTip = wrapper.find(View).at(2);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '12');

    const originalTipAmount = wrapper.find(Text).at(0).shallow().text();

    customTipTextInput.simulate('changeText', 'dfwerc');

    const currentTipAmount = wrapper.find(Text).at(0).shallow().text();
    expect(currentTipAmount).toEqual(originalTipAmount);
  });
});
