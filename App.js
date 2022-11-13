import React,{ useEffect, useState } from 'react';
import {Alert, ImageBackground} from 'react-native';
import { NavigationContainer , createNavigationContainerRef} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import Constant from './utility/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './utility/FirebaseConfig';
import DrawerNavigator from './component/NavigationStack/DrawerNavigator';
export const navigationRef = createNavigationContainerRef();

const App =  () => {
    let app;
    if (firebase.apps.length === 0) {
        app = firebase.initializeApp(firebaseConfig)
    } else {
        app = firebase.app()
    }
    const [splash, setSplash] = useState(true);
    const navigationRef = createNavigationContainerRef();

    useEffect( async () => {
      fetchData();
      crashlytics().log('App mounted.');   
      if(app){
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("token::",fcmToken);
        } 
        messaging().setAutoInitEnabled(true);
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });
        return unsubscribe;
      }
    }, []);
    // fetch userData
    const fetchData = async ()=>{
        const user = await AsyncStorage.getItem('user')
        let userParse = JSON.parse(user);
        setTimeout(()=>{
          if(userParse?.status == 1 || userParse?.status == 2){
            navigationRef.navigate('Cambiar')
          }
          setSplash(false);
        },2500);
    }
    return (
            <SafeAreaProvider>
                    {(splash) ?
                      <ImageBackground
                        source={require('./assets/splash_1.png')}
                        style={{
                          width: Constant.width, height: Constant.height,
                          alignItems: "center", justifyContent: "center"
                        }} resizeMode="cover">

                      </ImageBackground>:
                        <NavigationContainer>     
                            <MenuProvider>
                               <DrawerNavigator />
                            </MenuProvider>
                        </NavigationContainer>

                    }     
            </SafeAreaProvider>
          
          );
};

export default App;
