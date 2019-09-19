import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Button } from 'native-base';

import { getProduct, updateProduct } from '../../publics/redux/actions/productActions';
import { getCategories } from '../../publics/redux/actions/categoryActions';

const EditProducts = props => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [idCategory, setIdCategory] = useState(null);
	const [quantity, setQuantity] = useState(0);
	const [description, setDescription] = useState('');

	const id = props.navigation.getParam('id');

	const getDatas = async () => {
		await props.getProduct(id);
		await props.getCategories();

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
		const data = {
			name, image, id_category: idCategory, quantity, description
		}

		props.updateProduct(id, data);
		props.navigation.goBack();
	}

	const {isLoading, categories} = props.category

	return(
		<KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled>
		<Container>
      <Content>
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
            	(!isLoading && categories.length > 0) ? categories.map((category, i) => {
									return <Picker.Item label={category.name} value={category.id} key={i} />
								}) 
							: <Picker.Item label='Select Category' value='' />
						}
            </Picker>
          </Item>

          <Item floatingLabel>
	          <Label>Quantity</Label>
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
		        	<Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
		        </Button>
		      </View>

        </Form>
        
      </Content>
    </Container>
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
