import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from 'react-native';
import Tax from '../../components/Tax';

const mockSetTax = jest.fn();

describe('Tax component', () => {
  let wrapper;
  let tipTextInput;
  const tax = 15;

  beforeEach(() => {
    wrapper = shallow(<Tax tax={tax} setTax={mockSetTax} />);
    tipTextInput = wrapper.find(TextInput).at(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('valid tax is set after typing a valid decimal string', () => {
    tipTextInput.simulate('changeText', '16.00');

    expect(mockSetTax).toHaveBeenCalledWith('16.00');
  });

  it('valid tax is set after typing a valid int string', () => {
    tipTextInput.simulate('changeText', '200');

    expect(mockSetTax).toHaveBeenCalledWith('200.00');
  });

  it('invalid tax is not set after typing an invalid decimal string', () => {
    const invalidTipAmounts = [
      '15.00034234',
      '23.2323.2323',
      '-22331',
      '15.000000saf@##@$}{',
      'abc',
      '@#@#$#@$',
    ];

    invalidTipAmounts.forEach((invalidTipAmount) => {
      tipTextInput.simulate('changeText', invalidTipAmount);
      expect(mockSetTax).not.toHaveBeenCalled();
    });
  });
});
