import React, {Component} from 'react';
import {Text, View, Image, TextInput, StyleSheet} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../../helpers/size.helper';
import {appColor, font} from '../../constants/app.constant';
import styleBase from '../../constants/base';

class InputView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      style,
      placeholder,
      icon,
      iconStyle,
      value,
      errorMessage,
      onChangeText,
      keyboardType,
      returnKeyType,
      autoCapitalize,
      onSubmitEditing,
      secureTextEntry,
    } = this.props;

    let borderColor = !!errorMessage
      ? appColor.error
      : !!value
      ? appColor.primary
      : 'rgba(0,0,0,.5)';
    let textColor = !!errorMessage ? appColor.error : appColor.textColor;

    return (
      <View style={[style]}>
        <View style={[styles.container, {borderColor}]}>
          <Image source={icon} style={[styles.icon, iconStyle]} />
          <TextInput
            style={[styles.input, {color: textColor}]}
            value={value}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            ref={this.props.inputRef}
            keyboardType={keyboardType}
            placeholderTextColor="rgba(0,0,0,.5)"
            placeholder={placeholder}
            onChangeText={onChangeText}
          />
        </View>
        <Text style={[styleBase.text12, styles.error, styleBase.textCenter]}>
          {errorMessage}
        </Text>
      </View>
    );
  }
}

export default InputView;

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(328),
    height: sizeWidth(50),
    paddingHorizontal: sizeWidth(20),
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizeWidth(25),
    borderColor: 'rgba(0, 0, 0, 0.5)',
    marginVertical: sizeHeight(5)
  },
  icon: {
    height: sizeWidth(27),
    width: sizeWidth(27),
    tintColor: "black",
  },
  input: {
    flex: 1,
    fontFamily: font.medium,
    fontWeight: '500',
    marginLeft: sizeWidth(12),
    fontSize: sizeFont(17),
    lineHeight: sizeFont(18),
    color: appColor.textColor,
  },
  error: {
    marginTop: sizeWidth(4),
    color: appColor.error,
    fontSize: sizeFont(16),
  },
});
