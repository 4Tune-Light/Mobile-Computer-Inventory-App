import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert,
				 KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Button } from 'native-base';

import { getProduct, updateProduct } from '../../publics/redux/actions/productActions';
import { getCategories } from '../../publics/redux/actions/categoryActions';

const EditProducts = props => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [idCategory, setIdCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [description, setDescription] = useState('');

	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	AsyncStorage.getItem('token').then(value => setToken(value))
	AsyncStorage.getItem('username').then(value => setUsername(value))
	AsyncStorage.getItem('email').then(value => setEmail(value))

	const id = props.navigation.getParam('id');

	const getDatas = async () => {
		await props.getProduct(id);
		await props.getCategories('');

		const {name, image, id_category, quantity, description} = props.product.products;
		setName(name);
		setImage(image);
		setIdCategory(id_category);
		setQuantity('' + quantity);
		setDescription(description);
	}

	useEffect(() => {
		getDatas();
	}, [])

	const editProduct = () => {
		if (!name || !image || !idCategory || !quantity || !description) {
			alert('All Fields Are Required')
		} else {
			const user = {
				token, username, email
			}

			const data = {
				name, image, id_category: idCategory, quantity, description
			}

			props.updateProduct(id, data, user);

			Alert.alert(
			  'Success',
			  'Editing Product Success',
			  [
			    {text: 'OK', onPress: () => props.navigation.goBack()},
			  ],
			  {cancelable: false},
			);
		}
		
	}

	const {isLoading, categories} = props.category

	return(
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={100}>
    <ScrollView keyboardShouldPersistTaps='handled'>
      <Form>
        <Item floatingLabel>
          <Label>Product Name</Label>
          <Input value={name} onChangeText={value => setName(value)}/>
        </Item>

        <Item floatingLabel>
          <Label>Image (URL)</Label>
          <Input value={image} onChangeText={value => setImage(value)}/>
        </Item>

        <Item style={{marginLeft: 15, marginTop: 25}} picker>
        	<Label style={{marginRight: 40}}>Category</Label>
          <Picker
            mode="dropdown"
            placeholder="Select Category"
            placeholderStyle={{ color: "#bfc6ea" }}
            selectedValue={idCategory}
            onValueChange={value => setIdCategory(value)}
          >
          {
          	(!isLoading && categories.length > 0) ? categories.map(category => {
								return <Picker.Item label={category.name} value={category.id} key={category.id} />
							}) 
						: null
					}
          </Picker>
        </Item>

        <Item floatingLabel>
          <Label>Stock</Label>
          <Input 
          	keyboardType='numeric'
          	value={quantity}
          	onChangeText={value => setQuantity(value)}
          />
        </Item>

        <Item floatingLabel>
          <Label>Description</Label>
          <Input
          	value={description} 
          	onChangeText={value => setDescription(value)}
          />
        </Item>

	      <View style={{margin: 15, marginTop: 30}}>
	        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={editProduct} primary>
	        	{
	        		props.product.isLoading === false ?
	        			<Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
	        		:
	        			<ActivityIndicator size='large' color='white' />
	        	}
	        </Button>
	      </View>

      </Form>
     	</ScrollView>
      </KeyboardAvoidingView>
    
	)
}

EditProducts.navigationOptions = {
  title: 'Edit Product',
};

const styles = StyleSheet.create({
	
})


const mapStateToProps = state => ({
	product: state.product,
	category: state.category,
})

export default connect(mapStateToProps, {getProduct, updateProduct, getCategories})(EditProducts);
