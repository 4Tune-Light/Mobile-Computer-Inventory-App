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

	const defaultImage = 'https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png';

	return(
		<Card style={{borderRadius: 3}}>
			<CardItem>
				<View style={{flex: 2}}>
					<TouchableOpacity onPress={props.goTo.bind(this, product.id)}>
						<Image source={{uri: image}} onError={() => setImage(defaultImage)} style={styles.image} resizeMode='contain' />
					</TouchableOpacity>
				</View>
				<View style={styles.title}>
					<View>
						<TouchableOpacity onPress={props.goTo.bind(this, product.id)}>
							<Text style={styles.titleText}>{product.name}</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Text>Category: {product.category}</Text>
					</View>
					<View style={{flexDirection: 'row', alignItems: 'baseline'}}>
						<Text style={{marginRight: 5}}>Stocks: </Text>
						<Button style={styles.button} onPress={addOrReduce.bind(this, 'reduce')} info><Text style={styles.buttonText}>{'<'}</Text></Button>
						<Text>{quantity}</Text>
						<Button style={styles.button} onPress={addOrReduce.bind(this, 'add')} info><Text style={styles.buttonText}>{'>'}</Text></Button>
					</View>
				</View>
			</CardItem>
		</Card>
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

export default ProductsItem;