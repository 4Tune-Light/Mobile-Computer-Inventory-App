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

import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

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
    Products: {
      screen: ProductsStack,
      navigationOptions : {
        tabBarLabel:'Products',
        tabBarIcon: () => (
          <MaterialIcons name="computer" size={32} color="#696969" />
        )
      }
    },
    Categories: {
      screen: CategoriesScreen,
      navigationOptions : {
        tabBarLabel:'Categories',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="library-books" size={28} color="#696969" />
        )
      }
    },
    Logout: {
      screen: ProfileScreen,
      navigationOptions : {
        tabBarVisible: false,
        tabBarLabel:'Logout',
        tabBarIcon: () => (
          <AntDesign name="logout" size={25} color="#696969" />
        ),
      },

    },
  },
  {
    initialRouteName: 'Products',
    tabBarOptions: {
      activeTintColor: '#46A4D3'
    }
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

axios.defaults.baseURL = 'http://192.168.43.114:7000';

const App = props => {
	return(
		<Provider store={store}>
      <Navigation />
		</Provider>
	)
}

export default App;
