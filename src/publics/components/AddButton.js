import React from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const AddButton = props => {
	return(
		<Button style={styles.button} onPress={props.addButton} info><Text style={styles.text}>+</Text></Button>
	)
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute', 
		right: 15, 
		bottom: 15, 
		height: 50, 
		width: 50, 
		borderRadius: 50, 
		borderColor: 'white', 
		alignItems: 'center', 
		justifyContent: 'center',
	},
	
	text: {
		color: 'white', 
		fontSize: 40, 
		paddingBottom: 5,
	},
})

export default AddButton;