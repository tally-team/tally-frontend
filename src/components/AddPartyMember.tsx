import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

function AddPartyMember({ addPartyMember }) {
  const [name, setName] = useState('');

  return (
    <>
      <View style={styles.row}>
        <Text>Name:</Text>
        <TextInput 
          placeholder="Name"
          onChangeText={(value) => setName(value)} value={name} />
      </View>
      <Button
        title="Add Party Member"
        onPress={() => {
          if (name.trim()) {
            addPartyMember(name.trim());
            setName('');
          }
        }}
      />
    </>
  );
}

AddPartyMember.propTypes = {
  addPartyMember: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddPartyMember;
