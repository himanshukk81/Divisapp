import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from "react-native";
import HomeScreen from "../screens/home/homeScreen";
import StatisticScreen from "../screens/statistic/statisticScreen";
import PortfolioScreen from "../screens/portfolio/portfolioScreen";
import UserScreen from "../screens/user/userScreen";
import { withNavigation } from "react-navigation";
import { Sizes } from "../constants/styles";

class BottomTabBarScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    currentIndex = this.props.navigation.getParam('index');

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.currentIndex == 1 ?
                    <HomeScreen /> :
                    this.currentIndex == 2 ?
                        <StatisticScreen /> :
                        this.currentIndex == 3 ?
                            <PortfolioScreen /> :
                            <UserScreen />
                }
                <View style={styles.bottomTabBarStyle}>
                    {this.bottomTabBarItem({
                        index: 1,
                        selectedIcon: require('../assets/images/icon/primary-color/home.png'),
                        blurIcon: require('../assets/images/icon/grey/home.png'),
                    })}
                    {this.bottomTabBarItem({
                        index: 2,
                        selectedIcon: require('../assets/images/icon/primary-color/statistic.png'),
                        blurIcon: require('../assets/images/icon/grey/statistic.png'),
                    })}
                    {this.bottomTabBarItem({
                        index: 3,
                        selectedIcon: require('../assets/images/icon/primary-color/portfolio.png'),
                        blurIcon: require('../assets/images/icon/grey/portfolio.png'),
                    })}
                    {this.bottomTabBarItem({
                        index: 4,
                        selectedIcon: require('../assets/images/icon/primary-color/user.png'),
                        blurIcon: require('../assets/images/icon/grey/user.png'),
                    })}
                </View>
            </View>
        )
    }

    bottomTabBarItem({ index, selectedIcon, blurIcon }) {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() =>
                    this.props.navigation.push('BottomTabScreen', {
                        index: index,
                    })
                }
            >
                <Image
                    source={
                        this.currentIndex == index ?
                            selectedIcon :
                            blurIcon
                    }
                    resizeMode="contain"
                    style={{ height: 25.0, width: 25.0 }}
                />
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
    },
    animatedView: {
        alignSelf: 'center',
        backgroundColor: "black",
        position: "absolute",
        bottom: -80,
        borderRadius: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
})



