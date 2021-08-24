import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/back-button';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import {appColor} from '../../../constants/app.constant';
import ScheduleItem from './schedule-item';
import {SemesterModal} from '../../../components/modals';
import {getSession, getUsername} from '../../../store/store';
import callApi from '../../../api/callAPI';

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      loading: false,
      semester: '',
      listSemesters: [],
      selectSemester: '',
    };
  }
  goBack = () => {
    this.props.navigation.goBack();
  };

  onClosed = () => {
    this.setState({visible: false});
  };

  onOpen = () => {
    this.setState({visible: true});
  };

  onSearch = async (value) => {
    this.onClosed();
    await this.setState({
      semester: value.semester_name,
      selectSemester: value.semester_id,
    });
    this.getCourse();
  };

  componentDidMount = async () => {
    this.getSemesters();
  };

  getSemesters = async () => {
    this.setState({loading: true});
    const params = {
      command: 'semesters',
    };
    const res = await callApi(params);
    await this.setState({
      listSemesters: res,
      selectSemester: res[res.length - 1].semester_id,
      semester: res[res.length - 1].semester_name,
    });
    this.getCourse();
  };

  getCourse = async () => {
    this.setState({loading: true});
    const username = await getUsername();
    const params = {
      command: 'schedules',
      username: username,
      search: `?semesterId=${this.state.selectSemester}`,
    };
    const res = await callApi(params);
    this.setState({data: res.length > 0 ? res : [], loading: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Xem lịch học'}
          left={<BackButton onPress={this.goBack} />}
        />
        <View style={styles.toolBar}>
          <Text style={styles.semester}>{this.state.semester}</Text>
          <TouchableOpacity style={styles.button} onPress={this.onOpen}>
            <Text style={styles.btnText}>Chọn kỳ</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          {!this.state.loading ? (
            this.state.data.map((item, index) => {
              return <ScheduleItem item={item} key={index.toString()} />;
            })
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator size={35} color={appColor.primary} />
            </View>
          )}
          <View style={{height: sizeHeight(30)}} />
        </ScrollView>
        <SemesterModal
          visible={this.state.visible}
          closed={this.onClosed}
          onSearch={this.onSearch}
          list={this.state.listSemesters}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolBar: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: sizeWidth(20),
    paddingTop: sizeHeight(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: sizeHeight(10),
  },
  semester: {
    fontSize: sizeFont(17),
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: sizeWidth(10),
    borderColor: '#98A1BF',
    padding: sizeWidth(3),
    color: appColor.text,
    width: sizeWidth(300),
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#F3B03F',
    height: sizeHeight(30),
    width: sizeWidth(60),
    elevation: 4,
    borderRadius: sizeWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
  body: {
    paddingHorizontal: sizeWidth(20),
    paddingBottom: sizeHeight(20),
  },
  loading: {
    height: sizeHeight(600),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
