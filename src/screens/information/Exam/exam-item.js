import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ListSVModal from '../../../components/modals/ListSVModal';
import {appColor} from '../../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import Icon from 'react-native-vector-icons/AntDesign';

const DS = [
  {
    name: 'Nguyễn Đăng Bin',
    class: '17T2',
    mssv: '102170071',
    phone: '0796571793',
  },
  {
    name: 'Nguyễn Đăng Bin',
    class: '17T2',
    mssv: '102170071',
    phone: '0796571793',
  },
  {
    name: 'Nguyễn Đăng Bin',
    class: '17T2',
    mssv: '102170071',
    phone: '0796571793',
  },
  {
    name: 'Nguyễn Đăng Bin',
    class: '17T2',
    mssv: '102170071',
    phone: '0796571793',
  },
];

export default class ExamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  onClosed = () => {
    this.setState({visible: false});
  };
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{item.course_name}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>Mã học phần </Text>
          <Text style={styles.content}>{item.course_code}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Nhóm thi </Text>
          <Text
            style={[
              styles.content,
              {marginRight: sizeWidth(63), color: 'red'},
            ]}>
            {item.test_group}
          </Text>
          <Text style={styles.title}>Thi chung </Text>
          <Text style={[styles.content, {color: 'red'}]}>
            {item.test_grouping}
          </Text>
        </View>
        {item.test_schedule != '' && item.test_schedule ? (
          <View style={styles.row}>
            <Text
              style={[
                styles.content,
                {color: 'green', marginRight: sizeWidth(20)},
              ]}>
              {item.test_schedule}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.listSV}
          onPress={() => this.setState({visible: true})}>
          <Icon name="filetext1" size={sizeWidth(25)} color={'green'} />
          <Text style={styles.listText}>Danh sách</Text>
        </TouchableOpacity>
        <ListSVModal
          visible={this.state.visible}
          onClosed={this.onClosed}
          code={item.course_code}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    width: sizeWidth(250),
  },
  content: {
    color: appColor.text,
    fontSize: sizeFont(15),
    textAlign: 'left',
  },
  date: {
    color: 'red',
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
    marginTop: sizeHeight(3),
  },
  type: {
    paddingVertical: sizeHeight(2),
    fontSize: sizeFont(14),
    color: 'green',
    fontWeight: 'bold',
  },
  listSV: {
    position: 'absolute',
    top: sizeHeight(10),
    right: sizeHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: sizeFont(12),
    color: appColor.text,
  },
});
