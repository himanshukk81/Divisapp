import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
const BottomTabBar = (props) => {
    const {state, descriptors, navigation} = props;

    useEffect(()=>{
        console.log({props2:props});
    },[]);
    let showNotificationModal=state?.routes?.[state.index]['params']?.['modal']
    return (
        
        <View style={styles.container}>
            {state.routes.map((route,index) => {
                const {options} = descriptors[route.key];

                const imgIcon = options.tabBarIconPath;
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const Icon =
                    options.tabBarIcon !== undefined
                        ? options.tabBarIcon
                        : () => <></>;

              
                const isFocused = state.index === index;
                if(state.index==0){
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                      
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: route.name }]
                            })
                        );

                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        style={[styles.tabWrapper,{ backgroundColor: isFocused? '#FFF' : '#FFF' }]}
                        accessibilityState={ route.name=='Switching Program'? { selected: true } : {selected: false}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}>
                            <View style={[isFocused?{opacity:1}:{opacity:0.5} ]}>    
                                {/* <Icon /> */}
                                <View style={{flexDirection:'column',alignItems:'center'}}>
                                    <Image source={imgIcon}
                                        style={{ height: 22, width: 22 }}
                                        resizeMode="contain"
                                        tintColor={isFocused?'#ee2737':'black'}
                                    />
                                    <Text style={[{textAlign:'left',color:isFocused?'#ee2737':'#444',fontWeight:'bold',fontSize:13 }]}>
                                            {label}
                                    </Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 67
    },
    tabWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        opacity: 0.5,
        marginTop: 10,
        color: '#000000',
    },
    tabTextIsFocused: {
        opacity: 1,
    }
});

export default BottomTabBar;
