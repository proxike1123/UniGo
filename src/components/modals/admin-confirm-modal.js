import React, {Component} from 'react';
import {Modal, View, StyleSheet, StatusBar, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';
import Icon from 'react-native-vector-icons/MaterialIcons'
import callApi from '../../api/callAPI';
import Toast from 'react-native-simple-toast';

export default class Confirm extends Component {

    confirm = async () => {
        const params = {
            command:"BlockUser",
            username: this.props.id,
            method: "PUT",
            param: {
                status: this.props.func == "lock"
            }
        }
        const res = await callApi(params);
        if (res == true) {
            this.props.onRefresh();
            this.props.func == "lock" ?
                Toast.show('Khóa user thành công', Toast.LONG) 
                : Toast.show('Mở khóa user thành công', Toast.LONG)
            this.props.closed()
        } else {
            this.props.func == "lock" ?
                Toast.show('Khóa user thất bại', Toast.LONG) 
                : Toast.show('Mở khóa user thất bại', Toast.LONG) 
            this.props.closed()
        }
    }

    render () {
        const {name, func} = this.props
        return(
            <Modal
                visible = {this.props.visible}
                transparent
            >
                <View style = {styles.container}>
                    <StatusBar
                        translucent 
                        backgroundColor = 'rgba(0, 0, 0, 0.5)'
                    />
                    <View style = {styles.loadingContainer}>
                        {func == "lock" ? 
                            <View style = {styles.row}>
                                <Text>Bạn có chắc chắn muốn </Text>
                                <Icon
                                    name = "lock"
                                    color = "red"
                                    size = {15}
                                />
                                <Text style = {{color: 'red'}}> khóa </Text>
                                <Text style = {{color: appColor.primary, fontWeight: "bold"}}>{name} </Text>
                                <Text>?</Text>
                            </View>
                            :
                            <View style = {styles.row}>
                                <Text>Bạn có chắc chắn muốn </Text>
                                <Icon
                                    name = "lock-open"
                                    color = "green"
                                    size = {15}
                                />
                                <Text style = {{color: 'green'}}> mở khóa </Text>
                                <Text style = {{color: appColor.primary, fontWeight: "bold"}}>{name} </Text>
                                <Text>?</Text>
                            </View>
                        }
                        <View style = {styles.btnContainer}>
                            <TouchableOpacity 
                                style = {styles.cancel}
                                onPress = {() => this.props.closed()}
                            >
                                <Text style = {styles.btnText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = {styles.confirm}
                                onPress = {() => this.confirm()}
                            >
                                <Text style = {styles.btnText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: 'white',
        width: "90%",
        elevation: 6,
        borderRadius: sizeWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: sizeWidth(25)
    },
    text: {
        marginTop: sizeHeight(10),
        color: appColor.text
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    cancel: {
        backgroundColor: "#8C8C8C",
        width: sizeWidth(80),
        height: sizeHeight(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizeWidth(4),
        elevation: 10,
    },
    confirm: {
        backgroundColor: appColor.primary,
        width: sizeWidth(80),
        height: sizeHeight(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizeWidth(4),
        elevation: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "60%",
        marginTop: sizeHeight(30)
    },
    btnText: {
        color: "white",
    }
})