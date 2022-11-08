import React, { useEffect, useState } from "react";
import {SafeAreaView,View,Text,FlatList,StatusBar,ActivityIndicator,TouchableOpacity,TextInput,Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputBox from "../../component/InputBox";
import styles from "./styles";
import CreditForm from "../../utility/CreditForm";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Color from "../../utility/Color";
import BankForm from "../../utility/BankForm";
import { showToast, showToastLong } from "../../utility/Index";
import BankProfile from "../../utility/BankProfile";
import ModalComponent from "../../component/ModalComponent";
import { userAccountCreate, userAccountUpdate, userBankFetch } from "../../services/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankAccount = (props) =>{
    
    const [bankForms ,setBankForm] = useState(BankForm);
    const [bankProfiles ,setBankProfiles] = useState(BankProfile);
    const [currentDate , setCurrentDate] = useState(new Date());
    const [currentDateProfile , setCurrentDateProfile] = useState(new Date());
    const [confirmation , setConfirmation] = useState(false);

    const [isLoading , setLoading] = useState(false);
   
    const [showProfileInput , setProfileInput] = useState(false);
    const [bankDetailSave , saveBankDetail] = useState(false);

    const [isVisible , setVisible] = useState(true);

    const [personType , setPersonType] = useState(1);

    const [accountId , setAccountId] = useState(null);
    
    const [userAccountId, setUserAccountId] = useState(null);
    const [bankList , setBanks] = useState([]);

    const flatListRef = React.useRef()

    useEffect(()=>{

        for(let i=0;i<bankForms.length;i++){
            bankForms[i][bankForms[i]['key']] ='';
        }
        setBankForm(bankForms);
        fetchBanks();
        resetFields();
    },[]);

    const resetFields = () =>{
        for(let i=0;i<bankForms.length;i++){
            bankForms[i][bankForms[i]['key']] = '';
        }
        for(let i=0;i<bankProfiles.length;i++){
            bankProfiles[i][bankProfiles[i]['key']] = '';
        }
        setBankProfiles(bankProfiles);
        setBankForm(bankForms);
        setCurrentDate(new Date());
    }

     
    const onChange = (value,index)=>{
        if(index || index==0){
            bankForms[index][bankForms[index]['key']]=value;
            if(value){
                bankForms[index]['erroMessage'] = '';
            }
            setBankForm(bankForms);
            setCurrentDate(new Date());
            setTimeout(()=>{
                setBankForm(bankForms);
                setCurrentDate(new Date());
            },1000);
            
        }
    }

    const fetchBanks =  ()=>{
        setLoading(true);
        userBankFetch().then((response)=>{
            let banks = response.data;
            let bankList = banks.map(bank=>({
                'value':bank.id,
                'label':bank.nickname
            }))
            for(let i=0;i<bankForms.length;i++){
                if(bankForms[i]['key'] == 'bank_id'){
                    bankForms[i]['values'] = bankList;
                    setBankForm(bankForms);
                    setCurrentDate(new Date());
                    break;
                }
            }
            setLoading(false);

        }).catch((error)=>{
            setLoading(false);
            setBanks([]);
            showToast("Something went wrong pls try again");
        })
    }
    const renderSelect = (item) => {
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
    // render item for credit card fields 
    const renderItem = ({ item,index }) => {
        
        let index2=bankForms.findIndex(bankForm => bankForm.id === 3); 
        let key = bankForms[index2]['key'];

        if(bankForms[index]['id'] == 5 && bankForms[index2][key]!=3){
                console.log("index===22=="+bankForms[index2][key])
                return(
                    <View>
                        <InputBox 
                            value={bankForms[index][key]}
                            required={bankForms[index].required}
                            placeholder={bankForms[index].name}
                            secure={false}
                            maxLength={bankForms[index]['maxLimit']}
                            keyboardType={bankForms[index]['inputType']}
                            inputType={bankForms[index]['inputType']}
                            onChangeText={value => onChange(value,index)}
                        /> 
    
                        {(bankForms[index]['instruction']!='') &&
                            <Text style={{color:'#444',marginLeft:30}}>{bankForms[index]['instruction']}</Text>
                        }
                        {(bankForms[index]['erroMessage']!='' && bankForms[index]['required']) &&
                            <Text style={{color:'red',marginLeft:30}}>{bankForms[index]['erroMessage']}</Text>
                        }
            
                    </View>
                )
        }

        else if(bankForms[index]['id'] == 8 && bankForms[index2][key]==3){
                return(
                    <View>
                        {/* <InputBox 
                            value={bankForms[index][key]}
                            required={bankForms[index].required}
                            placeholder={bankForms[index].placeholder}
                            secure={false}
                            maxLength={bankForms[index]['maxLimit']}
                            keyboardType={bankForms[index]['inputType']}
                            inputType={bankForms[index]['inputType']}
                            onChangeText={value => onChange(value,index)}
                            multiline={true}
                        />  */}

                        <TextInput
                            style={{
                                height: 160,
                                margin: 12,
                                borderWidth: 1,
                                borderColor:'#afafaf',
                                padding: 10,
                                color:'#000',
                                textAlignVertical:'top'
                            }}
                            multiline={true}
                            placeholderTextColor='#afafaf'
                            value={bankForms[index][key]}
                            placeholder={bankForms[index].placeholder}
                            onChangeText={value => onChange(value,index)}
                            keyboardType="default"
                            maxLength={bankForms[index]['maxLimit']}

                        /> 

                        {(bankForms[index]['instruction']!='') &&
                            <Text style={{color:'#444',marginLeft:30}}>{bankForms[index]['instruction']}</Text>
                        }
                        {(bankForms[index]['erroMessage']!='' && bankForms[index]['required']) &&
                            <Text style={{color:'red',marginLeft:30}}>{bankForms[index]['erroMessage']}</Text>
                        }
            
                    </View>
                )
        }
        
        else if(item.type=='input' && bankForms[index]['id'] != 8 && bankForms[index]['id'] != 5){
            
            if(bankForms[index]['id'] == 6 && bankForms[index2][key] != 3){
                return(
                    <View>
                        <InputBox 
                            value={item[item.key]}
                            required={item.required}
                            placeholder={item.name}
                            secure={false}
                            maxLength={item.maxLimit}
                            keyboardType={item.inputType}
                            inputType={item.inputType}
                            onChangeText={value => onChange(value,index)}
                        /> 
    
                        {(item.instruction!='') &&
                            <Text style={{color:'#444',marginLeft:30}}>{item.instruction}</Text>
                        }
                        {(item.erroMessage!='' && item.required) &&
                            <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                        }
            
                    </View>
                )
            }
            
            else if(bankForms[index]['id'] != 6){
                return(
                    <View>
                        <InputBox 
                            value={item[item.key]}
                            required={item.required}
                            placeholder={item.name}
                            secure={false}
                            maxLength={item.maxLimit}
                            keyboardType={item.inputType}
                            inputType={item.inputType}
                            onChangeText={value => onChange(value,index)}
                        /> 
    
                        {(item.instruction!='') &&
                            <Text style={{color:'#444',marginLeft:30}}>{item.instruction}</Text>
                        }
                        {(item.erroMessage!='' && item.required) &&
                            <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                        }
            
                    </View>
                )
            }
        }
        if(item.type=='select'){
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.name}
                    
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                    </Text>

                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.values}
                            search={item?.search?true:false}
                            maxHeight={270}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={item[item.key]}
                            onChange={itemSelect => {
                               let index=bankForms.findIndex(x => x.key === item.key); 
                               bankForms[index][item.key] = itemSelect.value;
                               bankForms[index]['erroMessage'] = '';

                               let index3=bankForms.findIndex(bankForm => bankForm.id === 7); 
                               let key = bankForms[index3]['key'];
                               
                               if(bankForms[index3][key]==2){
                                    showToast("Luego de ingresar los datos de la cuenta es necesario incluir la información del TERCERO.");
                                    setProfileInput(true);
                               }
                               else{
                                    setProfileInput(false);
                               }
                               setBankForm(bankForms);
                               setCurrentDate(new Date());
                            }}
                            
                            renderLeftIcon={() => (
                                <Image
                                    source={{uri:item?.logo?.url}}
                                    style={{ height: 18.0, width: 18.0,marginHorizontal:3}}
                                    resizeMode="contain"
                                />
                            )}
                            renderItem={renderSelect}
                    />

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                    {item.instruction && <Text style={{color:'#444',fontSize:14,marginLeft:20}}>{item.instruction}</Text>}
                </View>
            )
        }
    };

    const renderProfileItem = ({item,index}) =>{
        
        if(item.type=='input' && item.showType == personType){
            return(
                <View>
                    <InputBox 
                        value={item[item.key]}
                        required={item.required}
                        placeholder={item.title?item.title:item.name}
                        secure={false}
                        maxLength={item.maxLimit}
                        keyboardType={item.inputType}
                        inputType={item.inputType}
                        onChangeText={value => onChange(value,index)}
                    /> 

                    {(item.instruction!='') &&
                        <Text style={{color:'#444',marginLeft:30}}>{item.instruction}</Text>
                    }
                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    }
        
                </View>
            )
        }
        if(item.type=='select' && (item.id == 1)){
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.name}
                    
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                    </Text>

                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.values}
                            search={item?.search?true:false}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={item[item.key]}
                            onChange={itemSelect => {
                               let index=bankProfiles.findIndex(x => x.key === item.key); 
                               let index2=bankProfiles.findIndex(x => x.id === 1); 
                               
                            //    console.log("item select==");
                            //    console.log({itemSelect:itemSelect});
                               let key = bankProfiles[index2]['key']
                               if(bankProfiles[index2][key]==1){
                                setPersonType(1);
                               }
                               else{
                                setPersonType(2);
                               }

                               setPersonType(itemSelect.id);
                               bankProfiles[index][item.key] = itemSelect.value;
                               bankProfiles[index]['erroMessage'] = '';

                               setBankProfiles(bankProfiles);
                               setCurrentDateProfile(new Date());

                               setTimeout(()=>{
                                    setBankForm(bankProfiles);
                                    setCurrentDateProfile(new Date());
                                },1000);
                            }}
                            renderLeftIcon={() => (
                                <Image
                                    source={{uri:item?.logo?.url}}
                                    style={{ height: 18.0, width: 18.0,marginHorizontal:3}}
                                    resizeMode="contain"
                                />
                            )}
                            
                            renderItem={renderSelect}
                    />

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                    {item.instruction!='' && <Text style={{color:'#444',fontSize:14,marginLeft:20}}>{item.instruction}</Text>}
                </View>
            )
        }
        if(item.type=='select' && (item.showType == personType)){
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.name}
                    
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                    </Text>

                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.values}
                            search={item?.search?true:false}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={item[item.key]}
                            onChange={itemSelect => {
                               let index=bankProfiles.findIndex(x => x.key === item.key); 
                              
                               bankProfiles[index][item.key] = itemSelect.value;
                               bankProfiles[index]['erroMessage'] = '';

                               setBankProfiles(bankProfiles);
                               setCurrentDateProfile(new Date());
                            }}
                            
                            renderLeftIcon={() => (
                                <Image
                                    source={{uri:item?.logo?.url}}
                                    style={{ height: 18.0, width: 18.0,marginHorizontal:3}}
                                    resizeMode="contain"
                                />
                            )}
                            renderItem={renderSelect}
                    />

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                    {item.instruction!='' && <Text style={{color:'#444',fontSize:14,marginLeft:20}}>{item.instruction}</Text>}
                </View>
            )
        }

        if(item.type=='Text'){
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.name}</Text>
                </View>
            )
        }

        if(item.type=='input' && item.fieldType=='optional'){
            return(
                <View>
                    <InputBox 
                        value={item[item.key]}
                        required={item.required}
                        placeholder={item.name}
                        secure={false}
                        maxLength={item.maxLimit}
                        keyboardType={item.inputType}
                        inputType={item.inputType}
                        onChangeText={value => onChange(value,index)}
                    /> 

                    {(item.instruction!='') &&
                        <Text style={{color:'#444',marginLeft:30}}>{item.instruction}</Text>
                    }
                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    }
        
                </View>
            )
        }
    }

    const saveBankForm = async () =>{
        let personIndex = bankForms.findIndex(bank => bank.key === 'owner'); 
        let requestBody = {};
        
        let errorMessage = false;
        for(let i=0;i<bankForms.length;i++){
            let index2=bankForms.findIndex(bankForm => bankForm.id === 3); 
            let key = bankForms[index2]['key'];
            if(bankForms[i]['id'] == 5 && bankForms[index2]['bankType']<=2){
                if(bankForms[i][bankForms[i]['key']]=='' && bankForms[i]['required']){
                    bankForms[i]['erroMessage'] = 'Fields Required!';  
                    errorMessage = true;  
                } 
            }
            else if(bankForms[i]['id'] == 8 && bankForms[index2]['bankType']>2){
                if(bankForms[i][bankForms[i]['key']]=='' && bankForms[i]['required']){
                    bankForms[i]['erroMessage'] = 'Fields Required!';  
                    errorMessage = true;  
                }
            }
            else if(bankForms[i][bankForms[i]['key']]=='' && bankForms[i]['required'] && bankForms[i]['id'] != 8 && bankForms[i]['id'] != 5){
                bankForms[i]['erroMessage'] = 'Fields Required!';  
                errorMessage = true;  
            }
            else if(bankForms[i]['bankType'] =='' && bankForms[i]['required'] && bankForms[i]['id'] != 8 && bankForms[i]['id'] != 5){
                bankForms[i]['erroMessage'] = 'Fields Required!';    
                errorMessage = true;
            }
            

            
        }

        

        if(errorMessage){
            // console.log({dd:bankForms});
            setBankForm(bankForms);
            setCurrentDate(new Date());
            return;
        }
        

        if(!confirmation){
            showToast('Please Select Checkbox');
            return;
        }

        requestBody = bankForms.reduce((map,obj) =>{

            if(obj['key'] != 'bankType'){
                map[obj['key']] = obj[obj['key']];
            }
            else{
                map['type'] = obj[obj['key']];
            }
            
            return map;
        },{});
        const user = await AsyncStorage.getItem('user');
        let userParse = JSON.parse(user);

        requestBody.status = 1;
        // requestBody.owner = 2;
        requestBody.confirm_data = confirmation?1:0;
        requestBody.created_by_id = userParse.id;
        requestBody.user_id = userParse.id;


        if(requestBody.type ==3){
            requestBody.number = '00000';
            requestBody.cci = '00000';
        }
        // console.log({requestBody:requestBody});

        // console.log(JSON.stringify(requestBody));
        setAccountId(null);
        setLoading(true);
        userAccountCreate(requestBody).then((data)=>{
            setLoading(false);
            console.log({data:data});
            // console.log("Account id=="+data?.data?.user_account_thirds[0]['id']);
            if(data.message){
                showToast(data.message);
                return;
            }
            if(data?.data?.user_account_thirds[0] && data?.data?.user_account_thirds[0]?.id){
                setAccountId(data?.data?.id);  
                setUserAccountId(data?.data?.user_account_thirds[0]['id'])    
            }
            
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
            if(bankForms[personIndex]['owner'] == 2){
                saveBankDetail(true);
            }
            else{
                props.navigation.goBack();
            }
        }).catch((error)=>{
            console.log({error:error});
            setLoading(false);
            showToast("Something went wrong pls try again");
        })

    }

    const updateBankForm = async () =>{
        let profileInfo ={};
        let personType = bankProfiles[0]['personType'];
        
        console.log({bankProfiles5444444:bankProfiles});
        console.log("pp=="+personType);
        let errorMessage = false;
        for(let i=0;i<bankProfiles.length;i++){
            if(personType == bankProfiles[i]['showType'] &&  bankProfiles[i]['required'] && bankProfiles[i][bankProfiles[i]['key']]== '' ){
                bankProfiles[i]['erroMessage'] ='Field Required!';
                errorMessage = true;
            }
        }

        console.log({bankProfiles:bankProfiles});
        if(errorMessage){
            setBankProfiles(bankProfiles);
            setCurrentDate(new Date());
            return;
        }
        // let errorMessage = false;
        profileInfo['type'] = bankProfiles[0]['personType']=='Persona'?1:2;
        for(let i=0;i<bankProfiles.length;i++){
            console.log({bankProfiles:bankProfiles[i]});
             if(profileInfo['type'] == bankProfiles[i]['showType']){
                if(bankProfiles[i]['key']=='id_type'){
                    profileInfo[bankProfiles[i]['key']] = bankProfiles[i][bankProfiles[i]['key']]=='DNI'?1:bankProfiles[i][bankProfiles[i]['key']]=='CE'?2:3;
                }
                else{
                    profileInfo[bankProfiles[i]['key']] = bankProfiles[i][bankProfiles[i]['key']]
                }  
             }
             else if(bankProfiles[i]['showType'] ==3){
                profileInfo[bankProfiles[i]['key']] = bankProfiles[i][bankProfiles[i]['key']]
             }
        }
        

        const user = await AsyncStorage.getItem('user');
        let userParse = JSON.parse(user);
        
        profileInfo.created_by_id = userParse.id;
        profileInfo.user_account_id = accountId

        profileInfo.accountId = userAccountId

        console.log({profileInfosss:profileInfo});

        setLoading(true);
        userAccountUpdate(profileInfo).then((data)=>{
            console.log({data:data});

            console.log(JSON.stringify(data));
            setLoading(false);
            props.navigation.goBack();
        }).catch((error)=>{
            console.log({error:error});
            setLoading(false);
            showToast("Something went wrong pls try again");
        })

        profileInfo.type = bankProfiles[0]['personType'];

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:Colors.backColor   }}>
            <StatusBar backgroundColor={'#111'} />

            <View>
                <Text style={{color:'#444',fontWeight:'bold',marginLeft:20,marginTop:20}}>
                    {!bankDetailSave?'Crear Cuenta de Banco':'Editar Información del Tercero'}
                </Text>
            </View>

            <ModalComponent forceModal={isVisible} setForceModal={()=>{
                    setVisible(!isVisible)
                }}
                navigateTerms={()=>{
                    props.navigation.navigate('Terms');
                }}
                headerTitle={'Crear Cuenta Bancaria'}
            />  
            
            <FlatList
                data={(bankDetailSave && showProfileInput)?bankProfiles:bankForms}
                renderItem={(bankDetailSave && showProfileInput)?renderProfileItem:renderItem}
                keyExtractor={item => item.id}
                extraData={(bankDetailSave && showProfileInput)?currentDate:currentDateProfile}
                contentContainerStyle={{paddingBottom:'67%'}}
                ref={flatListRef}
            />

            {!(bankDetailSave && showProfileInput) &&<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:15 }}>
                <CheckBox
                    value={confirmation}
                    onValueChange={(value) => {
                        setConfirmation(!confirmation);
                    }}
                    tintColors={{ true: Color.theme, false: 'black' }}
                />
                <Text style={{fontWeight:'bold',color:Color.black}}>Confirmo que la información proporcionada es verídica <Text style={{color:'red'}}>*</Text></Text>
            </View>}

            <View style={{backgroundColor:Color.theme,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:15}}>
                                                    
                                        {isLoading ?<ActivityIndicator size="large" color={Color.white}  />
                                                :<TouchableOpacity 
                                                    disabled={isLoading?true:false} 
                                                    onPress={()=>{
                                                        console.log("on save4")
                                                        // saveBankDetail(true);
                                                        // saveUserDetail();
                                                        if(!bankDetailSave){
                                                            saveBankForm();
                                                        }
                                                        else{
                                                            updateBankForm();
                                                        }
                                                        

                                                        setCurrentDate(new Date());
                                                    }}>
                                                    <Text style={{color:'#FFF',textAlign:'center'}}>Guardar</Text>
                                                </TouchableOpacity> 
                                        }
                
                
            </View>
        </SafeAreaView>
    )
}
export default BankAccount;