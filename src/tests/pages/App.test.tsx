import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import AddItem from '../../components/AddItem';
import AddPartyMember from '../../components/AddPartyMember';
import Tip from '../../components/Tip';

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
