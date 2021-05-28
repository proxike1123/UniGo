import React from "react";
import { Component } from "react";
import {View, StyleSheet} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { appColor } from "../constants/app.constant";
import { sizeHeight, sizeWidth } from "../helpers/size.helper";

export default class CustomeCheckBox extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {title, value} = this.props;
        return (
            <View>
                <BouncyCheckbox
                    isChecked = {value}
                    style = {styles.checkbox}
                    size={25}
                    fillColor= {appColor.primary}
                    unfillColor="#FFFFFF"
                    text= {title}
                    iconStyle={{ borderColor: appColor.primary, borderRadius: sizeWidth(4)}}
                    textStyle={{
                        textDecorationLine: 'none',
                    }}
                    disableBuiltInState
                    onPress={() => this.props.onchange()}
                />
            </View>
        )
    }
}   

const styles = StyleSheet.create({
    checkbox: {
        marginVertical: sizeHeight(10),
        marginHorizontal: sizeWidth(30)
    }
})