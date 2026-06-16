
import React, { useState, useEffect } from 'react';
import { Textarea, Checkbox, Stack } from '@mantine/core';
import { Input, CustomSelect, Button } from '../../components/common'; 

const CategoryForm = ({ onSubmit, isLoading, categories = [], initialData = null }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: '',
        isActive: true
    });
    
    const [selectedFile, setSelectedFile] = useState(null); 

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                parentCategory: initialData.parentCategory?._id || initialData.parentCategory || '',
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
            setSelectedFile(null); 
        } else {
            setFormData({ name: '', description: '', parentCategory: '', isActive: true });
            setSelectedFile(null);
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
        
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('description', formData.description);
        formPayload.append('isActive', formData.isActive);
        formPayload.append('parentCategory', formData.parentCategory || '');

        if (selectedFile) {
            formPayload.append('image', selectedFile); 
        }

        onSubmit(formPayload); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="sm">
                <Input
                    label="Category Name"
                    placeholder="e.g., Traditional Sweets, Rice Items"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#2c2e33' }}>
                        Category Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        style={{
                            padding: '8px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    />
                    
                    {selectedFile && (
                        <div style={{ marginTop: '8px' }}>
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Preview" 
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                        </div>
                    )}

                    {initialData?.image && !selectedFile && (
                        <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '12px', color: '#868e96' }}>
                                Existing Image Preview:
                            </span>
                            <img 
                                src={initialData.image} 
                                alt="Current Category" 
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                        </div>
                    )}
                </div>

                <Textarea
                    label="Description"
                    placeholder="Describe rural food categories..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <CustomSelect
                    label="Parent Category (Optional)"
                    placeholder="Select a parent category if this is a sub-category"
                    options={selectOptions}
                    value={formData.parentCategory}
                    onValueChange={(value) => setFormData({ ...formData, parentCategory: value || '' })}
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
                    mt="xs"
                >
                    {initialData ? 'Update Category' : 'Create Category'}
                </Button>
            </Stack>
        </form>
    );
};

export default CategoryForm;