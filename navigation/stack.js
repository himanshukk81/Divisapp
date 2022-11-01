import React,{} from 'react';
import {View, useWindowDimensions,StyleSheet,Platform} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Signin2 from '../screens/auth/signinScreen';
import Profile from '../screens/profile/profile';

const StackNavigator = () => {


    const RootStack = () =>{
        return(
            <Stack.Navigator
                            screenOptions={{
                                headerShown:false,
                                headerRight:(props) =>( // App Logo
                                    <View style={{flexDirection:'row',marginTop:-10,marginRight:10 }}>
                                       
                                    </View>  
                                ),
                                headerStyle: {
                                    backgroundColor: '#444'
                                },
                                headerBackVisible:false
                            }}
                         >
                        <Stack.Screen name="Profile" component={ Profile } options={{
                                    headerShown:false
                        }} />
                        
                        <Stack.Screen name="Login" component={ Signin2 } options={{
                                    headerShown:false
                        }} />

                        

                       
            </Stack.Navigator>
        )
    }

    return (
       
            <SafeAreaProvider>
                    <NavigationContainer>     
                        {/* <DrawerNavigator /> */}
                        <RootStack />
                    </NavigationContainer>
            </SafeAreaProvider>
          );
  };


export default StackNavigator;

const styles = StyleSheet.create({
    contain:{
       
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    menuItemsCard: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    circleContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 10,
    },
  });
