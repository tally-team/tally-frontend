import React from 'react';
import Tip from '../../components/Tip';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from 'react-native';

const mockSetTip = jest.fn();

describe('Tip component', () => {
  let wrapper;
  const total = 15;

  beforeEach(() => {
    wrapper = render(<Tip total={total} setTip={mockSetTip} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const calculateTip = (percentage: number) => parseFloat((percentage * total).toFixed(2));

  const setUpCustomTestScenarios = () => {
    const selectCustomTipButton = wrapper.getByText('Custom');
    fireEvent.press(selectCustomTipButton);
  };

  it('has four tip buttons', () => {
    expect(wrapper.getAllByRole('button')).toHaveLength(4);
  });

  it('valid tip is not calculated when no percentage or amount is selected', () => {
    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('valid tip is calculated when selecting 15%', () => {
    const fifteenPercentTipButton = wrapper.getByText('15%');
    const expectedTip = calculateTip(0.15);
    fireEvent.press(fifteenPercentTipButton);

    expect(mockSetTip).toHaveBeenCalledWith(expectedTip);
  });

  it('valid custom tip is enabled when selecting custom tip', () => {
    setUpCustomTestScenarios();
    expect(wrapper.queryByText('Enter percentage here:')).not.toBeNull();
  });

  it('valid custom tip is calculated when entering tip percentage', () => {
    setUpCustomTestScenarios();

    const customTipTextInput = wrapper.root.findByType(TextInput);
    fireEvent.changeText(customTipTextInput, '12');
    const expectedTip = calculateTip(0.12);

    expect(mockSetTip).toHaveBeenCalledWith(expectedTip);
  });

  it('invalid custom tip is not calculated when entering a tip percentage larger than 100', () => {
    setUpCustomTestScenarios();

    const customTipTextInput = wrapper.root.findByType(TextInput);
    fireEvent.changeText(customTipTextInput, '344');

    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('invalid custom tip is not calculated when entering a non numeric tip percentage', () => {
    setUpCustomTestScenarios();

    const customTipTextInput = wrapper.root.findByType(TextInput);
    fireEvent.changeText(customTipTextInput, '@#!@#dfwerc');

    expect(mockSetTip).not.toHaveBeenCalled();
  });

  it('valid custom tip remains after invalid tip was entered', () => {
    setUpCustomTestScenarios();

    const customTipTextInput = wrapper.root.findByType(TextInput);
    fireEvent.changeText(customTipTextInput, '12');
    const expectedTip = calculateTip(0.12);

    fireEvent.changeText(customTipTextInput, 'dfwerc');

    expect(mockSetTip).toHaveBeenNthCalledWith(1, expectedTip);
    expect(mockSetTip).not.toHaveBeenNthCalledWith(2);
  });
});
