
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; 
import { store } from './src/store/store';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar barStyle="dark-content" backgroundColor="#fff" />
				
				<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}