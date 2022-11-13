import {View ,TouchableOpacity, Text, Image} from 'react-native';
import Modal from "react-native-modal";
import styles from "../../screens/profile/style";
import React, { useEffect, useState } from "react";

const RenderEditConfirm =()=> {
    const [editConfirm , showEditConfirm ] = useState(false);

    return (
      <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
        <Modal isVisible={editConfirm}
            onBackdropPress={() => {
                showEditConfirm(false)                     
            }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView4}>

                    <View style={{margin:8,alignSelf:'flex-end'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    showEditConfirm(false)          
                                }}>
                                <Image source={require('../../assets/images/icon/close.png')}
                                        style={{ height: 17.0, width: 17.0 }}
                                        resizeMode="contain"
                                />
                    
                            </TouchableOpacity>
                    </View>  
                    <View>
                        <View style={{alignSelf:'center'}}>
                            <Image source={require('../../assets/images/info.png')}
                                    style={{ height: 50.0, width: 50.0 }}
                                    resizeMode="contain"
                            />
                        </View>

                        <Text style={[styles.label,{fontWeight:'bold',fontSize:19}]}>Estimado Usuario</Text>

                        <View style={{paddingHorizontal:6,paddingVertical:10}}>
                            <Text style={styles.subTitlelabel}>
                                Usted podrá modificar los datos de su perfil hasta que estos sean <Text style={{fontWeight:'bold'}}>validados</Text> con su documento de identidad. Luego de ello le agradecemos comunicarse con soporte@divisapp.com.
                            
                            </Text>
                        </View>




                        <View style={{paddingHorizontal:6,paddingVertical:10}}>
                            <View style={{backgroundColor:Color.theme,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:5}}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        showEditConfirm(false);
                                        setEditProfile(true);
                                    }}>
                                    <Text style={{color:'#FFF',textAlign:'center'}}>Entendido</Text>
                                </TouchableOpacity> 
                            </View>  

                            <View style={{backgroundColor:Color.bgGray,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:5}}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        showEditConfirm(false);
                                    }}>
                                    <Text style={{color:'#444',textAlign:'center'}}>Cerrar</Text>
                                </TouchableOpacity> 
                            </View>    
                        </View>

                        <View style={{paddingHorizontal:6,paddingVertical:5}}>
                            <Text style={styles.subTitlelabel}>
                            <Text style={{fontWeight:'bold'}}>NOTA: </Text>
                                Peruana de Cambio de Divisas SAC - Divisapp, es una empresa comprometida con las normativas de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLAFT). Para mayor información consulte nuestros Términos y Condiciones.
                            </Text>
                        </View>
                    </View>
                   </View> 
                </View>
             
             
        </Modal>
      </View>
    );
}

export default RenderEditConfirm;