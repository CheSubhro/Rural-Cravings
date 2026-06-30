
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  clearCart, updateDeliveryCity,
  selectCartItems, selectFinalBill, selectDeliveryCity
} from '../store/slices/cartSlice';
import { usePlaceOrderMutation } from '../store/api/productApi';
import Toast from 'react-native-toast-message';

export default function CheckoutScreen({ navigation }) {
    
    const dispatch = useDispatch();
    const [placeOrder, { isLoading }] = usePlaceOrderMutation();

    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const cartItems = useSelector(selectCartItems);
    const finalBill = useSelector(selectFinalBill);
    const currentCity = useSelector(selectDeliveryCity); 

    const handlePlaceOrder = async () => {
        if (!street.trim() || !phone.trim() || !zipCode.trim()) {
        Toast.show({ type: 'error', text1: 'Required Fields', text2: 'Please fill up all address fields.' });
        return;
        }

        const orderPayload = {
        items: cartItems.map(item => ({
            foodItem: item._id,
            quantity: item.quantity,
            priceAtPurchase: item.discountPrice > 0 ? item.discountPrice : item.price
        })),
        totalAmount: finalBill,
        deliveryAddress: {
            street: street,
            city: currentCity === 'kolkata' ? 'Kolkata' : 'Outside Kolkata',
            state: 'West Bengal',
            zipCode: zipCode,
            phone: phone,
            alternatePhone: ""
        },
        paymentDetails: {
            method: "COD",
            status: "Pending",
            transactionId: ""
        }
        };

        try {
            await placeOrder(orderPayload).unwrap();
            Toast.show({ type: 'success', text1: 'Order Placed!', text2: 'Traditional food is on the way.' });
            dispatch(clearCart()); 
            navigation.navigate('Home');
        } catch (error) {
            console.log("Full Error Debug:", error); // VS Code টার্মিনাল বা লগ-এ দেখতে পাবেন
    
            const errMsg = error.data?.message || error.message || 'Failed to connect.';
            Toast.show({ 
                type: 'error', 
                text1: 'Order Failed!', 
                text2: typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg 
            });
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Delivery Details 📍</Text>

        <Text style={styles.label}>Select Delivery Location:</Text>
        <View style={styles.cityRow}>
            <TouchableOpacity 
            style={[styles.cityBtn, currentCity === 'kolkata' && styles.activeCityBtn]} 
            onPress={() => dispatch(updateDeliveryCity('kolkata'))}
            >
            <Text style={[styles.cityBtnText, currentCity === 'kolkata' && styles.activeCityText]}>Inside Kolkata (₹70)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={[styles.cityBtn, currentCity !== 'kolkata' && styles.activeCityBtn]} 
            onPress={() => dispatch(updateDeliveryCity('outside'))}
            >
            <Text style={[styles.cityBtnText, currentCity !== 'kolkata' && styles.activeCityText]}>Outside Kolkata (₹130)</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput style={styles.input} placeholder="" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Street Address:</Text>
        <TextInput style={styles.input} placeholder="" value={street} onChangeText={setStreet} />

        <Text style={styles.label}>Zip Code:</Text>
        <TextInput style={styles.input} placeholder="" keyboardType="number-pad" value={zipCode} onChangeText={setZipCode} />

        <View style={styles.summaryCard}>
            <Text style={styles.boldText}>Grand Total (with delivery):</Text>
            <Text style={styles.finalPrice}>₹ {finalBill}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} disabled={isLoading}>
            <Text style={styles.placeOrderBtnText}>{isLoading ? 'Processing...' : 'Confirm & Place Order 🛒'}</Text>
        </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 15, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginTop: 15, marginBottom: 6 },
  cityRow: { flexDirection: 'row', gap: 10 },
  cityBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  activeCityBtn: { backgroundColor: '#f26c23', borderColor: '#f26c23' },
  cityBtnText: { color: '#666', fontWeight: 'bold', fontSize: 13 },
  activeCityText: { color: '#fff' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 14, color: '#333', marginBottom: 5 },
  summaryCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  boldText: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  finalPrice: { fontWeight: 'bold', fontSize: 20, color: '#f26c23' },
  placeOrderBtn: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 25 },
  placeOrderBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});