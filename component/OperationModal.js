import React, { useEffect, useState } from "react";
import {TouchableOpacity, StyleSheet ,View ,Text , FlatList, Image} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/styles";
import Color from "../utility/Color";
import Constant from "../utility/Constant";

const OperationModal =(props) =>{
    
    useEffect(()=>{
       
    },[]);
    const {title}    =  props.data.title;

    const renderItem = ({ item , index}) => {
        console.log({kkjjj:    props.operationInfo?.operation_operation_transfers[0]?.transfer?.url})
        return(
            <TouchableOpacity onPress={()=>{
                if(item.url){
                    props.onLinkClick(item.url);
                }
            }}>
                {!item.title.includes('Constancia')?
                    <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20,marginVertical:9}}>
                        {item.icon && <Image source={item.icon}
                            style={{ height: 15.0, width: 15.0,marginRight:10}}
                        />}
                        <Text style={[styles.labelText,{fontSize:15}]}>{item.title}</Text>
                    </View>:
                    <View>
                        <>
                        {!(props.operationInfo?.operation_operation_transfers[0]?.transfer?.url)?
                            <Text style={[styles.labelText,{fontSize:15,marginLeft:20}]}>{item.title}</Text>:
                            <View style={{flexDirection:'column',justifyContent:'center',marginBottom:30,marginLeft:'10%'}}>
                                <Image source={{uri:props.operationInfo?.operation_operation_transfers[0]?.transfer?.url}}
                                    style={{ height: 300.0, width: 300.0}}
                                />
                                <Text style={[styles.labelText,{fontSize:15,marginTop:10}]}>{props.operationInfo?.operation_operation_transfers[0]?.comment}</Text>
                            </View>
                        }
                            
                        </>
                    </View>
                }
            </TouchableOpacity>
            ) 
    };
    
    return (
        <View style={styles.modalContainer}>
            <Modal isVisible={props.isVisibleModal}
                onBackdropPress={() => {}}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView2}>
                           
                            <View style={{marginVertical:10, paddingHorizontal:20, flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{color:'#444',fontWeight:'bold',fontSize:20}}>{props.data.title}</Text>
                                <TouchableOpacity onPress={()=>{
                                    props.closeModal();
                                }}>
                                    <Image source={require('../assets/images/icon/close.png')}
                                        style={{ height: 18.0, width: 18.0}}
                                    />
                                </TouchableOpacity>
                            </View>

                            {props?.operationInfo?.operation_invoices.length?<>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,marginTop:16, marginBottom:23}}>
                                    <Text style={{color:Color.black}}>Archivo XML</Text>
                                    <TouchableOpacity onPress={()=>{
                                        props.onDownloadLink(props?.operationInfo?.operation_invoices[0]['xml']);
                                      }}>
                                        <View style={{backgroundColor:Color.theme,padding:4}}>
                                            <Text>Descargar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,marginBottom:60}}>
                                    <Text style={{color:Color.black}}>Archivo PDF</Text>
                                    <TouchableOpacity onPress={()=>{
                                            // props.onDownloadLink();
                                            props.onDownloadLink(props?.operationInfo?.operation_invoices[0]['pdf']);
                                        }}>
                                        <View style={{backgroundColor:Color.theme,padding:4}}>
                                            <Text>Descargar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </>:
                            <FlatList
                                    data={props.data.headings}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                            />}
                      </View> 
                    </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'white',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView2:{
        backgroundColor: "white",
        borderRadius: 10,
        width:Constant.width-30,
        // height:Constant.height/1.6,
        paddingVertical:30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    labelText:{
        color:'#000'
    }
})
export default OperationModal;