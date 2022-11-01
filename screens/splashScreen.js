import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { Colors, Fonts } from "../constants/styles";
import { CircleFade } from 'react-native-animated-spinkit';

class SplashScreen extends Component {

    render() {
        setTimeout(() => {
            this.props.navigation.navigate('SignIn');
        }, 0);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.whiteColor} />
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.white40Bold }}>
                        CryptoX
                    </Text>
                    <CircleFade size={70} color={Colors.whiteColor}
                        style={{ position: 'absolute', bottom: 50.0 }}
                    />
                </View> */}
                
            </SafeAreaView>

        )
    }
}

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default SplashScreen;