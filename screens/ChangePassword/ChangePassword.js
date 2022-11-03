import React, { useState } from 'react'
import { View , StyleSheet, ActivityIndicator,TouchableOpacity,Text} from 'react-native'
import InputBox from '../../component/InputBox'
import { updatePass } from '../../services/Api';
import Color from '../../utility/Color';
import { showToastLong } from '../../utility/Index';

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
function ChangePassword() {

  const [password , setPassword] = useState('');
  const [confirmPass , setConfirmPassword] = useState('');
  const [errorPassword , setErrorPass] = useState('');
  const [confirmErrPassword  , setCofirmErrorPass] = useState('');
  const [isLoading , setLoading] = useState(false);  

  const updatePassword = () =>{

    if(!password){
        setErrorPass('Por favor, ingrese contraseña.');
    }
    if(!confirmPass){
        setCofirmErrorPass('Por favor ingrese Confirmar contraseña.');
    }
    console.log("=="+password,";;",confirmPass);
    if(!password || !confirmPass){
        return
    }
    setLoading(true);

    let pass_info = {
        'password':password,
        'password_confirmation':confirmPass
    }
    updatePass(pass_info).then((response)=>{
        console.log("error::",response);
        if(response?.success){
            showToastLong(response?.message);
        }
        else{
            let message = response?.errors?.password[0];
            console.log("Message:::",message);
            showToastLong(message);
        }
        setLoading(false);
        
    }).catch((error)=>{
        showToastLong('Algo salió mal.');
        setLoading(false);
    })

      console.log("updating pass...");
  }
  return (
    <View style={styles.container}>
        <Text style={{textAlign:'center',color:'#444',fontSize:18,fontWeight:'bold',marginBottom:30}}>
            Cambiar contraseña
        </Text>
        <InputBox 
            placeholder={'Nueva Contraseña'}
            icon={require('../../assets/images/icon/password.png')}
            onChangeText={(value) => {
                setPassword(value)
                setErrorPass('')
            }}
            secure={true}
        />
        {errorPassword!='' && renderError(errorPassword)}
       
        <InputBox 
            placeholder={'Confirmar Nueva Contraseña'}
            icon={require('../../assets/images/icon/password.png')}
            onChangeText={(value) => {
                console.log("vall",value);
                setConfirmPassword(value)
                setCofirmErrorPass('');
            }}
            secure={true}
        />

        {confirmErrPassword!='' && renderError(confirmErrPassword)}
        
        <View style={styles.btnContainer }>             
            {isLoading ?<ActivityIndicator size="large" color={Color.white}  />
                    :<TouchableOpacity 
                    disabled={isLoading?true:false} 
                    onPress={()=>{
                        updatePassword();
                    }}>
                        <Text style={{color:'#FFF',textAlign:'center'}}>Guardar</Text>
                    </TouchableOpacity> 
            }
        </View>
    </View> 
  )
}

const styles = StyleSheet.create(
{
    btnContainer:{
        backgroundColor:Color.theme, 
        borderRadius:8,
        marginHorizontal:20,
        padding:10,
        marginVertical:15

    },
    container:{
        flex:1,
        marginTop:'30%'
        // justifyContent:'center',
        // alignItems:'center'
    }
})

export default ChangePassword

