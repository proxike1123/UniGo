import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

class ButtonWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.timeout = null;
    }

    onPress(e) {
        if (this.timeout) clearTimeout(this.timeout);

        let timeout = this.props.pressTimeOut;

        this.timeout = setTimeout(() => {
            this.props.onPress(e);
        }, timeout);
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback {...this.props}
                        hitSlop={this.props.hitSlot}
                        onPress={this.onPress.bind(this)}
                        disabled={this.props.disabled}>
                    <View {...this.props}>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableOpacity {...this.props}
                activeOpacity={this.props.activeOpacity}
                hitSlop={this.props.hitSlot}
                disabled={this.props.disabled}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}


export default ButtonWrapper;