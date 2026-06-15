
import React, { useState, useEffect } from 'react';
import { Textarea, NumberInput, Checkbox, Stack, FileInput, Group } from '@mantine/core';

// 👈 আপনার কাস্টম কম্পোনেন্টগুলো ইম্পোর্ট করা হলো
import { Input, CustomSelect, Button } from '../../components/common'; // পাথ প্রোজেক্ট অনুযায়ী মিলিয়ে নেবেন

const FoodItemForm = ({ onSubmit, isLoading, categories = [], initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        category: '',
        stock: 10,
        isAvailable: true
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                discountPrice: initialData.discountPrice || '',
                category: initialData.category?._id || initialData.category || '',
                stock: initialData.stock !== undefined ? initialData.stock : 10,
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true
            });
            setImageFile(null); 
        } else {
            setFormData({ name: '', description: '', price: '', discountPrice: '', category: '', stock: 10, isAvailable: true });
            setImageFile(null);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('discountPrice', formData.discountPrice || 0);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('isAvailable', formData.isAvailable);
        
        if (imageFile) {
            data.append('image', imageFile); 
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="sm">
                {/* 📝 ১. ম্যান্টিনের TextInput বদলে আপনার কাস্টম <Input> */}
                <Input
                    label="Food Item Name"
                    placeholder="e.g., Shorshe Ilish, Nolen Gurer Sandesh"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Textarea
                    label="Description"
                    placeholder="Describe the authentic rural taste..."
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                {/* 📂 ২. ম্যান্টিনের Select বদলে আপনার কাস্টম <CustomSelect> */}
                {/* দ্রষ্টব্য: আপনার কাস্টম সিলেক্ট 'options' এবং 'onValueChange' প্রপস নেয় */}
                <CustomSelect
                    label="Assign Category"
                    placeholder="Select food category"
                    options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value || '' })}
                />

                <Group grow gap="sm" style={{ display: 'flex' }}>
                    <NumberInput
                        label="Regular Price (₹)"
                        placeholder="250"
                        required
                        min={0}
                        value={formData.price}
                        onChange={(value) => setFormData({ ...formData, price: value })}
                    />
                    <NumberInput
                        label="Discount Price (Optional)"
                        placeholder="200"
                        min={0}
                        value={formData.discountPrice}
                        onChange={(value) => setFormData({ ...formData, discountPrice: value })}
                    />
                </Group>

                <NumberInput
                    label="Stock Quantity"
                    min={0}
                    value={formData.stock}
                    onChange={(value) => setFormData({ ...formData, stock: value || 0 })}
                />

                <FileInput
                    label={initialData ? "Change Food Image (Optional)" : "Upload Food Image"}
                    placeholder="Choose image file"
                    accept="image/*"
                    required={!initialData} 
                    value={imageFile}
                    onChange={setImageFile}
                />

                <Checkbox
                    label="Available for Delivery"
                    checked={formData.isAvailable}
                    color="#f26c23"
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.currentTarget.checked })}
                />

                {/* 🚀 ৩. ম্যান্টিনের Button বদলে আপনার কাস্টম <Button> */}
                <Button
                    type="submit"
                    loading={isLoading}
                    style={{ backgroundColor: '#f26c23' }}
                    fullWidth
                    mt="xs"
                >
                    {initialData ? 'Update Item' : 'Add Food Item'}
                </Button>
            </Stack>
        </form>
    );
};

export default FoodItemForm;