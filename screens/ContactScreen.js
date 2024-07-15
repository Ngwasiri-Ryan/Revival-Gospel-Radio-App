// screens/ContactScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const ContactScreen = () => {
  const openDial = () => {
    Linking.openURL('tel:+1234567890').catch((err) => console.error('An error occurred', err));
  };

  const openMail = () => {
    Linking.openURL('mailto:example@example.com').catch((err) => console.error('An error occurred', err));
  };

  const openWebsite = () => {
    Linking.openURL('https://www.example.com').catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.square} onPress={openDial}>
          <FontAwesome name="phone" size={24} color="rgb(4,45,73)" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.square} onPress={openMail}>
          <FontAwesome name="envelope" size={24} color="rgb(4,45,73)" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.bottomSection}>
        <Text style={styles.text} onPress={openWebsite}>
          Visit Website <FontAwesome name="telegram" size={24} color="rgb(4,45,73)" />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(222,230,233)',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 20,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color:'rgb(4,45,73)',
    paddingTop:20,
  },
});

export default ContactScreen;
