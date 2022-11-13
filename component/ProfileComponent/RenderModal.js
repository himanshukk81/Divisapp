import {View ,TouchableOpacity, Text, Image} from 'react-native';
import Modal from "react-native-modal";
import styles from "../../screens/profile/style";
import React, { useEffect, useState } from "react";
import Logo from './Logo';

const RenderModal =()=> {
    const navigateTerms = () =>{
        props.navigation.navigate('Terms')        
    }
    return (
      <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
        <Modal isVisible={forceModal}
            onBackdropPress={() => {}}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView2}>
                    <View>
                        <Logo />
                        <Text style={[styles.label,{fontWeight:'bold',fontSize:25}]}>¡Bienvenido!</Text>

                        <View style={{paddingHorizontal:40,paddingVertical:10}}>
                            <Text style={styles.subTitlelabel}>
                                Para realizar operaciones le agradecemos actualizar sus datos personales. Estos son validados con su documento de identidad y será HABILITADO para registrar operaciones. Una vez validados no podrá cambiarlos.
                            </Text>
                        </View>
                        <View style={{paddingHorizontal:40,paddingVertical:10}}>    
                            <Text style={styles.subTitlelabel}>
                            * De igual manera le agradecemos verificar su correo electrónico para validarlo.

                            </Text>
                        </View>

                        <TouchableOpacity onPress={()=>{
                            setForceModal(false);
                        }}>
                        

                            <View style={{
                                backgroundColor:Color.theme,
                                marginHorizontal:50,
                                paddingVertical:10,
                                marginBottom:40,
                                borderRadius:10,
                                marginVertical:20
                            } }>
                                <Text style={[styles.label,{color:'#FFF'}]}>Comenzar a Cambiar</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{paddingHorizontal:23}}>
                            <Text style={styles.subTitlelabel}>
                                <Text style={styles.label}>NOTA:</Text>
                                Peruana de Cambio de Divisas S.A.C. - Divisapp, es una empresa comprometida con las normativas de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLAFT). Para mayor información consulte nuestros
                                
                                <Text>{' '}</Text>
                                <Text style={{textDecorationLine:'underline',color:'#ee2737',padding:8}} onPress={()=>{
                                    navigateTerms();
                                }}>Términos y Condiciones</Text>
                            </Text>
                        </View>

                    </View>
                   </View> 
                </View>
             
             
        </Modal>
      </View>
    );
}

export default RenderModal;