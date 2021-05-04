import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import ButtonWrapper from '../../components/button-wrapper';
import {sizeFont, sizeWidth, sizeHeight} from '../../helpers/size.helper';
import {appColor, font} from '../../constants/app.constant';
import styleBase from '../../constants/base';
import LinearGradient from 'react-native-linear-gradient';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {style, onPress, text, isOnlyIcon, source, iconStyle} = this.props;

    return (
      <LinearGradient
        colors={[appColor.leftLinear, appColor.rightLinear]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styleBase.shadow, styles.container, style]}>
        <ButtonWrapper
          style={[styleBase.fullParent, styleBase.center, styles.button]}
          onPress={onPress}>
          {!isOnlyIcon && (
            <Text numberOfLines={1} style={[styles.text]}>
              {text}
            </Text>
          )}
          {isOnlyIcon && (
            <Image style={iconStyle} resizeMode="contain" source={source} />
          )}
        </ButtonWrapper>
      </LinearGradient>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  container: {
    height: sizeWidth(46),
    borderRadius: sizeWidth(23),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: sizeHeight(45)
  },
  button: {
    paddingHorizontal: sizeWidth(35),
  },
  text: {
    color: '#FFFFFF',
    fontFamily: font.bold,
    fontWeight: 'bold',
    fontSize: sizeFont(18),
  },
});
