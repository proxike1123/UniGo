import React, {Component} from 'react';
import {Modal, View, StyleSheet, StatusBar, ActivityIndicator, Text} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';

export default class LoginModal extends Component {
    render () {
        return(
            <Modal
                visible = {this.props.visible}
                transparent
            >
                <View style = {styles.container}>
                    <StatusBar
                        translucent 
                        backgroundColor = 'rgba(0, 0, 0, 0.5)'
                    />
                    <View style = {styles.loadingContainer}>
                        <ActivityIndicator size="large" color = {appColor.primary}/>
                        <Text style = {styles.text}>Đăng nhập ...</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: 'white',
        width: sizeWidth(130),
        height: sizeWidth(130),
        elevation: 6,
        borderRadius: sizeWidth(10),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: sizeHeight(25)
    },
    text: {
        marginTop: sizeHeight(10),
        color: appColor.text
    }
})