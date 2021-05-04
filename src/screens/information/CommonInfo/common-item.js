import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../../helpers/size.helper';

export default class CommonItem extends Component {
    render () {
        const {title, content} = this.props;
        const date =  title.slice(0,10);
        const newTitle = title.slice(16, title.length)
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>{newTitle}</Text>
                <Text style = {styles.content}>      {content}</Text>
                <Text style = {styles.date}>{date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: 'white',
        marginBottom: sizeHeight(10),
        paddingHorizontal: sizeWidth(20),
        paddingVertical: sizeHeight(10),
        borderRadius: sizeWidth(10),
        elevation: 3,
    },
    title: {
        color: appColor.primary,
        fontWeight: 'bold',
        fontSize: sizeFont(17),
        marginBottom: sizeHeight(5),
    },
    content: {
        color: appColor.text,
        fontSize: sizeFont(17),
        marginBottom: sizeHeight(5),
        textAlign: 'left',
    },
    date: {
        color: "red",
        fontSize: sizeFont(15),
        textAlign: 'right',
    }
})