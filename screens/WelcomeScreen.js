import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';


const WelcomeScreen = ({ navigation }) => {
    const { height , width } = useWindowDimensions();
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{display:'flex'}}>   
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#3c444c",
                    marginTop: 50,
                    marginBottom: 90,
                    textAlign: 'center',
                    marginHorizontal: 25,
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
            </View>
            <Image
                source={require("../assets/images/img4.png")}
                style={{ marginTop: 100, resizeMode: "contain", width: "100%", height: "50%",top:-150 }}
            />

   <View style={{top:-height*0.17, alignItems:'center'}}>
        

            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3c444c",
                    marginTop: 20,
                    marginBottom: 40,
                }}
            >
                Start istening to us
            </Text>

            <TouchableOpacity
               //onPress navigating to next screen here
               onPress={() => navigation.navigate("HomeScreen")}
                style={{
                    backgroundColor: "#fc7f03",
                    borderRadius: 18,
                    paddingVertical: 18,
                    width: 250,
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
                    Get Started
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
