import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/back-button';
import {sizeFont, sizeHeight, sizeWidth} from '../../../helpers/size.helper';
import {appColor} from '../../../constants/app.constant';

const ResultDetail = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };
  const {item} = props.route.params;
  return (
    <View style={styles.contain}>
      <Header
        title={`Học kỳ ${item.semester}`}
        left={<BackButton onPress={goBack} />}
      />
      <View style={styles.container}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>TC đăng ký </Text>
          <Text style={styles.content}> {item.registered_credit}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={[styles.title]}>TC Học lại </Text>
          <Text style={[styles.content, {color: 'red'}]}>
            {' '}
            {item.relearn_credit ? item.relearn_credit : 0}
          </Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm TBC T4 </Text>
          <Text style={[styles.content]}>{item.avg_b4}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm TBC T104 </Text>
          <Text style={[styles.content]}>{item.avg_b10}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm TBC học bổng </Text>
          <Text style={[styles.content]}>{item.avg_scholar}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm rèn luyện </Text>
          <Text style={[styles.content]}>{item.moral_points}</Text>
        </View>
        <View
          style={[styles.row, {marginTop: 0, justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Số TC tích lũy </Text>
          <Text style={[styles.content]}>{item.saved_credits}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm TBC tích lũy T4 </Text>
          <Text style={[styles.content]}>{item.avg_saved_credit_b4}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Điểm TBRL các kỳ </Text>
          <Text style={[styles.content]}>{item.avg_moral}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.title}>Bị cảnh báo KQHT </Text>
          <Text style={[styles.content, {color: 'red'}]}>
            {item.warnings != '' ? item.warnings : 'Không'}
          </Text>
        </View>
        <View
          style={{
            height: sizeWidth(1),
            backgroundColor: '#E7E7E7',
            marginTop: sizeHeight(10),
            marginBottom: sizeHeight(20),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: sizeHeight(6),
          }}>
          <Text style={[styles.title, {color: appColor.primary}]}>
            Xếp loại học tập
          </Text>
          <Text
            style={{
              color: 'green',
              borderRadius: sizeWidth(4),
              borderColor: 'green',
              borderWidth: sizeWidth(1),
              padding: sizeWidth(4),
              alignSelf: 'flex-end',
            }}>
            {item.study_classify != '' ? item.study_classify : 'Chưa có'}
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
      </View>
    </View>
  );
};

export default ResultDetail;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    marginTop: sizeHeight(20),
    width: '90%',
    backgroundColor: 'white',
    marginBottom: sizeHeight(10),
    paddingHorizontal: sizeWidth(20),
    paddingVertical: sizeHeight(20),
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
    color: appColor.primary,
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
    marginBottom: sizeHeight(15),
  },
  type: {
    paddingVertical: sizeHeight(2),
    fontSize: sizeFont(14),
    color: 'green',
    fontWeight: 'bold',
  },
});
