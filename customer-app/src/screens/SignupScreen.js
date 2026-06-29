
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRegisterCustomerMutation } from '../store/api/authApi';
import Toast from 'react-native-toast-message';

export default function SignupScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [secureEntry, setSecureEntry] = useState(true);

    const [registerCustomer, { isLoading }] = useRegisterCustomerMutation();

    const handleRegister = async () => {

        if (!name || !email || !username || !password || !phone) {
            alert('Please fill all fields');
            return;
        }
    
        const customerPayload = {
            name,
            email,
            username,
            password,
            phone
        };
    
        try {
            const response = await registerCustomer(customerPayload).unwrap();
            
            Toast.show({
                type: 'success',
                text1: 'Registration Successful!',
                text2: 'Welcome to Rural Cravings. Redirecting to login...',
                visibilityTime: 3000,
            });
            
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2500);
            
        } catch (error) {
            console.error('Registration Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Registration Failed ',
                text2: error?.data?.message || 'Something went wrong! Please check connection.',
                visibilityTime: 4000,
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>Rural Cravings</Text>
            <Text style={styles.welcomeText}>Create your customer account</Text>

        <TextInput
            style={styles.input}
            placeholder="Full Name "
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
        />

        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureEntry} 
            />
            <TouchableOpacity 
                style={styles.eyeButton} 
                onPress={() => setSecureEntry(!secureEntry)}
            >
                <Text style={styles.eyeText}>{secureEntry ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
            disabled={isLoading}
        >
            {isLoading ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Register</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
            disabled={isLoading}
        >
            <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 20,
      paddingVertical: 40,
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
    eyeButton: {
      padding: 5,
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