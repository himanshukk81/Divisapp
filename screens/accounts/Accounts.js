import React, { Component } from "react";
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image, StyleSheet, FlatList,Animated,ActivityIndicator } from "react-native";
import { withNavigation } from 'react-navigation';
import Color from "../../utility/Color";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import CheckBox from '@react-native-community/checkbox';
import { color } from "react-native-reanimated";
import { removeCCApi, userCreditCards } from "../../services/Api";
import RemoveModal from "../../component/RemoveModal";
import { showToast, showToastLong } from "../../utility/Index";

class Accounts extends Component {

    constructor () {
        super()
        this.animatedValue1 = new Animated.Value(0);
        this.state = {
            initialValue: 1,
            selectedIndex:0,
            activeTab:0,
            isLoading:false,
            accounts:[],
            isVisible:false,
            selectedItem:null
        }
    }

    componentDidMount(){
        this.fetchCards();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchCards();
            //Put your Data loading function here instead of my this.loadData()
        });
    }

    async fetchCards(){
        this.setState({isLoading:true});
        userCreditCards().then((response)=>{
            console.log({response28:response});
            this.setState({isLoading:false});
            this.setState({accounts:response.data});
        }).catch((error)=>{
            console.log({error:error});
            this.setState({isLoading:false});
            this.setState({accounts:[]});
            this.setState({isLoading:false});
            showToast("Something went wrong pls try again");

        })
    }
    
    async removeCard (){
        this.setState({isLoading:true});
        removeCCApi(this.state.selectedItem).then((response)=>{
            this.setState({isLoading:false});
            this.fetchCards();
        }).catch((error)=>{
            console.log({error:error});
            this.setState({isLoading:false});
            showToast("Something went wrong pls try again");
        })
    }
    renderItem = ({ item , index}) => (

        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                marginVertical: Sizes.fixPadding/2,
                paddingHorizontal:15
            }}
            onPress={() => {
                this.props.navigation.navigate('');
            }}>
                
            <View style={styles.popularCurrenciesContainerStyle}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>

                   
                    <View style={{flexDirection:'row',alignItems:'center'}}> 

                        <Image
                                source={{uri:item?.bank?.logo?.url}}
                                style={{ height: 20.0, width: 20.0,marginHorizontal:3}}
                                resizeMode="contain"
                        /> 
                      <Text style={{color:Color.black,fontWeight:'bold'}}>{item?.bank?.nickname} : {item.type==1?'VISA':item.type==2?'MASTERCARD':'AMEX'} </Text>
                   </View>
                 <TouchableOpacity 
                        onPress={()=>{
                            this.setState({isVisible:true});
                            this.setState({selectedItem:item});
                        }}>
                    <View style={{backgroundColor:Color.theme,padding:6,borderRadius:3,marginTop:-40}}>
                            <Image
                                source={require('../../assets/images/icon/delete.png')}
                                style={{ height: 18.0, width: 18.0,marginHorizontal:3}}
                                resizeMode="contain"
                            />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:40,marginVertical:10}}>
                        <Text style={{color:Color.black ,fontWeight:'bold' }}>Número de tarjeta</Text>
                        <Text style={{color:Color.black ,fontWeight:'bold'}}>Dueño de la Tarjeta</Text>
                </View>

                <View style={{borderTopColor:Color.black,borderTopWidth:1,marginHorizontal:-10,marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingRight:50,paddingLeft:10,marginVertical:10}}> 
                        <Text style={{color:Color.black }}>{item.number}</Text>
                        <Text style={{color:Color.black }}>{item.owner==1?'PROPIA':'TERCERO'}
                        {item.owner ==2 && 
                        <TouchableOpacity onPress={()=>{
                            this.state.accounts[index]['open'] = !this.state.accounts[index]['open'];
                            this.setState({accounts:this.state.accounts});

                            }}>
                            <Image source={require('../../assets/images/info.png')}
                                    style={{ height: 25.0, width: 25.0,marginLeft:10 }}
                                    resizeMode="contain"
                            />
                        </TouchableOpacity>
                        }
                        </Text>
                        
                    </View>
                </View>
                
                {(item.owner ==2 && this.state.accounts[index]['open']) && <View style={{backgroundColor:'#e5e5e5'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:7, marginBottom:10,borderTopColor:Color.black,borderTopWidth:1,}}>
                            <Text style={{color:Color.black ,fontWeight:'bold' ,width:'48%'}}>Nombres y Apellidos</Text>
                            <Text style={{color:Color.black ,textAlign:'right'}}>{item.owner_name}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:7,marginBottom:10,borderTopColor:Color.black,borderTopWidth:1,}}>
                            <Text style={{color:Color.black ,fontWeight:'bold' ,width:'45%'}}>Identificacion</Text>
                            <Text style={{color:Color.black}} numberOfLines={2}>{item.owner_id_type==1?'DNI':item.owner_id_type==2?'CE':'PASAPORTE'} - {item.owner_id_number}</Text>
                    </View>
                </View>}

            </View>

        </TouchableOpacity>
    );

    render() {
   
        return (
            <SafeAreaView style={{}}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                
                <RemoveModal 
                    title={'Eliminar Tarjeta de Crédito'}
                    subTitle={'Si ya realizó operaciones con esta tarjeta, la información de la misma quedará almacenada en cada operación, sin embargo, ya no estará disponible para nuevas operaciones.'}
                    forceModal={this.state.isVisible} 
                    removeItem={()=>{
                        this.setState({isVisible:!this.state.isVisible});
                        this.removeCard();
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
                            this.props.navigation.navigate('           ');
                        }}>
                        <View style={[{backgroundColor:Color.green},styles.account1Btn]}>       
                            <Image
                                source={require('../../assets/images/icon/add.png')}
                                style={{ height: 18.0, width: 18.0, borderRadius: 2,marginRight:5 }}
                                resizeMode="contain"
                            />
                            <Text style={{color:'#FFF',textAlign:'center'}}  numberOfLines={2}>Agregar Tarjeta de Crédito</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        disabled={false} 
                        onPress={()=>{
                            this.props.navigation.navigate('    ');
                        }}>
                        <View style={[{backgroundColor:Color.btnBlue},styles.account2Btn]}>
                            <Image
                                source={require('../../assets/images/icon/credit-card.png')}
                                style={{ height: 18.0, width: 18.0, borderRadius: 2,marginRight:5 }}
                                resizeMode="contain"
                            />       
                            <Text style={{color:'#FFF',textAlign:'center'}}>Cuentas Bancarias</Text>
                        </View>
                    </TouchableOpacity> 
                </View>

                {/* <View> 
                    <FlatList
                        data={this.state.accounts}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:'40%'}}
                    />
                </View>   */}

                {!this.state.isLoading ? <View> 
                    <FlatList
                        // data={MyAccounts}
                        data={this.state.accounts}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:'40%'}}
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
        personType:'PROPIA'
    },
    {
        id: '2',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        alias:'Test2',
        value:0.00,
        targeta:1234567676,
        personType:'PROPIA'
    },
    {
        id: '3',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        alias:'Test3',
        value:0.00,
        targeta:1234567676,
        personType:'PROPIA'
        
    },
    {
        id: '4',
        logo: require('../../assets/images/icon/delete.png'),
        name: 'AMEX',
        nameValue:0,
        sortName:'Ventas',
        alias:'Test4',
        sortValue:0,
        targeta:1234567676,
        personType:'TERCERO'
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
})

export default withNavigation(Accounts);