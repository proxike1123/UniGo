import React, { Component } from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../helpers/size.helper';

export default class BackButton extends Component{
    render () {
        return(
            <TouchableOpacity
                onPress = {this.props.onPress}
                style = {styles.btn}
            >
                <Image
                    source = {require('../assets/images/back.png')}
                    style = {styles.img}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        tintColor: 'white',
        width: sizeWidth(25),
        height: sizeWidth(25),
    },
    btn: {
        padding: sizeWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
    }
})