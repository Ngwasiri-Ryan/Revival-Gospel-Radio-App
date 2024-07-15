import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, Modal, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const HomeScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
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
      console.log('Requesting permissions...');
      await Audio.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
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
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const saveRecording = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('Recordings');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Recordings', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      setAudioLocation(asset.uri);
      console.log('Recording saved to:', asset.uri);
    } catch (error) {
      console.error('Failed to save recording:', error);
    }
  };

  const shareMessage = async () => {
    try {
      const message = 'https://bit.ly/3wTZX1R';
      const result = await Share.share({
        message: message + (audioLocation ? `\nRecorded Audio: ${audioLocation}` : ''),
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

  const injectedJavaScript = `
    document.body.style.backgroundColor = 'rgb(4,45,73)';
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image  source={require('../assets/images/pic.jpg')} style={styles.stationInfo}/>
        <View style={{marginTop:40}}>
        <Text style={styles.stationText}>Revival Gospel Radio</Text>
        <Text style={styles.stationText} >FM105.5</Text>
        </View>
       
      </View>
      <View style={styles.borderLine}>
      <Image  source={require('../assets/images/img2.jpg')} style={{
          height:100,
          width:100,
          borderRadius:15,
          marginHorizontal:'35%',
          top:-10,
        }}/>

      </View>
     
      <View style={[styles.controlsContainer, { top: -height * 0.05 }]}>
        <View style={[styles.controls, { marginLeft: width * 0.1 }]}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <MaterialIcons name={isRecording ? 'stop' : 'mic'} size={30} color="white" />
            <Text style={[styles.recordingStatus, { top: -height * 0.4, left: width * 0.57 }]}>
              {isRecording ? 'Recording...' : 'Not Recording'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={shareMessage}>
            <FontAwesome name="share" size={25} color="white"  style={[,styles.icon]} />
          </TouchableOpacity>
          
        </View>
      </View>

      <WebView source={{ uri: 'https://stream-152.zeno.fm/o3udyj5qxuitv?zs=RuuRuhLoRZOyMZoyIvuppQ'}} injectedJavaScript={injectedJavaScript} />

      <Modal visible={showModal} animationType="slide" transparent style={{}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Audio Saved at:</Text>
            <Text>{audioLocation}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(4,45,73)',
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: -100,
    resizeMode: 'contain',
    width: '100%',
    height: '80%',
    paddingBottom:10,
   
  },
  borderLine:{
    borderBottomColor: '#FFD700',
    borderBottomWidth: 2,
  },
  stationInfo: {
    marginTop: 150,
    width: '97%',
    height: '55%',
    top: 30,
    borderRadius: 30,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '800',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    height: '8%',
    top:50,
    left:35,
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 55,
    marginTop:50,
    position:'absolute'
  },
  recordingStatus: {
    fontSize: 15,
    color: 'green',
  },
  heartIcon: {
    left: -40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    color: 'rgb(113,165,30)',
  },
  modalButton: {
    backgroundColor: 'rgb(113,165,30)',
    width: 200,
    padding: 10,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: '10%',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  icon:{
    top:-10,
  }
});

export default HomeScreen;
