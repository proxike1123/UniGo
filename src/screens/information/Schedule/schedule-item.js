import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {appColor} from '../../../constants/app.constant';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import Icon from 'react-native-vector-icons/AntDesign';
import ListSVModal from '../../../components/modals/ListSVModal';

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

export default class ScheduleItem extends Component {
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
          <Text style={styles.title}>Giáo viên </Text>
          <Text style={styles.content}>{item.teacher}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Số tín chỉ </Text>
          <Text style={[styles.content]}>{item.credit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Tuần học </Text>
          <Text style={styles.content}>{item.study_weeks}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Lịch học </Text>
          <Text
            style={[
              styles.content,
              {marginRight: sizeWidth(35), color: 'red'},
            ]}>
            {item.weekly_schedule.raw}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.listSV}
          onPress={() => this.setState({visible: true})}>
          <Text style={styles.listText}>Danh sách</Text>
          <Icon name="filetext1" size={sizeWidth(25)} color={'green'} />
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
  listSV: {
    position: 'absolute',
    bottom: sizeHeight(15),
    right: sizeHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: sizeFont(14),
    color: appColor.text,
  },
});
