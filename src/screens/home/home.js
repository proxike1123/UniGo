import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {appColor} from '../../constants/app.constant';
import {
  sizeFont,
  sizeHeight,
  sizeWidth,
  defaultHeight,
} from '../../helpers/size.helper';
import HomeItem from './home-item';
import {StackActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {deleteSession} from '../../store/store';
import {connect} from 'react-redux';
import {addProfile} from '../../redux/action';
import {url} from '../../api/url';
import callApi from '../../api/callAPI';

const schedule = require('../../assets/images/schedule.png');
const exam = require('../../assets/images/exam.png');
const score = require('../../assets/images/score.png');
const common = require('../../assets/images/common.png');
const box = require('../../assets/images/box.png');
const classes = require('../../assets/images/classes.png');
const result = require('../../assets/images/result.png');
import Toast from 'react-native-simple-toast';
import ListSVModal from '../../components/modals/ListSVModal';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      permission: [],
      visible: false,
      studentList: [],
    };
  }
  onClosed = () => {
    this.setState({visible: false});
  };
  onLogout = async () => {
    await deleteSession();
    this.props.navigation.dispatch(StackActions.replace('Auth'));
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };
  onRefresh = () => {};

  navigateToCommon = () => {
    this.props.navigation.navigate('Common');
  };

  navigateToSchedule = () => {
    const {permission} = this.state;
    let index = permission.indexOf('Lịch học');
    if (index >= 0) {
      this.props.navigation.navigate('Schedule');
    } else {
      Toast.show('Chức năng đang bị khóa', Toast.LONG);
    }
  };

  navigateToExam = () => {
    const {permission} = this.state;
    let index = permission.indexOf('Lịch thi');
    if (index >= 0) {
      this.props.navigation.navigate('Exam');
    } else {
      Toast.show('Chức năng đang bị khóa', Toast.LONG);
    }
  };

  navigateToScore = () => {
    const {permission} = this.state;
    let index = permission.indexOf('Điểm');
    if (index >= 0) {
      this.props.navigation.navigate('Score');
    } else {
      Toast.show('Chức năng đang bị khóa', Toast.LONG);
    }
  };

  navigateToClasses = () => {
    this.props.navigation.navigate('Notification');
  };

  navigateToSummaryResult = () => {
    const {permission} = this.state;
    let index = permission.indexOf('KQ HTRL');
    if (index >= 0) {
      this.props.navigation.navigate('Summary');
    } else {
      Toast.show('Chức năng đang bị khóa', Toast.LONG);
    }
  };

  getPermisson = async () => {
    const params = {
      command: 'permissions',
      username: this.props.id,
      method: 'GET',
    };
    const res = await callApi(params);
    console.log(res);
    let permission = [];
    res[0].permissionsDTOSet.map((item) =>
      permission.push(item.permissionName),
    );
    this.setState({permission: permission});
  };

  getClass = async () => {
    const params = {
      command: 'class',
      username: this.props.reducer.profile.sutdent_id,
      method: 'GET',
    };
    const res = await callApi(params);
    console.log(res);

    this.setState({studentList: res});
  };

  componentDidMount() {
    this.getPermisson();
    this.getClass();
  }

  render() {
    const {profile} = this.props.reducer;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <View style={styles.img}>
              <Image
                source={{uri: profile.personal_image}}
                style={styles.headerImg}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.infoContain}>
              <Text style={styles.infoText1}>Xin chào, </Text>
              <Text style={styles.infoText2}>{profile.student_name}</Text>
              <Text style={styles.infoText1}>MSSV: {profile.sutdent_id}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.rowItem}>
              <HomeItem
                icon={common}
                title="Thông tin chung"
                onPress={this.navigateToCommon}
              />
              <View style={styles.spacing} />
              <HomeItem
                icon={classes}
                title="Thông tin lớp HP"
                onPress={this.navigateToClasses}
              />
              <View style={styles.spacing} />
              <HomeItem
                icon={score}
                title="Xem điểm"
                onPress={this.navigateToScore}
                block={this.state.permission.indexOf('Điểm') < 0}
              />
            </View>
            <View style={styles.rowItem}>
              <HomeItem
                icon={schedule}
                title="Xem lịch học"
                onPress={this.navigateToSchedule}
                block={this.state.permission.indexOf('Lịch học') < 0}
              />
              <View style={styles.spacing} />
              <HomeItem
                icon={exam}
                title="Xem lịch thi"
                onPress={this.navigateToExam}
                block={this.state.permission.indexOf('Lịch thi') < 0}
              />
              <View style={styles.spacing} />
              <HomeItem
                icon={result}
                title="Học tập, rèn luyện"
                onPress={this.navigateToSummaryResult}
                block={this.state.permission.indexOf('KQ HTRL') < 0}
              />
            </View>
            <View style={styles.rowItem}>
              <HomeItem
                title="Danh sách lớp"
                onPress={() => this.setState({visible: true})}
              />
            </View>
          </View>
        </ScrollView>
        <ListSVModal
          title={profile.class_name}
          visible={this.state.visible}
          onClosed={this.onClosed}
          listSV={this.state.studentList}
          hideClass
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {reducer} = state;
  return {reducer};
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
    borderBottomRightRadius: sizeHeight(35),
  },
  headerInfo: {
    flexDirection: 'row',
    paddingLeft: '5%',
    alignItems: 'center',
    flex: 1,
    paddingTop: '5%',
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
    borderColor: 'white',
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
    fontSize: sizeFont(16),
  },
  infoContain: {
    marginLeft: sizeWidth(30),
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
    color: 'white',
  },
  body: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: sizeHeight(30),
  },
  rowItem: {
    marginTop: sizeHeight(30),
    flexDirection: 'row',
    width: '86%',
  },
  spacing: {
    width: sizeWidth(28),
  },
});
