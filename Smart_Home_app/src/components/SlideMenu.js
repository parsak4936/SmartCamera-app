// // Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// // https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

// import React from 'react';
// import {
//   SafeAreaView,
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   Linking,
// } from 'react-native';

// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

// const CustomSidebarMenu = () => {

//   return (
//     <SafeAreaView style={{flex: 1}}>
     
      
//       <DrawerContentScrollView >
        
//         <DrawerItem
//           label="Visit Us"
//         />
//         <View style={styles.customItem}>
//           <Text
//             onPress={() => {
//               Linking.openURL('https://aboutreact.com/');
//             }}>
//             Rate Us
//           </Text>
          
//         </View>
//       </DrawerContentScrollView>
//       <Text
//         style={{
//           fontSize: 16,
//           textAlign: 'center',
//           color: 'grey'
//         }}>
//         www.aboutreact.com
//       </Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sideMenuProfileIcon: {
//     resizeMode: 'center',
//     width: 100,
//     height: 100,
//     borderRadius: 100 / 2,
//     alignSelf: 'center',
//   },
//   iconStyle: {
//     width: 15,
//     height: 15,
//     marginHorizontal: 5,
//   },
//   customItem: {
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// export default CustomSidebarMenu;