import React, {Component} from 'react';
import AuthStack from './navigators/auth-stack';
import MainStack from './navigators/main-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import {CommonInfo, Exam, Schedule, Score, SummaryResult} from './screens/information';
import NotificationScreen from './screens/notification/notification';
import AdminScreen from './screens/admin/admin';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const RootStack = createStackNavigator();

class App extends Component{
    render() {
        return( 
            <NavigationContainer>
                <RootStack.Navigator 
                    headerMode="none"
                >
                    <RootStack.Screen name = 'Auth' component={AuthStack}/>
                    <RootStack.Screen name = 'Main' component={MainStack}/>  
                    <RootStack.Screen name = "Common" component={CommonInfo}/>
                    <RootStack.Screen name = "Exam" component={Exam}/>
                    <RootStack.Screen name = "Schedule" component={Schedule}/>
                    <RootStack.Screen name = "Score" component={Score}/>
                    <RootStack.Screen name = "Notification" component={NotificationScreen}/>
                    <RootStack.Screen name = "Summary" component={SummaryResult}/>
                    <RootStack.Screen name = "Admin" component={AdminScreen}/>
                </RootStack.Navigator>
            </NavigationContainer>  
        );
    }
}

export default App;