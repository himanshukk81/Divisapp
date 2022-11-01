import React, { useEffect , useState , useRef} from "react";
import { SafeAreaView ,TouchableOpacity, StyleSheet ,View ,Text, FlatList , ActivityIndicator , Image , ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ModalCancelOperation from "../../component/ModalCancelOperation";
import OperationImageModal from "../../component/OperationImageModal";
import { cancelOperationServices, getOperationList, getOperations } from "../../services/Api";
import Color from "../../utility/Color";
import Constant from "../../utility/Constant";
import InProcess from "./inProcess";
import ProgressList from "./progressList";
import { WebView } from 'react-native-webview';

const Operations =(props) =>{
    const imageRef = useRef(null);

    const [activeTab ,setActiveTab] = useState(0);
    
    const [isLoadingOperation , setOperationLoading ] = useState(false);
    const [inProcessOpenList , setOpenProcessList ] = useState([]);
    const [inProcessClosedList , setClosedProcessList ] = useState(null);
    const [selectedOperation , setSelectedOperation ] = useState(null);

    const [isVisisbleModal , setVisible] = useState(false);

    const [isVisibleImage , setVisibleImageModel] = useState(false);
    const [operationDataModal , setOperationModalData] = useState({});

    const [refreshTime , setRefreshTime] = useState(new Date());
    const [zoomImage , setImageZoom] = useState('');

    useEffect(()=>{
       fetchOperationList();
       setImageZoom('');
    },[]);

    const fetchOperationList = () =>{
        setOperationLoading(true);
        getOperationList().then((response)=>{
            let openList = response?.operations_open;
            openList = openList.map((data)=>{
                return{
                    ...data,
                    'active':true
                }
            })

            setVisible(false);
            setOpenProcessList(openList);

            let closedList = response?.operations_closed;
            setClosedProcessList(closedList.reverse());
            setOperationLoading(false);
        }).catch((error)=>{
            console.log({error});
        })
    }
    const cancelOperationService = () =>{
        console.log("opeaa==="+selectedOperation.id);
        cancelOperationServices(selectedOperation.id).then((response)=>{
            setVisible(false);
            fetchOperationList();
        }).catch((error)=>{
            console.log({error});
        })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={{ }}> */}
            {zoomImage =='' && 
              <>
                {activeTab == 0 && 
                    <>
                    <ModalCancelOperation 
                        navigateTerms={()=>{
                            setVisible(false);
                            props.navigation.navigate('Terms')
                        }}
                        closeModal={()=>{
                            setVisible(false);
                        }}
                        cancelOperation={()=>{
                            cancelOperationService();
                        }}
                        headerTitle={'Cancelar Operación '}
                        forceModal={isVisisbleModal}
                    />
                    <OperationImageModal 
                        isVisibleModal={isVisibleImage}
                        data={operationDataModal}
                        closeModal={()=>{
                            
                            setVisibleImageModel(false);
                            fetchOperationList();
                        }}
                    />
                    </>
                }

                {isLoadingOperation?  
                    <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={Color.theme} />
                    </View>:<View style={[styles.segmentTabs]}>
                                <View styles={{}}>
                                    <TouchableOpacity onPress={()=>{
                                        setActiveTab(0);
                                    }}>
                                        <View style={[activeTab==0?[styles.activeTabSeg]:[styles.inActiveTagSeg],styles.segmentContainer]}>
                                            <Text style={[activeTab==0?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>En Proceso</Text>
                                        </View>
                                    </TouchableOpacity>   
                                </View>
                                <View >
                                    <TouchableOpacity onPress={()=>{
                                        setActiveTab(1);
                                    }}> 
                                        <View style={[activeTab==1?[styles.activeTabSeg]:[styles.inActiveTagSeg],{borderTopRightRadius:10,borderBottomRightRadius:10}]}>
                                            <Text style={[activeTab==1?{fontWeight:'bold',color:'#FFF'}:{color:'#444'}]}>Finalizadas / Canceladas</Text>    
                                        </View>
                                    </TouchableOpacity>
                                </View>    
                    </View>
                }

                {activeTab == 0 ?
                    <FlatList
                        data={inProcessOpenList}
                        renderItem={(item)=>{
                            return <InProcess  
                                item={item} 
                                zoomImage={(url)=>{
                                    setImageZoom(url)
                                }}
                                openInProcess={(item)=>{
                                    
                                    let index = inProcessOpenList.findIndex((process)=>process.id == item.id);
                                    inProcessOpenList[index]['active'] = !item.active;
                                    setRefreshTime(new Date());
                                    setOpenProcessList(inProcessOpenList)
                                }}
                                onCancelOperation={(item)=>{
                                    // cancelOperation(item);
                                    console.log("on cancel clickeddd");
                                    setVisible(true);
                                    setSelectedOperation(item)
                                    
                                }}
                                navigateDetail={(item)=>{
                                    props.navigation.navigate('                                 ',{
                                        'operationId':item.id
                                    })
                                }}
                                attachTransfer={(item)=>{
                                    setVisibleImageModel(true);
                                    
                                    console.log("preview image===");
                                    console.log({item:item});
                                    console.log(item?.operation_operation_transfers[0]?.transfer?.preview);
                                    setOperationModalData({
                                        title:'Agregar Transferencia Bancaria de Operacion',
                                        code:item.code,
                                        operationId:item.id,
                                        preview:item?.operation_operation_transfers[0]?.transfer?.preview
                                    })

                                }}

                            />
                        }}
                        extraData={refreshTime}
                        keyExtractor={(item) => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:'10%'}}
                    />
                    :
                    <ProgressList
                        data={inProcessClosedList}  
                        onSearch={(value)=>{

                            let closedList = [...inProcessOpenList];
                            closedList = closedList.filter((item)=>{
                                return (
                                    item.code.includes(value)
                                    || item.send_amount.includes(value)
                                    || item.rec_amount.includes(value)
                                )
                            });
                            console.log({closedListclosedList:closedList});
                            setClosedProcessList(closedList);
                        }} 

                        navigateOperationDetail = {(item)=>{
                            props.navigation.navigate('                                 ',{
                                'operationId':item.id
                            })
                            
                        }}
                    />
                }
            </>}

            {zoomImage!='' && 
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',alignSelf:'flex-end',padding:6}}>
                            <TouchableOpacity
                                    onPress={()=>{
                                        setImageZoom('')
                                    }}
                                >
                                <Image source={require('../../assets/images/icon/close.png')}
                                        style={{ height: 20.0, width: 20.0 }}
                                        resizeMode="contain"
                                />
                            
                            </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} >
                    <WebView source={{ uri: zoomImage }} 
                                style={{
                                        width: Constant.width,
                                        height: Constant.height
                                    }}
                    />
                    </ScrollView>
                </View>
            }  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    segmentTabs:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        // width:'100%',
        // padding:80
        // paddingLeft:20,
        // paddingRight:50
        paddingHorizontal:80
    },
    segmentContainer:{
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderRightWidth:1,
        borderColor:'#444'
    },
    activeTabSeg:{
        backgroundColor:Color.theme,
        // padding:17,
        paddingHorizontal:25,
        paddingVertical:14,
        borderWidth:0.2,
        borderColor:'#444'
    },
    inActiveTagSeg:{
        backgroundColor:Color.bgColor,
        // padding:17,
        paddingHorizontal:25,
        paddingVertical:14,
        borderWidth:0.2,
        borderColor:'#444',
    },
})
export default Operations;