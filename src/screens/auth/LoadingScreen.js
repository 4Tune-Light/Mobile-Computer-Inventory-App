import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';

const LoadingScreen = props => {

	useEffect(() => {
		AsyncStorage.getItem('token')
			.then(value => {
				if (value.length > 0) {
					props.navigation.navigate('App');
				}
			})
			.catch(() => props.navigation.navigate('LoginScreen'))
	}, [])

	return(
		<View>
			<Text>Loading Screennya Voss</Text>
		</View>
	)
}

export default LoadingScreen;