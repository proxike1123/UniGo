import LoginScreen from '../screens/login/login';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Auth = createStackNavigator();

const AuthStack = () => {
    return (
        <Auth.Navigator 
            initialRouteName="Login"
            screenOptions={{
              animationEnabled: false
            }}
            headerMode='none'
        >
            <Auth.Screen name="Login" component={LoginScreen} /> 
        </Auth.Navigator>
    )
} 

export default AuthStack;