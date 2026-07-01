
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useGetActiveOrdersQuery } from '../store/api/authApi'; 

export default function DashboardScreen(navigation) {

    const dispatch = useDispatch();
    const { deliveryBoy } = useSelector(state => state.auth);
    const insets = useSafeAreaInsets();

    const { data, isLoading, error } = useGetActiveOrdersQuery();

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.orderCard} 
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.restaurantText}>
                    {item.items?.[0]?.foodItem?.name || 'Food Item'}
                </Text>
                <Text style={styles.customerText}>
                    Customer: {item.customer?.name || 'Guest User'}
                </Text>
            </View>
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) return <ActivityIndicator style={{marginTop: 50}} size="large" color="#FF8C00" />;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hello, {deliveryBoy?.fullName}</Text>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Ionicons name="log-out-outline" size={28} color="#FF8C00" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data?.data || []} 
                keyExtractor={item => item._id}
                renderItem={renderOrderItem}
                ListEmptyComponent={<Text style={styles.infoText}>No active orders.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f5f2', paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 10 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    restaurantText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    customerText: { fontSize: 14, color: '#666', marginTop: 4 },
    statusBadge: { backgroundColor: '#FFEFD5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: 'bold', color: '#FF8C00' },
    infoText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});