import React from 'react';
import { shallow } from 'enzyme';

import App from '../../pages/App';

import AddItem from '../../components/TransactionBuilder';
import AddPartyMember from '../../components/TransactionBuilder';
import Tip from '../../components/TransactionBuilder';

describe('App page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads all the expected components', () => {
    expect(wrapper.find(AddItem)).toHaveLength(1);
    expect(wrapper.find(AddPartyMember)).toHaveLength(1);
    expect(wrapper.find(Tip)).toHaveLength(1);
  });
});
