
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, updateQuantity, clearCart,
  selectCartItems, selectCartTotal, selectDiscountAmount, selectDeliveryFee, selectFinalBill, selectAppliedCoupon
} from '../store/slices/cartSlice';
import Toast from 'react-native-toast-message';

export default function CartScreen() {

    const dispatch = useDispatch();
    
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const discountAmount = useSelector(selectDiscountAmount);
    const deliveryFee = useSelector(selectDeliveryFee);
    const finalBill = useSelector(selectFinalBill);
    const appliedCoupon = useSelector(selectAppliedCoupon);

    const handleQuantityChange = (id, currentQty, type, stock) => {
        if (type === 'decrease' && currentQty > 1) {
            dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
        } else if (type === 'increase') {
            const maxStock = stock ?? 10;
        if (currentQty < maxStock) {
            dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
        } else {
            Toast.show({ type: 'info', text1: 'Out of Stock Limit' });
        }
        }
    };

    if (cartItems.length === 0) {
        return (
        <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 60 }}>🛒</Text>
            <Text style={styles.emptyText}>Your Basket is Empty</Text>
            <Text style={styles.emptySubText}>Add some delicious rural treats from home!</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shopping Basket ({cartItems.length})</Text>
                <TouchableOpacity onPress={() => dispatch(clearCart())}>
                <Text style={styles.clearCartText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
                {cartItems.map((item) => {
                const activePrice = item.discountPrice > 0 && item.price > item.discountPrice ? item.discountPrice : item.price;
                return (
                    <View key={item._id} style={styles.itemCard}>
                    <Image source={{ uri: item.image || 'https://via.placeholder.com/100' }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.itemPrice}>₹ {activePrice}</Text>
                        
                        <View style={styles.quantityRow}>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(item._id, item.quantity, 'decrease')}>
                            <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQuantityChange(item._id, item.quantity, 'increase', item.stock)}>
                            <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.removeBtn} onPress={() => dispatch(removeFromCart(item._id))}>
                        <Text style={styles.removeBtnText}>✕</Text>
                    </TouchableOpacity>
                    </View>
                );
                })}

                <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Bill Details</Text>
                <View style={styles.summaryLine}>
                    <Text style={styles.summaryLabel}>Item Total</Text>
                    <Text style={styles.summaryVal}>₹ {cartTotal}</Text>
                </View>
                
                {discountAmount > 0 && (
                    <View style={styles.summaryLine}>
                    <Text style={[styles.summaryLabel, { color: '#2e7d32' }]}>Coupon Discount ({appliedCoupon?.code})</Text>
                    <Text style={[styles.summaryVal, { color: '#2e7d32' }]}>- ₹ {discountAmount}</Text>
                    </View>
                )}

                <View style={styles.summaryLine}>
                    <Text style={styles.summaryLabel}>Delivery Fee</Text>
                    <Text style={styles.summaryVal}>{deliveryFee === 0 ? 'FREE' : `₹ ${deliveryFee}`}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.summaryLine}>
                    <Text style={styles.finalLabel}>To Pay</Text>
                    <Text style={styles.finalVal}>₹ {finalBill}</Text>
                </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { paddingTop: 50, paddingHorizontal: 15, paddingBottom: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  clearCartText: { color: '#c62828', fontWeight: 'bold' },
  scrollBody: { padding: 15 },
  itemCard: { backgroundColor: '#fff', padding: 10, borderRadius: 12, flexDirection: 'row', marginBottom: 10, elevation: 1, position: 'relative' },
  itemImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#eee' },
  itemDetails: { marginLeft: 12, flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 14, color: '#f26c23', fontWeight: '600', marginVertical: 3 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  qtyBtn: { backgroundColor: '#eee', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  qtyText: { marginHorizontal: 12, fontSize: 15, fontWeight: 'bold' },
  removeBtn: { position: 'absolute', top: 10, right: 10, padding: 5 },
  removeBtnText: { color: '#999', fontSize: 16 },
  summaryCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginTop: 15, marginBottom: 100, elevation: 1 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  summaryLabel: { color: '#666', fontSize: 14 },
  summaryVal: { color: '#333', fontWeight: '600', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  finalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  finalVal: { fontSize: 18, fontWeight: 'bold', color: '#f26c23' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 15, borderTopWidth: 1, borderColor: '#eee' },
  checkoutBtn: { backgroundColor: '#f26c23', padding: 15, borderRadius: 10, alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 15 },
  emptySubText: { color: '#777', textAlign: 'center', marginTop: 5 }
});