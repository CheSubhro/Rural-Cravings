
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { useGetMyOrdersQuery } from '../store/api/productApi';

export default function ProfileScreen() {

    const { data: ordersData, isLoading, error, refetch } = useGetMyOrdersQuery();
    const orders = ordersData?.data || ordersData || [];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
        case 'pending': return { bg: '#fff3e0', text: '#ef6c00' };
        case 'preparing': return { bg: '#e8f5e9', text: '#2e7d32' };
        case 'delivered': return { bg: '#e3f2fd', text: '#1565c0' };
        default: return { bg: '#f5f5f5', text: '#333' };
        }
    };

    if (isLoading) {
        return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#f26c23" />
            <Text style={styles.loadingText}>Loading your food history...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <View style={styles.profileHeaderCard}>
            <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.userName}>Welcome Back! ✨</Text>
            <Text style={styles.userSubText}>Taste the authentic rural flavors</Text>
        </View>

        <Text style={styles.sectionTitle}>My Past Orders ({orders.length})</Text>

        {orders.length === 0 ? (
            <View style={styles.emptyOrdersContainer}>
            <Text style={{ fontSize: 40 }}>📦</Text>
            <Text style={styles.emptyText}>No orders placed yet!</Text>
            </View>
        ) : (
            <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            refreshing={isLoading}
            onRefresh={refetch} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => {
                const statusStyle = getStatusColor(item.status);
                const orderDate = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent';

                return (
                <View style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                    <View>
                        <Text style={styles.orderIdText}>Order #{item._id?.slice(-6).toUpperCase()}</Text>
                        <Text style={styles.orderDateText}>{orderDate}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                        {item.status || 'Pending'}
                        </Text>
                    </View>
                    </View>

                    <View style={styles.itemsSummary}>
                    {item.orderItems?.map((food, index) => (
                        <Text key={index} style={styles.foodItemRow} numberOfLines={1}>
                        • {food.name || 'Food Item'} x {food.quantity || 1}
                        </Text>
                    ))}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.orderFooter}>
                    <Text style={styles.totalLabel}>Total Paid:</Text>
                    <Text style={styles.totalPrice}>৳ {item.totalPrice || item.finalBill}</Text>
                    </View>
                </View>
                );
            }}
            />
        )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 15 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 10, color: '#666', fontSize: 14 },
  profileHeaderCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 50, alignItems: 'center', elevation: 1, borderWidth: 1, borderColor: '#eee' },
  avatarCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { fontSize: 30 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userSubText: { fontSize: 12, color: '#777', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 25, marginBottom: 12 },
  emptyOrdersContainer: { flex: 0.6, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 14, color: '#888', marginTop: 10 },
  orderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, elevation: 1, borderWidth: 1, borderColor: '#eee' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderIdText: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  orderDateText: { fontSize: 12, color: '#999', marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  itemsSummary: { marginVertical: 12 },
  foodItemRow: { fontSize: 13, color: '#555', marginVertical: 2 },
  divider: { height: 1, backgroundColor: '#eee', my: 10 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  totalLabel: { fontSize: 14, color: '#666' },
  totalPrice: { fontSize: 16, fontWeight: 'bold', color: '#f26c23' }
});