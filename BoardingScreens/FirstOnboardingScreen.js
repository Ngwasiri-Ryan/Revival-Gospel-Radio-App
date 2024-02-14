import React, { Component } from 'react'
import { Text, StyleSheet, View, Pressable,Image,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


 const FirstOnboardingScreen = ({ navigation }) => {
     return (
        
         <View style={{ flex: 1, alignItems: "center" }}>

             <Text
                 style={{
                     fontSize: 28,
                     fontWeight: "bold",
                     color: "#3c444c",
                     marginTop: 50,
                     marginBottom: 90,
                     textAlign: 'center',
                     marginHorizontal: 25
                 }}>

                 Welcome to Revival Gospel Radio
             </Text>
             <Image
                 source={require("../assets/images/img1.png")}
                 style={{ marginTop: -100, resizeMode: "contain", width: "100%", height: "65%" }}
             />
              
              <Text style={{
                color:'#fc7f03',
                fontSize:25,
                fontWeight:800,
              }}>
                FM 105.5
              </Text>

       <View style={{
               display:'flex',
               flexDirection:'row',
               justifyContent:'space-between',
               alignItems:'center',
               marginHorizontal: 15,
               justifyContent:'center',
               top:-20,
               marginTop:30,
         }}
     >

    <Pressable onPress={() => navigation.navigate("WelcomeScreen")}
      style={{padding:10,alignItems:'center',justifyContent:'center',left:-65}}
    >
           <Text style={{
                         fontSize: 20,
                         fontWeight: "bold",
                         color: "#3c444c",
                     }}
               
            >Skip</Text>
    </Pressable>

         
         <View style={{
            width:'20%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap:2,
         }}>
        
        {/**first dot */}
        <View style={{
                height:5,
                width:15,
                borderRadius:10,
               backgroundColor:'#fc7f03',
               right:-8,
         }}
        ></View>

          {/**second dot */}
           <View style={{
                         height: 5,
                         width: 5,
                         borderRadius: 10,
                         backgroundColor: '#fc7f03',
                         left:-8,
                     }} >
        </View>

</View>


             <TouchableOpacity
                     onPress={() => navigation.navigate("SecondBoarding")}
                 style={{
                     borderColor: "#fc7f03",
                     borderWidth:3,
                     paddingVertical: 18,
                     width: 70,
                     height:70,
                     borderRadius: 50,
                     alignItems: "center",
                     justifyContent:"center",
                     right:-60
                 }}
             >
                     <AntDesign name="arrowright" size={30} color="#fc7f03" />
             </TouchableOpacity>
        </View>
         </View>
     );
    
  }

  export default FirstOnboardingScreen;

const styles = StyleSheet.create({})

