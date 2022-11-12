
import { createDrawerNavigator , DrawerContentScrollView} from '@react-navigation/drawer';
import { Platform,FlatList,useWindowDimensions,TouchableOpacity,Image,View,Text,Alert } from 'react-native';
import Constant from '../../utility/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SideMenu } from '../../utility/SideMenu';
import Color from "../../utility/Color";
import RootStack from './RootStack';

const Drawer = createDrawerNavigator();
var propsDrawer;
const width = useWindowDimensions().width * 1.3;
let currentDate = new Date();

function CustomDrawerContent(props) {
      const width = useWindowDimensions().width * 1.3;
      let currentDate = new Date();
      propsDrawer = props;
        return (
          <DrawerContentScrollView {...props}>
                <View style={{flexDirection:'column',justifyContent:'flex-start',marginHorizontal:30}}>

                  <View style={{alignSelf:'flex-start'}}>
                    <Image source={require('../../assets/images/logo.png')}
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
    <View style={[activeIndex == index?{ borderBottomColor:Color.theme,borderBottomWidth:1}:null,{paddingVertical:8,flexDirection:'row',alignItems:'center'  }]}>
        
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

export default DrawerNavigator;