
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
    const dispatch = useDispatch();
    const { deliveryBoy } = useSelector(state => state.auth);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hello, {deliveryBoy?.fullName || 'Partner'}</Text>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Ionicons name="log-out-outline" size={28} color="#FF8C00" />
                </TouchableOpacity>
            </View>

            <View style={styles.statusCard}>
                <Text style={styles.statusTitle}>Today's Delivery</Text>
                <Text style={styles.statusCount}>0 Orders</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.infoText}>No active orders available right now.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f5f2', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    statusCard: { backgroundColor: '#fff', padding: 25, borderRadius: 15, alignItems: 'center', elevation: 3 },
    statusTitle: { fontSize: 16, color: '#666' },
    statusCount: { fontSize: 32, fontWeight: 'bold', color: '#FF8C00', marginTop: 10 },
    body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    infoText: { color: '#999', fontSize: 16 }
});