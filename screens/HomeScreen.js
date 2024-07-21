import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, Modal, StyleSheet, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

const HomeScreen = () => {
  const { height, width } = useWindowDimensions();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [audioLocation, setAudioLocation] = useState('');

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
      if (sound) {
        sound.unloadAsync();
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

  const playRadio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'https://stream-152.zeno.fm/o3udyj5qxuitv?zs=RuuRuhLoRZOyMZoyIvuppQ' },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      if (error.message.includes('503')) {
        setShowErrorModal(true);
      } else {
        console.error('Failed to play radio:', error);
      }
    }
  };

  const stopRadio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to stop radio:', error);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/img.jpg')} style={styles.stationInfo} />
        <View style={{ marginTop: 40 }}>
          <Text style={styles.stationText}>Revival Gospel Radio</Text>
          <Text style={styles.stationText}>FM105.5</Text>
        </View>
      </View>
      <View style={styles.borderLine}>
        <Image
          source={require('../assets/images/img2.jpg')}
          style={{
            height: 100,
            width: 100,
            borderRadius: 15,
            marginHorizontal: '35%',
            top: -10,
          }}
        />
      </View>

      <View style={[styles.controlsContainer, { top: -height * 0.05 }]}>
        <View style={[styles.controls, { marginLeft: width * 0.03 }]}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <Image source={require('../assets/images/record.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={isPlaying ? stopRadio : playRadio}>
            <Image
              source={isPlaying ? require('../assets/images/pause.png') : require('../assets/images/play.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareMessage}>
            <Image source={require('../assets/images/share.png')} style={[styles.icon, styles.share]} />
          </TouchableOpacity>
        </View>
      </View>

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

      <Modal visible={showErrorModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Oops, we aren't mounted yet</Text>
            <Text style={styles.modalText}>Try again later</Text>
            <TouchableOpacity onPress={() => setShowErrorModal(false)} style={styles.modalButton}>
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
    paddingBottom: 10,
  },
  borderLine: {
    borderBottomColor: 'rgb(233, 136, 14)',
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
    color: 'rgb(233, 136, 14)',
    fontSize: 20,
    fontWeight: '800',
  },
  controlsContainer: {
    display: 'flex',
    width: '100%',
    height: '8%',
    top: 50,
    left: -30,
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    position: 'absolute',
    top: 70,
    left: 40,
  },
  icon: {
    width: 70,
    height: 70,
  },

  share:{
    width: 60,
    height:60,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgb(4,45,73)',
    padding: 20,
    borderRadius: 10,
    justifyContent:'center',
   alignItems:'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    color: 'rgb(233, 136, 14)',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    color: 'rgb(233, 136, 14)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    color: '#ffff',
  },
  modalButton: {
    backgroundColor: 'rgb(233, 136, 14)',
    width: 200,
    padding: 10,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: '5%',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});

export default HomeScreen;
