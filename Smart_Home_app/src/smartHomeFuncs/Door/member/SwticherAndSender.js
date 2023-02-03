import React ,{useState,useCallback} from 'react'
 
 import { Switch } from 'react-native-switch';
  

 export   function SwitcherAndSender({parentCallback,...props}) {
const defaultvalue=props.defaultValue
       const [AllowStatus,setAllowStatus] =useState(defaultvalue);

    const toggleSwitch = () => setAllowStatus(previousState => !previousState);

    
     parentCallback(AllowStatus)
    
  return (
    <Switch
      
    value={Boolean(AllowStatus)}
     onValueChange={toggleSwitch}
   disabled={false}
   style={{width:200}}
   circleSize={40}
   innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
   barHeight={35}
   switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
   switchRightPx={2}
   activeText={'اجازه ورود دارد  '}
   inActiveText={'اجازه ورود ندارد  '}
     trackColor={{ false: "#767577", true: "#81b0ff" }}
     thumbColor={AllowStatus ? "#f5dd4b" : "#f4f3f4"}
     switchWidthMultiplier={4}
    
    
   />
   
  )
}
 
 