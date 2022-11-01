import React, { useEffect, useState } from "react";
import {SafeAreaView,View,Text,FlatList,StatusBar,ActivityIndicator,TouchableOpacity,KeyboardAvoidingView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputBox from "../../component/InputBox";
import styles from "./styles";
import CreditForm from "../../utility/CreditForm";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Color from "../../utility/Color";
import ModalComponent from "../../component/ModalComponent";
import {getProfileInfo, userBankFetch, userCreditCard } from "../../services/Api";
import { showToast, showToastLong } from "../../utility/Index";

const CreditCard = (props) =>{
    
    const [creditForms ,setCreditForm] = useState(CreditForm);

    const [currentDate , setCurrentDate] = useState(new Date());
    const [confirmation , setConfirmation] = useState(false);

    const [isLoading , setLoading] = useState(false);
    const [isVisible , setVisible] = useState(true);

    const [profileInfoUser , setProfileInfo] = useState(null);

    useEffect(()=>{
        console.log({creditForms:creditForms});
        setLoading(true);
        getProfileInfo().then((response)=>{
            console.log({response:response});
            setProfileInfo(response);
            fetchBanks();
        }).catch((error)=>{
            setLoading(false);
            console.log({error:error})
        })
        resetFields();
    },[]);

    const fetchBanks =  ()=>{
        
        userBankFetch().then((response)=>{
            let banks = response.data;
            let bankList = banks.map(bank=>({
                'value':bank.id,
                'label':bank.nickname
            }))
            for(let i=0;i<creditForms.length;i++){
                if(creditForms[i]['key'] == 'bank_id'){
                    creditForms[i]['values'] = bankList;
                    setCreditForm(creditForms);
                    setCurrentDate(new Date());
                    break;
                }
            }
            setLoading(false);

        }).catch((error)=>{
            setLoading(false);
            // setBanks([]);
            showToast("Something went wrong pls try again");
        })
    }

    const resetFields = () =>{
        for(let i=0;i<creditForms.length;i++){
            console.log("fr=="+creditForms[i][creditForms[i]['key']]);
            creditForms[i][creditForms[i]['key']] = '';
        }
        setCreditForm(creditForms);
        setCurrentDate(new Date());
    }
    const onChange = (value,index)=>{
        if(index || index==0){
            creditForms[index][creditForms[index]['key']]=value;
            if(value){
                creditForms[index]['erroMessage'] = '';
            }
            setCreditForm(creditForms);
            setCurrentDate(new Date());
            setTimeout(()=>{
                setCreditForm(creditForms);
                setCurrentDate(new Date());
            },1000);
            
        }
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

    const updateProfileInputs = (type) =>{
        resetFeilds();
        if(type == 1){
            profileData = profileInfoUser.data;
            for(let i=0;i<creditForms.length;i++){
                if(creditForms[i]['parentId']==5){
                    if(creditForms[i]['owner_name']==''){
                        creditForms[i]['owner_name'] = profileData?.name +" "+ profileData?.middlename +" "+ profileData?.lastname_dad + " "+ profileData?.lastname_mom; 
                        creditForms[i]['readOnly'] = true;
                        creditForms[i]['type'] = 'input';
                    }
                    if(creditForms[i]['owner_id_type']=='' && creditForms[i]['id'] == 7){
                        
                        console.log("user id type=="+Number(profileData?.user_id_type));
                        creditForms[i]['owner_id_type'] = Number(profileData?.user_id_type);

                        creditForms[i]['readOnly'] = true;
                        
                    }
                    if(creditForms[i]['owner_id_number'] == ''){
                        creditForms[i]['owner_id_number'] = profileData?.user_id_number;
                        creditForms[i]['readOnly'] = true;
                        creditForms[i]['type'] = 'input';
                    }

                }
            }
        }
        setCreditForm(creditForms);
        setCurrentDate(new Date());
    }

    const resetFeilds = ()=>{
        for(let i=0;i<creditForms.length;i++){
            if(creditForms[i]['parentId']==5){
                
                if(creditForms[i]['owner_name']){
                    creditForms[i]['owner_name'] = '';
                }
                if(creditForms[i]['owner_id_type']){
                    creditForms[i]['owner_id_type'] = '';
                    creditForms[i]['type'] = 'select';
                }
                if(creditForms[i]['owner_id_number']){
                    creditForms[i]['owner_id_number'] = '';
                }
                creditForms[i]['readOnly'] = false;
            }
        }
        setCreditForm(creditForms);
        setCurrentDate(new Date());
    }
    // render item for credit card fields 
    const renderItem = ({ item,index }) => {

        if(item.parentId && item.parentId){
            let index=creditForms.findIndex(creditForm => creditForm.id === item.parentId); 
            let key = creditForms[index]['key'];
            if(!creditForms[index][key] || creditForms[index][key] ==''){
                return;
            }
        }
        if(item.type=='input'){
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
                        readOnly={item.readOnly}
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
                            maxHeight={260}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={item[item.key]}
                            disable={item.readOnly?true:false}
                            backgroundColor={item.readOnly?'#dbd9d9':'#FFF'}
                            onChange={itemSelect => {
                               let index=creditForms.findIndex(x => x.key === item.key); 
                               creditForms[index][item.key] = itemSelect.value;
                               creditForms[index]['erroMessage'] = '';
                               if(creditForms[index]['id'] == 5){
                                        updateProfileInputs(item[item.key]);
                               }
                               setCreditForm(creditForms);
                               setCurrentDate(new Date());
                            }}
                            
                            renderItem={renderSelect}
                    />

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                </View>
            )
        }
    };

    const saveCreditCard = async () =>{
        let creditInfo ={};
        let cardType = creditForms[2]['cType'];
        
        let errorMessage = false;
        for(let i=0;i<creditForms.length;i++){
            if(creditForms[i]['required'] && creditForms[i][creditForms[i]['key']]== '' ){
                creditForms[i]['erroMessage'] ='Field Required!';
                errorMessage = true;
            }
        }
        if(errorMessage){
            setBankProfiles(bankProfiles);
            setCurrentDate(new Date());
            return;
        }
        // let errorMessage = false;
        for(let i=0;i<creditForms.length;i++){
            creditInfo[creditForms[i]['key']] =  creditForms[i][creditForms[i]['key']];

        }

        if(!confirmation){
            showToast('Please Select Checkbox');
            return;
        }
        let profileData1 = profileInfoUser.data;

        console.log({profileData1Tessssss:profileData1});
        creditInfo.status = 1;
        // creditInfo.owner = 2;
        creditInfo.confirm_data = confirmation?1:0;
        creditInfo.created_by_id = profileData1.id;
        creditInfo.user_id = profileData1.id;

        creditInfo.type = creditInfo?.cType;
        console.log({creditInfossss:creditInfo});

        setLoading(true);
        userCreditCard(creditInfo).then((data)=>{
            console.log({ddd:data});
            setLoading(false);
            if(data.message){
                showToast(data.message);
            }
            else{
                props.navigation.goBack();
            }
            console.log(JSON.stringify(data));
            
            
        }).catch((error)=>{
            console.log({error:error});
            setLoading(false);
            showToast("Something went wrong pls try again");
        })

        profileInfoUser.type = bankProfiles[0]['personType'];

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:Colors.backColor   }}>
            <StatusBar backgroundColor={'#111'} />
            <View>
                <Text style={{color:'#444',fontWeight:'bold',marginLeft:20,marginTop:20}}>
                Crear Tarjeta de Crédito
                </Text>
            </View>
            <ModalComponent 
                forceModal={isVisible} setForceModal={()=>{
                    setVisible(!isVisible)
                }}
                navigateTerms={()=>{
                    props.navigation.navigate('Terms');
                }}
                headerTitle={'Registrar Tarjeta de Crédito'}
            />  
            {/* <KeyboardAvoidingView behavior="padding" style={{flex:1}}> */}
                <FlatList
                    data={creditForms}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={currentDate}
                    contentContainerStyle={{paddingBottom:'75%'}}
                    keyboardShouldPersistTaps="always"
                />
            {/* </KeyboardAvoidingView> */}

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:15 }}>
                <CheckBox
                    value={confirmation}
                    onValueChange={(value) => {
                        setConfirmation(!confirmation);
                    }}
                    tintColors={{ true: Color.theme, false: 'black' }}
                />
                <Text style={{fontWeight:'bold',color:Color.black}}>Confirmo que la información proporcionada es verídica <Text style={{color:'red'}}>*</Text></Text>
            </View>

            <View style={{backgroundColor:Color.theme,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:15}}>
                                                    
                                        {isLoading ?<ActivityIndicator size="large" color={Color.white}  />
                                                :<TouchableOpacity 
                                                    disabled={isLoading?true:false} 
                                                    onPress={()=>{
                                                        console.log("on save")
                                                        saveCreditCard();
                                                    }}>
                                                    <Text style={{color:'#FFF',textAlign:'center'}}>Guardar</Text>
                                                </TouchableOpacity> 
                                        }
                
                
            </View>
        </SafeAreaView>
    )
}
export default CreditCard;