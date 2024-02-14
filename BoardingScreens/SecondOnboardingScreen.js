import React, { Component } from 'react'
import { Text, StyleSheet, View, Pressable, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

const SecondOnboardingScreen = ({ navigation }) => {
    const { height , width } = useWindowDimensions();
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: '#ffff' }}>

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
                source={require("../assets/images/img3.png")}
                style={{ marginTop: 100, resizeMode: "contain", width: "100%", height: "45%",top:-150 }}
            />

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#3c444c",
                    top:-80,
                    marginBottom: 5,
                    textAlign: 'center',
                    marginHorizontal: 25
                }}>

                Listen to the latest gospel news and music
            </Text>


            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 5,
                justifyContent: 'center',
                top: -30,
            }}
            >

                <Pressable onPress={() => navigation.navigate("WelcomeScreen")}
                    style={{ padding: 10, alignItems: 'center', justifyContent: 'center', left: -65 }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#3c444c",
                    }}

                    >Skip</Text>
                </Pressable>

                <View style={{
                    width: '5%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 5,
                }}>

                    {/**first dot */}
                    <View style={{
                        height: 5,
                        width: 5,
                        borderRadius: 10,
                        backgroundColor: '#fc7f03',
                    }} >
                    </View>

                   
                    </View>
                   

                {/**second dot */}
                <View style={{
                    height: 5,
                    width: 15,
                    borderRadius: 10,
                    backgroundColor: '#fc7f03',
                    left:6,
                }}>

                </View>


                <TouchableOpacity
                    onPress={() => navigation.navigate("WelcomeScreen")}
                    style={{
                        borderColor: "#fc7f03",
                        borderWidth: 3,
                        paddingVertical: 18,
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        right: -60
                    }}
                >
                    <AntDesign name="arrowright" size={30} color="#fc7f03" />
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default SecondOnboardingScreen;

const styles = StyleSheet.create({})

