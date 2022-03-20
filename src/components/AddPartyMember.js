import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

const AddPartyMember = ({
  addPartyMember
}) => {
  const [name, setName] = useState("");

  const reset = () => {
    setName("");
  }

  return (
    <>
      <View style={styles.row}>
        <Text>
          Name:
        </Text>
        <TextInput 
          onChangeText={(value) => setName(value.trim())}
          value={name}
        />
      </View>
      <Button
        class='add-party-member'
        title="Add Party Member"
        onPress={() => {
          if (name) {
            addPartyMember(name);
            reset();
          }
        }}
      />
     </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default AddPartyMember;