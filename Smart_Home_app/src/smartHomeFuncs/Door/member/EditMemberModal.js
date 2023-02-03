import React ,{useState,useCallback, useEffect} from 'react'
import { Modal, View ,Text,Image,StyleSheet, Alert, Pressable, ImageBackground} from 'react-native'
  import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
 import TextInput from '../../../components/comps/TextInput'
 import axios from 'axios';
 import LoadingAnimation from '../../../components/LoadingAnimation'
import { UploadImage } from '../../../components/UploadImage';
 import { Switch } from 'react-native-switch';
 import {Avatar, Icon } from 'react-native-elements';
 import { AntDesign } from '@expo/vector-icons';
 import Button from '../../../components/btns/Button';
  import BackButton from '../../../components/btns/BackButton'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import {SwitcherAndSender} from './SwticherAndSender'
import { Datasender } from './datasender';
import { Circle } from 'react-native-animated-spinkit';


 export  function EditMemberModal(props) {
const [waiting,setWaiting]=useState(false)
const [Deletewaiting,setDeleteWaiting]=useState(false)

    const EditMemberModalstate=props.EditMemberModalstate;
     const [defaultName,setdefaultName]=useState( )
    
     const [defaulttitle,setdefaulttitle]=useState()
   // console.log("thi is default  name" +typeof(defaultName) )
    
      const selecteditem=props.selecteditem;
     const  authToken = props.authToken;
     const [NewName, setNewName] = useState({ value:defaultName, error: '' })
  
     const [NewTitle, setNewTitle] = useState({ value: defaulttitle, error: '' })

     const SystemIDValue =props.systemID; 
     const [ID,setid] =useState();
     const [image,setImage] =useState();
     const [AllowStatus,setAllowStatus] =useState(1);
     //const [previousName,setpreviousName] =useState('');
// const asd =()=>{
//   console.log("asd is happening")
//   setNewName({ value:defaultName, error: '' })
//   setNewTitle({ value:defaulttitle, error: '' })}

//      useEffect(() => {
//       asd()
 
 

//--------------------Callback---------------------------


     const callback = useCallback((AllowStatus) => {
       if(AllowStatus==true){
        setAllowStatus('1')
      }
      if(AllowStatus==false){
        setAllowStatus('0')
      }
     }, []); 
    const callbackData = useCallback((name,image,title,ID) => {
   setdefaultName(name)
    setdefaulttitle(title)
    setid(ID)
    setImage(image)
    }, []); 

    
     // --------------------------Start of Accept botn ------------------ 

    const onAcceptPressed = async (e) => {
      e.preventDefault();
      setWaiting(true)
      //console.log("image is this : "+image )
      const UsernewData = {
        "name": NewName.value,
        "id":ID,
        "picture":image.replace(/data:image\/.*;base64,/g, "").replace("/^.+,/", "").replace("b'","").replace("'","") ,
        "title": NewTitle.value,
        "allow_status":AllowStatus,
        "Authorization":authToken,
        "systemid" : SystemIDValue,
      }
      await axios.patch('http://smartvideodoorphoneproject.herokuapp.com/door-security/update-member/', {
        name: UsernewData["name"],
        title: UsernewData["title"],
        allow_status:UsernewData["allow_status"],
        hash_serial_rasperyPi : UsernewData["systemid"],
        id_member:UsernewData["id"],
        picture : UsernewData["picture"],

      },
      {headers: {'Authorization': UsernewData["Authorization"] }  } 
       )

      .then(function (response,r) {
        if(response.status === 200){  
          setWaiting(false)  
          Alert.alert(
            " تغییر اطلاعات !",
             " اطلاعات عضو تغییر کرد",
             [
              
              {
                text: "باشه",
                
                style: "cancel",
              } 
            ],
          );
   

         } 


    })
    .catch(error=>{
      setWaiting(false)
            // -------------------------- 405 Error------------------ 

      if (error.response.status==405){
        Alert.alert(
          " خطا 405",
           " ",
           [
            
            {
text:"باشه",               
             },
          ],
        );
    
       }  
            // -------------------------- 500Error------------------ 

       if (error.response.status==500){
        Alert.alert(
          " خطا 500",
           " ",
           [
            
            {
text:"باشه",               
             },
          ],
        );
    
       }  
            // --------------------------400 Error ------------------ 

       if (error.response.status==400){
        Alert.alert(
          " خطا 400",
           " ",
           [
            
            {
text:"باشه",               
             },
          ],
        );
    
       }     
            

      console.log(error)
    } 
 // -------------------------- end of Error------------------
    
    )
    
    }
 
     // --------------------------Delete Member ----------------------------- 

  
     const Deletemember =   () => {
     
      setDeleteWaiting(true)

      const DeleteReq =async(e)=>{
         const DeletData = {
       
          "id_member":ID,
     
          "Authorization":authToken,
          "systemid" : SystemIDValue,
        }
        console.log(ID + " is id while sending")
        await axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/delete-member/', {
          
          hash_serial_rasperyPi : DeletData["systemid"],
          id_member:DeletData["id_member"],
           
  
        },
        {headers: {'Authorization': DeletData["Authorization"] }  } 
         )
  
        .then(function (response,r) {
          if(response.status === 200){  
            setDeleteWaiting(false)  
            Alert.alert(
              " ",
               " عضو با موفقیت حذف شد",
               [
                
                {
                  text: "باشه",
                 onPress:()=>{  

                              props.changeVisibaleState(!EditMemberModalstate);
               
                },
                  style: "cancel",
                } 
              ],
            );
     
  
           } 
  
  
      })
      .catch(error=>{
        setDeleteWaiting(false)
             
  
        
              // -------------------------- 500Error------------------ 
  
         if (error.response.status==500){
          Alert.alert(
            " خطا 500",
             " ",
             [
              
              {
  text:"باشه",               
               },
            ],
          );
      
         }  
              // --------------------------400 Error ------------------ 
  
         if (error.response.status==400){
          Alert.alert(
            " خطا 400",
             " اطلاعات اشتباه ارسال شده است.با پشتیبانی تماس بگیرید",
             [
              
              {
  text:"باشه",               
               },
            ],
          );
      
         }     
              
  
        console.log(error)
      } 
      
      )
         // -------------------------- end of req------------------

      }
      Alert.alert(
        " هشدار",
         " از حذف کردن این عضو مطمئن هستید؟پس از تایید دیگر اطلاعات عضو قابل بازگشت نمی باشد",
         [
          
          {
            text: "باشه",
            onPress:()=>{DeleteReq()},
            style: "cancel",
          } ,
          {
            text: "انصراف",
            onPress:()=>{setDeleteWaiting(false)    },

             style: "cancel",
          } 
        ],
      );
    
      }
     
 


//Render Side : ------------------------------------
  return (
    <ScrollView>
           

 <Modal
     onRequestClose={  () =>{ 
      setNewTitle({ value: '', error: '' });

      props.changeVisibaleState(!EditMemberModalstate);
    
      setNewName({ value:'', error: '' })
       }
    }

        animationType="fade"
        transparent={true}
        visible={EditMemberModalstate} > 

     <View style={globalmodalStyles.centeredView} >
          <View  style={{ width:'100%',
            height:'100%',
            padding: 15,
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "white",}}>

{/* ----------------------------------------تایید------------------------------------ */}

            <BackButton goBack={() => {
                             setNewTitle({ value: '', error: '' });

                              props.changeVisibaleState(!EditMemberModalstate);
                            
                              setNewName({ value:'', error: '' })
                            }
                              
                              }/>
{waiting==false ?  <Pressable onPress={onAcceptPressed} style={{marginLeft:"85%", }}>
               <Text>تایید</Text>
            </Pressable> : <LoadingAnimation/>}

           

{/* --------------------------------------عکس--------------------------- */}

 {
    selecteditem==null ?<Text>asd</Text> : <Datasender
                                                      defaultID={selecteditem.id}
                                                      defaultName={selecteditem.name}
                                                      defaulttitle={selecteditem.title}
                                                      defaultPicture={selecteditem.picture}
                                                        parentCallback={callbackData}
                                              
                                              />
 }
 {selecteditem==null ? <Text>منتظر بمانید</Text> : 
                      // <UploadImage  parentCallback={callback2} defaultimage={selecteditem.picture}/>
  // selecteditem.picture ==null ?<Avatar
  //                         onPress={()=>{}}
  //                       source={{uri:`/data:image\/.*;base64,/g,${selecteditem.picture.replace("b\'","").replace("\'","") }` }}
  //                       style={imageUploaderStyles.uploadimage}/>:
        
        <ImageBackground
        onPress={()=>{}}
        source={{uri:`data:image/png;base64,${selecteditem.picture.replace("b\'","").replace("\'","") }` }}
        style={imageUploaderStyles.uploadimage}>
          {/* <Icon
                                                    name="camera" size={35}
                                                    color="#fff"
                                                    style={{opacity:0.7,
                                                      marginTop:45,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    borderWidth:1,
                                                    borderColor:'#fff',
                                                    borderRadius:10,

                                                    
                                                    }}
                                                    /> */}
                                                    </ImageBackground>
  
         }


{/* ---------------------------------------اسم----------------------------- */}

    {selecteditem==null ? <Text>منتظر بمانید</Text> : 
          
          
            <TextInput
            
           // onFocus={()=>{setNewName({value:selecteditem.name,error:''}); console.log(NewName.v)}} 
            label="نام و نام خانوادگی"
            returnKeyType="next"
            style={{textAlign:'right',}}     
            defaultValue={selecteditem.name}
    
             value={ NewName.value}
            onChangeText={(text) => setNewName({ value:text, error: '' })} 
            autoCapitalize="none"
            error={!!NewName.error}
            errorText={NewName.error} />
                 
   } 
{/* ---------------------------------عنوان------------------------------- */}
          
    {selecteditem==null ? <Text>منتظر بمانید</Text> : 
          
          <TextInput
        label="عنوان"
        defaultValue={selecteditem.title}
         value={ NewTitle.value}
        style={{textAlign:'right'}}         returnKeyType="next"
      
          onChangeText={(text) => setNewTitle({ value: text, error: '' })} 
           autoCapitalize="none"
            error={!!NewTitle.error}
             errorText={NewTitle.error} /> 
               
 } 
   
       
       
       

  
{/* ---------------------------------سوییچر---------------------------------- */}



{selecteditem==null ?<Text>منتظر بمانید</Text> :   
  <SwitcherAndSender parentCallback={callback} 
                 
                    defaultValue={selecteditem.allow_status}
                 
                    />
               
                }  
                
{/* ---------------------------------------حذف----------------------------- */}
                    
{Deletewaiting==false ?  
                  <Button style={globalmodalStyles.modalDoorBtn}  
                  onPress={Deletemember }>
                  <AntDesign name="deleteuser" size={24} color="black" />   حذف عضو
                  </Button>

                            :
                            <View
                                  style={{flex : 1 ,marginTop:20}}
                                    >
                              
                              <Circle color="blue" size={38} />

                            
                              </View>
                            }
           
 
          </View>
        </View>
      </Modal>
    </ScrollView>
   
  )
}
 
const imageUploaderStyles=StyleSheet.create({
    container:{
        
        height:"100%",
        width:"100%", 
        backgroundColor:'#efefef',
        position:'relative',
      
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
    },
    uploadimage:{
      height:220,
        width: 220, 
        borderRadius:999,
        borderWidth: 1,
        borderColor: '#fff',
        overflow:'hidden',
        
 marginTop:60,
        marginBottom:13,
   
    }
})