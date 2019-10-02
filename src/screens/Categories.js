import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { NavigationEvents } from 'react-navigation';

import { View, Text, AsyncStorage, StyleSheet, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { Container, Content, Button} from 'native-base';


import { getCategories, createCategory, editCategory, deleteCategory } from '../publics/redux/actions/categoryActions';

import CategoriesItem from '../components/category/CategoriesItem';
import CreateCategory from '../components/category/CreateCategory';

import AddButton from '../publics/components/AddButton';
import Header from '../publics/components/Header';

const CategoriesScreen = props => {
	const [token, setToken] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	AsyncStorage.getItem('token').then(value => setToken(value))
	AsyncStorage.getItem('username').then(value => setUsername(value))
	AsyncStorage.getItem('email').then(value => setEmail(value))

	const [isCreated, setIsCreated] = useState(false);
	const [isEdited, setIsEdited] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [visible, setVisible] = useState(false);

	const [search, setSearch] = useState('%%');


	const changeVisible = () => {
		setVisible(!visible);
	}  

	const createCategory = name => {
		const data = {name};
		const user = {
			token, username, email
		}

		props.createCategory(data, user);
		setIsCreated(true);
	}

	const editCategory = (id , name) => {
		const data = {name};
		const user = {
			token, username, email
		}

		props.editCategory(id, data, user);
		setIsEdited(true);
	}

	const deleteCategory = id => {
		const user = {
			token, username, email
		}

		props.deleteCategory(id, user);
		setIsDeleted(true);
	}

	const getCategories = search => {
		props.getCategories(search);
	}

	useEffect(() => {
		getCategories(search);
	}, [search])

	useEffect(() => {
		if (isCreated === true) {
			getCategories(search);
			setIsCreated(false)
		} else if (isEdited === true) {
			getCategories(search);
			setIsEdited(false)
		} else if (isDeleted === true) {
			getCategories(search);
			setIsDeleted(false)
		}
	}, [isCreated, isEdited, isDeleted])

	const {isRejected, isFulfilled, categories} = props.category;
	const title = 'CATEGORIES';
	const gradientColor = ['#147ED3', '#46A4D3'];
	const placeholder = 'Search Categories...';
	const color = '#46A4D3'

	return(
		<Container style={{backgroundColor: '#F6F6F6'}}>
		<NavigationEvents
			onDidFocus={() => getCategories(search)}
		/>
			{
				visible === true ? <CreateCategory visible={true} createCategory={createCategory} setVisible={changeVisible}/> 
				: <CreateCategory visible={false} createCategory={createCategory} setVisible={changeVisible}/>
			}
			<Header title={title} showQuery={false} showSearch={true} gradientColor={gradientColor} placeholder={placeholder} search={setSearch} />
			<Content style={{padding: 10}}>
				<View>
			{
				isRejected === true ?
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 50}}>Categories Not Found</Text>
					</View>
				:

				(isFulfilled === true && categories.length > 0) ?
					<FlatList
		        data={categories}
		        renderItem={({item}) => <CategoriesItem category={item} editCategory={editCategory} deleteCategory={deleteCategory}/>}
		        keyExtractor={item => item.id.toString()}
		        style={{flexDirection: 'column'}}
		        numColumns={2}
		        columnWrapperStyle={{justifyContent:'space-between'}}
		      />
				:
					<View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size='large' color={color} /></View>	
			}
				</View>
			</Content>
			<AddButton addButton={changeVisible} buttonColor={color} />
		</Container>
	)
}

const styles = StyleSheet.create({
	search: {
		flex: 3,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,

		height: 30,
		padding: 5,
		paddingLeft: 20,
		borderRadius: 3,
	},
})

const mapStateToProps = state => ({
	category: state.category,
	user: state.user
})

export default connect(mapStateToProps, {getCategories, createCategory, editCategory, deleteCategory})(CategoriesScreen);