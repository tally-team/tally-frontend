import React from 'react';
import AddPartyMember from '../../components/AddPartyMember';
import { render, fireEvent } from '@testing-library/react-native';

const mockAddPartyMember = jest.fn();

describe('AddPartyMember component', () => {
  let wrapper;
  let partyMemberNameInput;
  let addPartyMemberButton;

  beforeEach(() => {
    wrapper = render(<AddPartyMember addPartyMember={mockAddPartyMember} />);
    partyMemberNameInput = wrapper.getByPlaceholderText('Name');
    addPartyMemberButton = wrapper.getByText('Add Party Member');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('valid party member name is added', () => {
    fireEvent.changeText(partyMemberNameInput, 'Party Member A');
    fireEvent.press(addPartyMemberButton);
    expect(mockAddPartyMember).toHaveBeenCalledWith('Party Member A');
  });

  it('valid party member name is added without extra whitespace', () => {
    fireEvent.changeText(partyMemberNameInput, '   Party Member A    ');
    fireEvent.press(addPartyMemberButton);
    expect(mockAddPartyMember).toHaveBeenCalledWith('Party Member A');
  });

  it('empty name is not added', () => {
    fireEvent.changeText(partyMemberNameInput, '');
    fireEvent.press(addPartyMemberButton);
    expect(mockAddPartyMember).not.toHaveBeenCalled();
  });

  it('only whitespace name is not added', () => {
    fireEvent.changeText(partyMemberNameInput, '    ');
    fireEvent.press(addPartyMemberButton);
    expect(mockAddPartyMember).not.toHaveBeenCalled();
  });
});
