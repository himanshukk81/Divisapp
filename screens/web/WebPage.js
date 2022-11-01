import React, { useEffect , useState  } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import Color from "../../utility/Color";

import { WebView } from 'react-native-webview';

const WebPage =(props,{navigation}) =>{
    const [isLoading , setLoading ] = useState(true);
    const [webUrl , setWebUrl ] = useState('');

    useEffect(async ()  =>{ 
        // console.log({propsprops:props});
        console.log({propsprops:props.params})
        console.log("props data::::",JSON.stringify(props));
       
        if(props?.route?.params.path){
            setWebUrl(props?.route?.params.path);
        }        
    },[]);
    useFocusEffect(()=>{
        console.log("isFocussedddd::")
        if(props?.route?.params.path){
            setWebUrl(props?.route?.params.path);
        }
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#111'} />
            <View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                <TouchableOpacity
                        onPress={()=>{
                            props.navigation.goBack();
                        }}
                    >
                    <Image source={require('../../assets/images/icon/close.png')}
                            style={{ height: 20.0, width: 20.0 }}
                            resizeMode="contain"
                    />
                
                </TouchableOpacity>
            </View>
            {isLoading &&
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={Color.theme}  />
                </View>}
                
            
                <WebView source={{ uri:webUrl!=''?webUrl:'https://chatting.page/divisappperu' }} 
                    onLoad={() => {
                        console.log("Onload");
                        setLoading(false);
                    }}
                    onNavigationStateChange={()=>{

                    }}
                />
        </SafeAreaView>
    )
}

export default WebPage;