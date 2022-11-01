import React from "react";
import { View , StyleSheet,Text,TouchableOpacity,Image} from "react-native";
import Constant from "../utility/Constant";
import Modal from "react-native-modal";
import Color from "../utility/Color";

export default class RemoveModal extends React.Component {
    constructor(props){
        super()
    }
    navigateTerms (){
        // this.props.navigation.navigate('Terms')        
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
                            style={{ alignSelf: 'center', width: 90.0, height: 60.0, marginVertical: 13 }}
                            resizeMode="contain"
                        />
                            <Text style={[styles.label,{fontWeight:'bold',fontSize:22}]}>{this.props.title}</Text>

                            <View style={{paddingHorizontal:40,paddingVertical:10}}>
                                <Text style={[styles.subTitlelabel,{fontSize:15}]}>
                                    {this.props.subTitle} 
                                </Text>
                            </View>
                            
                            
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                <View style={{backgroundColor:Color.theme,width:'35%',marginVertical:16}}>
                                    <TouchableOpacity onPress={()=>{
                                        this.props.removeItem(true);
                                    }}>
                                        <View style={{
                                            marginBottom:10,
                                            borderRadius:10,
                                            marginVertical:10,
                                            borderRadius:2
                                        } }>
                                            <Text style={[styles.label,{color:'#FFF'}]}>Eliminarla</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{backgroundColor:Color.darkBGgray ,width:'35%',marginVertical:16}}>
                                    <TouchableOpacity onPress={()=>{
                                        // this.props.setForceModal(false);
                                        this.props.closeModal(true);
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
        height:Constant.height/1.7,
        width:Constant.width-30
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