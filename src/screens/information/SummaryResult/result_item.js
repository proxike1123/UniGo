import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../../helpers/size.helper';

export default class ResultItem extends Component {
    render () {
        const {item} = this.props;
        return (
            <View style = {styles.container}>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.name}>Học kì/Năm học</Text>
                    <Text style = {[styles.name, {color: "red"}]}>{item.semester}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>TC đăng ký </Text>
                    <Text style = {styles.content}> {item.registered_credit}</Text>
                    <Text style = {[styles.title, {marginLeft: sizeWidth(40),}]}>TC Học lại </Text>
                    <Text style = {[styles.content, {color: 'red'}]}> {item.relearn_credit ? item.relearn_credit : 0}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Điểm TBC T4 </Text>
                    <Text style = {[styles.content, {marginRight: sizeWidth(40)}]}>{item.avg_b4}</Text>
                    <Text style = {styles.title}>Điểm TBC T104 </Text>
                    <Text style = {[styles.content]}>{item.avg_b10}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Điểm TBC học bổng </Text>
                    <Text style = {[styles.content, {marginRight: sizeWidth(20)}]}>{item.avg_scholar}</Text>
                    <Text style = {styles.title}>Điểm rèn luyện </Text>
                    <Text style = {[styles.content]}>{item.moral_points}</Text>
                </View>
                <View style = {{
                    height: sizeWidth(1),
                    backgroundColor: "#E7E7E7",
                    marginVertical: sizeHeight(10)
                }}/>
                <View style = {[styles.row, {marginTop: 0, justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Số TC tích lũy </Text>
                    <Text style = {[styles.content,]}>{item.saved_credits}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Điểm TBC tích lũy T4 </Text>
                    <Text style = {[styles.content]}>{item.avg_saved_credit_b4}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Điểm TBRL các kỳ </Text>
                    <Text style = {[styles.content]}>{item.avg_moral}</Text>
                </View>
                <View style = {[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style = {styles.title}>Bị cảnh báo KQHT </Text>
                    <Text style = {[styles.content, { color: 'red'}]}>{item.warnings != "" ? item.warnings : "Không" }</Text>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: sizeHeight(6)}}>
                    <Text style = {[styles.title, {color: appColor.primary}]}>Xếp loại học tập</Text>
                    <Text style = {{
                        color: 'green',
                        borderRadius: sizeWidth(4),
                        borderColor: 'green',
                        borderWidth: sizeWidth(1),
                        padding: sizeWidth(4),
                        alignSelf: 'flex-end',
                    }}>{item.study_classify != "" ? item.study_classify : "Chưa có"}</Text>
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
        color: appColor.primary,
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