import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {appColor} from '../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth, defaultHeight} from '../../helpers/size.helper';
import {StackActions} from '@react-navigation/native';
import {deleteSession} from '../../store/store';
import { connect } from 'react-redux';
import callApi from '../../api/callAPI';
import Icon from 'react-native-vector-icons/MaterialIcons'
import EditIcon from 'react-native-vector-icons/Feather'
import { Confirm } from '../../components/modals';
import Permission from '../../components/modals/admin-permission-modal';

class AdminScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data: [],
           loading: false,
           Confirmvisible: false,
           func: "",
           nameSelect: "",
           idSelect: "",
           PermissionVisible: false,
           permissionSelect: [],
           refreshing: false,
        }
    }

    onCloseModal = () => {
        this.setState({
            Confirmvisible: false,
            PermissionVisible: false
        })
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
        this.loadData()
    }

    componentDidMount = async () => {
        this.loadData();
    }

    loadData = async () => {
        this.setState({loading: true})
        const params = {
            command:"permissions",
        }
        const res = await callApi(params);
        let data = []
        res.map(item => item.id != "admin" ? data.push(item): null)
        this.setState({data: data, loading: false})
    }

    renderItem = (item, index) => {
        return (
            <View style = {styles.item}>
                <Image
                    source = {{uri: item.imageUrl}}
                    style = {styles.itemImage}
                />
                <View>
                    <View>
                        <View style = {styles.row}>
                            <Text style = {styles.title}>MSSV: </Text>
                            <Text style = {styles.content}>{item.id}</Text>
                            {
                                item.lock ? 
                                <View style = {styles.lock}>
                                    <Icon
                                        name = "lock"
                                        size = {sizeWidth(10)}
                                        color = "white"
                                    />
                                </View> : null
                            }
                        </View>
                        <View style = {styles.row}>
                            <Text style = {styles.title}>Họ tên: </Text>
                            <Text style = {styles.content}>{item.name}</Text>
                        </View>
                        <View style = {[styles.row, {alignItems: 'flex-start'}]}>
                            <Text style = {styles.content}>Quyền hạn: </Text>
                            <View style = {styles.permission}>
                                <View 
                                        style = {[styles.pItem,]}
                                    >
                                        <Text style = {styles.pText}>
                                            {"TT chung"}
                                        </Text>
                                </View>
                                <View
                                        style = {[styles.pItem,]}
                                    >
                                        <Text style = {styles.pText}>
                                            {"TT LHP"}
                                        </Text>
                                </View>
                                {item.permissionsDTOSet.map((i, index) => {
                                    return (
                                        <View key = {i.permission} 
                                            style = {[styles.pItem,]}
                                        >
                                            <Text style = {styles.pText}>
                                                {i.permissionName}
                                            </Text>
                                        </View>
                                    )
                                })}
                                <TouchableOpacity 
                                    style = {[styles.editBtn]}
                                    onPress = {
                                        () => this.setState({
                                            nameSelect: item.name,
                                            PermissionVisible: true,
                                            idSelect: item.id,
                                            permissionSelect: item.permissionsDTOSet
                                        })
                                    }
                                >
                                    <EditIcon
                                        name = "edit"
                                        color = "white"
                                        size = {12}
                                    />
                                    <Text style = {{color: "white", marginLeft: sizeWidth(4), fontSize: sizeFont(12)}}>Sửa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {item.block ? 
                    <TouchableOpacity
                        style = {styles.unlock}
                        onPress = {
                            () => this.setState({
                                nameSelect: item.name,
                                idSelect: item.id,
                                func: "unlock",
                                Confirmvisible: true
                            })
                        }
                    >
                        <Icon
                            name = "lock-open"
                            size = {15}
                            color = "white"
                        />
                        <Text style = {{color: "white", marginLeft: sizeWidth(1), fontSize: sizeFont(12)}}>Mở khóa</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style = {styles.lockBtn}
                        onPress = {
                            () => this.setState({
                                nameSelect: item.name,
                                idSelect: item.id,
                                func: "lock",
                                Confirmvisible: true
                            })
                        }
                    >
                        <Icon
                            name = "lock"
                            size = {15}
                            color = "white"
                        />
                        <Text style = {{color: "white", marginLeft: sizeWidth(1), fontSize: sizeFont(12)}}>Khóa</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    render () {
        const {profile} = this.props.reducer;
        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <View style = {styles.headerInfo}>
                        <View style = {styles.img}>
                            <Image
                                source = {require("../../assets/images/Admin.png")}
                                style = {styles.headerImg}
                                resizeMode = 'stretch'
                            />
                        </View>
                        <View style = {styles.infoContain}>
                            <Text style = {styles.infoText1}>Xin chào, </Text>
                            <Text style = {styles.infoText2}>Admin</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style = {styles.logout}
                        onPress = {this.onLogout}
                    >
                        <Text style = {styles.btnText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                    <View style = {styles.body}>
                        {
                            this.state.loading ? 
                                <View style = {{
                                    height: sizeHeight(600),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ActivityIndicator
                                        color  = {appColor.primary}
                                        size = {30}
                                    />
                                </View>
                            : 
                            <FlatList 
                                data = {this.state.data}
                                style = {styles.list}
                                keyExtractor = {(item, index) => index.toString()}
                                renderItem = {({item, index })=> this.renderItem(item, index)}
                                refreshControl = {
                                    <RefreshControl
                                        onRefresh = {this.onRefresh}
                                        refreshing = {this.state.refreshing}
                                    />
                                }
                                
                            />
                        }
                    </View>
                    <Confirm
                        visible = {this.state.Confirmvisible}
                        closed = {this.onCloseModal}
                        func = {this.state.func}
                        name = {this.state.nameSelect}
                        id = {this.state.idSelect}
                        onRefresh = {this.onRefresh}
                    />
                    {this.state.PermissionVisible ?
                        <Permission
                        visible = {this.state.PermissionVisible}
                        closed = {this.onCloseModal}
                        name = {this.state.nameSelect}
                        id = {this.state.idSelect}
                        onRefresh = {this.onRefresh}
                        permission = {this.state.permissionSelect}
                    /> : null}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return {reducer}
};
  
export default connect(mapStateToProps)(AdminScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: sizeHeight(120),
        backgroundColor: appColor.primary,
        justifyContent: 'center'
    },
    headerInfo: {
        flexDirection: 'row',
        paddingLeft: "5%",
        alignItems: 'center',
        flex: 1,
        paddingTop: "5%",
    },
    img: {
        height: sizeHeight(70),
        width: sizeHeight(70),
        backgroundColor: 'white',
        borderRadius: sizeHeight(50),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: sizeHeight(1),
        borderColor: 'white'
    },
    headerImg: {
        height: sizeHeight(70),
        width: sizeHeight(70),
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
    },
    list: {
        width: "100%",
        height: sizeHeight(564),
    },
    item: {
      backgroundColor: 'white',
      width: "94%",
      marginHorizontal: "3%",
      borderRadius: sizeWidth(4),
      alignItems: 'center',
      borderWidth: sizeWidth(1),
      borderColor: "#E7E7E7",
      marginTop: sizeHeight(10),
      padding: sizeHeight(10),
      flexDirection: 'row'
    },
    itemImage: {
        height: sizeHeight(70),
        width: sizeWidth(70),
        borderRadius: sizeWidth(70),
        marginRight: sizeWidth(10)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: sizeWidth(280),
        marginVertical: sizeHeight(2)
    },
    title: {
        fontWeight: "bold",
        color: "#8C8C8C"
    },
    content: {
        color: appColor.primary,
        fontWeight: 'bold'
    },
    lock: {
        backgroundColor: 'red',
        marginLeft: sizeWidth(3),
        borderRadius: sizeWidth(4),
        elevation: 10,
        padding: sizeWidth(3)
    },
    lockText: {
        color: 'white',
        fontSize: sizeFont(12)
    },
    permission: {
        flexDirection: 'row',
        width: sizeWidth(210),
        flexWrap: 'wrap',
    },
    pItem: {
        backgroundColor: "#8C8C8C",
        borderRadius: sizeWidth(4),
        elevation: 5,
        marginLeft: sizeWidth(5),
        marginBottom: sizeHeight(3),
        padding: sizeHeight(3),
        marginTop: sizeHeight(2)
    },
    pText: {
        color: "white",
        fontSize: sizeFont(12)
    },
    editBtn: {
        backgroundColor: appColor.primary,
        borderRadius: sizeWidth(4),
        elevation: 5,
        marginLeft: sizeWidth(5),
        marginBottom: sizeHeight(3),
        padding: sizeHeight(3),
        marginTop: sizeHeight(2),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: sizeWidth(8)
    },
    lockBtn: {
        backgroundColor: 'red',
        borderRadius: sizeWidth(4),
        elevation: 10,
        flexDirection: 'row',
        position: 'absolute',
        top: sizeHeight(10),
        right: sizeHeight(10),
        padding: sizeWidth(3)
    },
    unlock: {
        backgroundColor: 'green',
        borderRadius: sizeWidth(4),
        elevation: 10,
        flexDirection: 'row',
        position: 'absolute',
        top: sizeHeight(10),
        right: sizeHeight(10),
        padding: sizeWidth(3)
    }
})
