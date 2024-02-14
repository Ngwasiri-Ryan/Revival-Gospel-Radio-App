import { View, Text, Image } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import { AntDesign } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

    const RadioScreen = ({ navigation, route }) => {
        const { height , width } = useWindowDimensions();

        const { url } = route.params; // Assume URL passed as parameter
      
        if (!url) {
          return (
            <View>
              <Text>No website URL provided.</Text>
            </View>
          );
        }
      
        return (
            <View style={{backgroundColor:'#fc7f03', flex:1, }}>
        <View
                 style={{ marginTop: -100, resizeMode: "contain", width: "100%", height: "90%",borderBottomRadius:50 }}
             >
        
                 <Image
                 source={require("../assets/images/air.png")}
                 style={{ marginTop: 150, resizeMode: "contain", width: "100%", height: "75%" }}
             />
              <View style={{display:'flex',top:-height*0.75,}}>   
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#ffff",
                    marginTop: 50,
                    marginBottom: 90,
                    textAlign: 'center',
                    marginHorizontal: 25,
                    marginLeft:65,
                }}>

               Revival Gospel Radio
            </Text>

            <AntDesign name='leftcircle' size={35} color="black"
            onPress={() => navigation.goBack()}
               style={{
                marginRight:10,
                marginLeft:15,
                top:-height*0.17,
               }}
            />
            </View>

                </View>
                 <WebView source={{ uri: url }}/>
            </View>
          
        );
      };

export default RadioScreen