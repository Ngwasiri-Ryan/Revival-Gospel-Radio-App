import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

{/**imports of onboarding screens */}
import FirstOnboardingScreen from '../BoardingScreens/FirstOnboardingScreen'
import SecondOnboardingScreen from '../BoardingScreens/SecondOnboardingScreen'


{/**actual imports of screens */}
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RadioScreen from "../screens/RadioScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{/**boarding screens */}
				<Stack.Screen name= "FirstScreen" component={FirstOnboardingScreen} />
				<Stack.Screen name="SecondBoarding" component={SecondOnboardingScreen} />
				{/**actual screens */}
				<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="RadioScreen" component={RadioScreen} />
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

const styles = StyleSheet.create({});
