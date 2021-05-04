import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { appColor } from '../../../constants/app.constant';
import { sizeFont, sizeHeight, sizeWidth } from '../../../helpers/size.helper';

export default class ScoreItem extends Component {
    render () {
        const {item} = this.props;
        return (
            <View style = {styles.container}>
                <Text style = {styles.name}>{item.course_name}</Text>
                <Text style = {styles.type}>(Kỳ {item.semester})</Text>
                <View style = {styles.row}>
                    <Text style = {styles.title}>Mã học phần </Text>
                    <Text style = {styles.content}>{item.course_code}</Text>
                </View>
                <View style = {[styles.row, {
                    borderBottomWidth: sizeHeight(1.5),
                    borderColor: "#EFF1F5",
                    paddingBottom: sizeHeight(5)
                }]}>
                    <Text style = {styles.title}>Số tính chỉ </Text>
                    <Text style = {styles.content}>{item.credit == "" ? "Chưa cập nhật" : item.credit}</Text>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <View>
                        <View style = {styles.row}>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>BT </Text>
                            <Text style = {[styles.content, styles.score]}>{item.BT == "" ? "-" : item.BT}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>BV </Text>
                            <Text style = {[styles.content, styles.score]}>{item.BV == "" ? "-" : item.BV}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>LT </Text>
                            <Text style = {[styles.content, styles.score]}>{item.LT == "" ? "-" : item.LT}</Text>
                        </View>
                        <View style = {styles.row}>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>GK </Text>
                            <Text style = {[styles.content, styles.score]}>{item.GK == "" ? "-" : item.GK}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>DA</Text>
                            <Text style = {[styles.content, styles.score]}>{item.DA == "" ? "-" : item.DA}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>TH </Text>
                            <Text style = {[styles.content, styles.score]}>{item.TH == "" ? "-" : item.TH}</Text>
                        </View>
                        <View style = {styles.row}>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>CK </Text>
                            <Text style = {[styles.content, styles.score]}>{item.CK == "" ? "-" : item.CK}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>T10 </Text>
                            <Text style = {[styles.content, styles.score, {color: 'green', fontWeight: "bold"}]}>{item.T10 == "" ? "-" : item.T10}</Text>
                            <Text style = {[styles.title, {width: sizeWidth(40)}]}>T4 </Text>
                            <Text style = {[styles.content, styles.score, {color: 'green', fontWeight: "bold"}]}>{item.T4 == "" ? "-" : item.T4}</Text>
                        </View>
                    </View>
                    <View style = {styles.rank}>
                        <Text style = {[styles.rankText,
                            item.as_text == "A+" || item.as_text == "A" || item.as_text == "I" || item.as_text == ""? styles.veryGood 
                            : item.as_text == "B+" || item.as_text == "B" ? styles.good
                            : item.as_text == "C+" || item.as_text == "C" ? styles.normal
                            : item.as_text == "D+" || item.as_text == "D" ? styles.bad
                            : styles.veryBad 
                        ]}>{item.as_text == "I" || item.as_text == "" ? "-" : item.as_text}</Text>
                    </View>
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
        textAlign: 'center',
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
    },
    score: {
        marginRight: sizeWidth(10), 
        color: 'red',
        width: sizeWidth(40)
    },
    rank: {
        width: sizeWidth(65),
        height: sizeWidth(65),
        borderWidth: sizeHeight(1.5),
        borderRadius:sizeHeight(50),
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop :sizeHeight(3)
    },
    rankText: {
        fontSize: sizeFont(35),
        fontWeight: 'bold',
    },
    veryGood: {
        color: "green",
    },
    good: {
        color: "orange",
    },
    normal: {
        color: appColor.primary,
    },
    bad: {
        color: appColor.gray,
    }, 
    veryBad: {
        color: "black"
    }
})