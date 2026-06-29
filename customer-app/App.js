
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'; 
import { store } from './src/store/store';
import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
	return (
	  <Tab.Navigator
		screenOptions={{
		  headerShown: false,
		  tabBarActiveTintColor: '#f26c23', 
		  tabBarInactiveTintColor: '#888', 
		  tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8 },
		  tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
		}}
	  >
		<Tab.Screen 
		  name="HomeTab" 
		  component={HomeScreen} 
		  options={{ 
			tabBarLabel: 'Home',
			tabBarIcon: () => <Text style={{ fontSize: 20 }}>🌾</Text> 
		  }} 
		/>
		<Tab.Screen 
		  name="CartTab" 
		  component={CartScreen} 
		  options={{ 
			tabBarLabel: 'Cart',
			tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛒</Text> 
		  }} 
		/>
		<Tab.Screen 
		  name="ProfileTab" 
		  component={ProfileScreen} 
		  options={{ 
			tabBarLabel: 'Profile',
			tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text> 
		  }} 
		/>
	  </Tab.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar barStyle="light-content" backgroundColor="#f26c23" />
				
				<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				{/* হোম স্ক্রিনের জায়গায় মেইন ট্যাব বারটি রেজিস্টার করলাম */}
				<Stack.Screen name="Home" component={MainTabs} /> 
				</Stack.Navigator>
			</NavigationContainer>
			<Toast />
    	</Provider>
	);
}