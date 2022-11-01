import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';

class RegisterScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Feather name="arrow-left" size={25} color="black"
                        style={{ position: 'absolute', left: 15.0, top: 20.0 }}
                    />
                    {logo()}
                    {registerText()}
                    {userNameTextField()}
                    {emailTextField()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {this.continueButton()}
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('OTP')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Continue</Text>
            </TouchableOpacity>
        )
    }
}

function confirmPasswordTextField() {
    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
                secureTextEntry={true}
            />
        </View>
    )
}

function passwordTextField() {
    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
                secureTextEntry={true}
            />
        </View>
    )
}

function emailTextField() {
    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
            />
        </View>
    )
}

function userNameTextField() {
    return (
        <View style={styles.textFieldContainerStyle}>
            <TextInput
                placeholder="Username"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
            />
        </View>
    )
}

function registerText() {
    return (
        <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0 }}>
            Register your account
        </Text>
    )
}

function logo() {
    return (
        <Image source={require('../../assets/images/auth-icon.png')}
            style={{ alignSelf: 'center', width: 150.0, height: 150.0, marginBottom: Sizes.fixPadding }}
            resizeMode="contain"
        />
    )
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(RegisterScreen);