
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function AppNavigator() {
    const { token } = useSelector(state => state.auth);

    return (
        <Stack.Navigator>
            {token ? (
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}