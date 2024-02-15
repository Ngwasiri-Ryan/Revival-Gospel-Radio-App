import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share, Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const RadioScreen = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  const { url } = route.params;
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [audioLocation, setAudioLocation] = useState('');

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording...');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped:', uri);
      if (uri) {
        await saveRecording(uri);
        setShowModal(true);
        setAudioLocation(`${FileSystem.documentDirectory}recording.wav`);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const saveRecording = async (uri) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}recording.wav`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      console.log('Recording saved to:', fileUri);
    } catch (error) {
      console.error('Failed to save recording:', error);
    }
  };

  const shareMessage = async () => {
    try {
      const message = 'Revival Gospel Radio';
      const result = await Share.share({
        message: message + (recording ? `\nRecorded Audio: ${FileSystem.documentDirectory}recording.wav` : ''),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared successfully');
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={{ backgroundColor: '#fc7f03', flex: 1 }}>
      <View style={{ marginTop: -100, resizeMode: 'contain', width: '100%', height: '85%', borderBottomRadius: 50 }}>
        <Image source={require('../assets/images/img1.png')} style={{ marginTop: 150, resizeMode: 'contain', width: '100%', height: '55%', top: 30 }} />
        <View style={{ display: 'flex', top: -height * 0.56 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffff', marginTop: 50, marginBottom: 90, textAlign: 'center', marginHorizontal: 25, marginLeft: 65 }}>
            Revival Gospel Radio
          </Text>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 800, top: height * 0.36, left: width * 0.35 }}>FM 105.5</Text>
          <AntDesign name="leftcircle" size={35} color="black" onPress={() => navigation.goBack()} style={{ marginRight: 10, marginLeft: 15, top: -height * 0.17 }} />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%', height: '8%', top: -height * 0.05 }}>
        <View style={{ marginLeft: width * 0.13, alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 55 }}>

          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <MaterialIcons name={isRecording ? 'stop' : 'mic'} size={50} color="white" />
           
            <Text style={{ fontSize: 15, color: 'green' , top:-height*0.4, left:width*0.57}}>{isRecording ? 'Recording...' : 'Not Recording'}</Text>
          
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome name="heart" size={30} color="white" style={{left:-30}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareMessage}>
            <FontAwesome name="share" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Entypo name="cross" size={30} color="white" />
          </TouchableOpacity>

        </View>
      </View>
      <WebView source={{ uri: url }} />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10,fontWeight: "700" ,color: "#fc7f03" }}>Audio Saved at:</Text>
            <Text>{audioLocation}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={{backgroundColor:'#fc7f03', width:200,padding:10,marginTop:30,borderRadius:15,alignItems:'center',marginLeft:'10%' }} >
                   <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>Close</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RadioScreen;
