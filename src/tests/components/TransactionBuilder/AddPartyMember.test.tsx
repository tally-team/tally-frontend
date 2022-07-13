import React from 'react';
import { Button, TextInput } from 'react-native';
import { shallow } from 'enzyme';
import AddPartyMember from '../../../components/TransactionBuilder/AddPartyMember';

const mockAddPartyMember = jest.fn();

describe('AddPartyMember component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddPartyMember addPartyMember={mockAddPartyMember} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has one text input field for adding party member', () => {
    expect(wrapper.find(TextInput)).toHaveLength(1);
  });

  it('valid party member name is added', () => {
    const partyMemberNameInput = wrapper.find(TextInput).at(0);

    partyMemberNameInput.simulate('changeText', 'Party Member A');
    wrapper.update();

    wrapper.find(Button).simulate('press');

    expect(mockAddPartyMember).toHaveBeenCalledWith('Party Member A');
  });

  it('valid party member name is added without extra whitespace', () => {
    const partyMemberNameInput = wrapper.find(TextInput).at(0);

    partyMemberNameInput.simulate('changeText', '   Party Member A    ');
    wrapper.update();

    wrapper.find(Button).simulate('press');

    expect(mockAddPartyMember).toHaveBeenCalledWith('Party Member A');
  });

  it('empty name is not added', () => {
    const partyMemberNameInput = wrapper.find(TextInput).at(0);

    partyMemberNameInput.simulate('changeText', '');
    wrapper.update();

    wrapper.find(Button).simulate('press');

    expect(mockAddPartyMember).not.toHaveBeenCalled();
  });

  it('only whitespace name is not added', () => {
    const partyMemberNameInput = wrapper.find(TextInput).at(0);

    partyMemberNameInput.simulate('changeText', '    ');
    wrapper.update();

    wrapper.find(Button).simulate('press');

    expect(mockAddPartyMember).not.toHaveBeenCalled();
  });
});
