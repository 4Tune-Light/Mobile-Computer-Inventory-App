import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../publics/redux/actions/userActions';

import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'native-base';

const ProfileScreen = props => {
	const logout = async () => {
		AsyncStorage.clear();
		await props.logoutUser();
		props.navigation.navigate('LoginScreen');
	}
	return(
		<View>
			<Button onPress={logout}><Text>LogOUT</Text></Button>
		</View>
	)
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, {logoutUser})(ProfileScreen);