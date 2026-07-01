
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUpdateDeliveryStatusMutation } from '../store/api/authApi'; 

export default function OrderDetailsScreen({ route, navigation }) {

    const { order } = route.params; 
    const [updateStatus] = useUpdateDeliveryStatusMutation();

    const fullAddress = `${order.deliveryAddress?.street || ''}, ${order.deliveryAddress?.city || ''}, ${order.deliveryAddress?.state || ''}`;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order #{order._id.slice(-6)}</Text>
            
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Customer: {order.customer?.name || 'Guest'}</Text>
                <Text style={styles.infoText}>Amount: ₹{order.totalAmount}</Text> 
                <Text style={styles.infoText}>Address: {fullAddress}</Text>
                <Text style={styles.infoText}>Phone: {order.deliveryAddress?.phone}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => handleUpdate('On The Way')}>
                    <Text style={styles.btnText}>Mark as On The Way</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#28a745'}]} onPress={() => handleUpdate('Delivered')}>
                    <Text style={styles.btnText}>Mark as Delivered</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    infoBox: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 20 },
    infoText: { fontSize: 16, marginBottom: 8, color: '#444' },
    btn: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, marginVertical: 5 },
    btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    buttonContainer: { marginTop: 10 }
});