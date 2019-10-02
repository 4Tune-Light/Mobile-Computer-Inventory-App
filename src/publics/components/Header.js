import React, { useState, useRef } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, Picker } from 'react-native';
import { Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';

import { EvilIcons } from '@expo/vector-icons'


const Header = props => {
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState('none');
	const [sort, setSort] = useState('desc');
	const [page, setPage] = useState('');
	const [limit, setLimit] = useState('none');

	const delayedSearch = useRef(_.debounce(value => props.search(value), 1000)).current

	return(
		<View>
		<LinearGradient
        colors={props.gradientColor}
        style={{paddingTop: 50 }}
    >
			<View>
				<Text style={{paddingLeft: 10, fontSize: 24, fontWeight: 'bold', color: '#FAFAFA'}}>{props.title}</Text>
			</View>
			{ props.showSearch === true ?
			<View style={styles.searchWrap}>
				<TextInput
					placeholder={props.placeholder}
					style={styles.search}
					value={search} 
					onChangeText={value => {
						setSearch(value);
						delayedSearch(value);
					}}
				/>
				<EvilIcons style={{paddingRight: 10}} name='search' size={25} color='#444' />
			</View> : <Text></Text>
			}
			{ props.showQuery === true ? 
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
			<View style={{flexDirection: 'row', height: 70, paddingVertical: 10, paddingHorizontal: 15}}>
				<View style={{width: 135, height: 50, marginRight: 15, borderRadius: 25, backgroundColor: 'rgba(225, 225, 225, 0.2)', paddingLeft: 10}}>
					<Picker
					  style={{height: 50, width: 130, color: 'white'}}
					  selectedValue={sortBy}
					  onValueChange={value => {
					  	if (value !== 'none') {
					  		setSortBy(value);
					  		props.sortBy(value)
					  	}
					  }}
					>
						<Picker.Item label="Sort" value="none" />
					  <Picker.Item label="Name" value="name" />
					  <Picker.Item label="Category" value="id_category" />
					  <Picker.Item label="Quantity" value="quantity" />
					  <Picker.Item label="Date" value="updated_at" />
					</Picker>
				</View>
				<View style={{width: 155, height: 50, marginRight: 15, borderRadius: 25, backgroundColor: 'rgba(225, 225, 225, 0.2)', paddingLeft: 10}}>
					<Picker
					  style={{height: 50, width: 150, color: 'white'}}
					  selectedValue={sort}
					  onValueChange={value => {
					  	setSort(value);
					  	props.sort(value)
					  }}
					>
					  <Picker.Item label="Ascending" value="asc" />
					  <Picker.Item label="Descending" value="desc" />
					</Picker>
				</View>
				<View style={{width: 105, height: 50, marginRight: 15, borderRadius: 25, backgroundColor: 'rgba(225, 225, 225, 0.2)', paddingLeft: 10}}>
					<Picker
					  style={{height: 50, width: 100, color: 'white'}}
					  selectedValue={limit}
					  onValueChange={value => {
					  	if (value !== 'none') {
					  		setLimit(value);
					  		props.limit(value)
					  	}
					  }}
					>
						<Picker.Item label="Limit" value="none" />
					  <Picker.Item label="6" value="6" />
					  <Picker.Item label="9" value="9" />
					  <Picker.Item label="12" value="12" />
					  <Picker.Item label="15" value="15" />
					</Picker>
				</View>
				<View style={{width: 105, height: 50, borderRadius: 25, backgroundColor: 'rgba(225, 225, 225, 0.2)', paddingLeft: 10}}>
					<Picker
					  style={{height: 50, width: 100, color: 'white'}}
					  selectedValue={page}
					  onValueChange={value => {
					  	if (value !== 'none') {
					  		setPage(value);
					  		props.page(value)
					  	}
					  }}
					>
					{
						props.pageNum.length > 0 ?
						props.pageNum.map(item => {
							return <Picker.Item label={item.label} value={item.value} key={parseInt(item.value)} />
						}) : null
					}
					</Picker>
				</View>
			</View>
			</ScrollView> : null
		}
		</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	searchWrap: {
		shadowColor: "black",
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowOpacity: 0.7,
		shadowRadius: 1.5,

		elevation: 7,

		backgroundColor: 'white',
		borderRadius: 3,
		margin: 10,

		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	search: {
		flex: 1,
		height: 35,
		padding: 5,
		paddingLeft: 20,
		borderRadius: 3,
		backgroundColor: 'transparent',

		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		paddingRight: 0,
		color: '#444',
	},
})

export default Header;