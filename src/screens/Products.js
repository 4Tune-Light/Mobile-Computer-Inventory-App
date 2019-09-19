import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { NavigationEvents } from 'react-navigation';

import { getProducts, deleteProduct, addOrReduce } from '../publics/redux/actions/productActions';

import { View, Text, AsyncStorage } from 'react-native';
import { Container, Content, Fab, Button} from 'native-base';

import ProductsItem from '../components/product/ProductsItem';

import AddButton from '../publics/components/AddButton';
import Header from '../publics/components/Header';

const ProductsScreen = props => {
	const [search, setSearch] = useState('%%');
	const [sortBy, setSortBy] = useState('updated_at');
	const [sort, setSort] = useState('desc');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);

	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	AsyncStorage.getItem('token').then(value => setToken(value))
	AsyncStorage.getItem('username').then(value => setUsername(value))
	AsyncStorage.getItem('email').then(value => setEmail(value))

	const goTo = id => {
		props.navigation.navigate('SingleProducts', {id})
	}

	const addButton = () => {
		props.navigation.navigate('CreateProducts');
	}

	const addOrReduce = (id, action) => {
		props.addOrReduce(id, action);
	} 

	const getProducts = () => {
		const queryString = {
			search,
			sortBy,
			sort,
			page,
			limit
		}

		props.getProducts(queryString);
	}

	useEffect(() => {
		getProducts();
	}, [search, sortBy, sort, page, limit])

	const {isLoading, products} = props.product;
	const title = 'Products';

	return(
		<Container>
		<NavigationEvents
			onDidFocus={() => getProducts()}
		/>
			<Header title={title}
				search={setSearch}
				sortBy={setSortBy}
				sort={setSort}
				page={setPage}
				limit={setLimit}
			/>
			<Content style={{padding: 10}}>

			{
				(!isLoading && products.length > 0) ? products.map((product, i) => {
						return <ProductsItem product={product} goTo={goTo} addOrReduce={addOrReduce} key={product.id}/>
					}) 
				:
					<Text>Loading Gans</Text>	
			}
					
			</Content>
			<AddButton addButton={addButton}/>
		</Container>
	)
}

const mapStateToProps = state => ({
	product: state.product,
	user: state.user
})

export default connect(mapStateToProps, {getProducts, deleteProduct, addOrReduce})(ProductsScreen);