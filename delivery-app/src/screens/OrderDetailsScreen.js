
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Linking,ScrollView } from 'react-native';
import { useUpdateDeliveryStatusMutation } from '../store/api/authApi'; 
import Toast from 'react-native-toast-message';

export default function OrderDetailsScreen({ route, navigation }) {

    const { order } = route.params; 
    const [updateStatus] = useUpdateDeliveryStatusMutation();

    const fullAddress = `${order.deliveryAddress?.street || ''}, ${order.deliveryAddress?.city || ''}, ${order.deliveryAddress?.state || ''}`;
    
    const handleUpdate = async (newStatus) => {
        try {
            await updateStatus({ orderId: order._id, status: newStatus }).unwrap();
            
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Order is now: ${newStatus}`
            });
            
            navigation.goBack(); 
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Update failed. Please try again.'
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Order #{order._id.slice(-6)}</Text>
                
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Customer: {order.customer?.name || 'Guest'}</Text>
                    <Text style={styles.infoText}>Amount: ₹{order.totalAmount}</Text> 
                    <Text style={styles.infoText}>Address: {fullAddress}</Text>
                    <Text style={styles.infoText}>Phone: {order.deliveryAddress?.phone}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: '#007BFF' }]} 
                        onPress={() => Linking.openURL(`tel:${order.deliveryAddress.phone}`)}
                    >
                        <Text style={styles.btnText}>Call Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => handleUpdate('On The Way')}>
                        <Text style={styles.btnText}>Mark as On The Way</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#28a745'}]} onPress={() => handleUpdate('Delivered')}>
                        <Text style={styles.btnText}>Mark as Delivered</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, backgroundColor: '#fff' }, 
    container: { padding: 20, paddingTop: 50 }, 
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, color: '#333' },
    infoBox: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 20 },
    infoText: { fontSize: 16, marginBottom: 8, color: '#444' },
    btn: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, marginVertical: 8 },
    btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    buttonContainer: { marginTop: 10 }
});