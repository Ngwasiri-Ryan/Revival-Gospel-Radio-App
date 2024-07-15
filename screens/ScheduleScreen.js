// screens/ScheduleScreen.js
// screens/ScheduleScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import scheduleData from '../data/schedule';

const ScheduleScreen = ({ selectedDay }) => {
  const schedule = scheduleData[selectedDay] || [];

  return (
    <View style={styles.container}>
    
      <ScrollView style={styles.scheduleContainer}>
        {schedule.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.program}>{item.program}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  scheduleContainer: {
    flex: 1,
    padding: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    gap:30,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    
  },
  time: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgb(4,45,73)',
  },
  program: {
    fontSize: 13,
  },
});

export default ScheduleScreen;
