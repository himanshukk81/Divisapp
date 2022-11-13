import React from "react";
import { View , StyleSheet,Text,TouchableOpacity,Image} from "react-native";
import Constant from "../utility/Constant";
import Modal from "react-native-modal";
import Color from "../utility/Color";

export default class InputBox extends React.Component {
    constructor(props){
        super()
    }
    navigateTerms (){
        this.props.navigateTerms();        
    }
    render() {
        return (
          <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={this.props.forceModal}
                onBackdropPress={() => {}}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView2}>
                        <View>
                            <Image source={require('../assets/images/info.png')}
                                style={{ alignSelf: 'center', width: 90.0, height: 60.0, marginBottom: 1 }}
                                resizeMode="contain"
                            />
                            <Text style={[styles.label,{fontWeight:'bold',fontSize:25}]}>{this.props.headerTitle}</Text>

                            <View style={{paddingHorizontal:40,paddingVertical:10}}>
                                <Text style={[styles.subTitlelabel,{fontSize:15}]}>
                                Por favor verifique la información proporcionada antes de guardarla, una vez que sea enviada no podrá ser modificada. 
                                </Text>
                            </View>
                            
                            <View style={{paddingHorizontal:23}}>
                                <Text style={[styles.subTitlelabel,{fontSize:15}]}>
                                    <Text style={styles.label}>NOTA:</Text>
                                    Divisapp en ningún momento le solicitará información de sus claves o contraseñas u otra información que afecte la seguridad de sus cuentas bancarias o tarjetas de crédito.
                                    
                                    {/* <Text>{' '}</Text>
                                    <Text style={{textDecorationLine:'underline',color:'#ee2737',padding:8}} onPress={()=>{
                                        this.navigateTerms();
                                    }}>Términos y Condiciones</Text> */}
                                </Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <View style={{backgroundColor:Color.theme,width:'35%',marginVertical:16}}>
                                    <TouchableOpacity onPress={()=>{
                                        this.props.setForceModal(false);
                                    }}>
                                        <View style={{
                                            marginBottom:10,
                                            borderRadius:10,
                                            marginVertical:10,
                                            borderRadius:2
                                        } }>
                                            <Text style={[styles.label,{color:'#FFF'}]}>Entendido</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{backgroundColor:Color.darkBGgray ,width:'35%',marginVertical:16}}>
                                    <TouchableOpacity onPress={()=>{
                                        this.props.setForceModal(false);
                                    }}>
                                        <View style={{
                                            marginBottom:10,
                                            borderRadius:10,
                                            marginVertical:10,
                                            borderRadius:2
                                        } }>
                                            <Text style={[styles.label,{color:'#FFF'}]}>Cerrar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>        
                            

                               

                            <View style={{paddingHorizontal:23}}>
                                <Text style={styles.subTitlelabel}>
                                    <Text style={styles.label}>NOTA:</Text>
                                    Peruana de Cambio de Divisas S.A.C. - Divisapp, es una empresa comprometida con las normativas de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLAFT). Para mayor información consulte nuestros
                                    
                                    <Text>{' '}</Text>
                                    <Text style={{textDecorationLine:'underline',color:'#ee2737',padding:8}} onPress={()=>{
                                        this.navigateTerms();
                                    }}>Términos y Condiciones</Text>
                                </Text>
                            </View>

                        </View>
                       </View> 
                    </View>
                 
                 
            </Modal>
          </View>
        )
    }
}        

const styles = StyleSheet.create({

    modalView2:{
        backgroundColor: "white",
        borderRadius: 10,
        width:Constant.width-30,
        paddingVertical:30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    
    label: {
        color:'#444',
        textAlign:'center',
        fontWeight:'bold'
    },
    subTitlelabel: {
      color:'#444',
      textAlign:'center',
    },
})