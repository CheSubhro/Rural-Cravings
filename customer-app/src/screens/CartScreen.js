
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your Shopping Cart 🛒</Text>
            <Text style={styles.subText}>Items you add will appear here.</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    subText: { color: '#666', marginTop: 5 }
});