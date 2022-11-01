import React, { } from "react";
import { View , StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { Sizes } from "../../constants/styles";
import Color from "../../utility/Color";
import moment from 'moment'

const InProcess = (props) =>{

    // console.log({props})
    const { item } = props.item;
    return (
            <View  style={[styles.processContainerStyle]}>
                    <View style={styles.title}>
                            <Text style={styles.labelText}>{item.type==1?'Venta':'Compra'}: <Text style={{fontWeight:'bold'}}>{item.code}</Text></Text>                        
                            <TouchableOpacity onPress={()=>{
                                // item.active = !item.active;
                                props.openInProcess(item);
                             }}>
                                <Image source={!item.active?require('../../assets/images/icon/plus.png'):require('../../assets/images/icon/minus.png')}
                                                            style={{ height: 13.0, width: 13.0}}
                                />
                            </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={{marginLeft:-10, backgroundColor:item.status==1?Color.lightYellow:item.status==2?Color.lightBlue:Color.lightRed}}>
                            <Text style={[{fontSize:15,color:'black',padding:3,fontWeight:'bold'},item?.status ==2?{color:'#FFF'}:styles.labelText]}>{item?.status ==1?'REGISTRADO':item?.status ==2?'EN PROCESO':item?.status ==4?'CANCELADO':'COMPLETADO'}</Text>
                            
                        </View>
                        <Text style={[{fontSize:15},styles.labelText]}>{moment(item.created_at).format("DD MMMM YYYY")}</Text>
                        
                        <Image source={require('../../assets/images/icon/clock.png')}
                                                        style={{ height: 15.0, width: 15.0,margin:5}}
                            />

                        <Text style={[{fontSize:15},styles.labelText]}>{moment(item.created_at).format("HH:MM")}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={[{fontSize:15},styles.labelText]}>Envia</Text>
                        <View style={styles.columnAlignment}>
                            <Image source={require('../../assets/images/icon/exchange.png')}
                                                            style={{ height: 13.0, width: 13.0}}
                            />
                            <Text style={[{fontWeight:'bold'},styles.labelText]}>{item.rate.toFixed(4)}</Text>
                        </View>
                        <Text style={[{fontSize:15},styles.labelText]}>Recibe</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <View style={styles.columnAlignment}>
                            {/* <Text style={[{color:Color.theme,fontSize:21 },styles.labelText]}>{item.type==1? item.rec_currency.symbol:item.send_currency.symbol}</Text> */}
                            <Text style={[{color:Color.theme,fontSize:21 },styles.labelText]}>{item.type==1? 'S/':'$'}</Text>
                            <Text style={[{fontSize:16,fontWeight:'bold'},styles.labelText]}>{item.send_amount}</Text>
                        </View>
                        <Image source={require('../../assets/images/icon/right-arrow.png')}
                                                        style={{ height: 16.0, width: 16.0}}
                            />
                        <View style={styles.columnAlignment}>
                            {/* <Text style={[{color:Color.theme,fontSize:21 },styles.labelText]}>{item.type==1?item.send_currency.symbol:item.rec_currency.symbol}</Text> */}
                            <Text style={[{color:Color.theme,fontSize:21 },styles.labelText]}>{item.type==1?'$':'S/'}</Text>

                            <Text style={[{fontSize:16,fontWeight:'bold' },styles.labelText]}>{item.rec_amount}</Text>
                        </View>
                    </View>
                    
                    {item.active && <View>
                            <View style={styles.itemContainer}>
                                <View style={{}}>
                                    <Text style={{color:Color.black,fontSize:13 ,fontWeight:'bold'}}>Cuenta de Envío </Text>
                                </View>
                                
                                <View style={{}}>
                                    <View style={{flexDirection:'row' ,alignItems:'center'}}>
                                        <Image source={{uri:item?.send_user_account?.bank?.logo?.url}} style={{ height: 15.0, width: 15.0}}
                                        />
                                        <Text style={[{fontSize:12 ,maxWidth:130},styles.labelText]}>{item?.send_user_account?.bank?.nickname}{'-'}{item?.send_user_account?.type==1?'AHORROS -':item?.send_user_account?.type==2?'CORRIENTE - ':'PAGO DE SERVICIO - '}{'PEN'}</Text>
                                    </View>
                                    <Text style={[{fontSize:12 },styles.labelText]}>NRO. {item?.send_user_account?.number}</Text>
                                    <Text style={[{fontSize:12 },styles.labelText]}>CCI  {item?.send_user_account?.cci}</Text>
                                </View>
                            </View>

                            {item?.rec_user_account?<View style={styles.itemContainer}>
                                <View style={{}}>
                                    <Text style={{color:Color.black,fontSize:13,fontWeight:'bold' }}>Cuenta de Recibo</Text>
                                </View>
                                
                                <View style={{}}>
                                    <View style={{flexDirection:'row' ,alignItems:'center'}}>
                                        <Image source={{uri:item?.rec_user_account?.bank?.logo?.url}} style={{ height: 15.0, width: 15.0}}
                                        />
                                        <Text style={[{fontSize:12 ,maxWidth:130},styles.labelText]}>{item?.rec_user_account?.bank?.nickname}{'-'}{item?.rec_user_account?.type==1?'AHORROS -':item?.rec_user_account?.type==2?'CORRIENTE - ':'PAGO DE SERVICIO - '}{'USD'}</Text>
                                    </View>
                                    <Text style={[{fontSize:12 },styles.labelText]}>NRO. {item?.rec_user_account?.number}</Text>
                                    <Text style={[{fontSize:12 },styles.labelText]}>CCI  {item?.rec_user_account?.cci}</Text>
                                </View>
                            </View>:
                            
                            <View style={styles.itemContainer}>
                                <View style={{}}>
                                    <Text style={{color:Color.black,fontSize:13,fontWeight:'bold' }}>Tarjeta de Crédito</Text>
                                </View>
                                
                                <View style={{}}>
                                    <View style={{flexDirection:'row' ,alignItems:'center'}}>
                                        <Image source={{uri:item?.rec_user_cc?.bank?.logo?.url}} style={{ height: 15.0, width: 15.0}}
                                        />
                                        <Text style={[{fontSize:12 ,maxWidth:130},styles.labelText]}>{item?.rec_user_cc?.bank?.nickname}</Text>
                                    </View>
                                    <Text style={[{fontSize:12 },styles.labelText]}>NRO. {item?.rec_user_cc?.number}</Text>
                                </View>
                            </View>}



                            <View style={styles.itemContainer}>
                                <Text style={{color:Color.black,fontSize:13 ,fontWeight:'bold'}}>Ahorro</Text>                        
                                <Text style={[{fontSize:16},styles.labelText]}>S {item.savings}</Text>
                            </View>


                            <View style={{paddingHorizontal:30,marginVertical:3,marginTop:8, borderRadius:10 }}>
                                <TouchableOpacity style={{backgroundColor:Color.theme}}  onPress={()=>{
                                    console.log('aa');
                                    props.navigateDetail(item);
                                }}>
                                    <Text style={{textAlign:'center', color:'#FFF',fontWeight:'bold',padding:10}}>Instrucciones</Text>
                                </TouchableOpacity>
                            </View>

                            {item.status!=1 ?
                                    (<View style={{}}><Text style={{color:Color.theme,textAlign:'center',fontWeight:'bold'}}>Constancias de Transferencia</Text>
                                    <Text style={{textAlign:'center'}}>Transferencia del Usuario</Text>

                                    <TouchableOpacity onPress={()=>{
                                        props.zoomImage(item?.operation_operation_transfers[0]?.transfer?.url);
                                    }}>
                                        <View style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                                            <Image source={{uri:item?.operation_operation_transfers[0]?.transfer?.url}} style={{ height: 55.0, width: 55.0}}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>)
                        :
                        <View>
                    <View style={{paddingHorizontal:30,marginVertical:3,borderRadius:10 }}>
                        <TouchableOpacity style={{backgroundColor:Color.darkBGgray }}  onPress={()=>{
                            console.log('aa');
                            props.attachTransfer(item);
                        }}>
                            <Text style={{textAlign:'center', color:'#FFF',fontWeight:'bold',padding:10}}>Adjuntar Transferencia</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal:30,marginVertical:3,borderRadius:10 }}>
                        <TouchableOpacity style={{backgroundColor:Color.lightBlue}}  onPress={()=>{
                            console.log('aa');
                            props.onCancelOperation(item);
                        }}>
                            <Text style={{textAlign:'center', color:'#FFF',fontWeight:'bold',padding:10}}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                    </View>}
            </View>
    )
}
const styles = StyleSheet.create({

    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
        // padding:7,
        paddingHorizontal:28,
        paddingVertical:7
        // margin:5
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    columnAlignment:{
        flexDirection:'column',
        alignItems:'center',
        // padding:10
    },
    processContainerStyle: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        backgroundColor: 'white', 
        elevation: 2.0,
        borderRadius: 4,
        // alignItems: 'center',
        paddingVertical: Sizes.fixPadding*2,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1},
        shadowRadius: 9,
        elevation: 3,
        marginHorizontal:20,
        marginBottom:10
    },
    labelText:{
        color:'#000'
    },
});
export default InProcess;