import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import * as imageConversion from 'image-conversion';
import * as FileSystem from 'expo-file-system';

 
export  function UploadImage({parentCallback ,defaultimage,...props}) {
   const imageConvertor =JSON.stringify(props)
   //const defaultImage=defaultimage.replace(/data:image\/.*;base64,/g, "").replace("/^.+,/", "").replace("b'","").replace("'","");
  // console.log("this is upload image : " + defaultImage)
    const [image, setImage] = useState(imageConvertor.replace(/data:image\/.*;base64,/g, "").replace("/^.+,/", ""));

 

    const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4,3],
      quality: 0.2,
    });
    
     

    if (!_image.cancelled) {
      const base64 = await FileSystem.readAsStringAsync(_image.uri, { encoding: 'base64' });

      setImage(_image.uri); 
       var base64data = base64.replace(/data:image\/.*;base64,/g, "").replace("/^.+,/", "")
     // var uri = _image.uri.replace(/data:image\/.*;base64,/g, "").replace("/^.+,/", "")
console.log("base 64"+ base64data )
//console.log("uri data "+uri)
      //console.log("this is base 64 "+base64data)
      // if(base64data==null){
      
      //   parentCallback(defaultImage)
      //   console.log("default image is empty")

      // }else{
      //  // parentCallback(base64data)
     //  console.log("default image is not empty")

        parentCallback(base64)


      // }
  
  
    
    }
  };
///////////////////////////////////////

    
  const  checkForCameraRollPermission=async()=>{
    const { status } =  ImagePicker.getMediaLibraryPermissionsAsync();
    

    if (status !== 'granted') {
      ImagePicker.getMediaLibraryPermissionsAsync();
    }else{
      console.log('Media Permissions are granted')
    }
  
}
useEffect(() => {
    checkForCameraRollPermission()
  }, []);
  
  return (
            <View style={imageUploaderStyles.container}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> 

           
            
          
           {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />  */}
               
              
                   
                
                
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
              

            </View>
   
  );
}
 

const imageUploaderStyles=StyleSheet.create({
    container:{
      
        height:200,
        width:200, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})