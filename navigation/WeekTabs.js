// navigation/WeekTabs.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from 'react-native';
import ScheduleScreen from '../screens/ScheduleScreen';

const Tab = createMaterialTopTabNavigator();

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const WeekTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Revival Gospel Radio FM105.5</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 10 },
          tabBarActiveTintColor: '#FFD700', // Color of the active tab label
          tabBarInactiveTintColor: 'gray', // Color of the inactive tab labels
          tabBarIndicatorStyle: { backgroundColor: '#FFD700' }, // Color of the tab indicator
        }}
      >
        {days.map((day) => (
          <Tab.Screen
            key={day}
            name={day}
            children={() => <ScheduleScreen selectedDay={day} />}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default WeekTabs;
