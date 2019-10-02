import React, {useState} from 'react'
import { View, Text } from 'react-native';
import Dialog from "react-native-dialog";

const EditCategory = props => {
	const [name, setName] = useState(props.name);

	return(
		<Dialog.Container visible={props.visible}>
      <Dialog.Title>Edit Category</Dialog.Title>
      <Dialog.Input style={{borderBottomWidth: 1, borderColor: 'gray'}} value={name} onChangeText={value => setName(value)} placeholder='Category name...' />
      <Dialog.Button label="Cancel" onPress={() => props.setVisible()} />
      <Dialog.Button label="Edit" onPress={() => {
      		props.editCategory(props.id, name);
      		props.setVisible();
      	}
      }/>
    </Dialog.Container>
	)
}

export default EditCategory;