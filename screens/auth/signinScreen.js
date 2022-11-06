import React, { useEffect, useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import CheckBox from '@react-native-community/checkbox';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import InputBox from "../../component/InputBox";
import { ScrollView } from "react-native-gesture-handler";
import Constant from "../../utility/Constant";

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

import { WebView } from 'react-native-webview';
import {
    AccessToken,
    LoginManager,
  } from 'react-native-fbsdk';
import { showToast, showToastLong } from "../../utility/Index";

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from "../../utility/Color";


const Logo = () => {
    return (
        <Image source={require('../../assets/images/logo.png')}
            style={{ alignSelf: 'center', width: 150.0, height: 110.0, marginBottom: 1 }}
            resizeMode="contain"
        />
    )
}

const SignText = () => {
    return (
        <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginVertical: Sizes.fixPadding + 5.0 }}>
            Iniciar sesión con sus credenciales
        </Text>
    )
}

const Signin2 =(props) =>{
    const [signup, showSignup] = useState(false);
    const [forgot, showForgot] = useState(false);

    const [webViewVisible,setWebView] = useState(false);
    
    const [emailErrorMssg, setEmailErrMssg] = useState('');
    const [passwordErrorMssg, setPasswordErrMssg] = useState('');
    const [nameErrorMssg, setNameErrorMessage] = useState('');
    const [passwordConfirmErrMssg , setPasswordConfirmErrMssg] = useState('');

    const [name, setName] = useState('');
    const [passwordConfirmation, setPassworConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);
    
    const [isCheckRemember, setRemember] = useState(false);


    const [forgotMssg, setForgotMssg] = useState('');
    const [isLoading,setLoading] = useState(false);

    const urls=[
        'https://www.divisapp.com/soporte/terminos/',
        'https://www.divisapp.com/soporte/terminos/',
        'https://www.divisapp.com/soporte/politica-privacidad/',
        'https://www.divisapp.com/soporte/libro-de-reclamaciones/'
    ]
    const [webUrl,setWebUrl] = useState(urls[0]);
    
    function hideSpinner(){
        setLoading(false);
    }

    
    useEffect(async ()  =>{ 

        const email = await AsyncStorage.getItem('email')
        const password = await AsyncStorage.getItem('password')

        console.log("email==="+email+"password==="+password);

        setEmail(email?email:null);
        setPassword(password?password:null);

        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '36225509526-ekp7ceisk6e77heqj39afu86ap7csjqb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    },[]);

    function MenuComponent () {
        return(
            <View style={{marginRight:10, marginTop:12,marginBottom:-16,flexDirection:'row',alignSelf:'flex-end' }}>
                <Menu>
                    <MenuTrigger>
                            <Image source={require('../../assets/images/icon/menu.png')}
                                style={{ height: 15.0, width: 20.0 }}
                                resizeMode="contain"
                            />
                    </MenuTrigger>
                    <MenuOptions>
                    <MenuOption onSelect={() => {
                        setWebUrl(urls[1])
                        setWebView(true);
                        setLoading(true);
                    }}>
                        
                        <Text style={{color:'#444'}}>Términos y Condiciones</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => {
                        setWebUrl(urls[2])
                        setWebView(true);
                        setLoading(true);
                    }} >
                        <Text style={{color:'#444'}}>Políticas de Privacidad</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => {
                        setWebUrl(urls[3])
                        setWebView(true);
                        setLoading(true);
                    }}>
                            
                        <Text style={{color:'#444'}}>Libro de Reclamaciones</Text>

                    </MenuOption>   
                </MenuOptions>
                </Menu>
          </View>
        )
    }
 
    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function renderError(text){
        return(
            <Text style={{
                marginHorizontal:20,
                paddingHorizontal:15,
                marginTop:-10,
                marginBottom:6,
                color:'red'
                }}>
                {text}
            </Text>
        )
    }

    function resetFields(){
        setEmailErrMssg('')
        setPasswordErrMssg('')
        setNameErrorMessage('')
        setPasswordConfirmErrMssg('')

        setName('')
        setPassworConfirmation('')
        setEmail('')
        setPassword('')

    }

    async function registerAsSocial (data){

        let url = Constant.API_URL;

        if(data.type=='facebook'){
            url+='facebooklogin';
        }
        else if(data.type=='google'){
            url+='googlelogin';
        }

        else if(data.type=='linkedin'){
            url+='linkedinlogin';
        }
        else if(data.type=='microsoft'){
            url+='microsoftlogin';
        }
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const options = {
            method: 'POST',
            headers,
        };
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const jsonResposne = await response.json();

        if(jsonResposne.display_message){
            showToast(jsonResposne.display_message);
            return;
        }
        if(jsonResposne.user){
                showToast('Inicio de sesión exitoso');
                storeData(jsonResposne);
                return;
        }
        
        

        
    }

    async function loggedin(type,data){
        
        if(type==2 && !isSelected){
            showToastLong('Por favor, acepte los términos y condiciones');
            return;   
        }
        setLoading(true);
        let url = Constant.API_URL;
        if(type==1){
            url+="login"
        }
        else if(type==2){
            url+="register"
        }

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const options = {
            method: 'POST',
            headers,
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        const jsonResposne = await response.json();
        if(jsonResposne?.message){
            setLoading(false);
            showToastLong(jsonResposne?.message);
            return;
        }
        storeData(jsonResposne,isCheckRemember?data:null);
        
    }

    async function storeData(response,data){
        setLoading(true);
        await AsyncStorage.setItem(
            'user',JSON.stringify(response.user),
        );

        if(data!=null){
            await AsyncStorage.setItem(
                'email',data.email,
            );
    
            await AsyncStorage.setItem(
                'password',data.password,
            );
        }
        
        
        await AsyncStorage.setItem(
            'access_token',response.access_token
        );        
        setTimeout(()=>{
            setLoading(false);
            // props.navigation.navigate(' ');
            props.navigation.reset({
                index: 0,
                routes: [{ name: ' ' }]
           })
        },1800);
    }
    async function forgotPassword(){
        if(!email){
            showToast('Ingrese el correo electrónico');
            return;
        }

        if(!validateEmail(email)){
            showToast('Por favor introduzca un correo electrónico válido !');
            return;
        }

        setLoading(true);
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const options = {
            method: 'POST',
            headers,
        };

        let url = Constant.API_URL;

        url +='forgotpassword';


        if (email) {
            options.body = JSON.stringify({
                'email':email
            });
        }

        const response = await fetch(url, options);
        
        const jsonResposne = await response.json();
        console.log({jsonResposne:jsonResposne});
        setLoading(false);
        if(jsonResposne.message){
                setForgotMssg(jsonResposne.message);
                showToast(jsonResposne.message);
        }


    }

    googleSignIn = async () => {
        try {
            console.log("Signin==");
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();            
            const tokens = await GoogleSignin.getTokens();
            let googleData={
            'type':'google',
            'token':tokens.accessToken
            }
            registerAsSocial(googleData) 

        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    };
    function socialLogin(type){

        console.log("types=="+type);

        if(type=='facebook'){
            LoginManager.logInWithPermissions(['public_profile','email']).then(
                login => {

                    
                  if (login.isCancelled) {
                    console.log('Login cancelled');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {

                        console.log("data===");
                        console.log({data});
                      const accessToken = data.accessToken.toString();
                      console.log("Access token=="+accessToken);

                      let fbData={
                        'type':'facebook',
                        'token':accessToken
                      }
                      registerAsSocial(fbData)
                    });
                  }
                },
                error => {
                  console.log('Login fail with error: ' + error);
                },
            );
        }

        else if(type=='google'){
            googleSignIn();
        }
        else if(type=='linkedin'){

        }
        else if(type=='microsoft'){

        }
        
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={'#111'} />

            {webViewVisible &&<View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                <TouchableOpacity
                        disabled={isLoading?true:false}    
                        onPress={()=>{
                            setWebView(false);
                        }}
                    >
                    <Image source={require('../../assets/images/icon/close.png')}
                            style={{ height: 20.0, width: 20.0 }}
                            resizeMode="contain"
                    />
                
                </TouchableOpacity>
            </View>}

            {(webViewVisible) && 
                
                <WebView source={{ uri: webUrl }} 
                    
                        onLoad={() => hideSpinner()}

                        onNavigationStateChange={this.loadStart}
                />
            }

            {(!webViewVisible && forgot) &&
               <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#f2f2f7' }}>
                        <MenuComponent />

                        <Logo />

                        <View style={{backgroundColor:'#FFF'}}>
                            <Text style={[styles.label,{textAlign:'center'}]}>Restablecer contraseña </Text>
                            <InputBox 
                                placeholder={'Correo electrónico'}
                                icon={require('../../assets/images/icon/email.png')}
                                onChangeText={(email) => {
                                    setEmail(email)
                                }}
                            />
                            

                            {isLoading ?
                            <ActivityIndicator size="large" color={Color.theme} />:
                            <TouchableOpacity
                                            disabled={isLoading?true:false}
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                forgotPassword();
                                                
                                            }}
                                            style={styles.continueButtonStyle}>
                                            <Text style={{ ...Fonts.white16SemiBold }}>
                                                Enviar enlace para restablecer contraseña
                                            </Text>
                            </TouchableOpacity>}

                            
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                                <Text style={styles.label}>Regresar a</Text>
                                <TouchableOpacity 
                                disabled={isLoading?true:false}
                                onPress={()=>{
                                        showForgot(false);
                                        showSignup(false);
                                }}>
                                    <Text style={{color:'blue'}}>Iniciar Sesion</Text>        
                                </TouchableOpacity>

                                

                            </View>
                        </View>
                        
                        {forgotMssg!='' &&
                            <View style={{paddingHorizontal:20}}>
                             <View style={{backgroundColor:'green'}}>
                                <Text style={[styles.label,{color:'white',textAlign:'center'}]}>{forgotMssg}</Text>
                             </View>
                            </View>}
                        
                        <View style={{marginTop:'96%'}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#444'}}>©2022 Peruana de Cambio de Divisas S.A.C.</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#444'}}>RUC 20603968671 | info@divisapp.com</Text>
                            </View>
                        </View>  
                    </View>
                </ScrollView>     
            }
            

            {(!webViewVisible && !forgot) && 
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <MenuComponent />
                        <Logo />
                    
                        <SignText />
                        
                        {signup && 
                                    <InputBox 
                                        placeholder={'Nombre de usuario'}
                                        icon={require('../../assets/images/icon/user.png')}
                                        secure={false}
                                        onChangeText={name => setName(name)}
                                    /> 
                        }
                        {nameErrorMssg!='' && renderError(nameErrorMssg)}

                        
                        

                        
                        <InputBox 
                            value={email}
                            placeholder={'Correo electrónico'}
                            icon={require('../../assets/images/icon/email.png')}
                            onChangeText={(email) => {
                                setEmail(email)
                            }}
                        />
                        {emailErrorMssg!='' && renderError(emailErrorMssg)}


                        <InputBox 
                            value={password}
                            placeholder={'Contrasena'}
                            icon={require('../../assets/images/icon/password.png')}
                            secure={true}
                            onChangeText={(password) => {
                                setPassword(password)
                            }}
                        />

                        {passwordErrorMssg !='' && renderError(passwordErrorMssg)}

                        {!signup &&<View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isCheckRemember}
                                onValueChange={setRemember}
                                style={styles.checkbox}
                                color={isCheckRemember ? '#4630EB' : undefined}
                                tintColors={{ true: Color.theme, false: 'black' }}
                            />
                            <Text style={styles.label}>Recordarme</Text>
                        </View>}

                        {signup &&
                            <View>
                                <InputBox 
                                    placeholder={'Confirmación de contraseña'}
                                    icon={require('../../assets/images/icon/password.png')}
                                    secure={true}
                                    onChangeText={password => setPassworConfirmation(password)}
                                />
                                {/* {passwordConfirmation &&  renderError('Please Enter Password !')} */}
                            </View>
                        }
                        {passwordConfirmErrMssg!='' && renderError(passwordConfirmErrMssg)}
                        {signup &&
                            
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    style={styles.checkbox}
                                    tintColors={{ true: Color.theme, false: 'black' }}
                                />
                                <TouchableOpacity 
                                disabled={isLoading?true:false}
                                onPress={()=>{
                                    setWebView(true);
                                    setLoading(true);
                                    setWebUrl(urls[0]);
                                }}>
                                        <Text style={styles.label}>Acepto los Términos y Condiciones</Text>
                                </TouchableOpacity>
                                

                                
                            </View>
                        }

                        {isLoading ?
                            <ActivityIndicator size="large" color={Color.theme} />:
                            (<TouchableOpacity
                                        disabled={isLoading?true:false}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            setEmailErrMssg('');
                                            setPasswordErrMssg('');
                                            setNameErrorMessage('');
                                            setPasswordConfirmErrMssg('');
                                            if(!email){
                                                setEmailErrMssg('Ingrese el correo electrónico !');
                                                setTimeout(()=>{
                                                    console.log(emailErrorMssg);
                                                },500);   

                                                // return;
                                            }
                                            if(!validateEmail(email)){
                                                setEmailErrMssg('Por favor introduzca un correo electrónico válido !');
                                                // return;
                                            }

                                            if(!password){
                                                setPasswordErrMssg('Por favor, ingrese contraseña !');
                                                // return;
                                            }

                                            if(signup){
                                                if(!name){
                                                    setNameErrorMessage('Ingrese el nombre !');
                                                    // return;
                                                }

                                                if(!password){
                                                    setPasswordConfirmErrMssg('Por favor, ingrese contraseña !');
                                                    // return;
                                                }

                                                if(!passwordConfirmation){
                                                    setPasswordConfirmErrMssg('Por favor ingrese Confirmar contraseña !');
                                                    // return;
                                                }

                                                if(password !=passwordConfirmation){
                                                    setPasswordConfirmErrMssg('Contraseña y confirmar contraseña no coinciden !');
                                                    // return;
                                                }
                                            }

                                            setTimeout(()=>{
                                                if(!signup){
                                                    if(email!='' && password!=''){
                                                        // dispatch(Actions.doLogin({
                                                        //     email:email,
                                                        //     password:password
                                                        // }));

                                                        // loggedin();
                                                        let data={
                                                            email:email,
                                                            password:password
                                                        }
                                                        loggedin(1,data);
                                                    }
                                                }
                                                else{
                                                    if(email!='' && password!='' && name!=''){
                                                        // dispatch(Actions.signUp({
                                                        //     email:email,
                                                        //     password:password,
                                                        //     name:name,
                                                        //     password_confirmation:passwordConfirmation,
                                                        //     terms:1
                                                        // }));
                                                        let data={
                                                            email:email,
                                                            password:password,
                                                            name:name,
                                                            password_confirmation:passwordConfirmation,
                                                            terms:1
                                                        }
                                                        loggedin(2,data);
                                                    }    
                                                }
                                                
                                            },300);
                                            
                                            
                                        }}
                                        style={styles.continueButtonStyle}>
                                        {/* <Text style={{ ...Fonts.white16SemiBold }}>Iniciar sesión</Text> */}
                                        <Text style={{ ...Fonts.white16SemiBold }}>{signup?'Registrarse':'Iniciar sesión'}</Text> 
                        </TouchableOpacity>)}
                        
                        <TouchableOpacity 
                          disabled={isLoading?true:false}  
                          onPress={()=>{
                             showForgot(true);
                             resetFields();
                          }}
                          disabled={isLoading?true:false}
                          >
                            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', marginTop: Sizes.fixPadding }}>
                                ¿Olvidó su contraseña?
                            </Text>
                        </TouchableOpacity>

                        <View style={{marginBottom:10}}></View>
                        
                        <View>
                            <TouchableOpacity 
                                onPress={()=>{
                                socialLogin('facebook')
                            }}>
                                <View style={styles.loginWithFacebookButtonStyle}>
                                    <Image source={require('../../assets/images/facebook.png')}
                                        style={{ height: 30.0, width: 30.0 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ ...Fonts.white15Medium, marginLeft: Sizes.fixPadding * 7.0,width:'50%' }}>
                                    Facebook
                                    </Text>
                                </View>
                            </TouchableOpacity> 
                        </View>

                        <View>
                            <TouchableOpacity 
                                onPress={()=>{
                                socialLogin('google')
                            }}>
                                <View style={styles.loginWithGoogleButtonStyle}>

                                    
                                        <Image source={require('../../assets/images/google.png')}
                                            style={{ height: 30.0, width: 30.0 }}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding * 7.0,color:'black',width:'50%' }}>
                                            Google
                                        </Text>

                                    
                                </View>
                            </TouchableOpacity> 
                        </View>
                        
                        <View>
                            <TouchableOpacity 
                             disabled={isLoading?true:false}   
                            onPress={()=>{
                                
                             }}>
                                <View style={styles.loginWithMicroSoft}>
                                    <Image source={require('../../assets/images/microsoft.png')}
                                        style={{ height: 30.0, width: 30.0 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding * 7.0,color:'black',width:'50%' }}>
                                        Microsoft
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>

                        <View>
                            <TouchableOpacity 
                            disabled={isLoading?true:false}
                            onPress={()=>{
                                
                            }}>
                                <View style={styles.loginWithLinkedin}>
                                    <Image source={require('../../assets/images/linkedin.png')}
                                        style={{ height: 30.0, width: 30.0 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding * 7.0,color:'black',width:'50%' }}>
                                        Linkedin
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>



                        <TouchableOpacity
                                disabled={isLoading?true:false}    
                                onPress={()=>{
                                    showSignup(!signup)
                                    resetFields();
                                }}
                            >
                            <Text style={{ ...Fonts.black15Medium,textDecorationLine:'underline',  alignSelf: 'center', marginTop: Sizes.fixPadding }}>
                                {!signup?'¿No tienes una cuenta?':'¿Ya tienes una cuenta?' }
                            </Text>
                        </TouchableOpacity>
                        

                        <View style={{marginTop:20}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#444'}}>©2022 Peruana de Cambio de Divisas S.A.C.</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#444'}}>RUC 20603968671 | info@divisapp.com</Text>
                            </View>
                        </View>    
                    </View>
                </ScrollView>
            } 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: '#3B5998',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2
    },

    loginWithMicroSoft:{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 1
    },
    loginWithLinkedin:{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 1
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 1
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 1
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    },

    checkboxContainer: {
        flexDirection: "row",
        marginVertical: 0,
        marginLeft:20,

    },

    checkbox: {
        alignSelf: "center",
        color:'red',
        // backgroundColor:'red'
        borderColor:'red'
    },
    label: {
        margin: 8,
        color:'#444'
    },
})

  export default Signin2;