import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import Header from '../../components/header';
import {appColor} from '../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth, defaultHeight} from '../../helpers/size.helper';
import {StackActions} from '@react-navigation/native';
import InfoItem from './InfoItem';
import {deleteSession, deleteUsername} from '../../store/store';
import { connect } from 'react-redux';

class AccountScreen extends Component {
    onLogout = async () => {
        await deleteSession();
        await deleteUsername();
        this.props.navigation.dispatch(StackActions.replace('Auth'));
        this.props.navigation.reset({
            index:0,
            routes:[{name:'Auth'}]
        })
    }
    renderRight = () => {
        return (
            <TouchableOpacity
                onPress = {this.onLogout}
                style = {styles.logout}
            >
                <Text style = {styles.btnText}>Đăng xuất</Text>
            </TouchableOpacity>
        )
    }
    render () {
        const profile = this.props.profile
        return (
            <View style = {styles.container}>
               <Header title = "Sinh viên" right = {this.renderRight()}/>
                <ScrollView 
                    style = {styles.body}
                    showsVerticalScrollIndicator = {false}
                >
                    <View style = {styles.topBody}>
                        <View style = {styles.imageContainer}>
                            <Image
                                source = {{uri: profile.personal_image}}
                                style = {styles.avatar}
                                resizeMode = "stretch"
                            />
                        </View>
                        <View style = {styles.rightInfo}>
                            <InfoItem 
                                title = {"Họ và tên"} 
                                content = {profile.student_name} 
                            />
                            <InfoItem 
                                title = {"Mã số sinh viên"} 
                                content = {profile.sutdent_id} 
                            />
                            <InfoItem 
                                title = {"Lớp sinh hoạt"} 
                                content = {profile.class_name} 
                            />
                        </View>
                    </View>
                    <View style = {styles.bottomBody}>
                        <InfoItem 
                            title = {"Ngày sinh"} 
                            content = {profile.birthday}
                        />
                        <InfoItem 
                            title = {"Số điện thoại"} 
                            content = {profile.phone} 
                        />
                        <InfoItem 
                            title = {"Email cá nhân"} 
                            content = {profile.personal_email}
                        />
                        <InfoItem 
                            title = {"Email trường cấp"} 
                            content = {profile.school_mail} 
                        />
                        <InfoItem 
                            title = {"Mã thẻ BHYT"} 
                            content = {`${profile.medical_id} - Hết hạn: ${profile.medical_id_end}`}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return {
        profile: reducer.profile
    }
};

export default connect(mapStateToProps)(AccountScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logout: {
        padding: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
    },
    btnText: {
        color: 'white'
    },
    topBody: {
        marginTop: sizeHeight(15),
        width: "100%",
        paddingHorizontal: sizeWidth(20),
        flexDirection: 'row',
    },
    avatar: {
        width: sizeWidth(150),
        height: sizeWidth(200),
    },
    imageContainer: {
        width: sizeWidth(150),
        height: sizeWidth(200),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizeWidth(6),
        overflow: 'hidden',
        borderWidth: sizeHeight(1),
    },
    rightInfo: {
        width: sizeWidth(210),
        marginLeft: sizeWidth(10)
    },
    bottomBody: {
        width: "100%",
        paddingHorizontal: sizeWidth(20),
    },
    body: {

    }
})