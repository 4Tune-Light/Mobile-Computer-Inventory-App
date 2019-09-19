import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import { loginUser } from '../../publics/redux/actions/userActions';

const LoginScreen = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		const data = { email, password }

		await props.loginUser(data);
	}

	useEffect(() => {
		if ( props.user.isLogged === true ) {
			const {token, username, email} = props.user;
			AsyncStorage.setItem('token', token);
			AsyncStorage.setItem('username', username);
			AsyncStorage.setItem('email', email);
			props.navigation.navigate('App');
		}
	}, [props.user.isLogged])

	return(
		<KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled>
		<Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={email} onChangeText={value => setEmail(value)}/>
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input value={password} onChangeText={value => setPassword(value)}/>
          </Item>

	        <View style={{margin: 15, marginTop: 30}}>
	        	<Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate('RegisterScreen')} success>
		        	<Text style={{fontSize: 20, color: 'white'}}>Register</Text>
		        </Button>
		        <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={login} primary>
		        	<Text style={{fontSize: 20, color: 'white'}}>Login</Text>
		        </Button>
		      </View>

        </Form>
        
      </Content>
    </Container>
    </KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	
})

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps, {loginUser})(LoginScreen);