import React from 'react';
import Tax from '../../components/Tax';
import { render, fireEvent } from '@testing-library/react-native';

const mockSetTax = jest.fn();

describe('Tax component', () => {
  let wrapper;
  let tipTextInput;
  const tax = 15;

  beforeEach(() => {
    wrapper = render(<Tax tax={tax} setTax={mockSetTax} />);
    tipTextInput = wrapper.getByTestId('tax-input');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('valid tax is set after typing a valid decimal string', () => {
    fireEvent.changeText(tipTextInput, '16.00');
    expect(mockSetTax).toHaveBeenCalledWith(16);
  });

  it('valid tax is set after typing a valid int string', () => {
    fireEvent.changeText(tipTextInput, '200');
    expect(mockSetTax).toHaveBeenCalledWith(200);
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
      fireEvent.changeText(tipTextInput, invalidTipAmount);
      expect(mockSetTax).not.toHaveBeenCalled();
    });
  });
});
