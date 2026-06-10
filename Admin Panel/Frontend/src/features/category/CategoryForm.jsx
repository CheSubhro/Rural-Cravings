
import React, { useState, useEffect } from 'react';
import { TextInput, Textarea, Checkbox, Stack, Button, Select } from '@mantine/core';

const CategoryForm = ({ onSubmit, isLoading, categories = [], initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: '',
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                parentCategory: initialData.parentCategory?._id || initialData.parentCategory || '',
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({ name: '', description: '', parentCategory: '', isActive: true });
        }
    }, [initialData]);

    const selectOptions = categories
        .filter(cat => !initialData || cat._id !== initialData._id) 
        .map(cat => ({
            value: cat._id,
            label: cat.name
        }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData };
        if (!payload.parentCategory) {
            payload.parentCategory = null; 
        }
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="md">
                <TextInput
                    label="Category Name"
                    placeholder="e.g., Traditional Sweets, Rice Items"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Textarea
                    label="Description"
                    placeholder="Describe rural food categories..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <Select
                    label="Parent Category (Optional)"
                    placeholder="Select a parent category if this is a sub-category"
                    data={selectOptions}
                    clearable
                    value={formData.parentCategory}
                    onChange={(value) => setFormData({ ...formData, parentCategory: value || '' })}
                />

                <Checkbox
                    label="Set Status to Active"
                    checked={formData.isActive}
                    color="#f26c23"
                    onChange={(e) => setFormData({ ...formData, isActive: e.currentTarget.checked })}
                />

                <Button
                    type="submit"
                    loading={isLoading}
                    style={{ backgroundColor: '#f26c23' }}
                    fullWidth
                    mt="md"
                >
                    {initialData ? 'Update Category' : 'Create Category'}
                </Button>
            </Stack>
        </form>
    );
};

export default CategoryForm;