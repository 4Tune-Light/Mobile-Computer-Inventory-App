import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { NavigationEvents } from 'react-navigation';

import { getProducts, deleteProduct, addOrReduce } from '../publics/redux/actions/productActions';

import { View, Text, AsyncStorage, ActivityIndicator, FlatList, Button, ScrollView } from 'react-native';
import { Container, Content} from 'native-base';

import ProductsItem from '../components/product/ProductsItem';

import AddButton from '../publics/components/AddButton';
import Header from '../publics/components/Header';

const ProductsScreen = props => {
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState('updated_at');
	const [sort, setSort] = useState('desc');
	const [page, setPage] = useState('1');
	const [limit, setLimit] = useState(8);
	const [pageNum, setPageNum] = useState([])

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
		const user = {
			token, username, email
		}
		
		props.addOrReduce(id, action, user);
	} 

	const pageNumber = () => {
		var data = [
			{label: 'Page', value: 'none'}
		];

		const counter =  Math.ceil(props.product.total / limit);

		if (parseInt(page) !== 1) {
			if (parseInt(page) > counter) {
				setPage(1);
			}
		}

		for (let i = 1; i <= counter; i++) {
			const item = {
				label: ''+i,
				value: ''+i,
			}
			data.push(item);
		}
		return data
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
		setPageNum(pageNumber());
	}

	useEffect(() => {
		if (props.product.isFulfilled === true) {
			setPageNum(pageNumber());
		}
	}, [props.product.isFulfilled])

	useEffect(() => {
		getProducts();
	}, [search, sortBy, sort, page, limit])

	const {isRejected, isFulfilled, products} = props.product;
	const title = 'PRODUCTS';
	const gradientColor = ['#147ED3', '#46A4D3'];
	const placeholder = 'Search Products...';
	const color = '#46A4D3'

	return(
		
		<Container style={{backgroundColor: '#F6F6F6'}}>
		<NavigationEvents
			onDidFocus={() => getProducts()} />

			<Header title={title}
				showSearch={true} 
				showQuery={true} 
				gradientColor={gradientColor}
				placeholder={placeholder}
				search={setSearch}
				sortBy={setSortBy}
				sort={setSort}
				page={setPage}
				limit={setLimit}
				pageNum={pageNum}
			/>
			
			<Content style={{padding: 10}}>
			{
				(isRejected === true && products.length === 0) ?
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 20, fontWeight: 'bold', color: '#444', marginTop: 50}}>Products Not Found</Text>
					</View>
				:
			
			
				(isFulfilled === true && products.length > 0) ? 
					<FlatList
		        data={products}
		        renderItem={({item}) => <ProductsItem product={item} goTo={goTo} addOrReduce={addOrReduce}/>}
		        keyExtractor={item => item.id.toString()}
		      />
				:
					<ActivityIndicator size='large' color={color} />	
			}
			</Content>
			
			<AddButton addButton={addButton} buttonColor={color} />
		</Container>

	)
}

const mapStateToProps = state => ({
	product: state.product,
	user: state.user
})

export default connect(mapStateToProps, {getProducts, deleteProduct, addOrReduce})(ProductsScreen);