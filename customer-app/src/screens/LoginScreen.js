
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useLoginCustomerMutation } from '../store/api/authApi';

export default function LoginScreen({ navigation }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);

    const [loginCustomer, { isLoading }] = useLoginCustomerMutation();

    const handleLogin = async () => {
        if (!username || !password) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error ⚠️',
                text2: 'Please enter both username and password',
            });
            return;
        }

        const loginPayload = { username, password };

        try {
            const response = await loginCustomer(loginPayload).unwrap();
            
            Toast.show({
                type: 'success',
                text1: 'Login Successful!',
                text2: `Welcome back, ${response?.data?.customer?.name || username}!`,
            });

            console.log('Login Response:', response);

            setTimeout(() => {
                // navigation.navigate('Home'); // হোম পেজ বানালে এটি আনকমেন্ট করব
            }, 2000);

        } catch (error) {
            console.error('Login Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Login Failed ❌',
                text2: error?.data?.message || 'Invalid credentials or Server down!',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Rural Cravings</Text>
            <Text style={styles.welcomeText}>Login to your account</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureEntry}
                />
                <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                    <Text style={styles.eyeText}>{secureEntry ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => navigation.navigate('Signup')}
                disabled={isLoading}
            >
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f26c23',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
    },
    eyeText: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#f26c23',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#f26c23',
        fontSize: 15,
        fontWeight: '600',
    },
});