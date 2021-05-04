import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView,
} from 'react-native';
import {appColor} from '../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth, defaultHeight} from '../../helpers/size.helper';
import HomeItem from './home-item';
import {StackActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {deleteSession} from '../../store/store';
import { connect } from 'react-redux';
import {addProfile} from '../../redux/action'
import { url } from '../../api/url';

const schedule = require('../../assets/images/schedule.png')
const exam = require("../../assets/images/exam.png")
const score = require("../../assets/images/score.png")
const common = require("../../assets/images/common.png")
const box = require("../../assets/images/box.png")
const classes = require("../../assets/images/classes.png")
const result = require("../../assets/images/result.png")

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    onLogout = async () => {
        await deleteSession();
        this.props.navigation.dispatch(StackActions.replace('Auth'));
        this.props.navigation.reset({
            index:0,
            routes:[{name:'Auth'}],
        })
    }
    onRefresh = () => {

    }

    navigateToCommon = () => {
        this.props.navigation.navigate("Common");
    }

    navigateToSchedule = () => {
        this.props.navigation.navigate("Schedule");
    }

    navigateToExam = () => {
        this.props.navigation.navigate("Exam");
    }

    navigateToScore = () => {
        this.props.navigation.navigate("Score");
    }

    navigateToClasses = () => {
        this.props.navigation.navigate("Notification");
    }

    navigateToSummaryResult = () => {
        this.props.navigation.navigate("Summary");
    }

    render () {
        const {profile} = this.props.reducer;
        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <View style = {styles.headerInfo}>
                        <View style = {styles.img}>
                            <Image
                                source = {{uri: profile.personal_image}}
                                style = {styles.headerImg}
                                resizeMode = 'stretch'
                            />
                        </View>
                        <View style = {styles.infoContain}>
                            <Text style = {styles.infoText1}>Xin chào, </Text>
                            <Text style = {styles.infoText2}>{profile.student_name}</Text>
                            <Text style = {styles.infoText1}>MSSV: {profile.sutdent_id}</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style = {styles.logout}
                        onPress = {this.onLogout}
                    >
                        <Text style = {styles.btnText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                >
                    <View style = {styles.body}>
                        <View style = {styles.rowItem}>
                            <HomeItem 
                                icon = {common} 
                                title = "Thông tin chung"
                                onPress = {this.navigateToCommon}
                            />
                            <View style = {styles.spacing}/>
                            <HomeItem 
                                icon = {classes} 
                                title = "Thông tin lớp HP"
                                onPress = {this.navigateToClasses}
                            />   
                        </View>
                        <View style = {styles.rowItem}>
                            <HomeItem 
                                    icon = {schedule} 
                                    title = "Xem lịch học"
                                    onPress = {this.navigateToSchedule}
                            />  
                            <View style = {styles.spacing}/>
                            <HomeItem 
                                icon = {exam} 
                                title = "Xem lịch thi"
                                onPress = {this.navigateToExam}
                            />  
                        </View>
                        <View style = {styles.rowItem}>
                            <HomeItem 
                                icon = {score} 
                                title = "Xem điểm"
                                onPress = {this.navigateToScore}
                            />
                            <View style = {styles.spacing}/>
                            <HomeItem 
                                icon = {result} 
                                title = "Học tập, rèn luyện"
                                onPress = {this.navigateToSummaryResult}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return {reducer}
};
  
export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: sizeHeight(170),
        backgroundColor: appColor.primary,
        borderBottomLeftRadius: sizeHeight(35),
        borderBottomRightRadius: sizeHeight(35)
    },
    headerInfo: {
        flexDirection: 'row',
        paddingLeft: "5%",
        alignItems: 'center',
        flex: 1,
        paddingTop: "5%",
    },
    img: {
        height: sizeHeight(100),
        width: sizeHeight(100),
        backgroundColor: 'white',
        borderRadius: sizeHeight(50),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: sizeHeight(1),
        borderColor: 'white'
    },
    headerImg: {
        height: sizeHeight(100),
        width: sizeHeight(100),
    },
    infoText1: {
        color: 'white',

    },
    infoText2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: sizeFont(18)
    },
    infoContain: {
        marginLeft: sizeWidth(30)
    },
    logout: {
        position: 'absolute',
        right: sizeWidth(20),
        top: sizeHeight(40),
        padding: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
    },
    btnText: {
        color: 'white'
    },
    body: {
        alignItems: 'center',
        width: "100%",
        paddingBottom: sizeHeight(30)
    },
    rowItem: {
        marginTop: sizeHeight(30),
        flexDirection: 'row',
        width: "86%"
    },
    spacing: {
        width: sizeWidth(33)
    }
})