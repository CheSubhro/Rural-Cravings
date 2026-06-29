
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: product.image || 'https://via.placeholder.com/300' }} style={styles.productImage} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>৳ {product.price}</Text>

            <View style={styles.statusContainer}>
            <Text style={[styles.statusText, product.stock > 0 ? styles.inStock : styles.outOfStock]}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock ❌'}
            </Text>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description || 'No description available for this traditional food item.'}</Text>

            <TouchableOpacity 
            style={[styles.cartButton, product.stock === 0 && styles.disabledButton]}
            disabled={product.stock === 0}
            >
            <Text style={styles.cartButtonText}>
                {product.stock > 0 ? 'Add to Shopping Cart 🛒' : 'Cannot Order (Out of Stock)'}
            </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    imageContainer: { position: 'relative' },
    productImage: { width: '100%', height: 300, resizeMode: 'cover' },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    infoContainer: { padding: 20 },
    productName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    productPrice: { fontSize: 22, fontWeight: 'bold', color: '#f26c23', marginVertical: 10 },
    statusContainer: { marginBottom: 15 },
    statusText: { fontSize: 14, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5, alignSelf: 'flex-start' },
    inStock: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
    outOfStock: { backgroundColor: '#ffebee', color: '#c62828' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 10, marginBottom: 5 },
    description: { fontSize: 16, color: '#666', lineHeight: 24 },
    cartButton: { backgroundColor: '#f26c23', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
    disabledButton: { backgroundColor: '#ccc' },
    cartButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});