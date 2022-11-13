import {View ,TouchableOpacity, Text} from 'react-native';
import Modal from "react-native-modal";
import React from "react";
import styles from "../../screens/profile/style";

const RenderMoreInfo =()=> {
    return (
        <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={moreInfoModal}
                onBackdropPress={() => {
                    showMoreInfo(false)                     
                }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView3}>

                        <View style={{margin:8,alignSelf:'flex-end'}}>
                                <TouchableOpacity
                                onPress={()=>{
                                    showMoreInfo(false)     
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
                                        style={{ height: 35.0, width: 35.0 }}
                                        resizeMode="contain"
                                />
                            </View>

                            <Text style={[styles.label,{fontWeight:'bold',fontSize:19}]}>¿Qué es PEP?</Text>

                            <View style={{paddingHorizontal:6,paddingVertical:10}}>
                                <Text style={styles.subTitlelabel}>
                                    De acuerdo a la normativa del Sistema de Prevención de Lavado de Activos y del Financiamiento del Terrorismo, son las Personas naturales, nacionales o extranjeras, que cumplen o que en los últimos cinco (5) años hayan cumplido funciones públicas destacadas o funciones prominentes en una organización internacional, sea en el territorio nacional o extranjero, y cuyas circunstancias financieras puedan ser objeto de un interés público. La relación de los cargos o funciones dentro de la lista PEP se encuentra en la Resolución SBS N° 4349-2016
                                </Text>
                            </View>
                        </View>
                    </View> 
                    </View>
                
                
            </Modal>
        </View>
    );
}

export default RenderMoreInfo;