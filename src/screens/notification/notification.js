import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/header';
import { sizeHeight, sizeWidth } from '../../helpers/size.helper';
import NotiItem from './noti-item';
import callApi from '../../api/callAPI';
import BackButton from '../../components/back-button';
import { appColor } from '../../constants/app.constant';


class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        }
    }

    async componentDidMount () {
        this.setState({loading: true})
        const params = {
            command:"notifications",
            method: "GET",
        }
        const res = await callApi(params);
        this.setState({data: res})
        this.setState({loading: false})
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    render () {
        return (
            <View style = {styles.container}>
                <Header
                    title = {"Thông báo lớp học phần"}
                    left = {<BackButton onPress = {this.goBack}/>}
                />
                <ScrollView 
                    style = {styles.body}>
                    {
                       !this.state.loading ? 
                       this.state.data.map((item, index) => {
                            return (
                                <NotiItem 
                                    title = {item.title}
                                    content = {item.content}
                                    date = {item.date}
                                    key = {index.toString()}
                                />
                            )
                        })
                        : <View style = {styles.loading}>
                            <ActivityIndicator size = {35} color = {appColor.primary}/>
                        </View>
                    }
                    <View style = {{height: sizeHeight(30)}}/>
                </ScrollView>
            </View>
        )
    }
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        paddingHorizontal: sizeWidth(20),
        paddingVertical: sizeHeight(20),
    },
    loading: {
        height: sizeHeight(600),
        justifyContent: 'center',
        alignItems: 'center'
    }
})