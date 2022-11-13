import {View ,TouchableOpacity, Text} from 'react-native';
import Modal from "react-native-modal";
import React, { useState } from "react";
import styles from "../../screens/profile/style";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const RenderImageOption=()=> {
    const [imageModal, showImageModal] = useState(false);
    
    const uploadImage = async (path)=>{
        let index = inputFields.findIndex(x => x.type === 'image');
        inputFields[index]['erroMessage'] = '';
        setInputFields(inputFields);
        let url = Constant.API_URL;
        url +='profiles/media';
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

export default RenderImageOption;