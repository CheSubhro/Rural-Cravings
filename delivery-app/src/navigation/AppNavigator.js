
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {

    const auth = useSelector(state => state.auth || {}); 
    const token = auth.token;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}