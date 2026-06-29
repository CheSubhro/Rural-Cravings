
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';

export default function HomeScreen({ navigation }) {
    const demoProducts = [
        { id: '1', name: 'Premium Ghee', price: '1200', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Organic Honey', price: '850', image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Pure Mustard Oil', price: '320', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <View style={styles.container}>
        {/* হেডার সেকশন */}
        <View style={styles.header}>
            <Text style={styles.brandName}>Rural Cravings 🌾</Text>
            <TextInput style={styles.searchBar} placeholder="Search traditional foods..." />
        </View>

        <ScrollView contentContainerStyle={styles.feedContainer}>
            <Text style={styles.sectionTitle}>Our Traditional Products</Text>
            
            {/* প্রোডাক্ট গ্রিড/লিস্ট */}
            <View style={styles.grid}>
            {demoProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>৳ {product.price}</Text>
                
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                </View>
            ))}
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#f26c23',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    brandName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    feedContainer: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#f26c23',
        marginVertical: 5,
    },
    addToCartButton: {
        backgroundColor: '#f26c23',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});