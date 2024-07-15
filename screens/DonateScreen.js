// screens/DonateScreen.js
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const DonateScreen = () => {
  const openWebsite = () => {
    Linking.openURL('https://www.example.com').catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.supportText}>
        Your support helps us to continue our mission. Consider making a donation to help us keep bringing you the best content.
      </Text>
      <Text style={styles.linkText} onPress={openWebsite}>
        Visit our website <FontAwesome name="telegram" size={24} color="#004C6E" />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  supportText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color:'#004C6E',
  },
  linkText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    color:'#004C6E',
    paddingTop:30,
  },
});

export default DonateScreen;
