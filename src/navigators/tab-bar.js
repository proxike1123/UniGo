import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import {sizeFont, sizeHeight, sizeWidth} from '../helpers/size.helper';
import {appColor} from '../constants/app.constant';


const home_icon = require('../assets/images/home_icon.png');
const user_icon = require('../assets/images/home_user.png');
const noti_icon = require('../assets/images/notify_icon.png');

const tabRoute = [
    {
        icon: home_icon,
        label: 'Trang chủ',
    },
    {
        icon: user_icon,
        label: 'Thông tin SV',
    },
]


function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            key = {index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
          <View style = {styles.container}>
                <View style = {[styles.top, {
                        backgroundColor: isFocused ? 'white' : appColor.primary,
                    }]}/>
                <Image
                    source = {tabRoute[index].icon}
                    style = {[styles.img, {
                        tintColor: isFocused ? "white" : appColor.gray
                    }]}
                    resizeMode = 'contain'
                />
                <Text style={{ color: isFocused ? "white" : appColor.gray }}>
                {tabRoute[index].label}
                </Text>
          </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColor.primary,
        height: sizeHeight(55)
    },
    img: {
        height: sizeHeight(25),
        width: sizeHeight(25),
    },
    top: {
        height: sizeHeight(3),
        width: sizeWidth(30),
        marginBottom: sizeHeight(5)
    }
})