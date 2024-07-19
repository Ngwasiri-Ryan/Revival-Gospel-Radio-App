// screens/ConnectScreen.js
import React from 'react';
import { View, Text, StyleSheet , SafeAreaView, StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MediaScreen from '../screens/MediaScreen';
import ContactScreen from '../screens/ContactScreen';
import DonateScreen from './DonateScreen';

const Tab = createMaterialTopTabNavigator();

const ConnectScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Revival Gospel Radio FM105.5</Text>
    </View>
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: 'rgb(233, 136, 14)', // Color of the active tab label
          tabBarInactiveTintColor: 'gray', // Color of the inactive tab labels
          tabBarIndicatorStyle: { backgroundColor: 'rgb(233, 136, 14)' }, // Color of the tab indicator
        }}
      >
        <Tab.Screen name="Contact" component={ContactScreen} />
        {/**
         <Tab.Screen name="Media" component={MediaScreen} />
         */}
        <Tab.Screen name="Donate" component={DonateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  headerContainer: {
    backgroundColor: 'rgb(4,45,73)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ConnectScreen;
