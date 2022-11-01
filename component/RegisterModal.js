import React from "react";
import { View , StyleSheet,Text,ScrollView,Image,TouchableOpacity,ActivityIndicator} from "react-native";
import Constant from "../utility/Constant";
import Modal from "react-native-modal";
import Color from "../utility/Color";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import { registerForOperations } from "../services/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from "../utility/Index";

export default class RegisterModal extends React.Component {
    constructor(props){
        super()
        this.state = {
            confirm:false,
            dropDownList1:[
            ],
            dropDownList2:[
            ],
            registerData:{},
            isLoading:false,
            operationRequestInfo:{
                type:1,
                terms:0,
                code:0,
                request_code:0,
                user_id:0,
                send_user_account_id:0,
                rec_user_account_id:0,
                rec_user_cc_id:0,
                saving:null
            },
            currentDate:new Date(),
            isCCS:false,
            editRegistrationOperation:false,
            userInfo:{}
        }

        console.log({props50:props});
    }
    navigateTerms (props){
        this.props.navigateTerms();    
    }

    updateRequestInfo(requestInfo){
        this.setState({
            operationRequestInfo:requestInfo,
        })
        this.setState({currentDate:new Date()})
    }
    navigate (type){
        if(type == 1){
            this.props.navigation.navigate('             '); 
        }
        else{
            this.props.navigation.navigate('           '); 
        }
    }

    registerOperation (){
        console.log({requestInfo:this.state.operationRequestInfo});
        registerForOperations(this.state.operationRequestInfo).then((response)=>{
            console.log({response:response});

            this.setState({
                isLoading:false
            })
            if(response?.data?.id){
                this.resetFields();
                this.props.showConfirmationRegistration(response?.data?.id);
                
                
            }
            else{
                showToast(response?.message);
            }
            
        }).catch((error)=>{
            console.log({error:error});
            this.setState({
                isLoading:false
            })
        })

    }

    resetFields(){
        this.state.operationRequestInfo={
            type:1,
            terms:0,
            code:0,
            request_code:0,
            user_id:0,
            send_user_account_id:0,
            rec_user_account_id:0,
            rec_user_cc_id:0,
            saving:null
        };
        
        this.setState({
            operationRequestInfo:this.state.operationRequestInfo
        })
    }
    async componentDidUpdate(){
        if( JSON.stringify(this.state.registerData) != JSON.stringify(this.props.registerData)){
            console.log("state update");
            
            this.setState({
                registerData:this.props.registerData
            },()=>{
                console.log({sss:this.state.registerData});
                console.log("this.props=="+this.props);
                this.state.dropDownList1 = this.state.registerData.send_accounts.map((data)=>{
                    return {
                        id:data.id,
                        value:data.number,
                        label:data.alias+":"+data.number
                    }
                })
                this.setState({isCCS:false});
                if(this.state.registerData.rec_ccs){
                    this.state.dropDownList2 = this.state.registerData.rec_ccs.map((data)=>{
                        return {
                            id:data.id,
                            value:data.number,
                            label:data.alias+":"+data.number
                        }
                    })
                    this.setState({isCCS:true});
                }
                else{
                    this.state.dropDownList2 = this.state.registerData.rec_accounts.map((data)=>{
                        return {
                            id:data.id,
                            value:data.number,
                            label:data.alias+":"+data.number
                        }
                    })
                }

                
                
                this.setState({
                    currentDate:new Date()
                })

                this.updateRegistrationInfo()


            })
            
        }
    }

    componentWillUnmount(){
        console.log("unmounts fields")
        this.resetFields();
    }
    async updateRegistrationInfo(){
        const user = await AsyncStorage.getItem('user')
        let userParse = JSON.parse(user);
        
        this.setState({
            userInfo:userParse,
            
        },()=>{
            
            console.log({profileInfo:this.props.profileInfo});

            if(this.props.profileInfo?.created_by && this.props.profileInfo?.created_by?.status == '2'){
                this.setState({
                    editRegistrationOperation:true,
                    currentDate:new Date()
                })
            }
        })
       
        
        this.state.operationRequestInfo.type = this.state.registerData.type;
        this.state.operationRequestInfo.request_code = this.state.registerData.quote_code;
        this.state.operationRequestInfo.code = "PE-"+this.state.registerData.quote_code;
        this.state.operationRequestInfo.saving = this.state.registerData.savings;
        this.state.operationRequestInfo.user_id = userParse.id

        if(!this.state.isCCS){
            delete this.state.operationRequestInfo.rec_user_cc_id
        }
        else{
            delete this.state.operationRequestInfo.rec_user_account_id
        }
        this.updateRequestInfo(this.state.operationRequestInfo);
    }
    componentDidMount(){
       
    }
   
    renderSelect(item) {
        if(item.label){
            return (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item.label}</Text>
                </View>
              )
        }
        else{
            return (
                <View style={styles.item}>
                </View>
            )
        } 
    };

    isEnableRegistration(){
        let operationRequestInfo = this.state.operationRequestInfo;
        if(this.state.isCCS && !operationRequestInfo.rec_user_cc_id){
            return false;
        }
        else if(!this.state.isCCS && !operationRequestInfo.rec_user_account_id) {
            return false;    
        }
        if(!operationRequestInfo.send_user_account_id || !operationRequestInfo.terms){
            return false;
        }
        return true;
    }
    render() {
        // const {operationData} = props;
        return (
          <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={this.props.isVisible}
                onBackdropPress={() => {}}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView2}>
                            <View style={styles.headerAlign}>
                                <Text style={{fontWeight:'bold',fontSize:17 ,color:'#444'}}>Registro de Operación</Text>
                                <TouchableOpacity onPress={()=>{
                                    this.props.close();
                                    this.resetFields();
                                }}>
                                    <Image source={require('../assets/images/icon/close.png')}
                                            style={{ height: 20.0, width: 20.0 }}
                                            resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <ScrollView>
                                    {!this.state.editRegistrationOperation && <View style={styles.title}>
                                        <Text style={{fontSize:14,fontWeight:'bold',marginBottom:7,color:'#444'}}>Estimad@ {this.state.userInfo?.name?this.state.userInfo.name.split(" ")[0]:''} :</Text>
                                        <Text style={{color:'#444'}}>Estamos validando los datos de su perfil, mil disculpas por la espera, en pocos minutos estará listo para hacer operaciones. Si aún no adjunto la imagen de su documento de identidad le agradecemos realizarlo en el siguiente 
                                            <Text style={{textDecorationLine: "underline"}} onPress={()=>{this.props.navigateProfile() }}> enlace.</Text>
                                        </Text>
                                    </View>}

                                    <View style={{paddingHorizontal:0,marginTop:10}}>
                                        <View style={[styles.table]}>
                                            <View style={[styles.th]}>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Tipo de Operación</Text>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Tipo de Cambio</Text>
                                            </View>

                                            <View style={[styles.tr]}>
                                                <Text style={{textTransform:'uppercase',color:'#444'}}>{this.state.registerData?.type_txt}</Text>
                                                <Text style={{color:'#444'}}>{this.state?.registerData?.rate}</Text>
                                            </View>

                                            <View style={[styles.th]}>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Usuario Envía</Text>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Usuario Recibe</Text>
                                            </View>
                                            <View style={[styles.tr]}>
                                                <View style={[styles.tr]}>
                                                    <Text style={{fontWeight:'bold',color:'#444'}}>{this.state?.registerData?.send_currency_txt}</Text>
                                                    <Text style={{marginLeft:20,color:'#444'}}>{this.state?.registerData?.send_value}</Text>
                                                </View>

                                                <View style={[styles.tr]}>
                                                <Text style={{fontWeight:'bold',color:'#444'}}>{this.state?.registerData?.rec_currency_txt}</Text>
                                                    <Text style={{marginLeft:20,color:'#444'}}>{this.state?.registerData?.rec_value}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>    
                                    
                                    <View style={{paddingHorizontal:7,marginTop:12}}>
                                        <Text style={[styles.label,styles.textAlign]}>Seleccione Cuenta de Envío
                                        
                                        </Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={this.state.dropDownList1}
                                            maxHeight={200}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={'Test1'}
                                            onChange={item => {
                                                this.state.operationRequestInfo.send_user_account_id = item.id;
                                                this.updateRequestInfo(this.state.operationRequestInfo);
                                            }}

                                            
                                            renderItem={this.renderSelect}
                                        />
                                    </View>    
                                    
                                    <View style={{paddingHorizontal:7,marginTop:12}}>
                                        <Text style={[styles.label,styles.textAlign]}>
                                            {!this.state.registerData.hasOwnProperty('rec_ccs')?'Seleccione Cuenta de Recepción':'Seleccione Tarjeta de Credito'}
                                        
                                        </Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={this.state.dropDownList2}
                                            maxHeight={200}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={'Test1'}
                                            onChange={item => {
                                                
                                                if(this.state.isCCS){
                                                    this.state.operationRequestInfo.rec_user_cc_id = item.id;
                                                }
                                                else{
                                                    this.state.operationRequestInfo.rec_user_account_id = item.id;
                                                }
                                                this.updateRequestInfo(this.state.operationRequestInfo);
                                            }}

                                            
                                            renderItem={this.renderSelect}
                                        />
                                    </View>
                                    <View style={{padding:8}}>
                                        {this.state.registerData?.send_accounts && this.state.registerData?.send_accounts.length==0 && <View style={{flexDirection:'row',backgroundColor:Color.bgGray,padding:10}}>
                                                <Text>No tiene cuentas en DOLARES ($) registradas para realizar la operación. Porfavor ingrese a sus <Text style={{fontWeight:'bold',padding:7}} onPress={()=>{this.props.navigateAccounts(1) }}>Cuentas Bancarias</Text> para agregarla</Text>
                                        </View>}

                                        {this.state.registerData?.rec_accounts && this.state.registerData?.rec_accounts.length==0 && <View style={{flexDirection:'row',backgroundColor:Color.bgGray,padding:10}}>
                                                <Text>No tiene cuentas en SOLES (S/) registradas para realizar la operación. Porfavor ingrese a sus <Text style={{fontWeight:'bold',padding:7}} onPress={()=>{this.props.navigateAccounts(1) }}>Cuentas Bancarias</Text> para agregarla </Text>
                                        </View>}

                                        {this.state.registerData?.rec_ccs && this.state.registerData?.rec_ccs.length==0 && <View style={{flexDirection:'row',backgroundColor:Color.bgGray,padding:10}}>
                                                <Text>No tiene TARJETAS DE CREDITO registradas para realizar la operación. Porfavor ingrese a sus <Text style={{fontWeight:'bold',padding:7}} onPress={()=>{this.props.navigateCcs(2) }}>Tarjetas de Crédito</Text> para agregarla</Text>
                                        </View>}
                                    </View>

                                    <View style={styles.terms}>
                                        <CheckBox
                                            value={this.state.operationRequestInfo.terms?true:false}
                                            onValueChange={(value) => {
                                                this.state.operationRequestInfo.terms = 0;
                                                if(value){
                                                    this.state.operationRequestInfo.terms = 1;
                                                }
                                                this.updateRequestInfo(this.state.operationRequestInfo)
                                                
                                            }}
                                            tintColors={{ true: Color.theme, false: 'black' }}
                                        />
                                        <Text style={{fontWeight:'bold',color:Color.black,marginLeft:20}}>
                                            <Text style={{marginLeft:5}}>Aceptar</Text>
                                            <Text style={{textDecorationLine:'underline',color:'#ee2737',padding:8,margin:4}} onPress={()=>{
                                                this.navigateTerms();
                                            }}>Términos y Condiciones</Text>
                                        </Text>
                                    </View>

                                        
                                    {this.state.editRegistrationOperation && <View style={[this.isEnableRegistration()?{opacity:1}:{opacity:0.5},styles.regsModal]}>
                                            <TouchableOpacity 
                                                disabled={this.isEnableRegistration()?false:true}
                                                onPress={()=>{
                                                    this.setState({
                                                        isLoading:true
                                                    })
                                                    this.registerOperation();
                                                }}>
                                                {!this.state.isLoading &&<Text style={{fontWeight:'bold', color:'#FFF',textAlign:'center',textTransform:'uppercase'}}>Registrar Operation</Text>}
                                                
                                                {this.state.isLoading && <ActivityIndicator size="large" color={Color.white}  />}

                                            </TouchableOpacity> 
                                        </View>
                                    }

                                    <View style={styles.title}>
                                        <Text style={{fontSize:14,marginBottom:7,color:'#444'}}>Nota:</Text>
                                        <Text style={{color:'#444'}}>Realizamos operaciones inmediatas con</Text>
                                        <Image source={{uri:'https://zzzdevfrontend.divisapp.com/images/common/banks/bcp.png'}}
                                                style={{ height: 55.0, width: 55.0 }}
                                                resizeMode="contain"
                                        />
                                        <Text style={{color:'#444'}}>Operaciones Interbancarias con el resto de entidades financieras.</Text>
                                    </View>

                            </ScrollView>

                       </View> 
                    </View>
                 
                 
            </Modal>
          </View>
        )
    }
}        

const styles = StyleSheet.create({

    terms:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
        marginTop:13 
    },
    table:{
        borderWidth:0.5,
        borderColor:'#999',
        paddingHorizontal:0,
        marginHorizontal:17,
        borderRadius:6
    },
    th: {
        backgroundColor:'#e9ecef',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10
    },
    tr:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10
    },
    headerAlign:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        borderBottomWidth:0.4,
        borderBottomColor:'#999',
        paddingBottom:16
    },
    title:{
        borderWidth:0.4,
        borderLeftColor:Color.theme,
        borderColor:'#999',
        borderLeftWidth:4,
        marginHorizontal:23,
        borderRadius:8,
        paddingHorizontal:20,
        paddingVertical:10,
        marginVertical:20
    },
    modalView2:{
        backgroundColor: "white",
        borderRadius: 10,
        width:Constant.width-30,
        height:Constant.height-70,
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
    textAlign:{
        textAlign:'left',
        marginLeft:23,
        marginBottom:10
    },
    dropdown: {
        marginHorizontal: 16,
        marginVertical:5,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,  
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
        color:'#444'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#444'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:'#444'
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
        color:'#444'
      },
      regsModal:{
        backgroundColor:Color.theme,
        borderRadius:8,
        marginHorizontal:36, 
        padding:8,
        marginVertical:12,
        marginBottom:30
      },
})