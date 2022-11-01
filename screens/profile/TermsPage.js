import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image
} from "react-native";

import { WebView } from 'react-native-webview';

const TermsPage =(props) =>{
  
    function hideSpinner(){
        // setLoading(false);
    }

    useEffect(async ()  =>{ 

    },[]);

 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={'#111'} />
            <View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                <TouchableOpacity
                        onPress={()=>{
                            // setWebview(false);   
                            props.navigation.goBack();
                        }}
                    >
                    <Image source={require('../../assets/images/icon/close.png')}
                            style={{ height: 20.0, width: 20.0 }}
                            resizeMode="contain"
                    />
                
                </TouchableOpacity>
            </View>
            <WebView source={{ uri: 'https://www.divisapp.com/soporte/terminos/' }} 
                onLoad={() => hideSpinner()}
                onNavigationStateChange={this.loadStart}
            />
        </SafeAreaView>
    )
}

export default TermsPage;