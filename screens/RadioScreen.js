import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, Modal, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
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
      console.log('Requesting permissions...');
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

  const injectedJavaScript = `
    document.body.style.backgroundColor = 'rgb(0,76,110)';
  `;

  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stationInfo}>
          <Text style={styles.stationText}>Revival Gospel</Text>
        </View>
      </View>
      <View style={[styles.controlsContainer, { top: -height * 0.05 }]}>
        <View style={[styles.controls, { marginLeft: width * 0.13 }]}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <MaterialIcons name={isRecording ? 'stop' : 'mic'} size={50} color="white" />
            <Text style={[styles.recordingStatus, { top: -height * 0.4, left: width * 0.57 }]}>
              {isRecording ? 'Recording...' : 'Not Recording'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="heart" size={30} color="white" style={styles.heartIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareMessage}>
            <FontAwesome name="share" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="cross" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <WebView source={{ uri: url }} injectedJavaScript={injectedJavaScript} />
      <Modal visible={showModal} animationType="slide" transparent>
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
    backgroundColor: 'rgb(0,76,110)',
    flex: 1,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 100,
  },
  header: {
    marginTop: -100,
    resizeMode: 'contain',
    width: '100%',
    height: '75%',
    borderBottomRadius: 50,
  },
  stationInfo: {
    marginTop: 150,
    width: '80%',
    height: '45%',
    top: 30,
    backgroundColor: 'rgb(9,60,91)',
    borderRadius: 30,
    left: 40,
    justifyContent:'center',
    alignItems:'center',
  },
  stationText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    height: '8%',
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 55,
  },
  recordingStatus: {
    fontSize: 15,
    color: 'green',
  },
  heartIcon: {
    left: -30,
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
    color: '#fc7f03',
  },
  modalButton: {
    backgroundColor: '#fc7f03',
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
});

export default RadioScreen;
