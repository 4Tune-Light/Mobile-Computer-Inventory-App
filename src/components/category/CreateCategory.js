import React, {useState} from 'react'
import { View, Text } from 'react-native';
import Dialog from "react-native-dialog";

const CreateCategory = props => {
	const [name, setName] = useState('');

	return(
		<Dialog.Container visible={props.visible}>
      <Dialog.Title>Add Category</Dialog.Title>
      <Dialog.Input style={{borderBottomWidth: 1, borderColor: 'gray'}} value={name} onChangeText={value => setName(value)} placeholder='Category name...' />
      <Dialog.Button label="Cancel" onPress={() => props.setVisible()} />
      <Dialog.Button label="Add" onPress={() => {
      		props.createCategory(name);
      		props.setVisible();
      	}
      }/>
    </Dialog.Container>
	)
}

export default CreateCategory;