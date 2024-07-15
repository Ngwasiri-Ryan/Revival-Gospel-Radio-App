// screens/DonateScreen.js
import React from 'react';
import { View, Text, StyleSheet, Linking , TouchableOpacity} from 'react-native';
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
      <TouchableOpacity style={styles.button}onPress={openWebsite}>
      <Text style={styles.linkText} >
        Donate <FontAwesome name="telegram" size={24} color="#fff" />
      </Text>
      </TouchableOpacity>
     
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
    color:'rgb(4,45,73)',
  },
  linkText: {
    fontSize: 18,
    color: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    color:'white',
  },
  button:{
    backgroundColor: 'rgb(4,45,73)',
    padding:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginTop:20,
  },
});

export default DonateScreen;
