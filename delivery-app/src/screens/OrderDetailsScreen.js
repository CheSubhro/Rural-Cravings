
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUpdateDeliveryStatusMutation } from '../store/api/authApi'; 

export default function OrderDetailsScreen({ route }) {

    const { order } = route.params; 
    const [updateStatus] = useUpdateDeliveryStatusMutation();

    const handleUpdate = async (newStatus) => {
        try {
            await updateStatus({ orderId: order._id, status: newStatus }).unwrap();
            Alert.alert("Success", `Order status updated to ${newStatus}`);
        } catch (err) {
            Alert.alert("Error", "Failed to update status");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            <Text>Customer: {order.customer?.name || 'Guest'}</Text>
            <Text>Total: {order.totalAmount} BDT</Text>
            <Text>Address: {order.deliveryAddress?.address}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => handleUpdate('Picked')}>
                    <Text style={styles.btnText}>Mark as Picked</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#28a745'}]} onPress={() => handleUpdate('Delivered')}>
                    <Text style={styles.btnText}>Mark as Delivered</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    btn: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, marginVertical: 5 },
    btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    buttonContainer: { marginTop: 30 }
});