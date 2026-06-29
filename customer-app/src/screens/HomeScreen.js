
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { useGetCategoriesQuery, useGetFoodItemsQuery } from '../store/api/productApi';

export default function HomeScreen({ navigation }) {
    
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data: foodsData, isLoading: isFoodsLoading } = useGetFoodItemsQuery();

    const categories = categoriesData?.data || categoriesData || [];
    const foodItems = foodsData?.data?.foods || foodsData?.data || foodsData || [];
    if (isCategoriesLoading || isFoodsLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f26c23" />
            <Text style={styles.loadingText}>Loading Rural Flavors...</Text>
          </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.brandName}>Rural Cravings 🌾</Text>
                <TextInput style={styles.searchBar} placeholder="Search traditional foods..." />
            </View>

            <ScrollView contentContainerStyle={styles.feedContainer} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
                {categories.map((cat) => (
                    <TouchableOpacity key={cat._id} style={styles.categoryBadge}>
                    {/* ব্যাকএন্ডে ইমেজ থাকলে তা দেখাবে, না থাকলে ডেমো আইকন */}
                    <Text style={styles.categoryIcon}>🍲</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Our Traditional Products</Text>
                <View style={styles.grid}>
                {foodItems.map((item) => (
                    <View key={item._id} style={styles.productCard}>
                    {/* আপনার ব্যাকএন্ডের ইমেজ পাথ সাধারণত item.image বা item.image.url এ থাকে */}
                    <Image 
                        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                        style={styles.productImage} 
                    />
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.productPrice}>৳ {item.price}</Text>
                    
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    </View>
                ))}
                </View>

                {foodItems.length === 0 && (
                <Text style={styles.emptyText}>No traditional food items found right now!</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    loadingText: {
      marginTop: 10,
      color: '#666',
      fontSize: 16,
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
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 12,
      marginTop: 10,
    },
    categoriesRow: {
      marginBottom: 20,
      flexDirection: 'row',
    },
    categoryBadge: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      alignItems: 'center',
      flexDirection: 'row',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
    },
    categoryIcon: {
      marginRight: 6,
      fontSize: 14,
    },
    categoryName: {
      fontWeight: '600',
      color: '#555',
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
      shadowOpacity: 0.15,
    },
    productImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 10,
      backgroundColor: '#eee', 
    },
    productName: {
      fontSize: 15,
      fontWeight: '600',
      color: '#333',
    },
    productPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#f26c23',
      marginVertical: 4,
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
      fontSize: 13,
    },
    emptyText: {
      textAlign: 'center',
      color: '#999',
      marginTop: 40,
      fontSize: 15,
    }
  });