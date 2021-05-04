import React, { Component } from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import App from './app-stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

class AppContainer extends Component {
    render() {
        return(
            <Provider store = {store}>
                <PersistGate loading = {null} persistor = {persistor}>
                    <View style = {styles.container}>
                        <StatusBar translucent backgroundColor = "transparent"/>
                        <App/>
                    </View>
                </PersistGate>
            </Provider>
        )
    }
}

export default AppContainer;

const styles = StyleSheet.create({
    container: {
        flex : 1,
    }
})