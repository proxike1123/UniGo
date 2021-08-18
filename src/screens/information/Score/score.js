import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/back-button';
import * as Animatable from 'react-native-animatable';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import {appColor} from '../../../constants/app.constant';
import ScoreItem from './score-item';
import {getSession, getUsername} from '../../../store/store';
import callApi from '../../../api/callAPI';
import HolderItem from './holder-item';

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: '',
      visible: false,
      search: '',
      sdata: [],
      holder: true,
      keyWord: '',
    };
  }
  goBack = () => {
    this.props.navigation.goBack();
  };

  onSearch = async () => {
    this.setState({holder: true});
    const username = await getUsername();
    const params = {
      command: 'study_result',
      username: username,
      search: this.state.keyWord,
    };
    const res = await callApi(params);
    this.setState({sdata: res, holder: false});
  };

  componentDidMount = async () => {
    this.onSearch();
  };

  renderData = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
      {this.state.sdata.map((item, index) => {
        return (
          <ScoreItem
            item={item}
            key={index.toString()}
            onPress={() =>
              this.props.navigation.navigate('ScoreDetail', {item})
            }
          />
        );
      })}
      <View style={{height: sizeHeight(30)}} />
    </ScrollView>
  );

  renderHolder = () => {
    return (
      <View
        style={{
          height: sizeWidth(450),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={35} color={appColor.primary} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Xem điểm'}
          left={<BackButton onPress={this.goBack} />}
        />
        <View style={styles.toolBar}>
          <View style={styles.searchInput}>
            <Image
              source={require('../../../assets/images/search.png')}
              style={styles.img}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập môn học"
              value={this.state.keyWord}
              onChangeText={(text) => this.setState({keyWord: text})}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={this.onSearch}>
            <Text style={styles.searchText}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        {this.state.holder ? this.renderHolder() : this.renderData()}
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
    alignItems: 'center',
    paddingHorizontal: sizeWidth(10),
    justifyContent: 'space-between',
    marginHorizontal: sizeWidth(10),
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
  img: {
    width: sizeWidth(20),
    height: sizeWidth(20),
    tintColor: appColor.text,
    marginRight: sizeWidth(10),
  },
  input: {
    height: sizeHeight(40),
    width: sizeWidth(240),
    fontSize: sizeFont(16),
  },
  searchBtn: {
    backgroundColor: '#F3B03F',
    elevation: 4,
    borderRadius: sizeWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizeWidth(8),
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: sizeWidth(4),
    borderColor: '#98A1BF',
    backgroundColor: 'white',
    marginVertical: sizeWidth(20),
    paddingLeft: sizeWidth(10),
  },
  searchText: {
    color: 'white',
    fontSize: sizeFont(16),
  },
});
