import React, { useEffect , useState } from "react";
import { TouchableOpacity , Image , FlatList, ScrollView,Clipboard,Linking } from "react-native";
import { SafeAreaView ,View , Text } from "react-native";
import progressData from "../../assets/json/progressData";
import OperationModal from "../../component/OperationModal";
import OperationImageModal from "../../component/OperationImageModal";

import { Colors } from "../../constants/styles";
import { getOperations } from "../../services/Api";
import Color from "../../utility/Color";
import styles from "../styles";

import moment from 'moment'
import { showToast } from "../../utility/Index";
import { WebView } from 'react-native-webview';
import Constant from "../../utility/Constant";

const ProgressDetail =(props) =>{

    const ComprobanteData = {title:'Comprobante de la Operación',headings:[{id:1,title:'El comprobante de aún no está disponible. Por favor intente en un momento, el mismo también será enviado a su correo electrónico.'}]};
    const TransferenciasData = {title:'Constancia de Transferencias',headings:[{id:1,title:'Constancia de transferencia no disponible.'}]}
    const MasInformacionData = {title:'Información Adicional',
                                headings:[
                                    {id:1,title:'Términos y Condiciones',icon:require('../../assets/images/icon/modal/contract.png'),url:'https://www.divisapp.com/soporte/terminos/' },
                                    {id:1,title:'Política de Privacidad',icon:require('../../assets/images/icon/modal/user.png'),url:'https://www.divisapp.com/soporte/politica-privacidad/'},
                                    {id:1,title:'Libro de Reclamaciones',icon:require('../../assets/images/icon/modal/open-book.png'),url:'https://www.divisapp.com/soporte/libro-de-reclamaciones/'},
                                    {id:1,title:'Ayúdanos a Mejorar',icon:require('../../assets/images/icon/modal/like.png'),url:'https://www.divisapp.com/soporte/ayudanos-a-mejorar/'},
                                    {id:1,title:'Preguntas Frecuentes',icon:require('../../assets/images/icon/modal/question.png'),url:'faq'}
                                ]}


    const [operationData , setOperationData] = useState(null);
    const [showGrid1 , setGrid1] = useState(false);
    const [showGrid2 , setGrid2] = useState(false);
    const [showGrid3 , setGrid3] = useState(false);
    const [inProgressData , setInProgressData] = useState(progressData);
    const [refreshTime , setRefresh] = useState(new Date());
    
    const [isVisibleImageModel , setVisibleImageModel] = useState(false);

    const [statusOperation , setOperationStatus] = useState(null);
            
    const [operationDataModal , setOperationModalData] = useState({
        title:'',
        code:'',
        headings:[]
    });

    const [isVisible , setVisible] = useState(false);
    const [webUrl , setWebUrl] = useState('');

    let executedCode = false;

    useEffect(()=>{
        executedCode = false;
        console.log("Operation_id:>>")
        getOperationData();
    },[]);

    const getOperationData = () =>{
        let operationId = props.route.params.operationId;
        console.log("Operation_id:"+operationId);
        getOperations(operationId).then((response)=>{
            filterData(response.data);
            setOperationData(response.data);
            setOperationStatus(response?.data?.status);
        }).catch((error)=>{
            console.log({error});
        })
    }
    const filterData = (data) =>{
        for(let i=0;i<inProgressData.length;i++){
            if(typeof inProgressData[i]['keys'] == 'string'){
                inProgressData[i]['values'] = '-';
                let value ='-';
                if(inProgressData[i]['keys'].includes('-')){
                    let keySplit = inProgressData[i]['keys'].split('-');
                    if(data[keySplit[0]]){
                        value = keySplit.reduce((a, prop) => a[prop], data);
                    }
                }
                else{
                    
                    if(inProgressData[i]['keys'] == 'savings'){
                        value = "S/. "+data[inProgressData[i]['keys']]
                    }
                    else{
                        value = data[inProgressData[i]['keys']]
                    }

                }
                console.log({value:value});
                inProgressData[i]['values'] = value;

            }
            else{
                inProgressData[i]['values'] = [];
                let keys = inProgressData[i]['keys'];
                let value2;
                if(Array.isArray(inProgressData[i]['values'])){
                    value2 = [];
                }
                else{
                    value2 = '';
                }
                
                for(let j=0;j<keys.length;j++){
                    let keySplit2;
                    if(inProgressData[i]['keys'][j].includes('-')){
                        keySplit2 = inProgressData[i]['keys'][j].split('-')
                    }
                    else{
                        keySplit2 = inProgressData[i]['keys'][j];
                    }

                    console.log({keySplit2:keySplit2});

                    if(keySplit2 && data[keySplit2[0]]){
                        let value = '';
                        if(Array.isArray(inProgressData[i]['values'])){
                            if(keySplit2.includes('nickname')){
                                
                                
                                if(i == 8){ // credit card

                                    let keys = inProgressData[i]['keys'][j];
                                    console.log("keys==",keys);

                                    value  += keySplit2.reduce((a, prop) => a[prop], data)+"-"+"MASTERCARD";
                                }
                                else{
                                    value  += keySplit2.reduce((a, prop) => a[prop], data)+"-"+"AHORROS";
                                }

                                value2.push(value);
                            } 
                            
                            else if(keySplit2.includes('symbol')){
                                value += '('+keySplit2.reduce((a, prop) => a[prop], data)+')';
                                value2.push(value);
                            }
                            
                            else if(keySplit2.includes('number')){
                                value = 'NRO.'+keySplit2.reduce((a, prop) => a[prop], data);
                                console.log("value;;;"+value)
                                value2.push(value);
                            }
                            else if(keySplit2.includes('cci')){
                                let value = 'CCI '+keySplit2.reduce((a, prop) => a[prop], data);
                                value2.push(value);
                            }
                            else{
                                value = keySplit2.reduce((a, prop) => a[prop], data);
                                console.log("value=="+value,"keySplit"+keySplit2);
                                if(!(keySplit2.includes('type') || keySplit2.includes('owner'))){
                                    value2.push(value);
                                }
                            }
                        }
                        else{
                            value2 += keySplit2.reduce((a, prop) => a[prop], data)+" ";
                        }
                    }
                    else if(data[keySplit2]){
                        if(Array.isArray(inProgressData[i]['values'])){
                            value2.push(data[keySplit2]);
                        }
                        else{
                            value2 += data[keySplit2]+" "
                        }
                    }
                }
                if(Array.isArray(inProgressData[i]['values'])){
                    inProgressData[i]['values'].push(value2);
                }
                else{
                    inProgressData[i]['values'] = value2;
                }
            }

            if(i==8){
                if(inProgressData[i]['values'] && inProgressData[i]['values'][0].length>0){
                    inProgressData[7]['values'] = [];
                }

            }
        }
        console.log({inProgressData:inProgressData});
        setInProgressData(inProgressData);
        console.log("dddd,",JSON.stringify(inProgressData))
        
        setTimeout(()=>{
            console.log({inProgressDatass:inProgressData});
            setRefresh(new Date());
        },1000)
    };

    const renderSubItem = (values,item,index) =>{

        console.log("console===="+index);
        console.log({valuesdddd:values});
        console.log({item:item});

        console.log("index8:::"+index);

        if(index ==2 || index ==3){
            return(
                <View>
                    <Text style={{color:Color.black}}>{values[0]}</Text>
                    <Text style={{color:Color.black}}>{values[1]}</Text>
                </View>
            )
        }
        if(executedCode ==true){
            return;
        }
        if(item.label.includes('Tarjeta') && item.values && item.values[0] && item.values[0].length>0){
            
            if(!executedCode){
                executedCode = true;
                return(item.values[0].map((value,index) =>{
                    console.log("indexindexindex="+index)
                        return(<View style={{width:300}}> 
                            <>
                            {index!=0 ?
                                <>
                                <View style={index==3?{flexDirection:'row'}:{flexDirection:'row'}}>
                                    <View style={{position:'absolute',top:15}}>
                                        <Image source={{uri:value}}
                                            style={{ height: 20.0, width: 20.0}}
                                        />
                                    </View>
                                    <Text style={index==3?{fontSize:14,color:Color.black,marginLeft:20}:{fontSize:11,color:Color.black,marginLeft:20 }}> 
                                            {/* {item.values[0].slice(2,item.values[0].length-1)} */}
                                            {/* {value.includes('jpg')?'':value} */}
                                            {/* {values[0].slice(2,values[0].length)} */}
                                            {value.includes('jpg')?'':value}
                                    </Text>
                                
                                </View>
                                {/* <Text style={{color:Color.black}}>{item.values[0][3]}</Text> */}
                                </>
                            :<Text style={{color:Color.black,marginLeft:17,fontWeight:'bold'}}>{value}</Text>}
                            </>
                        </View>)
                    })
                )
                
            }
            
        }
        else if(values && values.length){
            let updatedValues = values[1]?values[1]:values[0];
            let valueItem = '';
            return( updatedValues.map((value,index) =>{
                
                let keyTypeOwner = null;
                if(item.keys[index].split('-') && item.keys[index].split('-')[1] === 'owner'){
                   keyTypeOwner = 'owner'
                }
                if(!value){
                    return <View></View>;
                }
                console.log("Value:::ss::____"+value);


                
                if(index>0 && index<5){
                    valueItem +=value+", ";
                    if(index>2){
                        valueItem +='\n';
                    }
                    return (
                        <View></View>
                    )
                }
                
                if(index == 5){
                    let valueSplit = valueItem.split(',');
                    return(<View style={{width:300}}>
                                {
                                    <>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={{uri:valueSplit[0]}}
                                            style={{ height: 20.0, width: 20.0}}
                                        />
                                        <Text style={index==0?{fontSize:13,fontWeight:'bold',color:Color.black}:{fontSize:11,color:Color.black}}> 
                                                {valueSplit.slice(1,valueSplit.length)}
                                        </Text>
                                        
                                    </View>
                                    <Text style={{color:Color.black,marginLeft:17}}>{value}</Text>
                                    </>
                                }
                                
                            </View>
                        
                        )
                }
                return(<View style={{flexDirection:'row',width:300}}>
                                {
                                    <Text style={index==0?{marginLeft:7, fontWeight:'bold',color:Color.black}:{marginLeft:17,color:Color.black}}> 
                                        {keyTypeOwner=='owner'?value == 1?'PROPIA':'TERCERO':value}
                                    </Text>
                                }
                                
                        </View>
                        
                        )
            }));
        }
        else{
            return <Text>-</Text>;
        }
       

    };


    const renderSingleValue = (item) =>{
        let value = item.values;
        if(item.key_dictonary && Array.isArray(item.key_dictonary)){
            let index = item.key_dictonary.findIndex((itemValue)=>itemValue.key == item.keys);
            if(index>-1){
                let indexInner = item.key_dictonary.findIndex((itemValue)=>itemValue.id == item.values);
                if(indexInner>-1){
                    value = item.key_dictonary[indexInner]['name'];
                }
            }
        }

        if(item.keys =='rate'){
            console.log("value==::::::::"+value);
            return value?Number(value).toFixed(4):'';
            return ''
        }
        return value;

    };
    const renderItem = ({ item , index}) => (
        <View style={[styles.renderList,index%2==0?{backgroundColor:Color.bgGray}:{}]}>
            <Text style={{maxWidth:100,fontWeight:'bold',color:Color.black}}>{item.label}</Text>

            {!Array.isArray(item.values) && <Text style={{color:Color.black }}>{renderSingleValue(item)}</Text>}
            
            {Array.isArray(item.values) && 
            
                <View>{
                        Array.isArray(item.values)?
                        renderSubItem(item.values,item,index):
                        <Text>-</Text>
                        }
                </View>
            }
            
        </View>
    );
    const renderDivisAccounts = ({item , index}) =>(
            <>    
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}}>
                        <Image source={{uri:item?.bank?.logo?.url}}
                            style={{ height: 20.0, width: 20.0}}
                        />
                        <Text style={{color:Color.black,fontWeight:'bold'}}>{item?.bank?.nickname}{'- CORRIENTE '}</Text>
                        <Text style={{color:Color.black,fontWeight:'bold'}}>{item?.currency?.code}{' '}</Text>
                        <Text style={{color:Color.black,fontWeight:'bold'}}>( {item?.currency?.symbol} )</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}}>
                        <Text style={{color:Color.black}}><Text style={{fontWeight:'bold',color:Color.black}}>Nro - </Text> 
                            {item?.number}

                        </Text>
                        <TouchableOpacity onPress={()=>{
                            
                            Clipboard.setString(item?.number)
                            showToast('Copiado al portapapeles');
                        }} style={{padding:3,marginLeft:5}}>
                            <Image source={require('../../assets/images/icon/copy.png')}
                            style={{ height: 20.0, width: 20.0}}
                            />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}}>
                        <Text style={{color:Color.black}}><Text style={{fontWeight:'bold',color:Color.black}}>CCI - </Text>{item?.cci}</Text>
                     
                        <TouchableOpacity onPress={()=>{
                            Clipboard.setString(item?.cci)
                            showToast('Copiado al portapapeles');
                        }} style={{padding:3,marginLeft:5}}>
                            <Image source={require('../../assets/images/icon/copy.png')}
                            style={{ height: 20.0, width: 20.0}}
                            />
                        </TouchableOpacity>
                    </View>
            </>
    );

    const getStatus = () =>{
        if(operationData && operationData.status){
            let operationStatus = operationData.status;
            return operationStatus
        }
        return null;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            {webUrl == '' && <OperationModal 
                isVisibleModal={isVisible}
                data={operationDataModal}
                operationInfo={operationData}
                closeModal={()=>{
                    setVisible(false);
                }}
                onLinkClick={(url)=>{
                    if(!url.includes('https')){
                        props.navigation.navigate(url);
                    }
                    else{
                        setWebUrl(url);
                        setVisible(false);
                    }
                    
                }}
                onDownloadLink={(url)=>{
                    console.log("url::"+url)
                    setWebUrl(url);
                    
                    setTimeout(()=>{
                        setWebUrl('')
                    },2500);
                }}
            />}
            {webUrl == '' && <OperationImageModal 
                isVisibleModal={isVisibleImageModel}
                data={operationDataModal}
                operationInfo={operationData}
                closeModal={()=>{
                    setVisibleImageModel(false);
                    getOperationData();
                }}
            />}
            {webUrl !='' && <View style={{flex:1}}>
                        <View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                            <TouchableOpacity
                                    onPress={()=>{
                                        setWebUrl('');
                                    }}
                                >
                                <Image source={require('../../assets/images/icon/close.png')}
                                        style={{ height: 20.0, width: 20.0 }}
                                        resizeMode="contain"
                                />
                            
                            </TouchableOpacity>
                        </View>

                        <WebView source={{ uri: webUrl }} 
                                style={{
                                        width: Constant.width,
                                        height: Constant.height
                                    }}
                        />
                    </View>}

            

                    {webUrl =='' &&<View style={styles.container}>
                    
                    
                     <View>
                        <View style={styles.headerView}>
                            <Text style={[styles.textColor,{color:Color.black}]}>{operationData?.code}</Text>
                            <View style={{width:20}}></View>
                            <Text style={[
                                            styles.statusPadding,
                                            operationData?.status ==1?
                                            styles.progressStatus:operationData?.status==2?
                                            styles.registerStatus:operationData?.status==4?
                                            styles.cancelStatus:styles.completeStatus
                                        ]}> 
                                        
                                        {operationData?.status ==1?'REGISTRADO':operationData?.status ==2?'EN PROCESO':operationData?.status ==4?'CANCELADO':'COMPLETADO'}
                            </Text>
                        
                        </View>

                        <View style={styles.headerView}>
                            {operationData && operationData.created_at!=null && <Text style={{color:Color.black}}>{moment(operationData.created_at).format("DD MMMM YYYY")}</Text>}
                            
                            <View style={{width:20}}></View>
                            <Image source={require('../../assets/images/icon/clock.png')}
                                style={{ height: 15.0, width: 15.0,marginRight:10}}
                            />

                            {operationData && operationData.created_at!=null &&<Text style={{color:Color.black}}>{moment(operationData.created_at).format("HH:MM")}</Text>}
                        </View>
                        <ScrollView style={{marginBottom:200}}>    
                            <View style={{}}>
                                <View style={styles.getOperationContainer}>

                                    <View style={styles.subContainerContainer}>
                                        <View style={[styles.tab1]}>
                                            <Text style={{color:Color.lightGreen}}><Text style={{fontWeight:'bold',color:Color.darkGreen}}>PASO 1</Text>  REGISTRO DE OPERACION </Text>
                                        </View>

                                        {/* tab1 darkGreen tab2 darkBlue tab3 darkGrey */}

                                        <View style={[ (statusOperation == 2 || statusOperation == 3) ? styles.tab1 : (statusOperation == 2 || statusOperation == 4) ? styles.tab3:styles.tab2]}>
                                            <Text style={[ (statusOperation == 2 || statusOperation == 3) ? styles.tab1TextOuter : (statusOperation == 2 || statusOperation == 4) ? styles.tab3TextOuter :styles.tab2TextOuter ]}><Text style={[ (statusOperation == 2 || statusOperation == 3) ? styles.tab1Text : (statusOperation == 2 || statusOperation == 4) ? styles.tab3Text:styles.tab2Text]}>PASO 2</Text>  TRANSFERENCIA DEL USUARIO </Text>
                                        </View>

                                        <View style={[(statusOperation == 1 || statusOperation == 4) ? styles.tab3: statusOperation == 2 ? styles.tab2 : styles.tab1]}>
                                            <Text style={[(statusOperation == 1 || statusOperation == 4) ? styles.tab3TextOuter: statusOperation == 2 ? styles.tab2TextOuter : styles.tab1TextOuter]}><Text style={[(statusOperation == 1 || statusOperation == 4) ? styles.tab3Text: statusOperation == 2 ? styles.tab2Text : styles.tab1Text]}>PASO 3</Text>  TRANSFERENCIA DEL CAMBIO </Text>
                                        </View>

                                    </View>
                                    
                                    {operationData?.status==2 &&
                                        <View style={{marginVertical:15,paddingHorizontal:6}}>
                                            <View style={{borderLeftWidth:5,borderWidth:1,borderColor:'#444', borderLeftColor:'#008a00',paddingHorizontal:10 ,marginVertical:10}}>
                                                <Text style={{textAlign:'center',padding:14,color:Color.black}}>
                                                    Muchas gracias por adjuntar la constancia de la transferencia, en breves instantes estaremos realizando la transferencia del cambio.

                                                </Text>
                                            </View>
                                        </View>
                                    }
                                    {operationData?.status==1 && 
                                        <View style={{borderLeftWidth:5,borderWidth:1,borderColor:'#444', borderLeftColor:'#008a00',paddingHorizontal:10 ,marginVertical:10}}>
                                                <View style={{}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <Text style={{backgroundColor:Color.theme,padding:5,color:'#FFF',marginRight:10,fontWeight:'bold'}}>1</Text>
                                                        <Text style={{color:Color.black}}>El siguiente paso es realizar la transferencia desde su banca en línea a cualquiera de las cuentas en </Text>
                                                    </View>
                                                    <View style={{marginHorizontal:25,marginVertical:10}}>
                                                        <Text style={{fontWeight:'bold',color:Color.black}}>{operationData?.divisappAccounts[0]?.currency?.name}</Text>
                                                        <Text style={{marginRight:7,color:Color.black}}>de Divisapp. Para mantener el tipo de cambio, realizar la transferencia en los siguientes 15 minutos</Text>
                                                    </View>
                                                </View>

                                                

                                                <View style={{borderColor:'#333',borderWidth:1,paddingHorizontal:6,paddingVertical:10,marginVertical:4}}>
                                                    <Text style={{textAlign:'center',marginVertical:2,color:Color.black}}>CUENTAS DE DIVISAPP</Text>
                                                    <Text style={{color:Color.theme,textAlign:'center',marginVertical:2,color:Color.black}}>Peruana de Cambio de Divisas S.A.C.</Text>
                                                    <FlatList
                                                            data={operationData?.divisappAccounts}
                                                            renderItem={renderDivisAccounts}
                                                            keyExtractor={item => item.id}
                                                            nestedScrollEnabled={true}
                                                    />
                                                </View>

                                                <View style={{marginVertical:10}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <Text style={{color:Color.black,backgroundColor:Color.theme,padding:5,color:'#FFF',marginRight:10,fontWeight:'bold'}}>2</Text>
                                                        <Text style={{maxWidth:'90%',color:Color.black}}>Luego de realizada la transferencia, elige como deseas confirmarla:</Text>
                                                    </View>

                                                    <TouchableOpacity onPress={()=>{
                                                                    setGrid1(!showGrid1)
                                                                }}>
                                                        <View style={styles.gridContainer}>
                                                            <View style={styles.gridAlignment}>
                                                                <Image source={require('../../assets/images/icon/arrowRight.png')}
                                                                    style={{ height: 13.0, width: 13.0}}
                                                                />
                                                                <Image source={require('../../assets/images/icon/upload.png')}
                                                                    style={{ height: 15.0, width: 15.0,margin:10}}
                                                                />
                                                                <Text style={{color:Color.black}}> Adjuntar constancia aquí </Text>
                                                                <Image source={require('../../assets/images/icon/rating.png')}
                                                                    style={{ height: 15.0, width: 15.0}}
                                                                />
                                                            </View>
                                                            {showGrid1 && <TouchableOpacity  onPress={()=>{
                                                                setVisibleImageModel(true);
                                                                setOperationModalData({
                                                                    title:'Agregar Transferencia Bancaria de Operacion',
                                                                    code:operationData.code,
                                                                    operationId:operationData.id,
                                                                })

                                                            }}>
                                                                <View style={{paddingHorizontal:30,marginVertical:15}}>
                                                                    <View style={{color:'#FFF',backgroundColor:Color.theme}}>
                                                                        <Text style={styles.btnContainer}>Adjuntar Constancia</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>}
                                                        </View>    
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={()=>{
                                                                    setGrid2(!showGrid2)
                                                                }}>

                                                        <View style={styles.gridContainer}>
                                                        
                                                                <View style={styles.gridAlignment}>
                                                                    <Image source={require('../../assets/images/icon/arrowRight.png')}
                                                                        style={{ height: 13.0, width: 13.0}}
                                                                    />
                                                                    <Image source={require('../../assets/images/icon/email.png')}
                                                                        style={{ height: 15.0, width: 15.0,margin:10}}
                                                                    />
                                                                    <Text style={{color:Color.black}}>  Enviar por email </Text>
                                                                </View>

                                                                {showGrid2 && <View>
                                                                    <Text style={{padding:6,color:Color.black}}>Envíe por correo electrónico la constancia de la transferencia a:</Text>
                                                                    
                                                                    <View style={{flexDirection:'row',alignItems:'center',padding:3}}>
                                                                        <Text style={{color:Color.black}}>Correo:</Text>
                                                                        <Text style={{fontWeight:'bold',color:Color.black}}>transferencias@divisapp.com</Text>
                                                                        <TouchableOpacity onPress={()=>{
                                                                                Clipboard.setString('transferencias@divisapp.com');
                                                                                showToast('Copiado al portapapeles');
                                                                            }} style={{padding:3,marginLeft:5}}>
                                                                            <Image source={require('../../assets/images/icon/copy.png')}
                                                                                style={{ height: 20.0, width: 20.0}}
                                                                            />
                                                                        </TouchableOpacity>
                                                                    </View>

                                                                    <View style={{flexDirection:'row',alignItems:'center',padding:3}}>
                                                                        <Text style={{color:Color.black}}>Asunto:</Text>
                                                                        <Text style={{fontWeight:'bold',color:Color.black}}>{operationData.code}</Text>
                                                                    
                                                                        <TouchableOpacity onPress={()=>{
                                                                                Clipboard.setString(operationData.code);
                                                                                showToast('Copiado al portapapeles');
                                                                            }} style={{padding:3,marginLeft:5}}>
                                                                            <Image source={require('../../assets/images/icon/copy.png')}
                                                                                style={{ height: 20.0, width: 20.0}}
                                                                            />
                                                                        </TouchableOpacity>
                                                                    </View>

                                                                    <View style={{paddingHorizontal:30,marginVertical:10}}>
                                                                        <TouchableOpacity onPress={()=>{
                                                                            // Linking
                                                                            Linking.openURL('mailto:transferencias@divisapp.com')
                                                                        }}>
                                                                            <View style={{color:'#FFF',backgroundColor:Color.theme}}>
                                                                                <Text style={styles.btnContainer}>Enviar Constancia </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>}
                                                        </View>    
                                                    

                                                    </TouchableOpacity>

                                                    <View style={styles.gridContainer}>
                                                        <TouchableOpacity onPress={()=>{
                                                                    setGrid3(!showGrid3)
                                                                }}>
                                                            <View style={styles.gridAlignment}>
                                                                <Image source={require('../../assets/images/icon/arrowRight.png')}
                                                                    style={{ height: 13.0, width: 13.0}}
                                                                />
                                                                <Image source={require('../../assets/images/icon/check.png')}
                                                                    style={{ height: 15.0, width: 15.0,margin:7}}
                                                                />
                                                                <Text style={{maxWidth:'86%',color:Color.black}}>  La constancia ya fue enviada desde mi banca en línea.  </Text>


                                                                
                                                            </View>

                                                            {showGrid3 && <View style={{padding:15,marginLeft:5}}>
                                                                <Text style={{color:Color.black}}>Gracias por hacernos llegar la constancia, solo queremos confirmar que fue enviada a <Text style={{fontWeight:'bold',color:Color.black}}>transferencias@divisapp.com</Text>, de no ser así por favor elija una de las opciones anteriores.</Text> 
                                                            </View>}

                                                        

                                                        </TouchableOpacity>
                                                    </View>
                                                </View>


                                        </View>
                                    }

                                    <View style={{maxHeight:400}}>
                                        <FlatList
                                                data={inProgressData}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.id}
                                                extraData={refreshTime}
                                                nestedScrollEnabled={true}
                                        />
                                    </View>
                                    <View style={styles.footerBtnContainer}>
                                                <TouchableOpacity onPress={()=>{
                                                    props.navigation.goBack();
                                                }}>
                                                    <View style={styles.btnBorder}>
                                                        <Image source={require('../../assets/images/icon/operation/undo.png')}
                                                            style={{ height: 20.0, width: 20.0}}
                                                        />
                                                        <Text style={{color:'#444',padding:7,textAlign:'center'}}>Volver</Text>
                                                        
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>{
                                                        setOperationModalData(ComprobanteData);
                                                        setVisible(true);
                                                }}>
                                                    <View style={[styles.btnBorder]}>
                                                            <Image source={require('../../assets/images/icon/operation/documents.png')}
                                                                    style={{ height: 20.0, width: 20.0}}
                                                                />
                                                            <Text style={{color:'#28a745',padding:7,textAlign:'center'}}>Comprobante</Text>
                                                        
                                                    </View>
                                                </TouchableOpacity>
                                    </View>

                                    <View style={styles.footerBtnContainer}>
                                                <TouchableOpacity onPress={()=>{
                                                    setOperationModalData(TransferenciasData);
                                                    setVisible(true);
                                                }}>
                                                    <View style={styles.btnBorder}>
                                                            <Image source={require('../../assets/images/icon/operation/usd.png')}
                                                                    style={{ height: 20.0, width: 20.0}}
                                                                />  
                                                            <Text style={{color:'#007bff',padding:7,textAlign:'center'}}>Transferencias</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>{
                                                    setOperationModalData(MasInformacionData);
                                                    setVisible(true);
                                                }}>
                                                    <View style={styles.btnBorder}>
                                                            <Image source={require('../../assets/images/icon/operation/info.png')}
                                                                    style={{ height: 20.0, width: 20.0}}
                                                                />
                                                            <Text style={{color:'#28a745',padding:7,textAlign:'center'}}>Mas Informacion</Text> 
                                                    </View>
                                                </TouchableOpacity>
                                    </View>

                                </View>
                            </View>    
                        </ScrollView>
          
                                        
                    </View>
                    </View>}
        </SafeAreaView>
    )
}

export default ProgressDetail;