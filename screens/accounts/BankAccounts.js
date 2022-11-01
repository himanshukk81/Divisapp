import React, { Component } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image, StyleSheet, FlatList,Animated,ActivityIndicator } from "react-native";
import { withNavigation } from 'react-navigation';
import Color from "../../utility/Color";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";

import ModalComponent from "../../component/ModalComponent";
import { removeBankApi, userAccounts, userBankFetch } from "../../services/Api";
import RemoveModal from "../../component/RemoveModal";

class BankAccounts extends Component {

    constructor () {
        super()
        this.animatedValue1 = new Animated.Value(0);
        this.state = {
            initialValue: 1,
            selectedIndex:0,
            activeTab:0,
            tercero:false,
            detail:false,
            isVisible:false,
            bankAccounts:[],
            isLoading:false,
            selectedItem:null,
            userAccountList:[],
            currentDate:new Date()
        }
      }

      componentDidMount(){
        // this.fetchBanks();
        this.fetchAccounts();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchAccounts();
            //Put your Data loading function here instead of my this.loadData()
        });
      }

    async fetchAccounts(){
        this.setState({isLoading:true});
        userAccounts().then((response)=>{
            this.setState({isLoading:false});

            let datas = response.data;

            datas = datas.map(data=>{
                const newPropsObj = {
                    'isDetail':false,
                    'isTercero':false
                }
                return Object.assign(data,newPropsObj);
            })

            console.log("dddd==="+JSON.stringify(datas));
            this.setState({userAccountList:datas});

        }).catch((error)=>{
            this.setState({isLoading:false});
            this.setState({userAccountList:[]});
            this.setState({isLoading:false});
            showToast("Something went wrong pls try again");
        })
    }
    // remove bank 
    async fetchBanks (){
        this.setState({isLoading:true});
        // userBankFetch().then((response)=>{
        //     this.setState({isLoading:false});
        //     console.log(response.data.length);
        //     this.setState({bankAccounts:response.data});

        // }).catch((error)=>{
        //     this.setState({isLoading:false});
        //     this.setState({bankAccounts:[]});
        //     this.setState({isLoading:false});
        //     showToast("Something went wrong pls try again");
        // })
    }  
    async removeBank (){
        // this.setState({isVisible:true});
        // return;
        this.setState({isLoading:true});

        // console.log("itemmm==");
        // console.log({itemmmm:this.state.selectedItem});
        removeBankApi(this.state.selectedItem).then((response)=>{
            this.setState({isLoading:false});
            // this.fetchBanks();
            this.fetchAccounts();
        }).catch((error)=>{
            // console.log({error:error});
            this.setState({isLoading:false});
            // this.setState({bankAccounts:[]});
            showToast("Something went wrong pls try again");
        })
    }
    renderItem = ({ item }) => (
     
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                marginVertical: Sizes.fixPadding/2,
                paddingHorizontal:15
            }}
            onPress={() => {
                // this.props.navigation.navigate('Terms');
            }}>
                
            <View style={styles.popularCurrenciesContainerStyle}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:Color.black}}>{item.alias}</Text>
                        <CheckBox
                            disabled={true}
                            value={true}
                            style={styles.checkbox}
                            color={'#4630EB'}
                            tintColors={{ true: Color.theme, false: 'black' }}
                        />
                    </View>

                    <View>
                     <TouchableOpacity onPress={() => {
                        // this.removeBank();
                        this.setState({isVisible:true});
                        this.setState({selectedItem:item});
                        }}>
                        <View style={{backgroundColor:Color.theme,padding:6,borderRadius:3}}>
                                <Image
                                    source={require('../../assets/images/icon/delete.png')}
                                    style={{ height: 18.0, width: 18.0,marginHorizontal:3}}
                                    resizeMode="contain"
                                />
                        </View>
                    </TouchableOpacity>
                    </View>
                  </View> 
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>

                   
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                            source={{uri:item?.bank?.logo?.url}}
                            style={{ height: 20.0, width: 20.0,marginHorizontal:3}}
                            resizeMode="contain"
                    />                    
                    <Text style={{color:Color.black,fontWeight:'bold'}}>{item?.bank?.nickname} : {item.type==1?'AHORROS':item.type==2?'CORRIENTE':'PAGO DE SERVICIO'} - {item?.currency?.code}</Text>
                  </View>
                

                </View>

                {!item.details && <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:40,marginVertical:10}}>
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13,marginRight:15 }} numberOfLines={2}>Número de Cuenta</Text>
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13}} numberOfLines={2}>Código de Cuenta {'\n'} Interbancaria</Text>
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13}} numberOfLines={2}>Dueño de la {'\n'} Cuenta</Text>
                </View>}

                {item.details && <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:40,marginVertical:10}}>
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13,marginRight:15 }} numberOfLines={2}>Número de Cuenta</Text>
                        
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13}} numberOfLines={2}>Código de Cuenta {'\n'} Interbancaria</Text>
                        <Text style={{color:Color.black ,fontWeight:'bold',fontSize:13,}} numberOfLines={2}>Dueño de la {'\n'} Cuenta</Text>
                </View>}

                {true && <View style={{borderTopColor:Color.black,borderTopWidth:1,marginHorizontal:-10,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingRight:50,paddingLeft:10,marginVertical:10}}> 
                        {!item.details &&<Text style={{color:Color.black }}>{item.number}</Text>}

                        {item.details && <View style={{marginHorizontal:-10,marginTop:10}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingRight:50,paddingLeft:10,marginVertical:10}}> 
                            <View style={{flexDirection:'row',alignItems:'center' }}>
                                        <Text style={{color:Color.black,marginTop:10}}>DETALLES</Text>
                                        <TouchableOpacity onPress={()=>{
                                            let index= this.state.userAccountList.findIndex(user => user.id === item.id);
                                            this.state.userAccountList[index]['isDetail'] = !this.state.userAccountList[index]['isDetail'];
                                            this.setState({userAccountList:this.state.userAccountList});
                                            this.setState({currentDate:new Date()});
                                           }}>
                                            <Image source={require('../../assets/images/info.png')}
                                                    style={{ height: 25.0, width: 25.0,marginLeft:10,marginTop:10 }}
                                                    resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                </View>


                            </View>

                            

                        
                            </View>
                        }

                        <Text style={{color:Color.black ,maxWidth:90}}>{item.cci}</Text>

                        {item.owner ==2?
                            <View>
                                <Text style={{color:'#000'}}>TERCERO</Text>

                                <TouchableOpacity
                                    
                                    onPress={() => {
                                        // this.setState({tercero:!this.state.tercero})
                                        let index= this.state.userAccountList.findIndex(user => user.id === item.id);
                                        this.state.userAccountList[index]['isTercero'] = !this.state.userAccountList[index]['isTercero'];
                                        this.setState({userAccountList:this.state.userAccountList});
                                        this.setState({currentDate:new Date()});
                                        
                                    }}>
                                    <Image source={require('../../assets/images/info.png')}
                                        style={{ height: 25.0, width: 25.0,marginLeft:10 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>:<View>
                                <Text style={{color:'#000'}}>PROPIA</Text>
                            </View>
                        }
                        {/* // </Text> */}
                        
                    </View>
                    {item.isDetail && <View style={{flexDirection:'row',borderColor:'#444',borderWidth:1,height:140}}>

                                <Text style={{color:'#444',margin:20}}>{item.details}</Text>
                            </View>}
                </View>}

                

                {item.isTercero && <View style={{marginTop:13}}>
                                {/* <Text style={{color:'000'}}>dsasd</Text> */}
                        <FlatList
                            data={item.user_account_thirds}
                            extraData={this.state.currentDate}
                            renderItem={(data)=>{
                                let info = data.item;
                                console.log({info:info})
                                return(
                                    <View style={{marginVertical:10}}>
                                        <View style={styles.rowAlignment}>
                                            <Text style={{color:'#444',fontWeight:'bold'}}>Tipo de Tercero</Text>
                                            <Text style={{color:'#444'}}>{info?.type==1?'PERSONA':info?.type==2?'Empresa':info?.type}</Text>
                                        </View>

                                        <View style={styles.rowAlignment}>
                                            <Text style={{color:'#444',fontWeight:'bold'}}>Doc. de Identificación</Text>
                                            <Text style={{color:'#444'}}>{info?.id_type==1?'DNI':info?.id_type==2?'CE':'PASAPORTE'} - {info?.id_number}</Text>
                                        </View>

                                        <View style={styles.rowAlignment}>
                                            <Text style={{color:'#444',fontWeight:'bold'}}>Nombre(s) y Apellido(s)</Text>
                                            <Text style={{color:'#444',maxWidth:160}}>{info?.name} {info?.lastname}</Text>
                                        </View>

                                        {(info?.type==2 || info?.type=='Empresa') && <View>
                                            <View style={styles.rowAlignment}>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Número de RUC</Text>
                                                <Text style={{color:'#444'}}>{info?.ruc}</Text>
                                            </View>

                                            <View style={styles.rowAlignment}>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Razón Social</Text>
                                                <Text style={{color:'#444'}}>{info?.business_name}</Text>
                                            </View>

                                            {/* <View style={styles.rowAlignment}>
                                                <Text style={{color:'#444',fontWeight:'bold'}}>Nombre(s) y Apellido(s)</Text>
                                                <Text style={{color:'#444'}}>{info?.name} {info?.lastname}</Text>
                                            </View> */}
                                        </View>}
                                        <View style={styles.rowAlignment}>
                                            <Text style={{color:'#444',fontWeight:'bold'}}>Teléfono de Contacto</Text>
                                            <Text style={{color:'#444'}}>{info?.phone}</Text>
                                        </View>

                                        <View style={styles.rowAlignment}>
                                            <Text style={{color:'#444',fontWeight:'bold'}}>Correo Electrónico</Text>
                                            <Text style={{color:'#444'}}>{info?.email}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            // contentContainerStyle={{paddingBottom:'40%'}}
                            contentContainerStyle={{paddingBottom:'75%'}}
                        />
                        


                        

                    </View>}
                
            </View>

        </TouchableOpacity>
    );

    render() {
   
        return (
            <SafeAreaView style={{}}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />

                {/* <ModalComponent forceModal={this.state.isVisible} setForceModal={()=>{
                    this.setState({isVisible:!this.state.isVisible})
                }}
                navigateTerms={()=>{
                    this.props.navigation.navigate('Terms');
                }}
                 /> */}

                <RemoveModal 
                    title={'Eliminar Cuenta Bancaria'}
                    subTitle={'Si ya realizó operaciones con esta tarjeta, la información de la misma quedará almacenada en cada operación, sin embargo, ya no estará disponible para nuevas operaciones.'}
                    forceModal={this.state.isVisible} 
                    removeItem={()=>{
                        this.setState({isVisible:!this.state.isVisible});
                        this.removeBank();
                    }}
                    closeModal={()=>{
                        this.setState({isVisible:!this.state.isVisible})
                    }}
                    navigateTerms={()=>{
                        this.setState({isVisible:false});
                        this.props.navigation.navigate('Terms');
                    }}
                />


                <View style={styles.accountButtons}>
                                                     
                    <TouchableOpacity 
                        disabled={false} 
                        onPress={()=>{
                                       
                            
                            this.props.navigation.navigate('                       ');
                        }}>
                        <View style={[{backgroundColor:Color.green},styles.account1Btn]}>       
                            <Image
                                source={require('../../assets/images/icon/add.png')}
                                style={{ height: 18.0, width: 18.0, borderRadius: 2,marginRight:5 }}
                                resizeMode="contain"
                            />
                            <Text style={{color:'#FFF',textAlign:'center'}}  numberOfLines={2}>Agregar Cuenta Bancaria</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        disabled={false} 
                        onPress={()=>{
                            this.props.navigation.navigate('             ');
                        }}>
                        <View style={[{backgroundColor:Color.btnBlue},styles.account2Btn]}>
                            <Image
                                source={require('../../assets/images/icon/credit-card.png')}
                                style={{ height: 18.0, width: 18.0, borderRadius: 2,marginRight:5 }}
                                resizeMode="contain"
                            />       
                            <Text style={{color:'#FFF',textAlign:'center'}}>Tarjetas de Crédito</Text>
                        </View>
                    </TouchableOpacity> 
                </View>

                {!this.state.isLoading ? <View> 
                    <FlatList
                        data={this.state.userAccountList}
                        // data={this.state.bankAccounts}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        // contentContainerStyle={{paddingBottom:'40%'}}
                        contentContainerStyle={{paddingBottom:'75%'}}
                    />
                </View>:<ActivityIndicator size="large" color={Color.theme}  />}
            </SafeAreaView>
        )
    }

    popularCurrenciesTitle() {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 5.0,
                marginBottom: Sizes.fixPadding,
            }}>
                <Text style={{ ...Fonts.black19SemiBold }}>Popular Currencies</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('BottomTabScreen', { index: 2 })}
                >
                    <Text style={{ ...Fonts.primaryColor17Medium }}>See More</Text>
                </TouchableOpacity>

            </View>
        )
    }

    userWelcome() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={styles.userWelcomeContainerStyle}>
                    <View>
                        <Text style={{ ...Fonts.gray17Medium, }}>Welcome</Text>
                        <Text style={{ ...Fonts.black22Bold, marginTop: Sizes.fixPadding - 5.0, }}>
                            Peter Jones
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.push('BottomTabScreen', { index: 4 })}
                    >
                        <Image source={require('../../assets/images/user/user_14.jpg')}
                            style={{ height: 60.0, width: 60.0, borderRadius: 15.0 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const MyAccounts = [
    {
        id: '1',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        alias:'Test',
        value: 0,
        targeta:1234567676,
        cuenta:222222,
        detail:false
    },
    {
        id: '2',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        alias:'Test2',
        value:0.00,
        targeta:1234567676,
        cuenta:11111,
        detail:false
    },
    {
        id: '3',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        alias:'Test3',
        value:0.00,
        targeta:1234567676,
        personType:'PROPIA',
        detail:true,
        cuenta:'DETALLES',
        interbancaria:'0000',
        dueno:'TERCERO'
        
    },
    
    
];

const styles = StyleSheet.create({

    accountButtons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    account1Btn:{
        flexDirection:'row',
        alignItems:'center',
        maxWidth:'86%',
        borderRadius:3,
        // marginHorizontal:60, 
        padding:6,
        marginVertical:15
    },
    account2Btn:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:3,
        // marginHorizontal:60, 
        padding:6,
        marginVertical:15
    },
    userWelcomeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
    },
    popularCurrenciesContainerStyle: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        backgroundColor: 'white', 
        // elevation: 2.0,
        // borderRadius: Sizes.fixPadding * 2.0,
        // alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    balanceAndProfitInfoContainerStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    balanceAndProfitPercentageInfoStyle: {
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.22)",
        alignItems: 'center',
        paddingHorizontal: 12.0,
        paddingVertical: 12.0,
        borderRadius: 22.0
    },
    portfolioContainerStyle: {
        height: 170.0,
        width: 230.0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 10.0,
        marginVertical: 15.0,
        paddingHorizontal: 10.0,
        paddingVertical: 10.0,
        borderRadius: 20,
        elevation: 3.0,
    },
    segmentTabs:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:40,
        paddingVertical:20
    },
    activeTabSeg:{
        borderBottomWidth:2,borderBottomColor:'#444',paddingHorizontal:30
    },
    inActiveTagSeg:{
        borderBottomWidth:0,borderBottomColor:'#444',paddingHorizontal:30
    },
    deleteBg:{
        backgroundColor:Color.red
    },
    checkbox: {
        alignSelf: "center",
        color:'red',
        // backgroundColor:'red'
        borderColor:'red'
    },
    rowAlignment :{
        // marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#444',
        borderBottomColor:'#444',
        borderBottomWidth:1,
        paddingVertical:7
    }
})

export default withNavigation(BankAccounts);