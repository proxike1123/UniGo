import React, { Component } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';

export default class HomeItem extends Component {
    render() {
        const {icon, title, onPress} = this.props;
        return (
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <Image
                    source = {icon}
                    style = {styles.image}
                    resizeMode = 'contain'
                />
                <Text style = {styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 6,
        height: sizeWidth(160),
        width: sizeWidth(160),
        borderRadius: sizeHeight(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: sizeWidth(90),
        width: sizeWidth(90),
        tintColor: appColor.primary,
        marginBottom: sizeHeight(8)
    },
    text: {
        fontSize: sizeFont(17),
        fontWeight: 'bold'
    }
})