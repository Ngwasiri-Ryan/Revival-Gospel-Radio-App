import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

// Actual imports of screens
import WelcomeScreen from "../screens/WelcomeScreen";
import RadioScreen from "../screens/RadioScreen";
import DiscoverScreen from "../screens/DiscoverScreen"; // Create and import this screen
import FavoritesScreen from "../screens/FavoritesScreen"; // Create and import this screen

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Discover') {
            iconName = 'search';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Ensure headers are hidden for each screen
      })}
      tabBarOptions={{
        activeTintColor: 'rgb(0,76,110)',
        inactiveTintColor: 'gray',
      }}
      
    >
      <Tab.Screen name="Home" component={RadioScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Actual screens */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
