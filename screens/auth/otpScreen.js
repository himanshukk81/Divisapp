import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

class OTPScreen extends Component {

    state = {
        isLoading: false
    }

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
                    {otpText()}
                    {this.otpFields()}
                    {resendInfo()}
                    {this.continueButton()}
                </View>
                {this.loading()}
            </SafeAreaView>
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={48} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.gray15Medium, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.navigate('SecurePin');
                    }, 2000);
                }}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Continue</Text>
            </TouchableOpacity>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsContainerStyle}>
                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        style={{ ...Fonts.black17SemiBold, }}
                        onChangeText={() => { this.secondTextInput.focus(); }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        style={{ ...Fonts.black17SemiBold, }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={() => { this.thirdTextInput.focus(); }}
                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        style={{ ...Fonts.black17SemiBold, }}
                        keyboardType="numeric"
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={() => { this.forthTextInput.focus(); }}

                    />
                </View>

                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        style={{ ...Fonts.black17SemiBold, }}
                        keyboardType="numeric"
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={() => {
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('SecurePin');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }
}

function resendInfo() {
    return (
        <View style={styles.resendInfoContainerStyle}>
            <Text style={{ ...Fonts.gray15Medium }}>
                Did'nt receive OTP Code!
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding }}>
                Resend
            </Text>
        </View>
    )
}

function otpText() {
    return (
        <Text style={{
            ...Fonts.gray16Bold, alignSelf: 'center',
            ...styles.otpTextContainerStyle,
        }}>
            Enter the otp code from the phone we just sent you
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
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0
    },
    resendInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    otpTextContainerStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    otpFieldsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
})

OTPScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OTPScreen);