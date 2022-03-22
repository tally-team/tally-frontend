import React from 'react';
import { shallow } from 'enzyme';
import { Button, View, Text, TextInput } from 'react-native';
import Tip from '../../components/Tip';

const mockSetTip = jest.fn();

describe('Tip component', () => {
  let wrapper;
  const total = 15;

  beforeEach(() => {
    wrapper = shallow(<Tip total={total} setTip={mockSetTip}/>);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  const calculateTip = (perecentage) => {
    return (perecentage * total).toFixed(2)
  };

  const setUpCustomTestScenarios = () => {
    const tipOptions = wrapper.find(View).at(0);
    const selectCustomTip = tipOptions.find(Button).at(3);

    selectCustomTip.simulate('press');
  }

  it('has four tip buttons', () => {
    expect(wrapper.find(Button)).toHaveLength(4);
  });

  it('valid tip is not calculated when no percentage or amount is selected', () => {
    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('valid tip is calculated when selecting 15%', () => {
    const tipOptions = wrapper.find(View).at(0);
    const fifteenPercentTip = tipOptions.find(Button).at(0);
    const expectedTip = calculateTip(0.15);

    fifteenPercentTip.simulate('press');

    wrapper.update();

    expect(mockSetTip).toHaveBeenCalledWith("2.25");
  });

  it('valid custom tip is enabled when selecting custom tip', () => {
    const tipOptions = wrapper.find(View).at(0);
    const selectCustomTip = tipOptions.find(Button).at(3);

    expect(wrapper.find(View)).toHaveLength(1);
    selectCustomTip.simulate('press');
    expect(wrapper.find(View)).toHaveLength(2);
  });

  it('valid custom tip is calculated when entering tip percentage', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(1);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '12');
    const expectedTip = calculateTip(0.12);

    expect(mockSetTip).toHaveBeenCalledWith(expectedTip);
  });

  it('invalid custom tip is not calculated when entering a tip percentage larger than 100', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(1);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '344');

    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('invalid custom tip is not calculated when entering a non numeric tip percentage', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(1);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '@#!@#dfwerc');

    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('valid custom tip remains after invalid tip was entered', () => {
    setUpCustomTestScenarios();

    const customTip = wrapper.find(View).at(1);
    const customTipTextInput = customTip.find(TextInput).at(0).shallow();

    customTipTextInput.simulate('changeText', '12');
    const expectedTip = calculateTip(0.12);

    customTipTextInput.simulate('changeText', 'dfwerc');

    expect(mockSetTip).toHaveBeenNthCalledWith(1, expectedTip);
    expect(mockSetTip).not.toHaveBeenNthCalledWith(2);
  });
});