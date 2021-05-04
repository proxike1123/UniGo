import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../../helpers/size.helper';

export default class ExamItem extends Component {
    render () {
        const {item} = this.props;
        return (
            <View style = {styles.container}>
                <Text style = {styles.name}>{item.course_name}</Text>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Mã học phần </Text>
                    <Text style = {styles.content}>{item.course_code}</Text>
                </View>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Nhóm thi </Text>
                    <Text style = {[styles.content, {marginRight: sizeWidth(63), color: 'red'}]}>{item.test_group}</Text>
                    <Text style = {styles.title}>Thi chung </Text>
                    <Text style = {[styles.content, {color: 'red'}]}>{item.test_grouping}</Text>
                </View>
                {
                    item.test_schedule != "" && item.test_schedule ?
                    <View style = {styles.row}>
                        <Text style = {[styles.content, {color: 'green', marginRight: sizeWidth(20)}]}>{item.test_schedule}</Text>
                    </View> : null
                }
                <View style = {styles.row}>

                </View>
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
    name: {
        color: appColor.primary,
        fontWeight: 'bold',
        fontSize: sizeFont(17),
        marginBottom: sizeHeight(2),
    },
    content: {
        color: appColor.text,
        fontSize: sizeFont(15),
        textAlign: 'left',
    },
    date: {
        color: "red",
        fontSize: sizeFont(15),
        textAlign: 'right',
    },
    title: {
        fontWeight: 'bold',
        fontSize: sizeFont(15),
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: sizeHeight(3)
    },
    type: {
        paddingVertical: sizeHeight(2),
        fontSize: sizeFont(14),
        color: 'green',
        fontWeight: 'bold',
    }
})