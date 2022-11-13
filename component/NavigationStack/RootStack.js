import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accounts from '../../screens/accounts/Accounts';
import BankAccount from '../../screens/accounts/BankAccount';
import BankAccounts from '../../screens/accounts/BankAccounts';
import CreditCard from '../../screens/accounts/CreditCard';
import TermsPage from '../../screens/profile/TermsPage';
import Tabs from './Tabs';
import { TouchableOpacity,Image,View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useEffect, useState } from 'react';
import Signin2 from '../../screens/auth/signinScreen';
import ProgressDetail from '../../screens/operations/progressDetail';
const HomeStack = createNativeStackNavigator();
import ProfileComponent from '../ProfileComponent/ProfileComponent';
const RootStack = (props2) =>{
  const [userInfo, setUserInfo] = useState(null);
  useEffect(async () =>{
    const user = await AsyncStorage.getItem('user')
    let userParse = JSON.parse(user);
    console.log({ussuserParse:userParse})
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
                    {((userInfo && userInfo?.id)) ? (
                    <>
                      <HomeStack.Screen name="Tabs" component={ Tabs } options={{
                                  headerShown:true,
                                  headerTitle:''
                      }} />
                      <HomeStack.Screen name="BankAccounts" component={ BankAccounts } options={{
                                    headerShown:true,
                                    headerBackVisible:false,
                                    headerTitle:''
                        }} 
                      />
                      <HomeStack.Screen name="BankAccount" component={ BankAccount } options={{
                                  headerShown:true,
                                  headerBackVisible:false,
                                  headerTitle:'' 
                      }} />
                      <HomeStack.Screen name="Accounts" component={ Accounts } options={{
                                  headerShown:true,
                                  headerTitle:''
                      }} />
                      <HomeStack.Screen name="creditCard" component={ CreditCard } options={{
                                  headerShown:true,
                                  headerTitle:''
                      }} />
                      <HomeStack.Screen name="Terms" component={ TermsPage } options={{
                                    headerShown:false,
                                    headerTitle:''
                      }} /> 
                      <HomeStack.Screen name="progressDetail" component={ ProgressDetail } options={{
                                    headerShown:true,
                                    headerTitle:''
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
                        <HomeStack.Screen name="Tabs" component={ Tabs  } options={{
                                  headerShown:true
                        }} />
                      </>
                    )}
        </HomeStack.Navigator>
    )
}

export default RootStack;