import React, { useEffect, useState } from "react";
import {SafeAreaView,View,Text,StyleSheet,FlatList,Image,ScrollView, TouchableOpacity,ActivityIndicator , StatusBar ,AsyncStorage } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputBox from "../../component/InputBox";
import CheckBox from '@react-native-community/checkbox';
import Inputs from "../../utility/Inputs";

import {Picker} from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'

import moment from 'moment'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Modal from "react-native-modal";
import Constant from "../../utility/Constant";

import { showToast, showToastLong } from "../../utility/Index";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import InputsCompany from "../../utility/InputsCompany";
import UserProfile from "../../utility/UserProfile";
import Color from "../../utility/Color";
import styles from "./style";
import { color } from "react-native-reanimated";

import { WebView } from 'react-native-webview';


const Types = [

    {
        'id':1,
        'label':'DNI',
        'value':'DNI' 
    },
    {
        'id':2,
        'label':'CE',
        'value':'CE' 
    },
    {
        'id':3,
        'label':'PASAPORTE',
        'value':'PASAPORTE' 
    },
    
];

const personTypes =[

    {
        'id':1,
        'label':'Persona',
        'value':'Persona' 
    },
    {
        'id':2,
        'label':'Empresa',
        'value':'Empresa' 
    },
]
const Profile = (props) =>{

    const [isLoading , setLoading] = useState(false);
    const [currentDate , setCurrentDate] = useState(new Date());

    const [identificationTypes , setTypes] = useState(Types);

    const [personTypes2 ,setPerson] = useState(personTypes);

    const [moreInfoModal , showMoreInfo] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [inputFields ,setInputFields] = useState(Inputs);

    const [inputFieldsCompany,setCompanyFields] = useState(InputsCompany);
    const [date, setDate] = useState(new Date());

    const [establishedDate, setEstablishedDate] = useState(new Date());
    const [isOpen, setOpen] = useState(false)
    const [profile, setProfile] = useState(1)
    const [identificacion, setIdentification] = useState(1)

    const [companyIdentification , setCompanyIdentification] = useState('');

    const [pep,setPep] = useState(false);
    const [moreInformation , showMoreInformation] = useState(false);

    const [imageModal, showImageModal] = useState(false);

    const [photo, setPhotoURI] = useState(null);
    
    const [imagePath, setImagePath] = useState(null);

    const [userInfo , setUserInfo] = useState();

    const [accessToken , setToken] = useState('');

    const [forceModal, setForceModal] = useState(false);

    const [userStatus, setStatus] = useState('');

    const [userProfileInfo, setProfileInfo] = useState();

    const [companyAdditional, setCompanyAdditional] = useState(false);

    const [name, setName] = useState();
    const [lastname_dad, setLastName] = useState();
    const [cell_phone, setCellPhone] = useState();

    const [profileCompanies , setProfileCompanies] = useState();

    const [isLoadingSplash , setLoadingSplash] = useState(true);

    const [profileView , showProfileView] = useState(false);

    const [userEdit , setEditProfile] = useState(false);

    const [company_status , companyUpdated] = useState(false);

    const [editConfirm , showEditConfirm ] = useState(false);
    const [webViewVisible ,setWebview] = useState(false);
    useEffect(() =>{
        fetchData();
        resetProfile();
    },[]);

    useEffect(()=>{
    },[props.navigation]);

    function hideSpinner(){
        setLoading(false);
    }


    const resetProfile = ()=>{
        setCompanyAdditional(false);
        for(let i=0;i<inputFields.length;i++){
            inputFields[i][inputFields[i]['key']]='';
        }
        for(let j=0;j<inputFieldsCompany.length;j++){
            inputFieldsCompany[j][inputFieldsCompany[j]['key']]='';
        }
        setInputFields(inputFields);
        setCompanyFields(inputFieldsCompany);
        setCurrentDate(new Date());
    }
    
    const fetchData = async ()=>{

        const user = await AsyncStorage.getItem('user')
        const accessToken = await AsyncStorage.getItem('access_token');
        let userParse = JSON.parse(user);

        
        if(!userParse){
            props.navigation.navigate('Login')
        }
        setUserInfo(userParse);
        setForceModal(false);
        if(userParse.status==0){
            setForceModal(true);
        }
       
        getProfileData(userParse,accessToken,1);
        setTimeout(()=>{
            if(userParse.status==2){
                getProfileData(userParse,accessToken,1);
            }
        },1000);
        setToken(accessToken);
    }

    // update profile Fields 
    const updateFields = () =>{
        for(let i=0;i<inputFields.length;i++){
            if(inputFields[i]['type'] == 'image' && userProfileInfo && userProfileInfo['user_id_file']){
                let url = Constant.s3Url+userProfileInfo['user_id_file']['id']+"/"+userProfileInfo['user_id_file']['file_name']
                inputFields[i][inputFields[i]['key']] = userProfileInfo['user_id_file']['file_name'];
                setPhotoURI(url);
            }
            else if(i==0){
                setProfile(parseInt(userProfileInfo['type']))
                inputFields[0]['type'] = userProfileInfo['type'];
            }
            else if(i==1){
                setIdentification(parseInt(userProfileInfo['user_id_type']));
                inputFields[1]['user_id_type'] = userProfileInfo['user_id_type'];
            }
            else if(i==2){
                if(userProfileInfo['is_pep']){
                    setPep(true);    
                }
                else{
                    setPep(false);
                }
                
            }
            else if(inputFields[i]['key']=='birthday'){

                let birthday = userProfileInfo[inputFields[i]['key']].split("/");

                let date = new Date();

                date.setDate(birthday[0]);
                date.setMonth(birthday[1]);
                date.setFullYear(birthday[2]);

                date=new Date(date);

                setDate(date);
            }
            else{
                inputFields[i][inputFields[i]['key']] = userProfileInfo[inputFields[i]['key']]?userProfileInfo[inputFields[i]['key']]:'';
            }
            
        }

        if(userProfileInfo['profile_companies'] && userProfileInfo['profile_companies'].length){
            for(let i=0;i<inputFieldsCompany.length;i++){

                if(inputFieldsCompany[i]['key']=='legalrep_id_type'){
                    if(userProfileInfo['profile_companies'] && userProfileInfo['profile_companies'][0] && userProfileInfo['profile_companies'][0]['legalrep_id_type']){
                        setCompanyIdentification(parseInt(userProfileInfo['profile_companies'][0]['legalrep_id_type']));
                    }
                    
                }
                // setIdentification(parseInt(userProfileInfo['user_id_type']));


                inputFieldsCompany[i][inputFieldsCompany[i]['key']] = userProfileInfo['profile_companies'][0][inputFieldsCompany[i]['key']]?userProfileInfo['profile_companies'][0][inputFieldsCompany[i]['key']]:'';
            }
            setCompanyFields(inputFieldsCompany);
        }
        
        setInputFields(inputFields);
        setCurrentDate(new Date());
    }
    // get profile data
    const getProfileData = async (userDetail,accessTokenTemp,type,formType)=>{

        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessTokenTemp
        };
        
        const options = {
            method: 'GET',
            headers,
        };

        let url = Constant.API_URL;

        url +='profiles/';

        url +=userDetail?.created_by_profiles?userDetail?.created_by_profiles[0]['id']:userDetail?.id;

        const response = await fetch(url, options);

        const jsonResposne = await response.json();

        let profileInfo = jsonResposne?.data;

        setLoadingSplash(false);
        if(jsonResposne && jsonResposne?.data){
            setProfileInfo(jsonResposne?.data);
        }
        
        setLoading(false);
        let status = profileInfo?.created_by?.status;

        if(status){
            setStatus(status);
        }
       
       

    }

    const onChange = (value,index)=>{
        if(index || index==0){
            inputFields[index][inputFields[index]['key']]=value;
            
            if(value){
                inputFields[index]['erroMessage'] = '';
            }
            setInputFields(inputFields);
            setCurrentDate(new Date());
            setTimeout(()=>{
                setInputFields(inputFields);
                setCurrentDate(new Date());
            },1000);
            
        }
        
    }
    const onChangeCompany = (value,index)=>{
        if(index || index==0){
         inputFieldsCompany[index][inputFieldsCompany[index]['key']]=value;
         console.log("index== 29999"+index);
        
         if(value){
            inputFieldsCompany[index]['erroMessage'] = '';
         }
         setCompanyFields(inputFieldsCompany);
         setCurrentDate(new Date());
         setTimeout(()=>{
            setCompanyFields(inputFieldsCompany);
            setCurrentDate(new Date());
        },1000);
        }
    }

    const selectImageType = async (type) => {
        showImageModal(false);
        if(type==1){
            const result = await launchImageLibrary();
            setPhotoURI(result['assets'][0]['uri'])
            setImagePath(result['assets']);
            setLoading(true);
            setTimeout(()=>{
                uploadImage(result['assets']);
            },500)
        }
        else if(type==2){
            const result = await launchCamera(); 
            setPhotoURI(result['assets'][0]['uri'])
            setImagePath(result['assets']);
            setLoading(true);
            setTimeout(()=>{
                uploadImage(result['assets']);
            },500)
        }
    }

    const uploadImage = async (path)=>{

        let index = inputFields.findIndex(x => x.type === 'image');

        inputFields[index]['erroMessage'] = '';

        setInputFields(inputFields);
        
        let url = Constant.API_URL;

        url +='profiles/media';
        
        // url +='operation-transfers/media';

        var photo = {
            uri: path[0]['uri'],
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        var form = new FormData();
        form.append("file", photo);
        fetch(
        url,
        {
            body: form,
            method: "POST",
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + accessToken
            }
        }
        ).then((response) => response.json())
        .catch((error) => {
            setLoading(false);
            alert("ERROR " + error)
        })
        .then((responseData) => {
            setLoading(false);
            setImagePath(responseData?.name);
        }).done();     
    }
    const RenderImageOption=()=> {
        return (
          <View style={{backgroundColor:'white'}}>
            <Modal isVisible={imageModal}
                onBackdropPress={() => {showImageModal(false)}}
             >
            <View style={styles.centeredView} >
             <View style={styles.modalView}>
                <View style={styles.imageBtn}>
                    <TouchableOpacity onPress={()=>{
                        selectImageType(1);
                    }}>
                        <Text style={styles.label}>Upload From Gallery</Text>
                    </TouchableOpacity>  
                </View>
                
                <View style={styles.imageBtn}>
                    <TouchableOpacity onPress={()=>{
                        selectImageType(2);
                        }}>
                        <Text style={styles.label}>Upload From Camera</Text>
                    </TouchableOpacity>  
                </View>
              </View>
            </View>  
            </Modal>
          </View>
        );
    }
    const Logo = () => {
        return (
            <Image source={require('../../assets/images/logo.png')}
                style={{ alignSelf: 'center', width: 140.0, height: 90.0, marginBottom: 1 }}
                resizeMode="contain"
            />
        )
    }

    const navigateTerms = () =>{
        props.navigation.navigate('Terms')        
    }
    const RenderModal =()=> {
        return (
          <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={forceModal}
                onBackdropPress={() => {}}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView2}>
                        <View>
                            <Logo />
                            <Text style={[styles.label,{fontWeight:'bold',fontSize:25}]}>¡Bienvenido!</Text>

                            <View style={{paddingHorizontal:40,paddingVertical:10}}>
                                <Text style={styles.subTitlelabel}>
                                    Para realizar operaciones le agradecemos actualizar sus datos personales. Estos son validados con su documento de identidad y será HABILITADO para registrar operaciones. Una vez validados no podrá cambiarlos.
                                </Text>
                            </View>
                            <View style={{paddingHorizontal:40,paddingVertical:10}}>    
                                <Text style={styles.subTitlelabel}>
                                * De igual manera le agradecemos verificar su correo electrónico para validarlo.

                                </Text>
                            </View>

                            <TouchableOpacity onPress={()=>{
                                setForceModal(false);
                            }}>
                            

                                <View style={{
                                    backgroundColor:Color.theme,
                                    marginHorizontal:50,
                                    paddingVertical:10,
                                    marginBottom:40,
                                    borderRadius:10,
                                    marginVertical:20
                                } }>
                                    <Text style={[styles.label,{color:'#FFF'}]}>Comenzar a Cambiar</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{paddingHorizontal:23}}>
                                <Text style={styles.subTitlelabel}>
                                    <Text style={styles.label}>NOTA:</Text>
                                    Peruana de Cambio de Divisas S.A.C. - Divisapp, es una empresa comprometida con las normativas de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLAFT). Para mayor información consulte nuestros
                                    
                                    <Text>{' '}</Text>
                                    <Text style={{textDecorationLine:'underline',color:'#ee2737',padding:8}} onPress={()=>{
                                        navigateTerms();
                                    }}>Términos y Condiciones</Text>
                                </Text>
                            </View>

                        </View>
                       </View> 
                    </View>
                 
                 
            </Modal>
          </View>
        );
    }

    const RenderMoreInfo =()=> {
        return (
          <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={moreInfoModal}
                onBackdropPress={() => {
                    showMoreInfo(false)                     
                }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView3}>

                        <View style={{margin:8,alignSelf:'flex-end'}}>
                                <TouchableOpacity
                                onPress={()=>{
                                    showMoreInfo(false)     
                                    }}
                                >
                                    <Image source={require('../../assets/images/icon/close.png')}
                                            style={{ height: 17.0, width: 17.0 }}
                                            resizeMode="contain"
                                    />
                        
                                </TouchableOpacity>
                        </View>  
                        <View>
                            <View style={{alignSelf:'center'}}>
                                <Image source={require('../../assets/images/info.png')}
                                        style={{ height: 35.0, width: 35.0 }}
                                        resizeMode="contain"
                                />
                            </View>

                            <Text style={[styles.label,{fontWeight:'bold',fontSize:19}]}>¿Qué es PEP?</Text>

                            <View style={{paddingHorizontal:6,paddingVertical:10}}>
                                <Text style={styles.subTitlelabel}>
                                    De acuerdo a la normativa del Sistema de Prevención de Lavado de Activos y del Financiamiento del Terrorismo, son las Personas naturales, nacionales o extranjeras, que cumplen o que en los últimos cinco (5) años hayan cumplido funciones públicas destacadas o funciones prominentes en una organización internacional, sea en el territorio nacional o extranjero, y cuyas circunstancias financieras puedan ser objeto de un interés público. La relación de los cargos o funciones dentro de la lista PEP se encuentra en la Resolución SBS N° 4349-2016
                                </Text>
                            </View>
                        </View>
                       </View> 
                    </View>
                 
                 
            </Modal>
          </View>
        );
    }

    const RenderEditConfirm =()=> {
        return (
          <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
            <Modal isVisible={editConfirm}
                onBackdropPress={() => {
                    showEditConfirm(false)                     
                }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView4}>

                        <View style={{margin:8,alignSelf:'flex-end'}}>
                                <TouchableOpacity
                                onPress={()=>{
                                        showEditConfirm(false)          
                                    }}
                                >
                                    <Image source={require('../../assets/images/icon/close.png')}
                                            style={{ height: 17.0, width: 17.0 }}
                                            resizeMode="contain"
                                    />
                        
                                </TouchableOpacity>
                        </View>  
                        <View>
                            <View style={{alignSelf:'center'}}>
                                <Image source={require('../../assets/images/info.png')}
                                        style={{ height: 50.0, width: 50.0 }}
                                        resizeMode="contain"
                                />
                            </View>

                            <Text style={[styles.label,{fontWeight:'bold',fontSize:19}]}>Estimado Usuario</Text>

                            <View style={{paddingHorizontal:6,paddingVertical:10}}>
                                <Text style={styles.subTitlelabel}>
                                    Usted podrá modificar los datos de su perfil hasta que estos sean <Text style={{fontWeight:'bold'}}>validados</Text> con su documento de identidad. Luego de ello le agradecemos comunicarse con soporte@divisapp.com.
                                
                                </Text>
                            </View>




                            <View style={{paddingHorizontal:6,paddingVertical:10}}>
                                <View style={{backgroundColor:Color.theme,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:5}}>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            showEditConfirm(false);
                                            setEditProfile(true);
                                        }}>
                                        <Text style={{color:'#FFF',textAlign:'center'}}>Entendido</Text>
                                    </TouchableOpacity> 
                                </View>  

                                <View style={{backgroundColor:Color.bgGray,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:5}}>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            showEditConfirm(false);
                                        }}>
                                        <Text style={{color:'#444',textAlign:'center'}}>Cerrar</Text>
                                    </TouchableOpacity> 
                                </View>    
                            </View>

                            <View style={{paddingHorizontal:6,paddingVertical:5}}>
                                <Text style={styles.subTitlelabel}>
                                <Text style={{fontWeight:'bold'}}>NOTA: </Text>
                                    Peruana de Cambio de Divisas SAC - Divisapp, es una empresa comprometida con las normativas de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLAFT). Para mayor información consulte nuestros Términos y Condiciones.
                                </Text>
                            </View>
                        </View>
                       </View> 
                    </View>
                 
                 
            </Modal>
          </View>
        );
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

    const openGallery = async () => {
        showImageModal(true);
    }

    const renderCompany = ({item,index}) =>{

        if(item.type=='input'){
            return(
                <View>
                 
                    <InputBox 
                        value={item[item.key]}
                        required={item.required}
                        placeholder={item.title}
                        secure={false}
                        maxLength={item.maxLimit}
                        keyboardType={item.inputType}
                        inputType={item.inputType}
                        onChangeText={value => onChangeCompany(value,index)}
                    /> 

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    }

                    {(item.instruction!='') &&
                        <Text style={{color:'#444',marginLeft:30}}>{item.instruction}</Text>
                    }
        
                </View>
            )
        }
        if(item.type=='date'){
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.title}
                    
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                    </Text>

                    <DatePicker
                        mode={'date'}
                        locale='es'
                        modal
                        textColor={'#FFF'}
                        open={isOpen}
                        date={establishedDate}
                        onConfirm={(date) => {
                            setOpen(false)
                            inputFieldsCompany[index][inputFieldsCompany[index]['key']]=date;
                            setCompanyFields(inputFieldsCompany);
                            setEstablishedDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <TouchableOpacity onPress={()=>{
                            setOpen(!isOpen);
                     }}>
                    

                        <View style={{
                            backgroundColor:'#FFF',
                            marginHorizontal:22,
                            paddingVertical:10,
                            marginBottom:10
                        }}>
                            <Text style={styles.label}>{establishedDate.toString()?moment(establishedDate).format("MMM Do YY"):'Select Date'}</Text>
                        </View>
                    </TouchableOpacity>

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                </View>
            )
        }
        
        if(item.type=='Text'){
            return(
                <View style={{marginVertical:10}}>
                    <Text style={styles.label}>{item.title}</Text>

                    {item?.subtitle && <Text style={[styles.label,{fontWeight:'normal',fontSize:12,paddingHorizontal:25}]}>{item.subtitle}</Text>}
                    
                </View>
            )
        }
       
        if(item.type=='select'){
           return( 
                <View>               
                         <Text style={[styles.label,styles.textAlign]}>{item.title}
                        
                            {true && <Text style={{color:'red'}}>*</Text>}
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.values}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            // value={companyIdentification}
                            value={getIdentificationValue(companyIdentification)}
                            onChange={item => {
                                
                               let index=inputFieldsCompany.findIndex(x => x.key === 'legalrep_id_type'); 
                               inputFieldsCompany[index]['legalrep_id_type'] = item.id;
                               inputFieldsCompany[index]['erroMessage'] = '';

                               setCompanyFields(inputFieldsCompany);
                               setCurrentDate(new Date());
                               setCompanyIdentification(item.id);
                            }}
                            
                            renderItem={renderSelect}
                        />
                        
                        <Text style={{color:'red',marginLeft:30}}>{inputFieldsCompany[index]['erroMessage']}</Text>
                </View>        
           )
        }
    }
    const renderItem = ({ item,index }) => {
        if(item.type=='input'){
            return(
                <View>
             
                    <InputBox 
                        value={item[item.key]}
                        required={item.required}
                        placeholder={item.id==7?item.title:item.name}
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
        if(item.type=='date'){
            
            let birthday = new Date();

            if(item?.birthday){
                
            }
           
            return(
                <View>
                   
                    <Text style={[styles.label,styles.textAlign]}>{item.name}
                    
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                    </Text>

                    <DatePicker
                        mode={'date'}
                        locale='es'
                        textColor={'#FFF'}
                        modal
                        open={isOpen}
                        date={date}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            inputFields[index][inputFields[index]['key']]=date;
                            setInputFields(inputFields);
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    
   
                    <TouchableOpacity onPress={()=>{
                            setOpen(!isOpen);
                     }}>
                    

                        <View style={{
                            backgroundColor:'#FFF',
                            marginHorizontal:22,
                            paddingVertical:10,
                            marginBottom:10
                        }}>
                            <Text style={styles.label}>{date.toString()?moment(date).format("MMM Do YY"):'Select Date'}</Text>
                        </View>
                    </TouchableOpacity>

                    {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                    } 
                </View>
            )
        }
        
        if(item.type=='Text'){
            return(
                <View style={{marginVertical:10}}>
                    <Text style={styles.label}>{item.name}</Text>
                    
                </View>
            )
        }
       
        if(item.type=='image'){
           
           return( 
            <View style={{marginBottom:10}}>
                <Text style={[styles.label,styles.textAlign]}>{item.name}
                    {item.required && <Text style={{color:'red'}}>*</Text>}
                </Text>

                <TouchableOpacity onPress={()=>{
                            openGallery();

                    }}>

                        {!photo &&<View style={{backgroundColor:'white',marginHorizontal:22,paddingVertical:15}}>
                            <Text style={[styles.label,{fontWeight:'bold'}]}>
                                Click para adjuntar imagen
                                
                            </Text>

                            <Text style={{color:'#444',textAlign:'center'}}>
                                Puede usar la cámara de su celular o adjuntar una imagen de memoria/disco duro.
                                Max. 7 Mb (archivo de imagen .jpg .png .jpeg)
                            </Text>
                        </View>  }

                        {photo &&

                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <Image
                                        source={{ uri: photo }}
                                        style={ { width: 250, height: 200 } }
                                    />
                            </View>

                        }   

                        <Text style={[styles.subTitlelabel,{paddingHorizontal:21,marginVertical:5}]}>
                            {/* {item.instruction} */}
                            <Text style={{fontWeight:'bold'}}>Nota</Text> Su identificación es <Text style={{fontWeight:'bold'}}>requisito indispensable</Text> para ser habilitado a realizar operaciones.   
                        </Text>

                </TouchableOpacity>
                {(item.erroMessage!='' && item.required) &&
                        <Text style={{color:'red',marginLeft:30}}>{item.erroMessage}</Text>
                }
            </View>
           )
        }
       
        
    };

    // getValue of key
    const getValueKey=(key,type)=>{

        if(type=='image'){
        }
        if((userProfileInfo && (userProfileInfo[key] && key) ||  key=='type2' )){
            if(key=='type2'){

                let index=personTypes2.findIndex(x => x.id === parseInt(userProfileInfo?.type));

                if(personTypes2[index]?.['label']){
                    return personTypes2[index]['label'];
                }
                else{
                    return '-'
                }
                
            }
            else if(key=='user_id_type'){
                
                let index=identificationTypes.findIndex(x => x.id === parseInt(userProfileInfo?.user_id_type));


                if(identificationTypes[index]?.['label']){
                    return identificationTypes[index]['label'];
                }
                else{
                    return '-'
                }
            }
            else if(key=='is_pep'){

                console.log("prfff==");
                console.log(userProfileInfo?.is_pep);
                if(userProfileInfo?.is_pep){
                    return userProfileInfo?.is_pep==1?'SI':'No';
                }
                else{
                    return 'No';
                }
                
                return userProfileInfo?.is_pep?'Enabled':'Disabled';
            }
            return (userProfileInfo && userProfileInfo[key])?userProfileInfo[key].toString():'';
        }
        else {
            return '';
        }
             
    }


     // getValue of key
     const getValueCompanyKey=(key,type)=>{

        const profileInfo = userProfileInfo.profile_companies[0];


        if(key=='legalrep_id_type'){           
            let index=identificationTypes.findIndex(x => x.id === parseInt(profileInfo['legalrep_id_type']));
            if(identificationTypes[index]?.['label']){
                return identificationTypes[index]['label'];
            }
            else{
                return '-'
            }
        }
        if(type=='image'){
        }
        if((profileInfo && (profileInfo[key] && key) ||  key=='type2' )){
            if(key=='type2'){
                let index=personTypes2.findIndex(x => x.id === parseInt(profileInfo?.type));
                if(personTypes2[index]?.['label']){
                    return personTypes2[index]['label'];
                }
                else{
                    return '-'
                }
            }
            else if(key=='user_id_type'){
                let index=identificationTypes.findIndex(x => x.id === parseInt(profileInfo?.user_id_type));
                if(identificationTypes[index]?.['label']){
                    return identificationTypes[index]['label'];
                }
                else{
                    return '-'
                }
            }
            else if(key=='is_pep'){
                if(profileInfo?.is_pep){
                    return profileInfo?.is_pep==1?'SI':'No';
                }
                else{
                    return 'No'
                }      
                        
            }
            return (profileInfo && profileInfo[key])?profileInfo[key].toString():'';
        }
        else {
            return '';
        }    
    }
    // render user info
    const renderUserInfo = ({ item,index }) =>{
         if(item.key=='terms' || item.key=='two_factor' || item.key=='google_id' || item.key=='facebook_id' || item.key=='linked_id' || item.key=='microsoft_id'){
            return(ProfileDetail({
                title: item.name,
                value: userInfo[item.key]?'Enlazado':'No hay Cuenta Enlazada',
            }))
         }
         else if(item.key=='enabled'){
            return(ProfileDetail({
                title: item.name,
                value: (userInfo.status==0 || userInfo.status==1)?'REGISTRADO':'HABILITADO',
            }))
         }
         else{

            if(item.key!='email_verified_at'){
                return(ProfileDetail({
                    title: item.name,
                    value:userInfo[item.key]?userInfo[item.key].toString():'',
                }))
            }   
            else{

                if(userInfo[item.key]){
                    return(ProfileDetail({
                        title: item.name,
                        value:'Verificado'
                    }))
                }
                else{
                    return(ProfileDetail({
                        title: item.name,
                        value:'No Verificado'
                    }))
                }

                let date = new Date();
                if(userInfo[item.key]){
                   date = (userInfo[item.key].split(" ")[0]).split("/");
                   date = date[0]+"/"+date[1]+"/"+date[2];
                }
                else{
                    date = date.getDate()+"/"+parseInt(date.getMonth())+1+"/"+date.getFullYear();
                }
                

                // let date = (userInfo[item.key].split(" ")[0]).split("/");
                return(ProfileDetail({
                    title: item.name,
                    value:date[0]+"/"+date[1]+"/"+date[2]
                }))
            }         
            
         }
    }

    
    // render profile info
    const renderProfileInfo = ({item,index}) =>{

        if(item.type=='Text'){
            return (
                <View style={{marginBottom:10}}>
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'#444'}}>{item.name}</Text>
                </View>
            )
        }
        if(item.type!='image'){
            return(
               
                ProfileDetail({
                    title:item.id!=7?item.name:item.title,
                    value: getValueKey(item.key,item.type),
                })
            )
        }
        else{
            return(
                <View></View>
            )
        }

    }

    const renderProfileCompanyInfo = ({item,index}) =>{

        if(item.type!='image'){
            return(
               
                ProfileDetail({
                    title:item.id!=7?item.title:item.title,
                    value: getValueCompanyKey(item.key,item.type),
                })
            )
        }
        else{
            return(
                <View></View>
            )
        }

    }

    const updateProfile = async (data,type,isCompany) =>{
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        };
        const options = {
            method: 'PUT',
            headers,
        };
        let body= {};

        for(let i=0;i<data.length;i++){
            if(data[i][data[i]['key']]){
                body[data[i]['key']]=data[i][data[i]['key']];
            }
            if(data[i]['key']=='type2' ){
                body[data[i]['type']]= data[0]['type2'];
            }

            delete body['select'];
            if(body['type2']){
                body['type'] = body['type2'];
            }

            if(body['birthday']){
                body['birthday']= moment(new Date(body['birthday'])).format('L');
            }
            delete body['type2'];

            if(data[i]['type']=='image'){

                if(imagePath){
                    data[data[i]['key']] = imagePath;
                }
               
            }

            if(data[i]['birthday']){
                body['birthday']=data[i]['birthday'];
            }
            let date2;
            if(date){
                date2 = new Date(date);    
            }
            else{
                date2 = new Date();
            }
            
            body['birthday'] = date2.getDate()+"/"+parseInt(date2.getMonth()+1).toString().padStart(2, '0')+"/"+date2.getFullYear();
            let established;
        }

        if(companyAdditional){
            let estab = new Date(establishedDate);
            body.established = estab.getDate()+"/"+parseInt(estab.getMonth()+1).toString().padStart(2, '0')+"/"+estab.getFullYear();
            body.profile_id = userInfo?.created_by_profiles[0]['id'];            
        }
        if(type==1){
            body.user_id_file = imagePath;
        }
        if ((type==1 && data) || companyAdditional) {
            body.created_by_id=userInfo.id;
            options.body = JSON.stringify(body);
        }
        else{
            body.type=profile;
            body.is_pep=pep?1:0;
            body.created_by_id=userInfo.id;
            body.cell_phone = data.cell_phone
            body.lastname_dad = data.lastname_dad
            body.name = data.name            
            options.body = JSON.stringify(body);
        }
        
        body.type=profile;

        let url = Constant.API_URL;
        if(companyAdditional){
            url +='companies/';
            if(userProfileInfo?.profile_companies && userProfileInfo?.profile_companies[0]?.['id']){
                url +=userProfileInfo?.profile_companies?userProfileInfo?.profile_companies[0]['id']:'';
            }
            else{
                url +=userInfo?.created_by_profiles[0]['id'];
            }
        }
        else{
            url +='profiles/';
            url += userProfileInfo.id;
        }
        
        body.user_id_type  = identificacion;
        
        body.is_pep = pep?1:0;
        if(!body.user_id_file){
           
            body.user_id_file = userProfileInfo['user_id_file']['file_name'];
            options.body = JSON.stringify(body);
        }
        options.body = JSON.stringify(body);

        console.log({body12000:body});
        const response = await fetch(url, options);
        const jsonResposne = await response.json();

        
        if(companyAdditional){
            companyUpdated(true);
        }
        setLoading(false);
        if(jsonResposne.data){
                
                setProfileInfo(jsonResposne.data);
                if(companyAdditional){
                    setEditProfile(false);
                    getProfileData(userInfo,accessToken,2,companyAdditional?'company':'profile');
                }
                else if(!companyAdditional && profile==2){
                    setCompanyAdditional(true);
                }
                else{
                    setEditProfile(false);
                    setCurrentDate(new Date());
                    showToast("profile updated successfully");
                    getProfileData(userInfo,accessToken,2,companyAdditional?'company':'profile');
                }
                setLoading(false);
                

        }
        else{
        
            showToast(jsonResposne?.message);
            setLoading(false);
        }
    }
    const saveContactData = async ()=>{

        console.log("profile======"+profile);
        // if(profile==1){
            let errorMessage2 = false;
            for(let i=0;i<inputFields.length;i++){
                if(i==0){  
                    if(inputFields[i]['type']!=''){
                        inputFields[i]['erroMessage'] = '';
                        setInputFields(inputFields); 
                        errorMessage2=false;
                    }
                    else{
                        inputFields[i]['erroMessage'] = 'Fields Required!';
                        setInputFields(inputFields); 
                        errorMessage2=true;
                    }
                }
                else if(inputFields[i]['key']=='birthday'){
                    inputFields[i]['key']['birthday'] = new Date(date); 
                    inputFields[i]['erroMessage']='';  
                    setInputFields(inputFields); 
                }
                
                else if(inputFields[i]['type']=='image' && !photo){
                    inputFields[i]['erroMessage']='Fields Required!';
                    errorMessage2=true;
                }
                // else if(inputFields[i]['required'] && (inputFields[i][inputFields[i]['key']]=='' || !inputFields[i][inputFields[i]['key']] )){
                else if(inputFields[i]['required'] && (inputFields[i][inputFields[i]['key']]=='') && inputFields[i]['type']!='image'){
                  
                    inputFields[i]['erroMessage']='Fields Required!';
                    errorMessage2=true;
                }
            }

            if(identificacion!=''){
                
                inputFields[1]['erroMessage']='';
                setInputFields(inputFields);
                errorMessage2 = false;
            }
            
        // }

            if(profile==2 && companyAdditional){
                for(let j=0;j<inputFieldsCompany.length;j++){
                    if(inputFieldsCompany[j]['required'] && (inputFieldsCompany[j][inputFieldsCompany[j]['key']]=='') && inputFieldsCompany[j]['type']!='image'){
                        inputFieldsCompany[j]['erroMessage']='Fields Required!';
                        errorMessage2=true;
                    }
                }
                
                if(companyIdentification==''){
                    inputFieldsCompany[3]['erroMessage'] = 'Fields Required!';
                    errorMessage2=true;
                }
            }
           

            if(errorMessage2){
                showToast('Some Fields Required');
                setCurrentDate(new Date());
                setInputFields(inputFields); 
                if(profile==2){
                    setCompanyFields(inputFieldsCompany); 
                }

                return;
            }

        setCurrentDate(new Date());
        setLoading(true);
        updateProfile(companyAdditional?inputFieldsCompany:inputFields,1,companyAdditional);

    }

    const ProfileDetail=({ icon, title, value })=> {
        return (
            <View style={{ backgroundColor: 'white', paddingHorizontal: 5}}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    paddingVertical: 6
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        
                        <Text style={{ marginLeft: 20, color:'#444',fontWeight:'bold' }}>{title}</Text>
                    </View>
                    
                    {value!='Enlazado' && <Text style={{ color:'#444' ,paddingHorizontal:14}}>{value}</Text>}

                    {value=='Enlazado' && <Text style={{ color:'#FFF',backgroundColor:Color.theme,fontWeight:'bold',paddingHorizontal:10,paddingVertical:4 }}>{value}</Text>}

                    {/* {value!='Enlazado' && <Text style={{ color:'#444' }}>{value}</Text>}

                    {value=='Enlazado' && <Text style={{ color:'#FFF',backgroundColor:Colors.theme,fontWeight:'bold'}}>{value}</Text>} */}
                    

                </View>
                <View style={{ height: 0.40, backgroundColor: 'gray', marginBottom: 20}}></View>
            </View>
        )
    }

    // get identification value ..
    const getIdentificationValue =(type)=>{
            if(identificacion){
                let index=-1;
                for(let i=0;i<identificationTypes.length;i++){
                    if(type==identificationTypes[i]['id']){

                        index=i;
                    }
                }      

                return identificationTypes[index]?.['value'];
            }
            return '';
            
    }


    if(isLoadingSplash){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                <ActivityIndicator size="large" color={Color.theme}  />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:Colors.backColor   }}>
            <StatusBar backgroundColor={'#111'} />
            {webViewVisible &&
                <View>
                    <View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                        <TouchableOpacity
                                disabled={isLoading?true:false}    
                                onPress={()=>{
                                    setWebview(false);
                                }}
                            >
                            <Image source={require('../../assets/images/icon/close.png')}
                                    style={{ height: 20.0, width: 20.0 }}
                                    resizeMode="contain"
                            />
                        
                        </TouchableOpacity>
                    </View>
                    
                    

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <WebView
                            source={{
                                uri: 'https://www.divisapp.com/soporte/terminos/',
                            }}
                            startInLoadingState={true}
                            scalesPageToFit={true}
                            style={{
                            width: 320,
                            height: 300,
                            }}
                        />
                        
                    </View>
                </View>      
            }
            
            {!webViewVisible && 
            <View>
            <RenderImageOption />
            <RenderMoreInfo />
            <RenderModal />
            <RenderEditConfirm />
            
            {!isLoadingSplash ?<View>
                <ScrollView>
                    
                    {(userStatus==0 || userEdit) && <View style={styles.container}>

                        <View>
                            <Text style={[styles.label,styles.labelContainer]}>
                               {!companyAdditional?'INGRESE SUS DATOS PERSONALES':'Ingrese datos de la Empresa'}              
                            </Text>
                        </View>
                        
                        <View>
                            <Text style={[styles.label,styles.textAlign]}>Tipo de Perfil
                            
                                {true && <Text style={{color:'red'}}>*</Text>}
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={personTypes}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={profile==1?'Persona':'Empresa'}
                                onChange={item => {
                                    setProfile(item.id);

                                    if(item.id==2){
                                        showToast('Luego de ingresar sus datos Personales es incluir los informacion de la EMPRESA');
                                    }
                                    else{
                                        setCompanyAdditional(false);
                                    }
                                    // setProfile(item.id);
                                    inputFields[0]['type2']=item.id;

                                    inputFields[0]['erroMessage']='';

                                    setInputFields(inputFields);
                                }}
                                
                                renderItem={renderSelect}
                            />
                            {(inputFields[0].erroMessage!='' && inputFields[0].required) &&
                                <Text style={{color:'red',marginLeft:30}}>{inputFields[0].erroMessage}</Text>
                            }
                        </View>

                        {!companyAdditional && <View>
                            <Text style={[styles.label,styles.textAlign]}>Tipo de Identification
                            
                                {true && <Text style={{color:'red'}}>*</Text>}
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={identificationTypes}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={getIdentificationValue(identificacion)}
                                onChange={item => {
                                    inputFields[1]['type2']=item.id;
                                    inputFields[1]['erroMessage']='';
                                    setInputFields(inputFields);
                                    setIdentification(item.id)
                                }}

                                
                                renderItem={renderSelect}
                            />
                            {(inputFields[1].erroMessage!='' && inputFields[1].required) &&
                                <Text style={{color:'red',marginLeft:30}}>{inputFields[1].erroMessage}</Text>
                            }
                        </View>}

                        {!companyAdditional &&<View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{marginTop:-6,marginLeft:22}}>    
                                <CheckBox
                                    value={pep}
                                    onValueChange={(value) => {
                                        inputFields[2][inputFields[2]['key']]=value?1:0;
                                        setInputFields(inputFields);
                                        setPep(value);
                                    }}
                                    tintColors={{ true: Color.theme, false: 'black' }}
                                />
                            </View>
                            <Text style={[styles.label,styles.textAlign,{marginLeft:0}]}>¿Es usted PEP? </Text>

                            
                            
                            <TouchableOpacity onPress={()=>{
                                showMoreInfo(true)
                            }}>
                                <View style={{backgroundColor:Color.theme,borderRadius:4,marginTop:-2}}>
                                    <Text style={{paddingVertical:1,paddingHorizontal:4, color:'white',fontWeight:'bold'}}> Más Información</Text>
                                </View>    
                            </TouchableOpacity>
                            
                            {(inputFields[2].erroMessage!='' && inputFields[2].required) &&
                                <Text style={{color:'red',marginLeft:30}}>{inputFields[2].erroMessage}</Text>
                            }
                        </View>}

                        {!companyAdditional &&<Text style={[styles.subTitlelabel,{marginLeft:-110}]}>*Persona Expuesta Políticamente</Text>}


                        {!companyAdditional &&<FlatList
                            data={inputFields}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            extraData={currentDate}
                        />}

                        {companyAdditional &&<FlatList
                                contentContainerStyle={{flexGrow: 1,paddingBottom:40}}
                                data={inputFieldsCompany}
                                renderItem={renderCompany}
                                keyExtractor={item => item.id}
                                extraData={currentDate}

                        />}

                        {(userStatus!=2 || userEdit) &&<View style={{backgroundColor:Color.theme,borderRadius:8,marginHorizontal:60, padding:10,marginVertical:15}}>
                                                    
                                                    {isLoading ?<ActivityIndicator size="large" color={Color.white}  />
                                                            :<TouchableOpacity 
                                                            disabled={isLoading?true:false} 
                                                            onPress={()=>{
                                                                saveContactData();
                                                            }}>
                                                                <Text style={{color:'#FFF',textAlign:'center'}}>Guardar datos de Contacto</Text>
                                                            </TouchableOpacity> 
                                                    }
                            
                            
                        </View>}
                    </View>}

                    {((userStatus==1 || userStatus==2) && !userEdit) &&
                        <View>
                            
                            <View style={{backgroundColor:'white',paddingVertical:15,paddingHorizontal:20}}>
                                <View style={{marginBottom:15}}>
                                        <Text style={[styles.label,{color:'black'}]}>Datos de Usuario</Text>
                                </View>
                                <FlatList
                                    data={UserProfile}
                                    renderItem={renderUserInfo}
                                />
                            </View>  

                            <View style={{backgroundColor:'white',marginVertical:15, paddingVertical:15}}>
                                <Text style={styles.label}>Imagen de su Identification                                  
                                </Text>

                                {userProfileInfo && userProfileInfo?.['user_id_file'] && 
                                    <Image source={{uri:Constant.s3Url+userProfileInfo['user_id_file']['id']+"/"+userProfileInfo['user_id_file']['file_name']}}
                                    style={{ alignSelf: 'center', width: 100, height: 100, marginBottom: 1,marginTop:10 }}
                                    resizeMode="contain"
                                />}                  
                            </View>  

                            <View style={{marginVertical:10}}></View>

                            
                            <View style={{backgroundColor:'white',paddingVertical:15,paddingHorizontal:20}}>

                            <View style={{paddingHorizontal:10, flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                                <View>
                                    <Text style={[styles.label,{color:'black'}]}>Datos de su Perfil</Text>
                                </View>

                                {userStatus!=2 &&<View>
                                    <TouchableOpacity onPress={()=>{
                                        // setEditProfile(true);
                                        showEditConfirm(true);
                                        setCompanyAdditional(false);
                                        updateFields();
                                    }}>
                                        <Text style={{padding:7,backgroundColor:Color.theme,color:'#FFF',textAlign:'center'}}>Editar</Text>
                                    </TouchableOpacity>
                                </View>} 

                              </View>

                                <View style={{borderBottomColor:'#222',borderBottomWidth:1,marginVertical:10}}></View>
                                <FlatList
                                    data={inputFields}
                                    renderItem={renderProfileInfo}
                                />

                                {(userProfileInfo.profile_companies && userProfileInfo?.profile_companies[0]) && <Text style={{fontWeight:'bold',color:'#444',textAlign:'center'}}>Datos de la Empresa</Text>}
                                
                                {(userProfileInfo?.profile_companies && userProfileInfo?.profile_companies[0]) &&  inputFieldsCompany && inputFieldsCompany.length && (<FlatList
                                    data={inputFieldsCompany}
                                    renderItem={renderProfileCompanyInfo}
                                />)}
                            </View>    
                        </View>  
                    }
                </ScrollView>
            </View>:null}
            </View> }
        </SafeAreaView>
    )
}
export default Profile;