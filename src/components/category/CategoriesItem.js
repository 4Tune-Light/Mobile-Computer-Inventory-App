import React, { useState } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { CardItem, Card, Button } from 'native-base';

import EditCategory from './EditCategory';


const CategoriesItem = props => {
	const { category } = props;

	const [visibleEdit, setVisibleEdit] = useState(false);

	const single = () => {
		Alert.alert(
		  props.category.name,
		  'Update or Delete Category?',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel')},
		    {text: 'Edit',onPress: () => changeVisible()},
		    {text: 'Delete', onPress: () => props.deleteCategory(props.category.id)},
		  ],
		  {cancelable: false},
		);
	}

	const changeVisible = () => {
		setVisibleEdit(!visibleEdit);
	} 

	

	return(
		<TouchableOpacity onPress={() => single()}>
		<Card style={{borderRadius: 3, width: 150, marginRight: 5, marginLeft: 5, borderColor: '#147ED3', borderLeftWidth: 5, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, alignItems: 'center'}} >
			{
				visibleEdit === true ? 
					<EditCategory visible={true} id={props.category.id} name={props.category.name} editCategory={props.editCategory} deleteCategory={props.deleteCategory} setVisible={changeVisible} />
				:
					<EditCategory visible={false} id={props.category.id} name={props.category.name} editCategory={props.editCategory} deleteCategory={props.deleteCategory} setVisible={changeVisible} />
			}
			<CardItem style={{ justifyContent: 'center'}} >
				<View>
					<Text style={{fontWeight: 'bold', color: '#333'}}>{category.name.length > 15 ? category.name.substr(0,15)+'...' : category.name}</Text>
				</View>
			</CardItem>
		</Card>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 120, 
		width: 120,
	},

	title: {
		flex: 3, 
		flexDirection: 'column', 
		marginLeft: 20,
	},

	titleText: {
		paddingBottom: 10, 
		fontSize: 18, 
		fontWeight: 'bold',
	},

	button: {
		width: 15, 
		height: 15, 
		justifyContent: 'center', 
		marginLeft: 5, 
		marginRight: 5,
	},

	buttonText: {
		fontSize: 15, 
		color: 'white',
	}
})

export default CategoriesItem;