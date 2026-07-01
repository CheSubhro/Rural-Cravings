
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ActivityIndicator,  
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setDeliveryBoy } from '../store/slices/authSlice'; 
import { useLoginDeliveryMutation } from '../store/api/authApi'; 
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    
    const [loginDelivery, { isLoading, error }] = useLoginDeliveryMutation();

    const handleLogin = async () => {
        if (!username || !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter both username and password.'
            });
            return;
        }
    
        try {
            const credentials = { username, password };
            const response = await loginDelivery(credentials).unwrap();
    
            const { user, accessToken } = response.data;
    
            if (user.role === 'Delivery') {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Logged in successfully!'
                });
                
                setTimeout(() => {
                    dispatch(setDeliveryBoy({ token: accessToken, user: user }));
                }, 1000);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Access Denied',
                    text2: 'You are not authorized as a delivery staff.'
                });
            }
        } catch (err) {
            const errMsg = err.data?.message || "Invalid credentials.";
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: errMsg
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="bicycle" size={60} color="#FF8C00" />
                <Text style={styles.title}>Delivery Partner</Text>
                <Text style={styles.subtitle}>Login to start delivering orders</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Username Input */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Rural Cravings Delivery Portal</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f5f2', 
        justifyContent: 'center',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        height: 55,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 5,
    },
    loginButton: {
        backgroundColor: '#FF8C00', 
        borderRadius: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 3, 
    },
    buttonDisabled: {
        backgroundColor: '#ffbf80',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    footerText: {
        color: '#aaa',
        fontSize: 12,
    },
});