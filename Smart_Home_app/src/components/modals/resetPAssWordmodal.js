import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../../../smartHomeFuncs/Door/door';
import {globalmodalStyles} from './GlobalModalStyle'
import Button from '../btns/Button'
import TextInput from '../comps/TextInput'


export   function ResetPassWordmodal(props) {
    const ResetPassmodalVisible=props.ResetPassmodalVisible;
    const [confirmpassword, setconfirmpassword] = useState({ value: '', error: '' })
  const [newpassword, setnewpassword] = useState({ value: '', error: '' })
  const [seriaPin, setseriaPin] = useState({ value: '', error: '' })

  
  return (
    <View>
 <Modal
 
        animationType="fade"
        transparent={true}
        visible={ResetPassmodalVisible}
        
      >
        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
             onPress={() => props.changeVisibaleState(!ResetPassmodalVisible)}
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable>
            
        
            <Text style={globalmodalStyles.modalText}>reset password modal World!</Text>
            <TextInput
                label="serial Pin"
                returnKeyType="done"
                value={seriaPin.value}
                onChangeText={(text) => setseriaPin({ value: text, error: '' })}
                error={!!seriaPin.error}
                errorText={seriaPin.error}
                secureTextEntry
            />
             <TextInput
                label="new password"
                returnKeyType="done"
                value={newpassword.value}
                onChangeText={(text) => setnewpassword({ value: text, error: '' })}
                error={!!newpassword.error}
                errorText={newpassword.error}
                secureTextEntry
            />
             <TextInput
                label="confirm new password"
                returnKeyType="done"
                value={confirmpassword.value}
                onChangeText={(text) => setconfirmpassword({ value: text, error: '' })}
                error={!!confirmpassword.error}
                errorText={confirmpassword.error}
                secureTextEntry
            />
            <Button 
                style={globalmodalStyles.button}
               >
                تغییر رمز
            </Button>

          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 