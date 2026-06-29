
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Profile 👤</Text>
            <Text style={styles.subText}>Manage your account and orders here.</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    subText: { color: '#666', marginTop: 5 }
});