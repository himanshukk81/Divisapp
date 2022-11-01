import React, { useEffect , useState } from "react";
import { SafeAreaView , TouchableOpacity, Text ,ScrollView , StyleSheet ,View , FlatList , TextInput , Image, PermissionsAndroid, ActivityIndicator} from "react-native";
import { DataTable , Checkbox } from 'react-native-paper';
import Color from "../../utility/Color";
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment'

var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import { showToast } from "../../utility/Index";

const ProgressList =(props) =>{
    const optionsPerPage = [2, 3, 4];
    const numberOfItemsPerPageList = [2, 3, 4];
    
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    
    const [closedOperations, setClosedOperations] = useState(props.data);

    const [closedOperationsPage, setClosedOperationPage] = useState([]);
    
    const [disableBtn, setDisableBtn] = useState(false);

    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, props.data.length);
    
    const [pageLimit , setPageLimit] = useState(10);
    const [loadMoreLoading , setLoading] = useState(false);

    const [refreshTime , setRefreshTime]  = useState(new Date());

    const rows = [
        { label: '10', value: '1' },
        { label: '25', value: '2' },
        { label: '50', value: '3' },
        { label: '100', value: '4' },
    ];

   


    const Buttons = [
        // {id:1,name:'Seleccionar todos'},
        // {id:2,name:'Deseleccionar'},
        // {id:3,name:'Copiar'},
        {id:4,name:'CSV'},
        {id:5,name:'Excel'},
        {id:6,name:'PDF'},
        // {id:7,name:'Imprimir'}
    ];

    const [ searchText , setSearchText] = useState('');

    
    useEffect(()=>{
        pushData();
    },[]);
    
    const pushData = () =>{
        let startIndex = [...closedOperationsPage].length;
        for(let i=startIndex;i<startIndex+pageLimit;i++){
            closedOperationsPage.push(
                closedOperations[i]
            )
        }

        console.log({closedOperationsPagde:closedOperationsPage});
        setClosedOperationPage(closedOperationsPage);
        setRefreshTime(new Date());
        setLoading(false);
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
    
    const exportDataToExcel = () => {

        // Created Sample data
        // let sample_data_to_export = [{id: '1', name: 'First User'},{ id: '2', name: 'Second User'}];
        setDisableBtn(true);
        let sample_data_to_export = closedOperations;

        sample_data_to_export = sample_data_to_export.map((data)=>{
            return {
                'Code':data.code,
                'status':data.status == 3?'COMPLETADO':'CANCELADO'
            }
        });
        console.log({sample_data_to_export:sample_data_to_export});
        
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
        XLSX.utils.book_append_sheet(wb,ws,"Users")
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
    
        // Write generated excel to Storage
        let dateString = new Date().getTime();
        
        let fileName = 'Divisapp_OnlineCheckError_'+dateString+".xlsx"; 

        RNFS.writeFile(RNFS.DownloadDirectoryPath + fileName , wbout, 'ascii').then((r)=>{
         console.log('Success');
         setDisableBtn(false);
         showToast('Excel File Downloaded please check on download folder.');
        }).catch((e)=>{
         setDisableBtn(false);
         showToast('Excel File Downloaded Fail please try again.');
          console.log('Error', e);
        });
    
    }

    const handleLoadMore = async () => {
        console.log("loade more")
        if(closedOperations.length<= closedOperationsPage.length){
            return;
        }
        setLoading(true);

        setTimeout(()=>{
            pushData();
        },2000);
    }

    const downloadOperations = async (type) =>{
        try{
            // Check for Permission (check if permission is already given or not)

            setDisableBtn(true);
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      
            if(!isPermitedExternalStorage){
      
              // Ask for permission
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: "Storage permission needed",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
      
              
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Permission Granted (calling our exportDataToExcel function)
                exportDataToExcel();
                console.log("Permission granted");
              } else {
                setDisableBtn(false);
                // Permission denied
                console.log("Permission denied");
              }
            }else{
               // Already have Permission (calling our exportDataToExcel function)
               exportDataToExcel();
            }
          }catch(e){
            setDisableBtn(false);  
            console.log('Error while checking permission');
            console.log(e);
            return
          }
    }

     RenderBtn = (item) =>{

         console.log("btttt");
         console.log( typeof item);
         console.log(item.item.name);
        return (
            <View style={{flexDirection:'row',alignItems:'center',padding:3}}>
                
                <TouchableOpacity 
                    style={[styles.btnBorder]}  
                    
                    disabled={disableBtn}
                    onPress={()=>{
                                    console.log('aa');

                                    downloadOperations(item.item.name);
                    }}>
                    <Text style={styles.btnText}>{item.item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:Color.white }}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                <Text style={{color:'#000'}}>Mostar</Text>


                <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={rows}
                            search={false}
                            maxHeight={120}
                            
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={''}
                            onChange={itemSelect => {
                             
                            }}
                            renderItem={renderSelect}
                />


            </View>
            
            
            <View>
                <FlatList
                        data={Buttons}
                        renderItem={(data)=>{
                            return <RenderBtn item={data.item} />

                        }}
                        numColumns={2}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        
                        
                />
                
                {disableBtn &&  
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color={Color.theme}  />
                    
                    </View>}

            </View>
            
            
            <View style={{flexDirection:'row' ,alignItems:'center' ,paddingHorizontal:50 ,marginVertical:15}}>
                <Text style={{color:'#000'}}>Buscar:{' '}</Text>
                <TextInput
                            style={{
                                // height: 36,
                                width:'70%',
                                // margin: 12,
                                borderWidth: 1,
                                borderColor:'#afafaf',
                                padding: 10,
                                color:'#000',
                                textAlignVertical:'center'
                            }}
                            multiline={false}
                            placeholderTextColor='#afafaf'
                            value={searchText}
                            placeholder={''}
                            onChangeText={value => {
                                setSearchText(value);                                
                                props.onSearch(value);
                            }}
                            keyboardType="default"
                            // maxLength={30}

                /> 
            </View>
            <ScrollView horizontal>

             <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={[styles.columnHeaderWidth,{width:140}]} >Código</DataTable.Title>
                    <DataTable.Title style={[styles.columnHeaderWidth,{width:80,marginLeft:-25}]} >Tipo de Operación</DataTable.Title>
                    <DataTable.Title style={[styles.columnHeaderWidth,{width:100}]} >Transaccion</DataTable.Title>
                    <DataTable.Title style={[styles.columnHeaderWidth,{width:120}]} >Registrado</DataTable.Title>
                    <DataTable.Title style={[styles.columnHeaderWidth]}></DataTable.Title>
                    
                </DataTable.Header>
                {/* <ScrollView> */}

                    <FlatList 
                        data={closedOperationsPage}
                        renderItem={(data,index)=>{
                            const item = data?.item;
                            return (
                                <DataTable.Row>
                                   
                                    <View style={{width:140}}>
                                        <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'black'}}> {item?.code} </Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginLeft:4}}>
                                            <Text style={[styles.statusPadding,
                                                item?.status ==1?
                                                styles.progressStatus:item?.status==2?
                                                styles.registerStatus:item?.status==4?
                                                styles.cancelStatus:styles.completeStatus
                                            ]}> 
                                
                                                        {item?.status ==1?'REGISTRADO':item?.status ==2?'EN PROCESO':item?.status ==4?'CANCELADO':'COMPLETADO'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{width:80}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'black'}}>{item?.type==1?'Venta':'Compra'}</Text> 
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'black'}}>TC:{(item?.rate).toFixed(4)}</Text>
                                        </View>
                                    </View> 

                                    <View style={{width:100}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'black'}}><Text style={{fontWeight:'bold'}}>Envio:</Text>{item?.send_currency?.symbol} {item?.send_amount}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'black'}}><Text style={{fontWeight:'bold'}}>Recibe:</Text>{item?.rec_currency?.symbol} {item?.rec_amount}</Text>
                                        </View>
                                    </View>    

                                    <View style={{width:120}}>
                                        <Text style={{fontSize:15,color:'black'}}>{moment(item.created_at).format("DD MMMM YYYY")}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Image source={require('../../assets/images/icon/clock.png')}
                                                style={{ height: 15.0, width: 15.0}} />
                                            <Text style={{fontSize:15,color:'black'}}>{moment(item.created_at).format("HH:mm")}</Text>
                                        </View>
                                    </View>    
                                   
                                    
                                   
                                    <DataTable.Cell style={[styles.columnCellWidth]}>
                                        <TouchableOpacity style={{backgroundColor:Color.theme}}  onPress={()=>{
                                            console.log('aa');
                                            props.navigateOperationDetail(item);
                                        }}>
                                            <Text style={{textAlign:'center', color:'#FFF',fontWeight:'bold',padding:10}}>Ver</Text>
                                        </TouchableOpacity>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )

                        }}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>{
                            handleLoadMore()
                        }}
                        contentContainerStyle={{
                            paddingBottom:'10%'
                        }}
                        extraData={refreshTime}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={loadMoreLoading? <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color={Color.theme} />
                        </View> : null}
                    />
                    

                <View style={{marginBottom:10}}></View>
                
            </DataTable>
            </ScrollView>  

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
        paddingHorizontal:50,
        paddingVertical:7
    },
    columnHeaderWidth:{
        // width:'100%',
        // minWidth:120,
        // textAlign:'center',
        // marginLeft:45
        // width:110,
        fontWeight:'bold',
        // paddingHorizontal:20,
        // maxWidth:170
    },
    columnCellWidth:{
        // minWidth:120,
        // textAlign:'center',
        // marginLeft:45
        // width:150,
        // maxWidth:170,
        // paddingHorizontal:4
    },
    checkColumnWidth:{
        width:80
        // minWidth:40
    },
    placeholderStyle: {
        fontSize: 16,
        color:'#444',
        // padding:20
    },
    
    selectedTextStyle: {
        fontSize: 16,
        color:'#444',
        // padding:20
        // margin:30
        // textAlign:'center',
        // padding:5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:'#444'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropdown: {
        marginHorizontal: 16,
        marginVertical:5,
        height: 40,
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
        width:150,
        // padding:10
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color:'#444'
    },
    item:{
        padding:4
    },
    btnBorder:{
        borderColor:Color.theme,
        borderWidth:1,
        // maxWidth:150,
        // width:'50%',
        width:150,
        marginLeft:20
    },
    btnText:{
        textAlign:'center',
        color:'#000',
        padding:6
    },

    progressStatus:{
        backgroundColor:'#ffc107',
        color:'#FFF',
        fontWeight:'bold'
    },
    registerStatus:{
        
        backgroundColor:'#007bff',
        color:'#FFF',
        fontWeight:'bold'
    },
    cancelStatus:{
        backgroundColor:'#dc3545',
        color:'#FFF',
        fontWeight:'bold'
    },
    completeStatus:{
        backgroundColor:'#28a745',
        color:'#FFF',
        fontWeight:'bold'
    },
    statusPadding:{
        padding:2,
        color:'#FFF'
    },
});
export default ProgressList;