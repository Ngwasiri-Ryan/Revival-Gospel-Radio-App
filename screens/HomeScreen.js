import { View, Text, SafeAreaView , Image ,StatusBar, TouchableOpacity} from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

const { height, width } = useWindowDimensions();

const url = 'https://stream-152.zeno.fm/o3udyj5qxuitv?zs=RuuRuhLoRZOyMZoyIvuppQ'
  return (
<View style={{ flexDirection: "column", marginHorizontal: 15, marginTop: StatusBar.currentHeight }}> 
   
<Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#3c444c",
                    marginBottom: 90,
                    textAlign: 'center',
                    marginLeft:50,
                }}>

               Revival Gospel Radio
            </Text>
            <AntDesign name='leftcircle' size={30} color="#fc7f03"
            onPress={() => navigation.goBack()}
               style={{
                top:-height*0.17,
                marginRight:10,
                marginLeft:5,
               }}
            />

            {/**main container */}
<View style={{ flexDirection: "column", marginHorizontal: 10, marginTop:5, gap:40 }}>

  {/**box */}
   <View style={{
      height:200,
      width:'100%',
      borderRadius:10,
      backgroundColor:'#FFFF',
      alignItems:'center',
      padding:20,
      display:'flex',
    }}>
  <View style={{display:'flex',flexDirection:'row', height:'80%',alignItems:'center'}}>
  <Image source={require("../assets/images/tv-logo.png")}
  style={{ 
    height:'100%',
    width:100,
    left:-20,
  }}/>
      <Text style={{
         fontSize: 23,
         fontWeight: "bold",
         color: "#3c444c",
         width:200,
         alignItems:'center',
         left:-10,
      }}>Revival Gospel TV</Text>
  </View>

  <TouchableOpacity
               //onPress navigating to next screen here
               onPress={() => navigation.navigate("HomeScreen")}
                style={{
                    backgroundColor: "#fc7f03",
                    borderRadius: 18,
                    paddingVertical: 18,
                    width: 200,
                    alignItems: "center",
                    top:-23,
                }}
            >
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
                  Watch Live Service
                </Text>
            </TouchableOpacity>

       
    </View>

    {/**end of box */}

{/**box */}
<View style={{
      height:200,
      width:'100%',
      borderRadius:10,
      backgroundColor:'#FFFF',
      alignItems:'center',
      padding:20,
      display:'flex',
    }}>
  <View style={{display:'flex',flexDirection:'row', height:'80%',alignItems:'center'}}>
  <Image source={require("../assets/images/radio-logo.png")}
  style={{ 
    height:80,
    width:70,
    left:-10,
  }}/>
      <Text style={{
         fontSize: 20,
         fontWeight: "bold",
         color: "#3c444c",
         width:200,
         alignItems:'center',
         left:4,
      }}>Revival Gospel Radio</Text>
  </View>

  <TouchableOpacity
               //onPress navigating to next screen here
               onPress={() => navigation.navigate("RadioScreen",{
                url:url,
               })}
                style={{
                    backgroundColor: "#fc7f03",
                    borderRadius: 18,
                    paddingVertical: 18,
                    width: 200,
                    alignItems: "center",
                    top:-23,
                }}
            >
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
                 Listen to Radio
                </Text>
            </TouchableOpacity>

       
    </View>

    {/**end of box */}

   















</View>
   

   
  

</View>
  )
}

export default HomeScreen