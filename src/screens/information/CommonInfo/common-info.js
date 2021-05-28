import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/back-button';
import * as Animatable from 'react-native-animatable';
import CommonItem from './common-item';
import {sizeHeight, sizeFont, sizeWidth} from '../../../helpers/size.helper';
import callApi from '../../../api/callAPI';
import { appColor } from '../../../constants/app.constant';

export default class CommonInfo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    async componentDidMount () {
        this.setState({loading: true})
        const params = {
            command:"overall_notifications",
            method: "GET",
        }
        const res = await callApi(params);
        this.setState({data: res})
        this.setState({loading: false})
    }

    render () {
        return(
            <View style = {styles.container}>
                <Header 
                    title = {"Thông tin chung"}
                    left = {<BackButton onPress = {this.goBack}/>}
                />
                <ScrollView 
                    showsVerticalScrollIndicator = {false}
                    style = {styles.body}>
                    {
                       !this.state.loading ? 
                       this.state.data.map((item, index) => {
                            return (
                                <CommonItem 
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