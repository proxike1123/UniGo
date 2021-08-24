import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  TextInput,
} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import callApi from '../../api/callAPI';

export default class ListSVModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  onCall = (phone) => {
    Linking.openURL(
      Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`,
    );
  };

  componentDidMount = async () => {
    !this.props.listSV ? this.getListSV() : null;
  };

  getListSV = async () => {
    this.setState({loading: true});
    const params = {
      command: 'collaborator',
      username: this.props.code,
    };
    const res = await callApi(params);
    this.setState({list: res});
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>Tên SV</Text>
            <Text style={styles.value}>{item.student_name}</Text>
          </View>
          {this.props.hideClass ? null : (
            <View style={styles.row}>
              <Text style={styles.itemTitle}>Lớp</Text>
              <Text style={styles.value}>{item.class_name}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.itemTitle}>MSSV</Text>
            <Text style={styles.value}>{item.sutdent_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>SDT</Text>
            <Text style={styles.value}>{item.phone}</Text>
          </View>
          <View style={styles.sst}>
            <Text style={styles.sstText}>{index + 1}</Text>
          </View>
          <TouchableOpacity
            style={styles.call}
            onPress={() => this.onCall(item.phone)}>
            <Icon name={'phone'} size={sizeWidth(20)} color={'white'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Modal
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={this.props.visible}
        style={{flex: 1, margin: 0}}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        hasBackdrop={true}
        useNativeDriver={true}
        animationInTiming={480}
        animationOutTiming={480}>
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="rgba(0,0,0,0.7)" />
          <TouchableWithoutFeedback onPress={this.props.onClosed}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={styles.body}>
                  <View style={styles.header}>
                    <Text style={styles.title}>
                      {this.props.title ? this.props.title : 'Danh sách lớp'}
                    </Text>
                    <TouchableOpacity
                      onPress={this.props.onClosed}
                      style={{
                        position: 'absolute',
                        right: sizeWidth(15),
                      }}>
                      <Icon
                        name={'x'}
                        color={appColor.blur}
                        size={sizeWidth(20)}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.search}>
                    <TextInput
                      style={styles.input}
                      placeholder="Tìm sinh viên"
                      placeholderTextColor={appColor.blur}
                      selectionColor={appColor.primary}
                    />
                    <Icon
                      name="search"
                      size={sizeWidth(20)}
                      color={appColor.blur}
                    />
                  </View> */}
                  <View style={styles.bottom}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={
                        this.props.listSV ? this.props.listSV : this.state.list
                      }
                      keyExtractor={(item, index) => index}
                      renderItem={this.renderItem}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: 'white',
    height: '90%',
    width: '90%',
    borderRadius: sizeWidth(10),
  },
  header: {
    height: sizeHeight(60),
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: sizeWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: sizeWidth(10),
    borderTopRightRadius: sizeWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: sizeFont(20),
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    marginVertical: sizeHeight(12),
    marginHorizontal: sizeWidth(15),
  },
  row: {
    flexDirection: 'row',
    marginBottom: sizeHeight(5),
  },
  item: {
    borderBottomWidth: sizeWidth(1),
    borderColor: '#F2F2F2',
    marginBottom: sizeWidth(10),
    paddingBottom: sizeWidth(10),
  },
  value: {
    color: appColor.text,
    fontSize: sizeFont(16),
  },
  itemTitle: {
    fontSize: sizeFont(16),
    color: 'black',
    fontWeight: 'bold',
    marginRight: sizeWidth(10),
  },
  sst: {
    backgroundColor: appColor.primary,
    paddingHorizontal: sizeWidth(12),
    paddingVertical: sizeWidth(1),
    position: 'absolute',
    top: sizeHeight(5),
    right: sizeHeight(5),
    borderRadius: sizeWidth(4),
  },
  sstText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: sizeFont(14),
  },
  call: {
    position: 'absolute',
    backgroundColor: 'orange',
    bottom: sizeHeight(5),
    right: sizeHeight(5),
    padding: sizeWidth(5),
    borderRadius: sizeWidth(25),
  },
  input: {
    flex: 1,
    marginRight: sizeWidth(10),
    height: sizeHeight(30),
    fontSize: sizeFont(16),
    lineHeight: sizeFont(16),
    padding: 0,
    color: appColor.text,
  },
  search: {
    width: '94%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: sizeWidth(4),
    borderColor: appColor.blur,
    borderWidth: sizeWidth(1),
    alignItems: 'center',
    marginVertical: sizeHeight(10),
    paddingHorizontal: sizeWidth(10),
  },
});
