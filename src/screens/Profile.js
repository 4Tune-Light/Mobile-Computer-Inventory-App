import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../publics/redux/actions/userActions';
import { NavigationEvents } from 'react-navigation';

import { FontAwesome } from '@expo/vector-icons'

import Header from '../publics/components/Header';

import { View, Text, Image, AsyncStorage, Alert } from 'react-native';
import { Button, Container, Content, Card, CardItem } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


const ProfileScreen = props => {
	const logout = () => {
		AsyncStorage.clear();
		props.logoutUser();
		props.navigation.navigate('LoginScreen');
	}


	const alert = () => {
		Alert.alert(
		  'Logout',
		  'Are you sure want to logout?',
		  [
		    {text: 'Cancel', onPress: () => props.navigation.goBack()},
		    {text: 'Yes',onPress: () => logout()},
		  ],
		  {cancelable: false},
		)
	}

	return(
		<LinearGradient
        colors={['#147ED3', '#46A4D3']}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 10, paddingTop: 75, justifyContent: 'center'}}
        start={[0.0, 0.0]}
        end={[1, 1]}
    >
    	<NavigationEvents
				onDidFocus={() => alert()}
			/>
    </LinearGradient>
	)
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, {logoutUser})(ProfileScreen);