
import React from "react";
import { View } from "react-native";
// import * as Font from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}></View>
        )
    }
}

