import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { CardItem, Card, Button } from 'native-base';

import { getProduct, deleteProduct } from '../../publics/redux/actions/productActions';

const SingleProducts = props => {
	const id = props.navigation.getParam('id');

	const [image, setImage] = useState('');
	const [isDone, setIsDone] = useState(false);

	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	AsyncStorage.getItem('token').then(value => setToken(value))
	AsyncStorage.getItem('username').then(value => setUsername(value))
	AsyncStorage.getItem('email').then(value => setEmail(value))

	const editProduct = () => {
		props.navigation.navigate('EditProducts', {id})
	}

	const deleteProduct = () => {
		const user = {
			token, username, email
		}

		props.deleteProduct(id, user);
		props.navigation.goBack();
	}

	const getProduct = () => {
		props.getProduct(id);
	}

	useEffect(() => {
		if (props.product.isFulfilled === true) {
			setImage(props.product.products.image)
		}
	}, [props.product.isFulfilled])

	const defaultImage = 'https://user-images.githubusercontent.com/52448426/65372270-92b75d00-dc22-11e9-8fcd-1b0e55ae4043.png';

	var { products } = props.product;
	return(
		<ScrollView>
		<View style={{padding: 15}}>
		<NavigationEvents
			onDidFocus={() => getProduct()}
		/>
			<View>
				<View style={{alignItems: 'center'}}>
					<Image source={{uri: image}} onError={() => setImage(defaultImage)} style={{width: 250, height: 250}} resizeMode='contain' />
				</View>
			</View>
			<View>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.title}>{products.name}</Text>
				</View>
				<View>
					<Text style={styles.text}>Category: {products.category}</Text>
					<Text style={styles.text}>Stocks: {products.quantity}</Text>
					<Text style={styles.text}>Description: </Text>
					<Text style={styles.text}>{products.description}</Text>
				</View>

				<View style={{margin: 15, marginTop: 30, flexDirection: 'row', justifyContent: 'center'}}>
	        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center', marginRight: 15}} onPress={editProduct} primary>
	        	<Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
	        </Button>
	        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={deleteProduct} danger>
	        	<Text style={{fontSize: 20, color: 'white'}}>Delete</Text>
	        </Button>
	      </View>


			</View>
		</View>
		</ScrollView>
	)
}

SingleProducts.navigationOptions = {
  title: 'Product Details',
};

const styles = StyleSheet.create({
	title: {
		paddingBottom: 10, 
		fontSize: 24, 
		fontWeight: 'bold',
	},
	
	text: {
		paddingBottom: 5, 
		fontSize: 16,
	}
})


const mapStateToProps = state => ({
	product: state.product,
})

export default connect(mapStateToProps, {getProduct, deleteProduct})(SingleProducts);