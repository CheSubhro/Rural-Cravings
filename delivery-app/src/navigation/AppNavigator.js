
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';

const DashboardScreen = require('../screens/DashboardScreen').default;

const Stack = createStackNavigator();

export default function AppNavigator() {
    const auth = useSelector(state => state.auth || {}); 
    const token = auth.token;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            )}
        </Stack.Navigator>
    );
}