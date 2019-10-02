import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, ScrollView, Alert,
				 TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Button } from 'native-base';

import { createProduct } from '../../publics/redux/actions/productActions';
import { getCategories } from '../../publics/redux/actions/categoryActions';

const CreateProducts = props => {
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

	useEffect(() => {
		props.getCategories('');
	}, [])

	const createProduct = () => {
		if (!name || !image || !idCategory || !quantity || !description) {
			alert('All Fields Are Required')
		} else {
			const user = {
				token, username, email
			}

			const data = {
				name, image, id_category: idCategory, quantity, description
			}

			props.createProduct(data, user);

			Alert.alert(
			  'Success',
			  'Creating Product Success',
			  [
			    {text: 'OK', onPress: () => {
			    		
			    		props.navigation.goBack()
			    	}
			    },
			  ],
			  {cancelable: false},
			);
		}
	}

	const {isLoading, categories} = props.category

	return(
		<KeyboardAvoidingView behavior='height' keyboardVerticalOffset={100}>
		<ScrollView keyboardShouldPersistTaps='handled'>
			<View>
				<Form >
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
		        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={createProduct} success>
		        	{
		        		props.product.isLoading === false ?
		        			<Text style={{fontSize: 20, color: 'white'}}>Create</Text>
		        		:
		        			<ActivityIndicator size='large' color='white' />
		        	}
		        </Button>
		      </View>
		    </Form>
		  </View>
		</ScrollView>
    </KeyboardAvoidingView>
	)
}

CreateProducts.navigationOptions = {
  title: 'Create Product',
};

const styles = StyleSheet.create({
	
})


const mapStateToProps = state => ({
	product: state.product,
	category: state.category,
})

export default connect(mapStateToProps, {createProduct, getCategories})(CreateProducts);