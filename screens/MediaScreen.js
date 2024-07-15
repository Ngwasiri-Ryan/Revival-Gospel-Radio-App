// screens/MediaScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MediaScreen = () => {
  const socialMediaLinks = [
    { name: 'FACEBOOK', icon: 'facebook', url: 'https://www.facebook.com' },
    { name: 'TWITTER', icon: 'twitter', url: 'https://www.twitter.com' },
    { name: 'INSTAGRAM', icon: 'instagram', url: 'https://www.instagram.com' },
  ];

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      {socialMediaLinks.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.box}
          onPress={() => openLink(item.url)}
        >
          <View style={styles.row}>
            <FontAwesome name={item.icon} size={24} color="#004C6E" />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    padding: 40,
    marginVertical: 10,
    backgroundColor: 'rgb(222,230,233)',
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight:'bold',
    color:'#004C6E',
  },
});

export default MediaScreen;
