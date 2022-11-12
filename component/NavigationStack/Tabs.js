import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GraphStacks from './GraphStack';
import HomeStacks from './HomeStack';
import OperationStacks from './OperationStack';
import ProfileStacks from './ProfileStacks';
import WebPageStacks from './WebPageStacks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBar from '../../navigation/BottomTabBar';
import React,{ useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();

const Tabs = () =>{
  const [userInfo, setUserInfo] = useState(null);

    useEffect(()=>{
      // const user = await AsyncStorage.getItem('user')
      // const accessToken = await AsyncStorage.getItem('access_token');
      // let userParse = JSON.parse(user);

      // setUserInfo(userParse);
    });
    return(
        <Tab.Navigator
            initialRouteName={(userInfo?.status==1 || userInfo?.status==2)?'Cambiar':'profile'}
            tabBar={props => <BottomTabBar {...props}  /> }
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused}) => {                  
                return (
                        <View style={[focused?{opacity:1}:{opacity:0.9}, {flexDirection:'row' , alignItems:'center' }]}>
                              
                            <Text style={[{textAlign:'left',color:'#444',fontWeight:'bold',fontSize:13 }]}>
                                { route.name}
                            </Text>
                        </View>    
                        
                        );
                },
                tabBarOptions:{
                    pressColor: 'red'
                },
                tabBarActiveTintColor: '#ee2737',
                tabBarInactiveTintColor: 'black',
            })}
            
            >
            <Tab.Screen
                name="profile"
                component={ProfileStacks}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    // Prevent default action
                    e.preventDefault();
                    propsDrawer.navigation.navigate('BankAccounts');
                    // Do something with the `navigation` object
                    // navigation.navigate("PhotoNavigation"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  },
                })}
                options={{  
                                  
                  tabBarLabel: 'Cuentas',
                  tabBarIconPath:require('../../assets/images/bottomIcon/accounts.png'),
                
                  headerShown:false,
                  tabBarHideOnKeyboard:true,
                  // tabPress:()=><TouchableOpacity onPress={()=>{
                  //   console.log("Toucbable click:")
                  //   propsDrawer.navigation.navigate('BankAccounts');
                  // }}
                  // ></TouchableOpacity>,

                }}  
            />
            <Tab.Screen
                name="Operaciones"
                component={OperationStacks}
                options={{
                  tabBarLabel: 'Operaciones',
                  tabBarIconPath:require('../../assets/images/bottomIcon/operation.png'),
                  
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                }}
            />

            <Tab.Screen
                name="Cambiar"
                component={HomeStacks}
                options={{
                  tabBarLabel: 'Cambiar',
                  

                  tabBarIconPath:require('../../assets/images/bottomIcon/dollar.png'),
               
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                }}
                
            />

            <Tab.Screen
                name="T. Cambio"
                component={ GraphStacks }
                options={{
                  tabBarLabel: 'T. Cambio',
                  tabBarIconPath:require('../../assets/images/bottomIcon/statistic.png'),
                 
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                }}
            />

            <Tab.Screen
                name="Ayuda"
                component={ WebPageStacks}
                options={{
                  tabBarLabel: 'Ayuda',
                  tabBarIconPath:require('../../assets/images/bottomIcon/help.png'),
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                }}
            />
    </Tab.Navigator>
    )
}

export default Tabs;