import {View ,Image , TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';

import AppStyles from '../../AppStyles';
const styles = AppStyles;

const ProfileComponent = (props) =>{

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

export default ProfileComponent;