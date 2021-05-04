import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../helpers/size.helper';
import {appColor} from '../constants/app.constant';

export default class Header extends Component {
    render() {
        const {left, right} = this.props;
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>{this.props.title}</Text>
                <View style = {styles.left}>{left}</View>
                <View style = {styles.right}>{right}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColor.primary,
        height: sizeHeight(100),
        width: "100%",
        borderBottomLeftRadius: sizeHeight(25),
        borderBottomRightRadius: sizeHeight(25),
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: sizeHeight(20)
    },
    title: {
        color: 'white',
        fontSize: sizeFont(21),
        fontWeight: 'bold',
    },
    left: {
        position: 'absolute',
        top: sizeHeight(45),
        left: sizeWidth(15),
    },
    right: {
        position: 'absolute',
        top: sizeHeight(45),
        right: sizeWidth(15),
    }
})