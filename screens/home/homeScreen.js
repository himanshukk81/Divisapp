import React, { Component } from "react";
import { Text, TouchableOpacity, View,ActivityIndicator, SafeAreaView, StatusBar, Image, FlatList,Animated,TextInput } from "react-native";
import { withNavigation } from 'react-navigation';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import Color from "../../utility/Color";
import RegisterModal from "../../component/RegisterModal";
import { ScrollView } from "react-native-gesture-handler";
import { calculateCurrency, getProfileInfo } from "../../services/Api";
import { showToastLong } from "../../utility/Index";
import styles from "./styles";

class HomeScreen extends Component {
    
    constructor () {
        super()
        this.animatedValue1 = new Animated.Value(0);
        this.setInterpolate = this.animatedValue1.interpolate({
                inputRange: [0, 180],
                outputRange: ['180deg', '360deg'],
        });

        this.rotateYAnimatedStyle = {
            transform: [{ rotateY: this.setInterpolate }],
        };
        this.state = {
            bgColor:'#e8e8e8',
            initialValue: 1,
            selectedIndex:0,
            activeTab:0,
            activeDivTab:0,
            isVisible:false,
            currentValue:0,
            changeCurrency:false,
            currency1:10800,
            currency2:2100,
            dataCurrency:{
                cc_enable:0,
                data:'no_quote',
                type:1,
                rec_value:500,
                rec_enable:1,
                send_value:0,
                send_enable:0,
                buy_rate:0,
                sell_rate:0,
                discount_on:0,
                coupon_status:null,
                old_code:"MAIN",
                old_buy_rate:null,
                old_sell_rate:null,
                discount_txt:"Mejoramos tu tipo de cambio de hastaen 22 puntos.",
                couponexpire_txt:"El código del cupón no es válido o ha expirado.",
                code:'MAIN',
                savings:"1272.61"
            },
            dataCurrencyReq:{
                'cc_enable':0,
                'data':'no_quote',
                'type':1,
                'rec_value':0,
                'rec_enable':1,
                'send_value':0,
                'send_enable':0,
                'code':'MAIN_NIGHT',
            },
            currencyChangeTimeout:0,
            requestParams:'',
            isLoadingCurrency:true,
            dataCurrencyResponse:{},
            loadingQuoteRequest:false,
            isLoadingCode:false,
            currentDate:new Date(),
            profileInfo:null,
            MyStatics:[],
            staticsImgs:[   {key:'operations',subKey:null, name:'Operaciones',icon:require('../../assets/images/icon/statistics/1.png')},
                            {key:'savings',subKey:null,name:'Ahorros',icon:require('../../assets/images/icon/statistics/2.png')},
                            {key:'dollar_changes',subKey:null,name:'Dólares Cambiados',icon:require('../../assets/images/icon/statistics/3.png')},
                            {key:'buys',subKey:'sells', name:'Compras',icon:require('../../assets/images/icon/statistics/4.png')}
                        ]
        }
    }

    componentDidMount(){
        this.animatedValue1.addListener(({ value }) => {
            this.setState({currentValue:value});
        });
        this.calCurrency();
        this.getUserProfile();
    }
    // calculate currency 
    async getUserProfile(){
        getProfileInfo().then((response)=>{
            console.log({response2:response});
            let profileInfo = response.data;
            let statistics = this.state.staticsImgs;
            let prefix ='';
            for(let i=0;i<statistics.length;i++){
                
                prefix = i==1?'S/':i==2?'$':'';

                this.state.MyStatics.push({
                    id: i,
                    logo: statistics[i]['icon'],
                    name: statistics[i]['name'],
                    value:profileInfo && profileInfo['user_stadistic']? prefix+" "+ profileInfo['user_stadistic'][statistics[i]['key']]:0,
                    subValue:profileInfo && profileInfo['user_stadistic']?profileInfo['user_stadistic'][statistics[i]['subKey']]:0,
                });
            }

           this.setState({MyStatics:this.state.MyStatics,profileInfo:profileInfo});

        }).catch((error)=>{
            console.log({error:error});
        });
    }

    getValue = (key) =>{
        let value = '';
        for(let key2 in this.state.dataCurrency){
            if(key2 == key){
                value = this.state.dataCurrency[key];
                break;
            }   
        }
        return value;
    }
    calCurrency =  (screen) =>{        
        let dataRequest = JSON.parse(JSON.stringify(this.state.dataCurrencyReq));
        for(let key in dataRequest){
            dataRequest[key] = JSON.parse(JSON.stringify(this.state.dataCurrency[key]))
        }
        
        console.log({dataRequest22:dataRequest});
        calculateCurrency(dataRequest).then((response)=>{
            this.updateValue(response);
            this.setState({isLoadingCurrency:false,loadingQuoteRequest:false});
            
            if(screen){
                this.setState({dataCurrencyResponse:response},()=>{
                    this.setState({isVisible:true});
                    this.state.dataCurrency.data = 'no_quote'
                    this.setState({
                        dataCurrency:this.state.dataCurrency
                    })
                });
                
            }
        }).catch((error)=>{
            this.setState({isLoadingCurrency:false});
        })
    }

    operationRegister = () =>{
    }
    
    updateValue = (dataCurrency) =>{
        for(const key in dataCurrency){
            for(const key2 in this.state.dataCurrency){
                if(key == key2)
                {
                    this.state.dataCurrency[key2] = dataCurrency[key];
                }
            }
        }

        if(!dataCurrency.hasOwnProperty('old_buy_rate')){
            this.state.dataCurrency['old_buy_rate'] = null;
        }
        if(!dataCurrency.hasOwnProperty('old_sell_rate')){
            this.state.dataCurrency['old_sell_rate'] = null;
        }
        this.setState({dataCurrency:this.state.dataCurrency},()=>{
            console.log({dataCurrency:this.state.dataCurrency});
            console.log({dataCurrencyResss:dataCurrency})
        });
       
    }

    updateCurrency = (timeout) =>{
        console.log("updating function");
        this.setState({
            currencyChangeTimeout: setTimeout(() => {this.calCurrency()}, timeout)
        })
    }
    
    renderItem = ({ item }) => (

        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                paddingHorizontal: Sizes.fixPadding * 1.5,
                marginVertical: Sizes.fixPadding/2
            }}
            onPress={() => {

            }}>
                
            <View style={styles.popularCurrenciesContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={item.logo}
                        style={{ height: 35.0, width: 35.0, borderRadius: 27.5 }}
                        resizeMode="contain"
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                            <View style={[item?.subValue?{flexDirection:'row',alignItems:'center'}:{flexDirection:'column'}]}>
                                <Text style={{ ...Fonts.black16Medium }}>{item.name}{item?.subValue?":":""}</Text>
                                <Text style={{ ...Fonts.blackMedium,marginRight:!item?.subValue?12:0, fontWeight:'bold',textAlign:'right',marginVertical:5 }}>
                                    {item.value}
                                </Text>
                            </View>

                            {(item && item?.subValue)?
                                (<View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{ ...Fonts.black16Medium }}>Ventas:</Text>
                                    <Text style={{ ...Fonts.black13Regular ,marginRight:0, fontWeight:'bold',textAlign:'right',marginVertical:5 }}>{item?.subValue}</Text>
                                    </View>
                                </View>):null
                            }
                        {/* </View> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    animate () {
        if (this.state.currentValue >= 90) {
            Animated.spring(this.animatedValue1, {
              toValue: 0,
              tension: 10,
              friction: 8,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.spring(this.animatedValue1, {
              toValue: 180,
              tension: 10,
              friction: 8,
              useNativeDriver: false,
            }).start();
        }
        return;
       
    }

    render() {
        const {coupon_status , couponexpire_txt , buy_rate , sell_rate ,discount_on ,old_code , old_buy_rate , old_sell_rate , discount_txt , code , savings} = this.state.dataCurrency;
        return (
            <SafeAreaView style={{backgroundColor:Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                
                {this.state.isLoadingCurrency && <View style={styles.loading}>
                    <ActivityIndicator size="large" color={Color.theme}  />
                </View>}

               <RegisterModal 
                    registerData={this.state.dataCurrencyResponse}    
                    isVisible ={this.state.isVisible}
                    navigateTerms={()=>{
                        this.props.navigation.navigate('Terms');
                        this.setState({isVisible:false})
                    }}
                    close={()=>{
                        this.setState({isVisible:false})
                    }}
                    registerOperation={()=>{
                        this.operationRegister()
                    }}
                    navigateAccounts={()=>{
                        this.setState({isVisible:false})
                        this.props.navigation.navigate('    ');
                    }}

                    navigateCcs={()=>{
                        this.setState({isVisible:false})

                        this.props.navigation.navigate('             ');
                    }}

                    navigateProfile={()=>{
                        this.setState({isVisible:false})
                        this.props.navigation.navigate(' ');
                    }}
                    profileInfo={this.state.profileInfo}
                    showConfirmationRegistration={(operationId)=>{
                        this.setState({isVisible:false})

                        setTimeout(()=>{
                             this.props.navigation.navigate('                                 ',{
                                'operationId':operationId
                             })
                            // showToastLong('You have successfully register for operation!!!');
                        },1000);
                        
                    }}
               />
                <ScrollView>
                    <View >
                        <View style={{marginBottom:8}}></View>
                        {discount_on!=0 && <View style={{backgroundColor:'#e8e8e8',padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:18}}>
                            <Image source={require('../../assets/images/icon/thumbup.png')}
                                    style={{ height: 18.0, width: 18.0 }}
                            />
                            <Text style={{color:'#444',marginRight:-4}}>
                                {discount_txt}
                            </Text>
                        </View>}
                        <View style={{marginBottom:7}}></View>
                        {coupon_status =='expired' && <View style={{backgroundColor:'#e8e8e8',padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:18}}>
                            <Image source={require('../../assets/images/icon/frown.png')}
                                    style={{ height: 18.0, width: 18.0 }}
                            />
                            <Text style={{color:'#444',marginRight:-4}}>
                                {couponexpire_txt}
                            </Text>
                        </View>}
                        

                        <View style={[styles.segmentTabs,{paddingVertical:15 }]}>
                            <View styles={{}}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({activeTab:0})
                                    
                                    this.state.dataCurrency.cc_enable = 0;

                                    this.setState({dataCurrency:this.state.dataCurrency});
                                    this.updateCurrency(1000);
                                }}>
                                    <View style={[this.state.activeTab==0?[styles.activeTabSeg]:[styles.inActiveTagSeg],{borderTopLeftRadius:10,borderBottomLeftRadius:10,borderRightWidth:1,borderColor:'#444'}]}>
                                        <Text style={[this.state.activeTab==0?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>CAMBIAR USD</Text>
                                    </View>
                                </TouchableOpacity>   
                            </View>
                            <View >
                                <TouchableOpacity onPress={()=>{
                                    this.setState({activeTab:1})
                                    this.state.dataCurrency.cc_enable = 1;
                                    this.setState({dataCurrency:this.state.dataCurrency});

                                    this.updateCurrency(1000);
                                }}> 
                                    <View style={[this.state.activeTab==1?[styles.activeTabSeg]:[styles.inActiveTagSeg],{borderTopRightRadius:10,borderBottomRightRadius:10}]}>
                                        <Text style={[this.state.activeTab==1?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>PAGAR TARJETA</Text>    
                                    </View>
                                </TouchableOpacity>
                            </View>    
                        </View>

                        <View style={styles.segmentTabs}>
                            <View >
                                    <View style={[this.state.dataCurrency.type==1?[styles.activeTabDivisSeg]:[styles.inActiveTabDivisSeg],{borderTopLeftRadius:10,borderBottomLeftRadius:10,borderRightWidth:1,borderColor:'#444' }]}>
                                        <Text style={[{fontSize:16},this.state.dataCurrency.type==1?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>Divisapp Vende</Text>
                                        <Text style={[this.state.dataCurrency.type==1?{fontSize:17,fontWeight:'bold',color:'#FFF'}:{fontSize:17,color:'#444'}]}>S/ {sell_rate}</Text>
                                        {old_sell_rate!=null && <Text style={[{textDecorationLine: 'line-through'},this.state.dataCurrency.type==1?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>S/ {old_sell_rate}</Text>}
                                    </View>
                            </View>
                            <View >
                                    <View style={[this.state.dataCurrency.type==2?[styles.activeTabDivisSeg]:[styles.inActiveTabDivisSeg],{borderTopRightRadius:10,borderBottomRightRadius:10}]}>
                                        <Text style={[{fontSize:16},this.state.dataCurrency.type==2?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>Divisapp Compra</Text>    
                                        <Text style={[this.state.dataCurrency.type==2?{fontSize:17,fontWeight:'bold',color:'#FFF'}:{fontSize:17,color:'#444'}]}>S/ {buy_rate}</Text>
                                        {old_buy_rate!=null && <Text style={[{textDecorationLine: 'line-through'},this.state.dataCurrency.type==2?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>S/ {old_buy_rate}</Text>}

                                    </View>
                            </View>    
                        </View>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:24,marginVertical:10}}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={[styles.currency1]}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Image source={this.state.dataCurrency.type==1?require('../../assets/images/icon/usd.png'):require('../../assets/images/icon/pen.png')}
                                                    style={{ height: 35.0, width: 31.0,marginLeft:-30,marginTop:10 }}
                                            />
                                            <View style={{width:'77%'}}>
                                                <Text style={{textAlign:'center',color:'#444',marginLeft:-30, width:230, fontSize:17,fontWeight:'bold' }}>RECIBES  {this.state.dataCurrency.type==1?'DOLARES (USD)':'SOLES (PEN)'}</Text>
                                                <TextInput
                                                    defaultValue={this.state.dataCurrency.rec_value}
                                                    value={this.state.dataCurrency.rec_value}
                                                    style={{padding:4,color:'#444',fontWeight:'bold',fontSize:19,textAlign:'right'}}
                                                    keyboardType="number-pad"
                                                    onChangeText={text => {
                                                        this.state.dataCurrency.rec_value = text;
                                                        this.state.dataCurrency.rec_enable = 1;
                                                        this.state.dataCurrency.send_enable = 0;
                                                        this.setState({
                                                            dataCurrency:this.state.dataCurrency
                                                        })
                                                        setTimeout(()=>{
                                                            this.setState({isLoadingCurrency:true});
                                                        },500);
                                                        clearTimeout(this.state.currencyChangeTimeout);
                                                        this.updateCurrency(3000);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={[styles.currency1]}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                     
                                             <Image source={this.state.dataCurrency.type==2?require('../../assets/images/icon/usd.png'):require('../../assets/images/icon/pen.png')}
                                                    style={{ height: 35.0, width: 31.0,marginLeft:-30,marginTop:10 }}
                                            />
                                            <View style={{width:'75%'}}> 
                                                <Text style={{textAlign:'center',color:'#444',marginLeft:-30, width:230, fontSize:17,fontWeight:'bold' }}>ENVIAS {this.state.dataCurrency.type==2?'DOLARES (USD)':'SOLES (PEN)'}</Text>                                                
                                                <TextInput
                                                    value={this.state.dataCurrency.send_value}
                                                    style={{padding:4,color:'#444',fontWeight:'bold',fontSize:19,textAlign:'right'}}
                                                   
                                                    keyboardType="number-pad"
                                                    placeholderStyle={{color:'#444',fontWeight:'bold'}}
                                                    placeholderTextColor={'#444'}
                                                    onChangeText={text => {
                                                        this.state.dataCurrency.send_value = text;
                                                        this.state.dataCurrency.rec_enable = 0;
                                                        this.state.dataCurrency.send_enable = 1;
                                                        this.setState({
                                                            dataCurrency:this.state.dataCurrency
                                                        });
                                                        setTimeout(()=>{
                                                            this.setState({isLoadingCurrency:true});
                                                        },500);
                                                        clearTimeout(this.state.currencyChangeTimeout);
                                                        this.updateCurrency(3000);
                                                    }}
                                                />


                                            </View>
                                        </View>    
                                    </View>
                                </View>

                                <View style={{marginTop:0}}>
                                <TouchableOpacity disabled={this.state.isLoadingCurrency?true:false} onPress={()=>{
                                                this.setState({changeCurrency:!this.state.changeCurrency,isLoadingCurrency:true});
                                                this.state.dataCurrency.type = this.state.dataCurrency.type==1?2:1; 
                                                this.setState({dataCurrency:this.state.dataCurrency})
                                                this.animate();
                                                this.updateCurrency(1000);
                                            }}>      
                                    <Animated.Image
                                        source={require('../../assets/images/icon/dollar4.png')}
                                        style={[this.rotateYAnimatedStyle, {width:80,height:80}]}>
                                    </Animated.Image>
                                </TouchableOpacity>    
                                    
                                </View>
                        </View>    

                        <View styles={{marginHorizontal:23,}}>
                                <View style={{flexDirection:'row',paddingHorizontal:25,marginBottom:12 }}>
                                    <View style={{width:'65%',backgroundColor:'#FFF',borderTopLeftRadius:10,borderBottomLeftRadius:10,borderWidth:1,borderColor:'#444',borderStyle: 'dotted'  }}>
                                        <TextInput
                                            style={{padding:16,color:'#444'}}
                                            placeholder="CODIGO DE CUPON"
                                            keyboardType="default"
                                            placeholderStyle={{color:'#444'}}
                                            placeholderTextColor={'#444'}
                                            onChangeText={text => {
                                                this.state.dataCurrency.code = text;
                                                this.setState({
                                                    code:this.state.dataCurrency
                                                })
                                                clearTimeout(this.state.currencyChangeTimeout);
                                            }}
                                        />
                                    </View>
                                    
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',  width:'35%', borderWidth:1,borderColor:'#444',borderStyle: 'dotted' , backgroundColor: this.state.bgColor,borderTopRightRadius:10,borderBottomRightRadius:10 }}>
                                        <TouchableOpacity 
                                            onPress={()=>{
                                                this.setState({ bgColor: Color.theme,isLoadingCode:true,currentDate:new Date()})

                                                setTimeout(()=>{
                                                    this.setState({ bgColor: '#e8e8e8',isLoadingCode:false })
                                                },4000);
                                                if(this.state.dataCurrency.code){
                                                    this.setState({isLoadingCurrency:true,isLoadingCode:false})
                                                    this.updateCurrency(3000);
                                                }
                                                
                                            }}>
                                            <Text style={{color:this.state.isLoadingCode?'#FFF':'#444',textAlign:'center',width:100}}>APLICAR</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>   
                        </View>  
                        <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:6 }}>
                            <Image source={require('../../assets/images/icon/dollar2.png')}
                                            style={{ height: 27.0, width: 27.0 }}
                                            resizeMode="contain"
                            />
                            <View style={{ flexDirection:'row',marginHorizontal:20}}>
                                <Text style={{color:'#444'}}>Ahorro Estimado</Text>
                                <Text style={{fontWeight:'bold',marginLeft:10,color:'#444'}}>S/ {savings}</Text>
                            </View>

                            <TouchableOpacity onPress={()=>{
                                showToastLong('Respecto al tipo de cambio bancario');
                            }}>
                                <Image source={require('../../assets/images/info.png')}
                                            style={{ height: 21.0, width: 21.0 }}
                                            resizeMode="contain"
                                />
                            </TouchableOpacity>
                            
                        </View>

                        <View style={[styles.registerOperation]}>                       
                            <TouchableOpacity 
                                onPress={()=>{
                                    this.state.dataCurrency.data = 'quote_request';
                                    this.setState({
                                        dataCurrency:this.state.dataCurrency,
                                        loadingQuoteRequest:true
                                    })
                                    this.calCurrency(true)
                                }}>
                                {!this.state.loadingQuoteRequest &&<Text style={{fontWeight:'bold', color:'#FFF',textAlign:'center',textTransform:'uppercase'}}>Registrar Operation</Text>}
                                
                                {this.state.loadingQuoteRequest && <ActivityIndicator size="large" color={Color.white}  />}

                            </TouchableOpacity> 
                        </View>
                        <View style={{paddingHorizontal:23,marginVertical:10}}>
                            <Text style={{...Fonts.black13Medium,marginHorizontal:20,fontWeight:'bold',fontSize:15}}>Mis Estadisticas</Text>
                        </View>


                        <View style={{marginLeft:18 }}>
                            <FlatList
                                data={this.state.MyStatics}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                            />
                        </View>

                      
                    
                </View>   
                </ScrollView> 
                
            </SafeAreaView>
        )
    }

}

export default withNavigation(HomeScreen);