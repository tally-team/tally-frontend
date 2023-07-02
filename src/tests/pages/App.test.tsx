import React from 'react';
import App from '../../App';
import { render } from '@testing-library/react-native';

describe('App page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads all the expected components', () => {
    // adding party member shows
    expect(wrapper.queryByText('Add Party Member')).not.toBeNull();

    // adding party item shows
    expect(wrapper.queryByText('Add Item')).not.toBeNull();

    // tip section shows
    expect(wrapper.queryByText('15%')).not.toBeNull();
  });
});
