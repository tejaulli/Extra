import React from 'react';
import {Text, Button} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from '../Components/LoginPage';
import ForgotPassword from '../Components/ForgotPassword';

const AuthStack = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false,
        title: 'Login screen',
        headerRight: () => <Text></Text>,
        headerLeft: () => <Text></Text>,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerShown: false,
        title: 'Forgot Password',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',

      cardStyle: {opacity: 1},
    },

    initialRouteName: 'LoginPage',
  },
);

export default AuthStack;
