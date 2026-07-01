
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
    const dispatch = useDispatch();
    const { deliveryBoy } = useSelector(state => state.auth);
    const insets = useSafeAreaInsets();

    // ডামি ডেটা - পরবর্তীতে আমরা API থেকে এটি পাব
    const orders = [
        { id: '1', restaurant: 'Rural Cravings HQ', customer: 'Subhro Das', status: 'Pending' },
        { id: '2', restaurant: 'Cloud Kitchen A', customer: 'John Doe', status: 'In Progress' },
    ];

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <View>
                <Text style={styles.restaurantText}>{item.restaurant}</Text>
                <Text style={styles.customerText}>Customer: {item.customer}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Pending' ? '#FFEFD5' : '#E0FFF0' }]}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hello, {deliveryBoy?.fullName || 'Partner'}</Text>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Ionicons name="log-out-outline" size={28} color="#FF8C00" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Active Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f5f2', paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    listContainer: { paddingBottom: 20 },
    orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    restaurantText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    customerText: { fontSize: 14, color: '#666', marginTop: 4 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: 'bold', color: '#333' }
});