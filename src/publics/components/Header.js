import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, ScrollView, Picker } from 'react-native';
import { Button } from 'native-base';

const Header = props => {
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState('updated_at');
	const [sort, setSort] = useState('desc');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);

	return(
		<View>
			<View>
				<Text>{props.title}</Text>
			</View>
			<View style={{padding: 10}}>
				<TextInput
					placeholder='Search Products...'
					style={styles.search}
					value={search} 
					onChangeText={value => {
						setSearch(value);
						props.search(value);
					}}
				/>
			</View>
			<ScrollView horizontal={true}>
			<View style={{flexDirection: 'row', height: 50}}>
				<View>
					<Picker
					  style={{height: 50, width: 100}}
					  selectedValue={sortBy}
					  onValueChange={value => {
					  	setSortBy(value);
					  	props.sortBy(value)
					  }}
					>
					  <Picker.Item label="Name" value="name" />
					  <Picker.Item label="Category" value="id_category" />
					  <Picker.Item label="Quantity" value="quantity" />
					  <Picker.Item label="Date" value="updated_at" />
					</Picker>
				</View>
				<View>
					<Picker
					  style={{height: 50, width: 100}}
					  selectedValue={sort}
					  onValueChange={value => {
					  	setSort(value);
					  	props.sort(value)
					  }}
					>
					  <Picker.Item label="ASC" value="asc" />
					  <Picker.Item label="DESC" value="desc" />
					</Picker>
				</View>
				<View>
					<Picker
					  style={{height: 50, width: 100}}
					  selectedValue={limit}
					  onValueChange={value => {
					  	setLimit(value);
					  	props.limit(value)
					  }}
					>
					  <Picker.Item label="6" value="6" />
					  <Picker.Item label="9" value="9" />
					  <Picker.Item label="12" value="12" />
					  <Picker.Item label="15" value="15" />
					</Picker>
				</View>
				<View>
					<Picker
					  style={{height: 50, width: 100}}
					  selectedValue={page}
					  onValueChange={value => {
					  	setPage(value);
					  	props.page(page)
					  }}
					>
					  <Picker.Item label="1" value="1" />
					  <Picker.Item label="2" value="2" />
					</Picker>
				</View>
			</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	search: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,

		height: 40,
		padding: 5,
		paddingLeft: 20,
		borderRadius: 3,
	},
})

export default Header;