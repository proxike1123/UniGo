import React, {Component} from 'react';
import {
    Modal, 
    View, 
    StyleSheet, 
    StatusBar, 
    TouchableOpacity, 
    Text,
    Image,
    TouchableWithoutFeedback} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';
import { ScrollView } from 'react-native-gesture-handler';
import CustomeCheckBox from '../check-box';
import callApi from '../../api/callAPI';
import Toast from 'react-native-simple-toast'

export default class Permission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Test: false,
            Schedule: false,
            Moral: false,
            StudyResult: false,
            permission: [],
            refresh: 1,
        }
    }

    confirm = async () => {
        const params = {
            command:"permissions",
            username: this.props.id,
            method: "PUT",
            param: ["PersonalInformation", ...this.state.permission]
        }
        const res = await callApi(params);
        if (res == true) {
            this.props.onRefresh();
            Toast.show('Thay đổi quyền thành công', Toast.LONG) 
            this.props.closed()
        } else {
            Toast.show('Khóa user thất bại', Toast.LONG) 
            this.props.closed()
        }
    }

    onSetTest = () => {
        if (!this.state.Test) {
            this.state.permission.push("Lịch thi")
            this.state.Test = !this.state.Test
            this.setState({up: ""})
        } else {
            let index = this.state.permission.indexOf("Lịch thi")
            this.state.permission.splice(index,1)
            this.state.Test = !this.state.Test
            this.setState({up: ""})
        }
    }

    onSetSchedule = () => {
        if (!this.state.Schedule) {
            this.state.permission.push("Lịch học")
            this.state.Schedule = !this.state.Schedule
            this.setState({up: ""})
        } else {
            let index = this.state.permission.indexOf("Lịch học")
            this.state.permission.splice(index,1)
            this.state.Schedule = !this.state.Schedule
            this.setState({up: ""})
        }
    }

    onSetMoral = () => {
        if (!this.state.Moral) {
            this.state.permission.push("KQ HTRL")
            this.state.Moral = !this.state.Moral
            this.setState({up: ""})
        } else {
            let index = this.state.permission.indexOf("KQ HTRL")
            this.state.permission.splice(index,1)
            this.state.Moral = !this.state.Moral
            this.setState({up: ""})
        }
    }

    onSetStudyResult = () => {
        if (!this.state.StudyResult) {
            this.state.permission.push("Điểm")
            this.state.StudyResult = !this.state.StudyResult
            this.setState({up: ""})
        } else {
            let index = this.state.permission.indexOf("Điểm")
            this.state.permission.splice(index,1)
            this.state.StudyResult = !this.state.StudyResult
            this.setState({up: ""})
        }
    }

    componentDidMount = () => {
        this.props.permission.map(item => {
            if (item.permissionName == "Lịch học") {
                this.onSetSchedule();
            }
            if (item.permissionName == "Lịch thi") {
                this.onSetTest();
            }
            if (item.permissionName == "Điểm") {
                this.onSetStudyResult();
            }
            if (item.permissionName == "KQ HTRL") {
                this.onSetMoral();
            }
        })
    }

    renderItem = (item, index) => {
        return (
            <TouchableOpacity 
                style = {styles.itemContainer}
                key = {index.toString()}
                onPress = {() => this.props.onSearch(item.semester)}
             >
                <View style = {styles.itemRow}>
                    <Image
                        style = {styles.itemImg}
                        source = {require("../../assets/images/book.png")}
                    />
                    <Text style = {styles.itemText}>{item.semester}</Text>
                    <Image
                        style = {styles.itemArrow}
                        source = {require("../../assets/images/right.png")}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    onClose = () => {
        this.setState({refresh: 1})
        this.props.closed();
    }

    render () {
        return(
            <Modal
                visible = {this.props.visible}
                transparent
                animationType = 'slide'
            >
                <TouchableWithoutFeedback
                    onPress = {this.onClose}
                >
                    <View style = {styles.container}>
                        <StatusBar
                            translucent 
                            backgroundColor = 'rgba(0, 0, 0, 0.5)'
                        />
                        <TouchableWithoutFeedback
                            onPress = {() => null}
                        >
                            <View style = {styles.modal}>
                                <View style = {styles.header}>
                                    <Text style = {styles.title}>Thay đổi quyền hạn:  </Text>
                                    <Text style = {[styles.title, {color: appColor.primary}]}>{this.props.name}</Text>
                                </View>

                                <View style = {styles.body}>
                                    <View style = {{flex: 1, }}>
                                        <CustomeCheckBox 
                                            title = "Lịch học"
                                            value = {this.state.Schedule}
                                            onchange = {this.onSetSchedule}
                                        />
                                        <CustomeCheckBox  
                                            title = "Lịch thi"
                                            value = {this.state.Test}
                                            onchange = {this.onSetTest}
                                        />
                                    </View>
                                    <View style = {{flex: 1, }}>
                                        <CustomeCheckBox 
                                            title = "Điểm"
                                            value = {this.state.StudyResult}
                                            onchange = {this.onSetStudyResult}
                                        />
                                        <CustomeCheckBox  
                                            title = "KQ HTRL"
                                            value = {this.state.Moral}
                                            onchange = {this.onSetMoral}
                                        />
                                    </View>
                                </View>

                                <View style = {styles.btnContainer}>
                                    <TouchableOpacity 
                                        style = {styles.cancel}
                                        onPress = {this.onClose}
                                    >
                                        <Text style = {styles.btnText}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style = {styles.confirm}
                                        onPress = {this.confirm}
                                    >
                                        <Text style = {styles.btnText}>Lưu</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
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
    text: {
        marginTop: sizeHeight(10),
        color: appColor.text
    },
    modal: {
        position: 'absolute',
        height: "35%",
        width: "100%",
        top: '65%',
        backgroundColor: 'white',
        borderTopLeftRadius: sizeWidth(4),
        borderTopRightRadius: sizeWidth(4),
        alignItems: 'center'
    },
    header: {
        height: sizeHeight(50),
        borderBottomWidth: sizeHeight(1),
        borderColor: "#EFF1F5",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        flexDirection: "row"
    },
    body: {
        paddingHorizontal: sizeWidth(50),
        paddingVertical: sizeHeight(20),
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: sizeFont(17),
    },
    img: {
        width: sizeWidth(30),
        height: sizeHeight(30),
        tintColor: "#98A1BF",
    },
    closeBtn: {
        position: 'absolute',
        left: sizeWidth(15),
    },
    itemContainer: {
        width: "100%",
        marginBottom: sizeHeight(20),
        justifyContent: 'center',
        borderBottomWidth: sizeHeight(1),
        borderColor: "#EFF1F5"
    },
    itemText: {
        color: appColor.text,
        fontSize: sizeFont(17)
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImg: {
        width: sizeWidth(25),
        height: sizeHeight(25),
        marginRight: sizeWidth(10),
        tintColor: "#98A1BF"
    },
    itemArrow: {
        position: 'absolute',
        right: sizeWidth(0),
        width: sizeWidth(20),
        height: sizeHeight(20),
        tintColor: "#98A1BF",
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "50%",
        marginTop: sizeHeight(30),
        alignItems: 'center',
        position: 'absolute',
        bottom: sizeHeight(10)
    },
    btnText: {
        color: "white",
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
})
