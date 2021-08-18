import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/back-button';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import {appColor} from '../../../constants/app.constant';

const ScoreDetal = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const {item} = props.route.params;
  return <View style={styles.contain}></View>;
};

export default ScoreDetal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
