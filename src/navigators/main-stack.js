import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import NotificationScreen from '../screens/notification/notification';
import AccountScreen from '../screens/account/account';
import React from 'react';
import TabBar from './tab-bar';

const Main = createBottomTabNavigator();

const MainStack = () => {
    return (
        <Main.Navigator 
            tabBar = {props => <TabBar {...props}/>}
            initialRouteName="Home"
            screenOptions={{
              animationEnabled: false
            }}
            headerMode='none'
        >
            <Main.Screen name="Home" component={HomeScreen} /> 
            <Main.Screen name="Account" component={AccountScreen} /> 
        </Main.Navigator>
    )
}

export default MainStack;