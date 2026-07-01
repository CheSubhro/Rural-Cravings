
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useGetActiveOrdersQuery } from '../store/api/authApi'; 

export default function DashboardScreen({ navigation }) {

    const dispatch = useDispatch();
    const { deliveryBoy } = useSelector(state => state.auth);
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, error, refetch } = useGetActiveOrdersQuery(null, {
        refetchOnMountOrArgChange: true, 
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const renderOrderItem = ({ item }) => {
        const isPending = item.status === 'Pending';
        const statusColor = isPending ? '#FF8C00' : '#28a745'; 
        const bgColor = isPending ? '#FFEFD5' : '#E0FFF0'; 
    
        return (
            <TouchableOpacity 
                style={styles.orderCard} 
                onPress={() => navigation.navigate('OrderDetails', { order: item })}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.restaurantText}>{item.items?.[0]?.foodItem?.name || 'Food Item'}</Text>
                    <Text style={styles.customerText}>Customer: {item.customer?.name || 'Guest'}</Text>
                </View>
                
                <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) return <ActivityIndicator style={{marginTop: 50}} size="large" color="#FF8C00" />;
    if (error) return <Text style={styles.infoText}>Error loading orders. Please try again.</Text>;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>
                    Hello, {deliveryBoy?.username || deliveryBoy?.name || 'Rider'}
                </Text>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Ionicons name="log-out-outline" size={28} color="#FF8C00" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data?.data || []} 
                keyExtractor={item => item._id}
                renderItem={renderOrderItem}
                ListEmptyComponent={<Text style={styles.infoText}>No active orders.</Text>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f5f2', paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 10 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
    restaurantText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    customerText: { fontSize: 14, color: '#666', marginTop: 4 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: 'bold' },
    infoText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});