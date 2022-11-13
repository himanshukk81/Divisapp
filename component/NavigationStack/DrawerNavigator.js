
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Platform } from 'react-native';
import Constant from '../../utility/Constant';
import CustomDrawer from './CustomDrawer';
import RootStack from './RootStack';
import React,{ useEffect, useState } from 'react';

const Drawer = createDrawerNavigator();


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
            drawerContent={(props) => <CustomDrawer {...props} /> }
        >
       
        <Drawer.Screen name="Home" component={ RootStack } options={{
            headerShown:false
        }} />
    </Drawer.Navigator>
    );
}

export default DrawerNavigator;