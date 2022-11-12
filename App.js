import React,{ useEffect, useState } from 'react';
import {View, useWindowDimensions,StyleSheet,Platform,FlatList,Text,Image, TouchableOpacity,Alert, ImageBackground} from 'react-native';
import { NavigationContainer , createNavigationContainerRef} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Signin2 from './screens/auth/signinScreen';
import Profile from './screens/profile/Profile';
import { MenuProvider } from 'react-native-popup-menu';
import { createDrawerNavigator , DrawerContentScrollView ,DrawerItem} from '@react-navigation/drawer';

import BottomTabBar from './navigation/BottomTabBar';

import Constant from './utility/Constant';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/homeScreen';
import TermsPage from './screens/profile/TermsPage';
import Accounts from './screens/accounts/Accounts';
import CreditCard from './screens/accounts/CreditCard';
import BankAccount from './screens/accounts/BankAccount';
import BankAccounts from './screens/accounts/BankAccounts';
import WebPage from './screens/web/WebPage';
import Operations from './screens/operations/Operations';
import ProgressDetail from './screens/operations/progressDetail';
import FaqPage from './screens/FAQ/faq';
import { WebView } from 'react-native-webview';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import ExchangeRate from './screens/ExchangeRate/ExchangeRate';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Color from "./utility/Color";

// import store from './app/store';

const Drawer = createDrawerNavigator();

const HomeStack = createNativeStackNavigator();

const OperationStack = createNativeStackNavigator();

const ProfileStack = createNativeStackNavigator();

const GraphStack = createNativeStackNavigator();

const WebPageStack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

export const navigationRef = createNavigationContainerRef()

const leftItems = [

  {
    'id':1,
    'name':'Cambiar Dolares',
    'icon':require('./assets/images/sideIcon/dollar.png'),
    'rightIcon':false,
    'path':'HomeS',
    'checked':false,
    'submenhus':[]
  },
  {
    'id':2,
    'name':'Operaciones',
    'icon':require('./assets/images/sideIcon/operation.png'),
    'rightIcon':false,  
    'path':'Operaciones',
    'checked':false,
    'submenhus':[]
  },
  {
    'id':3,
    'name':'Cuentas y Tarjetas',
    'icon':require('./assets/images/sideIcon/calendar.png'),  
    'submenhus':[
      {
        'name':'Cuentas Bancarias',
        'icon':require('./assets/images/sideIcon/bank.png'),
        'path':'BankAccounts'
      },
      {
        'name':'Tarjetas de Credito',
        'icon':require('./assets/images/sideIcon/credit-card.png'),
        'path':'Accounts'
      }
    ],
    'isActive':false,
    'rightIcon':true,
    'path':'',
    'checked':false
  },
  {
    'id':4,
    'name':'Tipo de Cambio',
    'icon':require('./assets/images/sideIcon/statistic.png'),
    'submenhus':[
    ],
    'rightIcon':false,
    'path':'ExchangeRate',
    'checked':false
  },
  {
    'id':5,
    'name':'Mi Cuenta',
    'icon':require('./assets/images/sideIcon/user.png'),
    'submenhus':[
      {
        'name':'Perfil',
        'icon':require('./assets/images/sideIcon/user.png'),
        'path':'profile'
      },
      {
        'name':'Cambiar contraseña',
        'icon':require('./assets/images/sideIcon/key.png'),
        'path':'ChangePass'
      }
    ],
    'rightIcon':true,
    'path':'',
    'checked':false
  },
  {
    'id':6,
    'name':'Preguntas Frecuentes',
    'icon':require('./assets/images/sideIcon/help.png'),
    'submenhus':[
     
    ],
    'path':'faq',
    'rightIcon':false,
    'checked':false
  },
  {
    'id':7,
    'name':'Más Información',
    'icon':require('./assets/images/sideIcon/info.png'),
    'submenhus':[
      {
        'name':'- Términos y Condiciones',
        'icon':'',
        'path':'https://www.divisapp.com/soporte/terminos/'
      },
      {
        'name':'- Política de Privacidad',
        'icon':'',
        'path':'https://www.divisapp.com/soporte/politica-privacidad/'
      },
      {
        'name':'- Libro de Reclamaciones',
        'icon':'',
        'path':'https://www.divisapp.com/soporte/libro-de-reclamaciones/'
      }
    ],
    'rightIcon':false,
    'path':'',
    'checked':false
  },
  {
    'id':7,
    'name':'Salir',
    'icon':require('./assets/images/sideIcon/logout.png'),
    'submenhus':[
    ],
    'rightIcon':false,
    'path':'logout',
  }
]





const App =  ({props}) => {

    var propsDrawer;
    var activeIndex = 0;
    const [splash, setSplash] = useState(true);
    // const [activeIndex, setActiveIndex] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const navigationRef = createNavigationContainerRef();
    const [webUrl, setWebUrl] = useState('');

    // const [leftItemsItem , setLeftItems] = useState(leftItems);

    const [refreshTime , setRefresh] = useState(new Date());

    useEffect(()=>{
      fetchData();
    },[]);

    const renderSubmenu = ({ item},navigation) => {
      return(
        <TouchableOpacity onPress={()=>{
          if(item.path.includes('http')){
            propsDrawer.navigation.navigate('Web',{'path':item.path});
          }
          else{
            propsDrawer.navigation.navigate(item.path);
          }
         }}>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,marginVertical:5  }}>
            
        
              {item.icon!='' && <Image source={item.icon}
                style={{ height: 18, width: 18,marginRight:5 }}
                  resizeMode="contain"
              />}
              <Text style={{color:'#444',fontWeight:'bold',textAlign:'left'}}>
                {item.name}
              </Text>
          </View>
        </TouchableOpacity>
      )
    }  
    const renderItem = ({ item,index},props) => {
      return(
        <TouchableOpacity onPress={()=>{
            if(item.submenhus && item.submenhus.length == 0){
              console.log("Pathss:::",item.path);
              if(item.path){
                if(item.path =='logout'){
                  confirmationAlert(props);
                }
                else{
                  propsDrawer.navigation.navigate(item.path);
                }
              }
            }
            else{
              item.checked = !item.checked;
            }
            // setActiveIndex(index)
            activeIndex = index;

         }}>
          <View style={[activeIndex == index?{borderBottomColor:Color.theme,borderBottomWidth:1}:null,{paddingVertical:8,flexDirection:'row',alignItems:'center'  }]}>
            
              <Image source={item.icon}
                style={{ height: 22, width: 22,marginRight:11 }}
                  resizeMode="contain"
              />
              <Text style={{color:'#444',fontWeight:'bold',textAlign:'left'}}>
                {item.name} {item.checked}
              </Text>
    
          </View>
          <View>
              {(item.submenhus) && <FlatList
                    data={item.submenhus}
                    renderItem={(item) => renderSubmenu(item, props)}
                    keyExtractor={item => item.name}
              />}
          </View>
        </TouchableOpacity>
      )
      
    };
    
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
                          <Image source={require('./assets/images/icon/userProfile.png')}
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
    
                            <Image source={require('./assets/images/icon/user1.png')}
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
                          <Image source={require('./assets/images/icon/password.png')}
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
                              <Image source={require('./assets/images/icon/logout.png')}
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
                      <Image source={require('./assets/images/icon/notification.png')}
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

    const fetchData = async ()=>{

        const user = await AsyncStorage.getItem('user')
        const accessToken = await AsyncStorage.getItem('access_token');
        let userParse = JSON.parse(user);

        
        console.log({userParsellll:userParse});

        setUserInfo(userParse);
        setTimeout(()=>{
          console.log({userParseljjjj:userParse});
          if(userParse?.status == 1 || userParse?.status == 2){
            // const jumpToAction = TabActions.jumpTo("Cambiar");
            // navigationRef.dispatch(jumpToAction);
            // propsDrawer.navigation.navigate('Cambiar');
            // alert("navigate to cambiar")
            navigationRef.navigate('Cambiar')
            // propsDrawer.navigation.navigate('Cambiar');
          }
          

          setSplash(false);
        },2500);
    }
   
    function CustomDrawerContent(props) {
        const width = useWindowDimensions().width * 1.3;
        let currentDate = new Date();
        propsDrawer = props;
          return (
            <DrawerContentScrollView {...props}>
                  <View style={{flexDirection:'column',justifyContent:'flex-start',marginHorizontal:30}}>

                    <View style={{alignSelf:'flex-start'}}>
                      <Image source={require('./assets/images/logo.png')}
                          style={{ alignSelf: 'center', width: 150.0, height: 100.0, marginBottom: 1 }}
                          resizeMode="contain"
                      />
                    </View>


                    <View style={{marginTop:'10%'}}>
                      <FlatList
                            data={leftItems}
                            renderItem={renderItem}
                            props={props}
                            keyExtractor={item => item.id}
                      />
                    </View>

                  </View>

            </DrawerContentScrollView>
            );
    }

    const Tabs = () =>{
      return(
          <Tab.Navigator
              initialRouteName={(userInfo?.status==1 || userInfo?.status==2)?'Cambiar':'profile'}
              tabBar={props => <BottomTabBar {...props}  />}
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
                    tabBarIconPath:require('./assets/images/bottomIcon/accounts.png'),
                  
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
                    tabBarIconPath:require('./assets/images/bottomIcon/operation.png'),
                    
                      headerShown:false,
                      tabBarHideOnKeyboard:true,
                  }}
              />

              <Tab.Screen
                  name="Cambiar"
                  component={HomeStacks}
                  options={{
                    tabBarLabel: 'Cambiar',
                    

                    tabBarIconPath:require('./assets/images/bottomIcon/dollar.png'),
                 
                      headerShown:false,
                      tabBarHideOnKeyboard:true,
                  }}
                  
              />

              <Tab.Screen
                  name="T. Cambio"
                  component={GraphStacks}
                  options={{
                    tabBarLabel: 'T. Cambio',
                    tabBarIconPath:require('./assets/images/bottomIcon/statistic.png'),
                   
                      headerShown:false,
                      tabBarHideOnKeyboard:true,
                  }}
              />

              <Tab.Screen
                  name="Ayuda"
                  component={WebPageStacks}
                  options={{
                    tabBarLabel: 'Ayuda',
                    tabBarIconPath:require('./assets/images/bottomIcon/help.png'),
                      headerShown:false,
                      tabBarHideOnKeyboard:true,
                  }}
              />
      </Tab.Navigator>
      )
    }

    const DrawerNavigator = (props) => {

        return (
        <Drawer.Navigator 
                initialRouteName="HomeScreen" 
                screenOptions={{
                    swipeEdgeWidth: 0,  
                    drawerPosition:"left",
                    drawerStyle:{
                        marginLeft:Platform.OS=='ios'?10:0,
                        width:Constant.width>400?270:292
                    }
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
           
            <Drawer.Screen name="Home" component={RootStack} options={{
                headerShown:false
            }} />
        </Drawer.Navigator>
        );
    }
    const RootStack = (props2) =>{

        return(
            <HomeStack.Navigator
                            screenOptions={{
                                headerShown:false,
                                headerLeft:(props) =>( // App Logo
                                    <View style={{flexDirection:'row',alignItems:'center', marginTop:-5,marginRight:10 }}>
                                      <TouchableOpacity onPress={()=>{
                                          props2.navigation.openDrawer();
                                      }}>
                                        <Image source={require('./assets/images/icon/menu2.png')}
                                            style={{ height: 20, width: 25 }}
                                            resizeMode="contain"
                                        />

                                       
                                      </TouchableOpacity>
                                       <View style={{marginLeft:10}}> 
                                        <Image source={require('./assets/images/logo.png')}
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
                            <HomeStack.Screen name=" " component={ Tabs } options={{
                                      headerShown:true
                            }} />

                          </>
                        )}
                        
            </HomeStack.Navigator>
        )
    }

    const HomeStacks = () =>{
        return (
          <HomeStack.Navigator>
              <HomeStack.Screen name="HomeS" component={ HomeScreen } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />

              <HomeStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                          headerShown:false,
                          headerTitle:''
              }} />

              <HomeStack.Screen name="Web" component={ WebPage } 
                        options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} 
              />
              <HomeStack.Screen name="ChangePass" component={ ChangePassword } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />
              <HomeStack.Screen name="Operaciones" component={ Operations } 
                          options={{
                                      headerShown:false
              }} />

              <HomeStack.Screen name="faq" component={ FaqPage } 
                options={{
                            headerShown:false,
                            headerTitle:''
                }} 
              />

              <HomeStack.Screen name="BankAccounts" component={ BankAccounts }
                
                options={{
                            headerShown:false,
                            headerTitle:'' 
                }} 
              />

              <HomeStack.Screen name="BankAccount" component={ BankAccount } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />

              <HomeStack.Screen name="Accounts" component={ Accounts } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />

              
              <HomeStack.Screen name="CreditCard" component={ CreditCard } options={{
                          headerShown:false,
                          headerTitle:'' 
              }} />
            
              
              <HomeStack.Screen name="Terms" component={ TermsPage } options={{
                            headerShown:false,
                            headerTitle:''
              }} />

          </HomeStack.Navigator>
        )
    }
    const OperationStacks = () =>{
      return(
        <OperationStack.Navigator>
            <OperationStack.Screen name="Operaciones" component={ Operations } 
                          options={{
                                      headerShown:false
            }} />
            <OperationStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                          headerShown:false,
                          headerTitle:''
            }} />

            <OperationStack.Screen name="Web" component={ WebPage } 
                        options={{
                                    headerShown:false,
                                    headerTitle:''
                        }} 
            />
            <OperationStack.Screen name="ChangePass" component={ ChangePassword } 
                          options={{
                                      headerShown:false
            }} />
            <OperationStack.Screen name="ProgressDetail" component={ ProgressDetail } 
                          options={{
                                      headerShown:true,
                                      headerTitle:''
            }} />

            <OperationStack.Screen name="faq" component={ FaqPage } 
              options={{
                          headerShown:false,
                          headerTitle:''
              }} 
            />
            <OperationStack.Screen name="BankAccounts" component={ BankAccounts }
              
              options={{
                          headerShown:false,
                          headerTitle:'' 
              }} 
            />

            <OperationStack.Screen name="BankAccount" component={ BankAccount } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />
            <OperationStack.Screen name="Accounts" component={ Accounts } options={{
                        headerShown:false,
                        headerTitle:''  
            }} />

            
            <OperationStack.Screen name="CreditCard" component={ CreditCard } options={{
                        headerShown:false,
                        headerTitle:'' 
            }} />
          
            
            <OperationStack.Screen name="Terms" component={ TermsPage } options={{
                          headerShown:false,
                          headerTitle:''
            }} />

        </OperationStack.Navigator>
      )
    }
    
    const ProfileStacks = () =>{
        return(
          <ProfileStack.Navigator>
                 
                <ProfileStack.Screen name="Profile" component={ Profile } 
                              options={{
                                          headerShown:false,
                                          headerTitle:''
                              }} 
                />
                <ProfileStack.Screen name="BankAccounts" component={ BankAccounts }
                  
                  options={{
                              headerShown:false,
                              headerTitle:'' 
                  }} 
                />
                <ProfileStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                          headerShown:false,
                          headerTitle:''
                }} />
                <ProfileStack.Screen name="Web" component={ WebPage } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
                />
                <ProfileStack.Screen name="ChangePass" component={ ChangePassword } 
                          options={{
                                      headerShown:false
                }} />

                <ProfileStack.Screen name="faq" component={ FaqPage } 
                  options={{
                              headerShown:false,
                              headerTitle:''
                  }} 
                />
               
                <ProfileStack.Screen name="BankAccount" component={ BankAccount } options={{
                            headerShown:false,
                            headerTitle:''  
                }} />
                <ProfileStack.Screen name="Accounts" component={ Accounts } options={{
                            headerShown:false,
                            headerTitle:''  
                }} />

                
                <ProfileStack.Screen name="CreditCard" component={ CreditCard } options={{
                            headerShown:false,
                            headerTitle:'' 
                }} />
              
                
                <ProfileStack.Screen name="Terms" component={ TermsPage } options={{
                              headerShown:false,
                              headerTitle:''
                }} />
          
           </ProfileStack.Navigator>
        )
       
    }

    const GraphStacks = () =>{
      return(
        <GraphStack.Navigator>
              
              
              <GraphStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                        headerShown:false,
                        headerTitle:''
              }} />
              <GraphStack.Screen name="Profile" component={ Profile } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />
              <GraphStack.Screen name="Web" component={ WebPage } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />
              <GraphStack.Screen name="ChangePass" component={ ChangePassword } 
                          options={{
                                      headerShown:false
              }} />
              <GraphStack.Screen name="faq" component={ FaqPage } 
                options={{
                            headerShown:false,
                            headerTitle:''
                }} 
              />
              <GraphStack.Screen name="BankAccounts" component={ BankAccounts }
                
                options={{
                            headerShown:false,
                            headerTitle:'' 
                }} 
              />
              <GraphStack.Screen name="BankAccount" component={ BankAccount } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />
              <GraphStack.Screen name="Accounts" component={ Accounts } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />

              
              <GraphStack.Screen name="CreditCard" component={ CreditCard } options={{
                          headerShown:false,
                          headerTitle:'' 
              }} />
            
              
              <GraphStack.Screen name="Terms" component={ TermsPage } options={{
                            headerShown:false,
                            headerTitle:''
              }} />
        
         </GraphStack.Navigator>
      )
    }

    const WebPageStacks = () =>{
      return(
        <WebPageStack.Navigator>
              
              <WebPageStack.Screen name="Web" component={ WebPage } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />
              <WebPageStack.Screen name="ExchangeRate" component={ ExchangeRate } options={{
                          headerShown:false,
                          headerTitle:''
              }} />

              <WebPageStack.Screen name="ChangePass" component={ ChangePassword } 
                            options={{
                                        headerShown:false,
                                        headerTitle:''
                            }} 
              />
              <WebPageStack.Screen name="faq" component={ FaqPage } 
                options={{
                            headerShown:false,
                            headerTitle:''
                }} 
              />
              <WebPageStack.Screen name="BankAccounts" component={ BankAccounts }
                
                options={{
                            headerShown:false,
                            headerTitle:'' 
                }} 
              />
              <WebPageStack.Screen name="BankAccount" component={ BankAccount } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />
              <WebPageStack.Screen name="Accounts" component={ Accounts } options={{
                          headerShown:false,
                          headerTitle:''  
              }} />

              
              <WebPageStack.Screen name="CreditCard" component={ CreditCard } options={{
                          headerShown:false,
                          headerTitle:'' 
              }} />
            
              
              <WebPageStack.Screen name="Terms" component={ TermsPage } options={{
                            headerShown:false,
                            headerTitle:''
              }} />
        
         </WebPageStack.Navigator>
      )
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

const styles = StyleSheet.create({

    label:{
      color:'#444',
      textAlign:'left'
    },  
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

    menuProfile:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:7,
      paddingVertical:5
    },
    imageIcon:{
      height: 19, width: 19,tintColor:'red'
    }
  });