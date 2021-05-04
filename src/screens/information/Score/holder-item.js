import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {sizeHeight, sizeWidth} from '../../../helpers/size.helper';


const HolderItem = () => {
    return (
        <View style = {styles.holderContainer}>
            <SkeletonPlaceholder>
                <View style = {{
                    width: sizeWidth(200),
                    height: sizeHeight(20),
                    borderRadius: sizeHeight(8)
                }}/>
                <View style = {{
                    width: sizeWidth(330),
                    height: sizeHeight(20),
                    borderRadius: sizeHeight(8),
                    marginTop: sizeHeight(10)
                }}/>
                <View style = {{
                    width: sizeWidth(100),
                    height: sizeHeight(20),
                    borderRadius: sizeHeight(8),
                    marginTop: sizeHeight(10)
                }}/>
                <View style = {{
                    width: "100%",
                    height: sizeHeight(1),
                    borderRadius: sizeHeight(8),
                    marginTop: sizeHeight(10),
                    marginBottom: sizeHeight(10)
                }}/>
                <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style = {{
                        width: sizeWidth(70),
                        height: sizeHeight(60),
                        borderRadius: sizeHeight(8),
                        marginRight: sizeWidth(10)
                    }}>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                    </View>
                    <View style = {{
                        width: sizeWidth(70),
                        height: sizeHeight(60),
                        borderRadius: sizeHeight(8),
                        marginRight: sizeWidth(10)
                    }}>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                    </View>
                    <View style = {{
                        width: sizeWidth(70),
                        height: sizeHeight(60),
                        borderRadius: sizeHeight(8),
                        marginRight: sizeWidth(20)
                    }}>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                        <View style = {{
                            width: sizeWidth(70),
                            height: sizeHeight(15),
                            borderRadius: sizeHeight(8),
                            marginRight: sizeWidth(10),
                            marginBottom: sizeHeight(6)
                        }}/>
                    </View>
                    <View style = {{
                        width: sizeWidth(80),
                        height: sizeHeight(80),
                        borderRadius: sizeHeight(8),
                        borderRadius: sizeHeight(40)
                    }}/>
                </View>
            </SkeletonPlaceholder>
        </View>
    )
}

export default HolderItem;

const styles = StyleSheet.create({
    holderContainer: {
        width: "100%",
        backgroundColor: 'white',
        marginBottom: sizeHeight(25),
        paddingHorizontal: sizeWidth(20),
        paddingVertical: sizeHeight(10),
        borderRadius: sizeWidth(10),
        elevation: 3,
        height: sizeHeight(200)
    }
})