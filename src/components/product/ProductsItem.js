import React, { useState } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { CardItem, Card, Button } from 'native-base';


const ProductsItem = props => {
	const { product } = props;

	const [quantity, setQuantity] = useState(product.quantity);
	const [image, setImage] = useState(product.image);

	const addOrReduce = action => {
		if (action === 'add') {
			props.addOrReduce(product.id, action)
			setQuantity(quantity+1);
		} else {
			props.addOrReduce(product.id, action)
			setQuantity(quantity-1);
		}
	}

	const defaultImage = 'https://user-images.githubusercontent.com/52448426/65372270-92b75d00-dc22-11e9-8fcd-1b0e55ae4043.png';

	return(
		<Card style={{borderRadius: 3}}>
			<CardItem>
				<View style={{flex: 2}}>
					<TouchableOpacity onPress={props.goTo.bind(this, product.id)}>
						<Image source={{ uri: image }} onError={() => setImage(defaultImage)} style={styles.image} resizeMode='contain' />
					</TouchableOpacity>
				</View>
				<View style={styles.title}>
					<View>
						<TouchableOpacity onPress={props.goTo.bind(this, product.id)}>
							<Text style={styles.titleText}>{product.name.length > 15 ? product.name.substr(0,15)+'...' : product.name}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Text style={{color: '#444'}} >Category: {product.category}</Text>
					</View>
					<View style={{flexDirection: 'row', alignItems: 'baseline'}}>
						<Text style={{marginRight: 5, color: '#444'}}>Stocks: </Text>
						<Button style={styles.button} onPress={addOrReduce.bind(this, 'reduce')} info><Text style={styles.buttonText}>{'<'}</Text></Button>
						<Text style={{color: '#444'}} >{quantity}</Text>
						<Button style={styles.button} onPress={addOrReduce.bind(this, 'add')} info><Text style={styles.buttonText}>{'>'}</Text></Button>
					</View>
				</View>
			</CardItem>
		</Card>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 100, 
		width: 100,
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
		color: '#444'
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

export default ProductsItem;