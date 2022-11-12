import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accounts from '../../screens/accounts/Accounts';
import BankAccount from '../../screens/accounts/BankAccount';
import BankAccounts from '../../screens/accounts/BankAccounts';
import CreditCard from '../../screens/accounts/CreditCard';
import TermsPage from '../../screens/profile/TermsPage';
import Tabs from './Tabs';
import { TouchableOpacity,Image,View,Text,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useEffect, useState } from 'react';

import Signin2 from '../../screens/auth/signinScreen';

import ProgressDetail from '../../screens/operations/progressDetail';


import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const HomeStack = createNativeStackNavigator();

import AppStyles from '../../AppStyles';

const styles = AppStyles;
const confirmationAlert = (props) =>{
  Alert.alert(
      '¿Desea Cerrar Sesión?',
      'Te estaremos esperando.', // <- this part is optional, you can pass an empty string
      [
        {text: 'Cerrar Sesión', onPress: () => {    
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('access_token');
          setTimeout(()=>{
            // props.navigation.navigate('Login');
            // navigationRef.navigate('Login')
            propsDrawer.navigation.navigate('Login')
            _menu.close();
          },600);
        }},
        {text: 'Seguir Conectado', onPress: () => {
              console.log('cancel');
        }},
      ],
      {cancelable: false},
    );
}
function ProfileComponent({props},props2) {
  return(
      <View style={{flexDirection:'row',alignSelf:'flex-end' }}>
          <Menu ref={(ref) => (_menu = ref)}>
              <MenuTrigger>
                      <Image source={require('../../assets/images/icon/userProfile.png')}
                          style={{ height: 32, width: 32 }}
                          resizeMode="contain"
                      />
              </MenuTrigger>

              <MenuOptions >
            
                <MenuOption onSelect={() => {
                    
                  }}>
                    <TouchableOpacity onPress={()=>{
                        props.navigation.navigate('profile');
                        _menu.close();
                        // navigationRef.navigate(' ')
                      }}> 
                      <View style={styles.menuProfile}> 
                        <Text style={{color:'#444'}}>Mi Perfil</Text>

                        <Image source={require('../../assets/images/icon/user1.png')}
                              style={styles.imageIcon}
                              resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                </MenuOption>
                <MenuOption onSelect={() => {
                      props.navigation.navigate('ChangePass');
                      _menu.close();
  
                  }}>
                    <View style={styles.menuProfile}>
                      <Text style={{color:'#444'}}>Cambiar Contrasena</Text>
                      <Image source={require('../../assets/images/icon/password.png')}
                            style={styles.imageIcon}
                            resizeMode="contain"
                      />
                    </View>
                </MenuOption>
                <MenuOption onSelect={() => {

                }}>
                  <TouchableOpacity onPress={()=>{
                                              confirmationAlert(props);

                                          }}> 
                      <View style={styles.menuProfile}>   
                        
                          <Text style={{color:'#444'}}>Cerrar Sesion</Text>
                          <Image source={require('../../assets/images/icon/logout.png')}
                                style={styles.imageIcon}
                                resizeMode="contain"
                          />
                        
                      </View>
                    </TouchableOpacity>  
                </MenuOption>  

                <MenuOption onSelect={() => {

                }}>
                 <View style={styles.menuProfile}>     
                  <Text style={{color:'#444'}}>Mensajes</Text>
                  <Image source={require('../../assets/images/icon/notification.png')}
                          style={styles.imageIcon}
                          resizeMode="contain"
                    />
                 </View>
              </MenuOption>   
              
              </MenuOptions>

          </Menu>
    </View>
  )
} 
const RootStack = (props2) =>{
  const [userInfo, setUserInfo] = useState(null);

  useEffect(async () =>{
    const user = await AsyncStorage.getItem('user')
    let userParse = JSON.parse(user);
    setUserInfo(userParse);
  },[]);
    return(
        <HomeStack.Navigator
                        screenOptions={{
                            headerShown:false,
                            headerLeft:(props) =>( // App Logo
                                <View style={{flexDirection:'row',alignItems:'center', marginTop:-5,marginRight:10 }}>
                                  <TouchableOpacity onPress={()=>{
                                      props2.navigation.openDrawer();
                                  }}>
                                    <Image source={require('../../assets/images/icon/menu2.png')}
                                        style={{ height: 20, width: 25 }}
                                        resizeMode="contain"
                                    />

                                   
                                  </TouchableOpacity>
                                   <View style={{marginLeft:10}}> 
                                    <Image source={require('../../assets/images/logo.png')}
                                        style={{ height: 60, width: 130 }}
                                        resizeMode="contain"
                                    />
                                    </View>
                                </View>  
                            ),

                            headerRight:(props) =>( // App Logo
                              <View style={{flexDirection:'row',alignItems:'center', marginTop:-5,marginRight:10 }}>
                                  <ProfileComponent props={props2} />
                                  
                              </View>  
                            ),
                            headerStyle: {
                                backgroundColor: '#FFF'
                            },
                            headerTitle:'',
                            headerBackVisible:true
                        }}
                     >
                    {(userInfo && userInfo?.id) ? (
                    <>

                     
                      {/* <HomeStack.Screen name="ExchangeRate" component={ ExchangeRate } 
                                    options={{
                                                headerShown:false
                      }} /> */}

                      <HomeStack.Screen name=" " component={ Tabs } options={{
                                  headerShown:true
                                  // headerShown:!hideHeader?true:false,
                      }} />

                      
                      <HomeStack.Screen name="    " component={ BankAccounts }
                        
                        options={{
                                    headerShown:true,
                                    headerBackVisible:false,
                                    headerBackTitleVisible: false,  
                        }} 
                      />
                      <HomeStack.Screen name="                       " component={ BankAccount } options={{
                                  headerShown:true,
                                  headerBackVisible:false,
                                  headerBackTitleVisible: false,  
                      }} />
                      <HomeStack.Screen name="             " component={ Accounts } options={{
                                  headerShown:true,
                                  headerBackVisible:false,
                                  headerBackTitleVisible: false,  
                      }} />

                      
                      <HomeStack.Screen name="           " component={ CreditCard } options={{
                                  headerShown:true,
                                  headerBackVisible:false,
                                  headerBackTitleVisible: false,  
                      }} />
                    
                      
                      <HomeStack.Screen name="Terms" component={ TermsPage } options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} />
                       
                      <HomeStack.Screen name="                                 " component={ ProgressDetail } options={{
                                    headerShown:true,
                                  //  headerBackVisible:true,
                                  //  headerBackTitleVisible: false,  
                                    headerTitle:null
                      }} />
                        
                      <HomeStack.Screen name="Login" component={ Signin2 } options={{
                                    headerShown:false,
                                    headerTitle:''
                      }} />

                    </>
                    ) : (
                      <>
                        <HomeStack.Screen name="Login" component={ Signin2 } options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} />

                        <HomeStack.Screen name="Terms" component={ TermsPage } options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} />
                        <HomeStack.Screen name=" " component={ Tabs  } options={{
                                  headerShown:true
                        }} />

                      </>
                    )}
                    
        </HomeStack.Navigator>
    )
}

export default RootStack;