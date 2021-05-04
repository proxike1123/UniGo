import React, { Component } from 'react';
import {View, Text, Animated, StyleSheet, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {sizeFont, sizeHeight, sizeWidth, defaultHeight} from '../../helpers/size.helper';
import InputView from './input-view';
import Loginbutton from './button-login';
import {appColor} from '../../constants/app.constant';
import {LoginModal} from '../../components/modals';
import callApi from '../../api/callAPI';
import {setSession, getSession, setUsername} from '../../store/store';
import { connect } from 'react-redux';
import {addProfile} from '../../redux/action'
import { bindActionCreators } from 'redux';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSplash: true,
            scaleLogo: new Animated.Value(1),
            transformY: new Animated.Value(defaultHeight/2 + 100),
            scaleText: new Animated.Value(0),
            MSSV: "",
            password: "",
            MSSVError: "",
            passwordError: "",
            loadingModalVisible: false,
            error: "",
        }
    }

    onLogin = async () => {
        this.setState({error: ""})
        const {MSSV, MSSVError, password, passwordError} = this.state;
        if (MSSV == "") {
            this.setState({MSSVError: 'Vui lòng nhập MSSV'})
        } else if (password == "") {
        this.setState({passwordError: "Vui lòng nhập mật khẩu"})
        } else {
            this.setState({loadingModalVisible: true})
            const params = {
                command:"login",
                method: "POST",
                param: {
                    username: this.state.MSSV,
                    password: this.state.password,
                }
            }
            const res = await callApi(params);
            
            if (res.status == "Ok") {
                await setSession(res.accessToken);
                await setUsername(this.state.MSSV);
                const params = {
                    command:"personal_informations",
                    username: this.state.MSSV,
                    method: "GET",
                    param: {
                        
                    }
                }
                const result = await callApi(params);

                this.props.addProfile(result)
                this.setState({loadingModalVisible: false})
                this.props.navigation.dispatch(StackActions.replace('Main'));
                this.props.navigation.reset({
                    index:0,
                    routes:[{name:'Main'}]
                })

            } else {
                this.setState({loadingModalVisible: false, error: "Server đang bị lỗi, vui lòng thử lại sau"})
            }
        }
    }

    changeToLogin = async () => {
        await this.setState({isSplash: false})
        Animated.parallel([
            Animated.timing(this.state.scaleLogo, {
                toValue: 4,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.transformY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.scaleText, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }

    componentDidMount () {
        this.checkAutoLogin();
    }

    checkAutoLogin = async () => {
        setTimeout(async () => {
            const sess = await getSession()
            if (sess) {
                this.props.navigation.dispatch(StackActions.replace('Main'));
                this.props.navigation.reset({
                    index:0,
                    routes:[{name:'Main'}]
                })
            } else {
                this.changeToLogin()
            }
        }, 1000);
    }

    render () {
        const {isSplash, MSSV, password, MSSVError, passwordError} = this.state;
        return (
            <TouchableWithoutFeedback style = {{flex: 1}} onPress = {() => Keyboard.dismiss()}>
                <View style = {styles.container}>
                    <Animated.View 
                        style = {[styles.imgContainer, {
                            transform: [
                                {scale: this.state.scaleLogo}
                            ]
                        }]}
                    >
                    {isSplash?
                        <Image
                            source = {require('../../assets/images/logo.png')}
                            style = {styles.img}
                        /> : null
                    }
                    </Animated.View>
                    {isSplash ? 
                        <View style = {styles.row}> 
                            <Text style = {styles.logoTitle2}>Thông tin</Text>
                            <Text style = {styles.logoTitle1}> cho </Text>
                            <Text style = {styles.logoTitle2}>Sinh viên</Text>
                        </View> : null    
                    }
                    <Animated.View
                        style = {[styles.loginContainer, {
                            transform: [
                                {translateY: this.state.transformY}
                            ]
                        }]}
                    >
                        <Text style = {styles.loginTitle}>Đăng nhập</Text>
                        <InputView
                            onChangeText={MSSV => this.setState({MSSV, MSSVError: ''})}
                            onSubmitEditing={() =>
                                !!this.passwordRef && this.passwordRef.focus()
                            }
                            returnKeyType={'next'}
                            autoCapitalize="none"
                            errorMessage={MSSVError}
                            value={MSSV}
                            icon={require('../../assets/images/ic_info.png')}
                            placeholder={'Nhập mã số sinh viên'}
                        />
                        <InputView
                            icon={require('../../assets/images/ic_password.png')}
                            value={password}
                            inputRef={ref => (this.passwordRef = ref)}
                            errorMessage={passwordError}
                            returnKeyType={'go'}
                            onSubmitEditing={this.onLogin}
                            autoCapitalize="none"
                            style={[styles.marginVertical]}
                            secureTextEntry={true}
                            onChangeText={password =>
                                this.setState({password, passwordError: ''})
                            }
                            placeholder={'Nhập mật khẩu'}
                        />
                        <Text style = {styles.error}>{this.state.error}</Text>
                        <Loginbutton text = "Đăng nhập" onPress = {this.onLogin}/>
                    </Animated.View> 
                    <Animated.Text 
                        style = {[styles.title, {
                            transform: [
                                {scale: this.state.scaleText}
                            ]
                        }]}
                    >
                        UniGo
                    </Animated.Text>
                    <LoginModal visible = {this.state.loadingModalVisible}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = (state) => {
    const { reducer } = state
    return reducer
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addProfile,
    }, dispatch)
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    imgContainer: {
        width: sizeHeight(250),
        height: sizeHeight(250),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColor.primary,
        borderRadius: sizeHeight(25)
    },
    img: {
        width: sizeHeight(255),
        height: sizeHeight(255),
    },
    logoTitle1: {
        color: "#86889E",
        fontSize: sizeFont(22),
    },
    logoTitle2: {
        color: appColor.primary,
        fontSize: sizeFont(22),
        fontFamily: 'FredokaOne-Regular',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: sizeHeight(25),
    },
    title: {
        fontSize: sizeFont(70),
        position: 'absolute',
        top: "15%",
        color: 'white',
        fontFamily: 'FredokaOne-Regular',
        letterSpacing: sizeFont(10),
    },
    loginContainer: {
        height: "60%",
        width: "100%",
        position: 'absolute',
        top: "40%",
        borderTopLeftRadius: sizeHeight(25),
        borderTopRightRadius: sizeHeight(25),
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: 'center',
    },
    loginTitle: {
        color: appColor.primary,
        fontSize: sizeFont(23),
        fontWeight: 'bold',
        width: "100%",
        marginBottom: "15%",
        paddingLeft: sizeWidth(35)
    },
    error: {
        color: 'red',
        fontSize: sizeFont(16)
    }
})