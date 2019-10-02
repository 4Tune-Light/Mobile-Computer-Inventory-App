import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView,
				 AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


import { loginUser, logoutUser } from '../../publics/redux/actions/userActions';

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		if (!email) {
			alert('Please enter your email');
		} else if (!password) {
			alert('Please enter your password')
		} else {
			const data = { email, password }
			props.loginUser(data);
		}
		
	}

	useEffect(() => {
		if (props.user.isRejected === true){
			alert(props.user.errMessage);
			props.logoutUser();
		}
	}, [props.user.isRejected])

	useEffect(() => {
		if ( props.user.isLogged === true ) {
			const {token, username, email} = props.user;
			AsyncStorage.setItem('token', token);
			AsyncStorage.setItem('username', username);
			AsyncStorage.setItem('email', email);
			props.navigation.navigate('App');
		}
	}, [props.user.isLogged])

	const image = 'https://png.pngtree.com/svg/20161229/_username_login_1172579.png';


	return(
		<KeyboardAvoidingView behavior='height' style={{flex: 1}} >
		<LinearGradient
        colors={['#147ED3', '#46A4D3']}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, padding: 10, paddingTop: 75, justifyContent: 'center'}}
        start={[0.0, 0.0]}
        end={[1, 1]}
    >
    	<View>
        <Form>
        	<View style={{alignItems: 'center'}}>
        		<Text style={{fontWeight: 'bold', color: 'white', fontSize: 23}}>COMPUTER INVENTORY APP</Text>
        	</View>
        	<View style={{padding: 20, paddingTop: 0, alignItems: 'center'}}>
	          <Item style={{marginLeft: 0}} floatingLabel>
	            <Label style={{color: 'rgba(255, 255, 255, 0.8)'}}>Email</Label>
	            <Input style={{color: 'white'}} value={email} onChangeText={value => setEmail(value)}/>
	          </Item>

	          <Item style={{marginLeft: 0}} floatingLabel>
	            <Label style={{color: 'rgba(255, 255, 255, 0.8)'}}>Password</Label>
	            <Input style={{color: 'white'}} value={password} secureTextEntry={true} onChangeText={value => setPassword(value)}/>
	          </Item>

		        <View style={{marginTop: 40, alignItems: 'center'}}>
			        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}} onPress={login} >
			        {
			        	props.user.isLoading === false ?
			        		<Text style={{fontSize: 20, color: '#46A4D3'}}>SIGN IN</Text>
			        	:
			        		<ActivityIndicator size='large' color='#46A4D3' />
			        }
			        </Button>
			        <TouchableOpacity onPress={() => {
			        		props.logoutUser();
			        		props.navigation.navigate('RegisterScreen');
			        	}
			      	} >
			        	<Text style={{color: 'rgba(255, 255, 255, 0.9)', marginTop: 25}}>Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign Up!</Text></Text>
			      	</TouchableOpacity>
			      </View>
			     </View>
        </Form>
    	</View>
    </LinearGradient>
    </KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	
})

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps, {loginUser, logoutUser})(LoginScreen);