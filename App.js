import React from 'react';
import axios from 'axios';

import { 
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Provider } from 'react-redux';
import store from './src/publics/redux/store';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import LoadingScreen from './src/screens/auth/LoadingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

import ProductsScreen from './src/screens/Products';
import SingleProducts from './src/components/product/SingleProducts';
import CreateProducts from './src/components/product/CreateProducts';
import EditProducts from './src/components/product/EditProducts';

import CategoriesScreen from './src/screens/Categories';

import ProfileScreen from './src/screens/Profile';



const ProductsStack = createStackNavigator(
  {
    Products: {
      screen: ProductsScreen,
      navigationOptions: {
        header: null,
      },
    },
    SingleProducts,
    CreateProducts,
    EditProducts,
  },
  {
    initialRouteName: 'Products',
  }
);

const MainNavigator = createBottomTabNavigator(
  {
    Products: ProductsStack,
    Categories: CategoriesScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Products',

  }
);

const AuthNavigator = createSwitchNavigator(
  {
    LoadingScreen,
    LoginScreen,
    RegisterScreen,
    App: MainNavigator,
  },
  {
    initialRouteName: 'LoadingScreen',
  }
)


const Navigation = createAppContainer(AuthNavigator);

axios.defaults.baseURL = 'http://192.168.1.16:7000';

const App = props => {
	return(
		<Provider store={store}>
      <Navigation />
		</Provider>
	)
}

export default App;
