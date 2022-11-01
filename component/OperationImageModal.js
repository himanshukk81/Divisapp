import React, { useEffect, useState } from "react";
import {TouchableOpacity, StyleSheet ,View ,Text , FlatList, Image , TextInput, ActivityIndicator, AsyncStorage} from "react-native";
import Modal from "react-native-modal";
import Constant from "../utility/Constant";
import {  Sizes } from "../constants/styles";
import Color from "../utility/Color";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { updateOperationTransfer, uploadMedia } from "../services/Api";
import { showToastLong } from "../utility/Index";

const OperationImageModal =(props) =>{ 

    const [comments, setComments] = useState('');
    const [imageModal, showImageModal] = useState(false);
    const [photo, setPhotoURI] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const [showImageType , setImageType] = useState(false);
    useEffect((props)=>{
        console.log({props:props});
        if(props && props.data){
            setPhotoURI(props.data.preview)
        }
        console.log("props data==="+props);
        setImageType(false);
    },[props]);

    callImageModel = ()=>{
        console.log("Image modale calll")
        setPhotoURI(props.data.preview)
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
    
    const openImageGallery = async () =>{
        let options ={
            'quality':0.5
        }
        const result = await launchImageLibrary(options);
        console.log("length====");
        console.log(JSON.stringify(result));
        setPhotoURI(result['assets'][0]['uri'])
        setImagePath(result['assets']);
    }

    const attachProof = async () =>{
        // let params = {
        //     'file':imagePath
        // }
        const accessToken = await AsyncStorage.getItem('access_token');
        setLoading(true);
        console.log({photophoto:photo});
        var photo3 = {
            uri: photo,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        var form = new FormData();
        form.append("file", photo3);

        let url = Constant.API_URL;
        url +='operation-transfers/media';
        
        console.log(accessToken);
        console.log(url);
        console.log({formphoto:photo});
        fetch(url, {
            method: 'POST',
            body: form,
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + accessToken
            }
          })
        .then((response) => response.json())
        .then((response) => {
            console.log('response::::=>>>>>', response);
            addTransfer(response.name);
        })
        .catch((error) => {
            setLoading(false);
            showToastLong('Something went wrong.');
            console.log('error>>>>>', error);
        });
        
        // uploadMedia(params).then((response)=>{
        //     addTransfer(response.name);
        // }).catch(error=>{
        //     setLoading(false);
        //     showToastLong('Something went wrong.');
        //     console.log({error:error});
        // })
    }

    const addTransfer = async (url) =>{
        console.log({propsprops:props});
        let params = {
            'operation_id':props.data.operationId,
            'comment':comments,
            'transfer':url
        }
        console.log({paramsData:params});

        updateOperationTransfer(params).then((response)=>{
            console.log({response:response});
            setLoading(false);
            showToastLong('Proof uploaded successfully.');
            console.log('updated transfer');
            props.closeModal();
        }).catch(error=>{
            setLoading(false);
            console.log({errorsssd:error})
            // alert("something went wrong.");
            showToastLong('something went wrong.');
        })
    }

    const openImageSelected = async (type) =>{
        let options ={
            'quality':0.5
        }
        let result;
        if(type == 2){
            result = await launchImageLibrary(options);
        }
        else{
            result = await launchCamera(options);
        }
        setImageType(false);
        
        setPhotoURI(result['assets'][0]['uri'])
        setImagePath(result['assets']);
    }
    return (
        <View style={styles.modalContainer}>
            <Modal isVisible={props.isVisibleModal}
                onBackdropPress={() => {}}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView2}>
                           
                            <View style={{marginVertical:10, paddingHorizontal:20, flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{color:'#444',fontWeight:'bold',fontSize:20}}>{props.data.title}</Text>
                                <TouchableOpacity onPress={()=>{
                                    props.closeModal();
                                }}>
                                    <Image source={require('../assets/images/icon/close.png')}
                                        style={{ height: 18.0, width: 18.0}}
                                    />
                                </TouchableOpacity>
                            </View>
                           
                            <View style={{ }}>
                                <Text style={{marginHorizontal: Sizes.fixPadding * 2.0,marginVertical:7,fontWeight:'bold',color:Color.black }}>Operación <Text style={{fontWeight:'bold',color:'red'}}>*</Text></Text>

                                <View style={styles.textFieldContainerStyle}>
                                    <TextInput
                                        placeholder=""
                                        placeholderTextColor={Color.black}
                                        value={props.data.code}
                                        editable={false}
                                        style={{color:Color.black}}
                                    />
                                </View>
                            </View>

                            <View style={{marginHorizontal: Sizes.fixPadding * 2.0,marginVertical:7}}>
                                <Text style={{fontWeight:'bold',color:Color.black}}>Transferencia <Text style={{fontWeight:'bold',color:'red'}}>*</Text></Text>
                                
                                {showImageType && <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10}}>
                                    <TouchableOpacity onPress={()=>{
                                        openImageSelected(1)
                                    }}>
                                        <View style={{borderWidth:1,borderColor:Color.theme,padding:10}}>
                                            <Text style={{color:'#444'}}>Camera</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{width:20}}></View>
                                    <TouchableOpacity onPress={()=>{
                                        openImageSelected(2)
                                    }}>
                                        <View style={{borderWidth:1,borderColor:Color.theme,padding:10}}>
                                            <Text style={{color:'#444'}}>Gallery</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>}

                                {!showImageType && <TouchableOpacity onPress={()=>{
                                    setImageType(true);
                                 }}>
                                    { 
                                        (!photo && !props.data.preview) ?
                                        <View style={{borderWidth:1,borderColor:Color.darkGrey,paddingVertical:40,paddingHorizontal:10,marginVertical:10}}>
                                            <Text style={{fontWeight:'bold',textAlign:'center',color:Color.black}}>Click para adjuntar imagen </Text>

                                            <Text style={{textAlign:'center',color:Color.black}}>Puede usar la cámara de su celular o adjuntar una imagen de memoria/disco duro. </Text>
                                        </View>:
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}> 
                                            <Image source={{uri:photo?photo:props.data.preview}}
                                                style={{ height: 100.0, width: 100.0}}
                                            />
                                        </View>
                                    }


                                </TouchableOpacity>}
                               
                            </View>

                            <View >
                                <Text style={{marginHorizontal: Sizes.fixPadding * 2.0,marginVertical:7,fontWeight:'bold',color:Color.black}}>Comentario</Text>

                                <View style={styles.textFieldContainerStyle}>
                                    <TextInput
                                        placeholder=""
                                        placeholderTextColor={Colors.blackColor}
                                        value={comments}
                                        style={{color:Color.black}}
                                        onChangeText={value=> {
                                            console.log("value:::::"+value);
                                            setComments(value)
                                        }}
                                    />
                                </View>
                            </View>
                            
                            <TouchableOpacity onPress={()=>{
                                    attachProof();
                            }}
                            // disabled={isLoading}
                            >
                                {!isLoading?<View style={{backgroundColor:Color.theme,width:100,marginLeft:'30%',marginTop:30,marginBottom:20 }}>
                                    <Text style={{color:'white',textAlign:'center',padding:8,fontWeight:'bold',color:Color.black}}>Guardar</Text>
                                </View>:<ActivityIndicator size="large" color={Color.theme} />}
                            </TouchableOpacity>
                            


                      </View> 
                    </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'white',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView2:{
        backgroundColor: "white",
        borderRadius: 10,
        width:Constant.width-30,
        // height:Constant.height/1.6,
        paddingVertical:30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Color.white ,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        borderWidth:1,
        borderColor:Color.darkGrey
        // marginTop: Sizes.fixPadding * 2.0
    },
    label: {
        color:'#444',
        textAlign:'center',
        fontWeight:'bold'
    },
    labelText:{
        color:'#000'
    }
})
export default OperationImageModal;