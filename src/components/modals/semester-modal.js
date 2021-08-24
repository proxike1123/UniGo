import React, {Component} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor} from '../../constants/app.constant';
import {ScrollView} from 'react-native-gesture-handler';

export default class SemesterModal extends Component {
  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={index.toString()}
        onPress={() => this.props.onSearch(item)}>
        <View style={styles.itemRow}>
          <Image
            style={styles.itemImg}
            source={require('../../assets/images/book.png')}
          />
          <Text style={styles.itemText}>{item.semester_name}</Text>
          <Image
            style={styles.itemArrow}
            source={require('../../assets/images/right.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Modal visible={this.props.visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.closed}>
          <View style={styles.container}>
            <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" />
            <TouchableWithoutFeedback onPress={() => null}>
              <View style={styles.modal}>
                <View style={styles.header}>
                  <Text style={styles.title}>Chọn kỳ</Text>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={this.props.closed}>
                    <Image
                      source={require('../../assets/images/close.png')}
                      style={styles.img}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.body}>
                  {this.props.list.map((item, index) => {
                    return this.renderItem(item, index);
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
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
    color: appColor.text,
  },
  modal: {
    position: 'absolute',
    height: '60%',
    width: '100%',
    top: '40%',
    backgroundColor: 'white',
    borderTopLeftRadius: sizeWidth(25),
    borderTopRightRadius: sizeWidth(25),
  },
  header: {
    height: sizeHeight(50),
    borderBottomWidth: sizeHeight(1),
    borderColor: '#EFF1F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: sizeWidth(20),
    paddingVertical: sizeHeight(20),
  },
  title: {
    fontWeight: 'bold',
    fontSize: sizeFont(19),
  },
  img: {
    width: sizeWidth(30),
    height: sizeHeight(30),
    tintColor: '#98A1BF',
  },
  closeBtn: {
    position: 'absolute',
    left: sizeWidth(15),
  },
  itemContainer: {
    width: '100%',
    marginBottom: sizeHeight(20),
    justifyContent: 'center',
    borderBottomWidth: sizeHeight(1),
    borderColor: '#EFF1F5',
  },
  itemText: {
    color: appColor.text,
    fontSize: sizeFont(17),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImg: {
    width: sizeWidth(25),
    height: sizeHeight(25),
    marginRight: sizeWidth(10),
    tintColor: '#98A1BF',
  },
  itemArrow: {
    position: 'absolute',
    right: sizeWidth(0),
    width: sizeWidth(20),
    height: sizeHeight(20),
    tintColor: '#98A1BF',
  },
});
