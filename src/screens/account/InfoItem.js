import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../helpers/size.helper';

export default class InfoItem extends Component {
    render() {
        const {title, content} = this.props
        return (
            <View style = {styles.container}>    
                <Text style = {styles.title}>{title}</Text>
                <Text style = {styles.text}>{content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: sizeHeight(12),
        paddingVertical: sizeHeight(6),
        justifyContent: 'center',
        paddingLeft: sizeWidth(10),
        marginBottom: sizeHeight(10),
    },
    title: {
        color: appColor.primary,
        fontWeight: 'bold',
        fontSize: sizeFont(16),
        marginBottom: sizeHeight(5)
    },
    text: {
        color: appColor.text,
        fontSize: sizeFont(16)
    }
})