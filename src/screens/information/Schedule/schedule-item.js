import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../../helpers/size.helper';

export default class ScheduleItem extends Component {
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
                    <Text style = {styles.title}>Giáo viên </Text>
                    <Text style = {styles.content}>{item.teacher}</Text>
                </View>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Số tín chỉ </Text>
                    <Text style = {[styles.content]}>{item.credit}</Text>
                </View>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Tuần học </Text>
                    <Text style = {styles.content}>{item.study_weeks}</Text>
                </View>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Lịch học </Text>
                    <Text style = {[styles.content, {marginRight: sizeWidth(35), color: 'red'}]}>{item.weekly_schedule.raw}</Text>
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
    }
})