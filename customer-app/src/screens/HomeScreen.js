
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { useGetCategoriesQuery, useGetFoodItemsQuery } from '../store/api/productApi';

export default function HomeScreen({ navigation }) {
    
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data: foodsData, isLoading: isFoodsLoading } = useGetFoodItemsQuery();
    const { data: couponsData, isLoading: isCouponsLoading } = useGetCouponsQuery();
    

    const categories = categoriesData?.data || categoriesData || [];
    const foodItems = foodsData?.data?.foods || foodsData?.data || foodsData || [];
    const coupons = couponsData?.data || couponsData || [];

    const handleCategoryPress = (categoryId) => {
        if (selectedCategory === categoryId) {
          setSelectedCategory(null); 
        } else {
          setSelectedCategory(categoryId); 
        }
    };

    const filteredFoodItems = selectedCategory
        ? foodItems.filter(item => {
            if (typeof item.category === 'string') {
            return item.category === selectedCategory;
            }
            if (item.category && typeof item.category === 'object') {
            return item.category._id === selectedCategory;
            }
            return false;
        })
        : foodItems;

    if (isCategoriesLoading || isFoodsLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f26c23" />
            <Text style={styles.loadingText}>Loading Rural Flavors...</Text>
          </View>
        );
    }

    const activeCoupons = coupons
        .filter(coupon => {
        if (!coupon.isActive) return false;
        const expiry = new Date(coupon.expiryDate);
        const today = new Date();
        return expiry >= today;   
    })
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.brandName}>Rural Cravings 🌾</Text>
                <TextInput style={styles.searchBar} placeholder="Search traditional foods..." />
            </View>

            {activeCoupons.length > 0 && (
                <View style={styles.couponSection}>
                    <Text style={styles.sectionTitle}>🔥 Best Offers For You</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.couponRow}>
                    {activeCoupons.map((coupon) => (
                        <View key={coupon._id || coupon.code} style={styles.couponCard}>
                        <View style={styles.couponLeft}>
                            <Text style={styles.couponDiscountText}>{coupon.discountPercentage}%</Text>
                            <Text style={styles.couponOFFText}>OFF</Text>
                        </View>
                        
                        <View style={styles.couponRight}>
                            <Text style={styles.couponTitle} numberOfLines={1}>Use Code: {coupon.code}</Text>
                            <Text style={styles.couponSub}>Min Order: ৳{coupon.minOrderAmount}</Text>
                            <Text style={styles.couponExpiry}>
                            Valid till: {new Date(coupon.expiryDate).toLocaleDateString('en-GB')}
                            </Text>
                        </View>
                        </View>
                    ))}
                    </ScrollView>
                </View>
            )}

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.feedContainer} 
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.categoriesRow}
                contentContainerStyle={styles.categoriesContent}
                >
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat._id;
                    return (
                    <TouchableOpacity 
                        key={cat._id} 
                        style={[styles.categoryBadge, isSelected && styles.selectedCategoryBadge]} 
                        onPress={() => handleCategoryPress(cat._id)}
                    >
                        <Image 
                        source={{ uri: cat.image || 'https://via.placeholder.com/50' }} 
                        style={styles.categoryImage} 
                        />
                        <Text style={[styles.categoryName, isSelected && styles.selectedCategoryName]}>
                        {cat.name}
                        </Text>
                    </TouchableOpacity>
                    );
                })}
                </ScrollView>

                <Text style={styles.sectionTitle}>
                {selectedCategory ? 'Filtered Products' : 'Our Traditional Products'}
                </Text>
                
                <View style={styles.grid}>
                {filteredFoodItems.map((item) => (
                    <TouchableOpacity 
                        key={item._id} 
                        style={styles.productCard}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })} 
                    >
                        <Image 
                        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
                        style={styles.productImage} 
                        />
                        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.productPrice}>₹ {item.price}</Text>
                        
                        <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                </View>

                {filteredFoodItems.length === 0 && (
                <Text style={styles.emptyText}>No items available in this category! 🍲</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    scrollView: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    loadingText: { marginTop: 10, color: '#666', fontSize: 16 },
    header: {
      backgroundColor: '#f26c23',
      paddingTop: 50,
      paddingHorizontal: 15,
      paddingBottom: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    categoriesContent: { paddingRight: 15},
    brandName: { fontSize: 24, fontWeight: 'bold', color: '#fff',marginBottom: 10 },
    searchBar: { backgroundColor: '#fff', height: 40, borderRadius: 8, paddingHorizontal: 15, fontSize: 16 },
    feedContainer: { paddingHorizontal: 15,paddingBottom: 30},
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12, marginTop: 10 },
    categoriesRow: { marginBottom: 20, flexDirection: 'row' },
    categoryBadge: {
      backgroundColor: '#fff',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 25,
      marginRight: 10,
      alignItems: 'center',
      flexDirection: 'row',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
    },
    selectedCategoryBadge: {
      backgroundColor: '#f26c23',
    },
    categoryImage: { width: 30, height: 30, borderRadius: 15, marginRight: 8, backgroundColor: '#eee' },
    categoryName: { fontWeight: '600', color: '#444', fontSize: 14 },
    selectedCategoryName: { color: '#fff' }, 
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',width: '100%' },
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
    productImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 10, backgroundColor: '#eee' },
    productName: { fontSize: 15, fontStyle: 'normal', fontWeight: '600', color: '#333' },
    productPrice: { fontSize: 14, fontWeight: 'bold', color: '#f26c23', marginVertical: 4 },
    addToCartButton: { backgroundColor: '#f26c23', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginTop: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 15, fontWeight: '500' },
    couponSection: {
        marginTop: 10,
        marginBottom: 10,
    },
    couponRow: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    couponCard: {
        backgroundColor: '#fff',
        width: 280,
        height: 90,
        borderRadius: 12,
        marginRight: 15,
        flexDirection: 'row',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ffe0b2',
        borderStyle: 'dashed', 
    },
    couponLeft: {
        backgroundColor: '#f26c23', 
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    couponDiscountText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    couponOFFText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    couponRight: {
        width: '70%',
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    couponTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    couponSub: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    couponExpiry: {
        fontSize: 11,
        color: '#e65100',
        fontWeight: '600',
        marginTop: 2,
    },
});