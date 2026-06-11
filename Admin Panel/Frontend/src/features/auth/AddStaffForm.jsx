
import React from 'react';
import { TextInput, PasswordInput, Select, FileInput, Stack, SimpleGrid } from '@mantine/core';
import { Button } from '../../components/common';

const AddStaffForm = ({ formData, setFormData, onSubmit, isLoading, isEditing }) => {
    return (
        <form onSubmit={onSubmit}>
            <Stack gap="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput 
                        label="Full Name" 
                        placeholder="Enter full name"
                        required 
                        size="md" radius="md"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />

                    <TextInput 
                        label="Email Address" 
                        placeholder="Enter email address"
                        type="email"
                        required 
                        size="md" radius="md"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput 
                        label="Username" 
                        placeholder="Choose a username"
                        required 
                        size="md" radius="md"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />

                    <PasswordInput 
                        label={isEditing ? "Password (Leave blank to keep unchanged)" : "Password"} 
                        placeholder={isEditing ? "Enter new password if changing" : "Create a password"}
                        required={!isEditing} 
                        size="md" radius="md"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </SimpleGrid>

                {/* --- OPTIMIZED: Added 'Delivery' to the system role selection data array --- */}
                <Select
                    label="System Role"
                    placeholder="Pick user role"
                    data={['Admin', 'Manager', 'Staff', 'Delivery']}
                    required
                    size="md" radius="md"
                    value={formData.role}
                    onChange={(value) => setFormData({...formData, role: value || 'Staff'})}
                />

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <FileInput 
                        label={isEditing ? "Avatar (Upload only if changing)" : "Avatar (Profile Picture)"} 
                        placeholder="Upload avatar image"
                        accept="image/png,image/jpeg"
                        required={!isEditing} 
                        size="md" radius="md"
                        value={formData.avatar}
                        onChange={(file) => setFormData({...formData, avatar: file})}
                    />

                    <FileInput 
                        label="Cover Image (Optional)" 
                        placeholder="Upload cover background"
                        accept="image/png,image/jpeg"
                        size="md" radius="md"
                        value={formData.coverImage}
                        onChange={(file) => setFormData({...formData, coverImage: file})}
                    />
                </SimpleGrid>

                {/* --- OPTIMIZED: Dynamic action text mapping across system configurations --- */}
                <Button 
                    type="submit" 
                    fullWidth 
                    size="md" radius="md"
                    isLoading={isLoading} 
                    style={{ backgroundColor: '#f26c23' }}
                    mt="lg"
                >
                    {isEditing ? 'Update Team Member Profile' : 'Register New Team Member'}
                </Button>
            </Stack>
        </form>
    );
};

export default AddStaffForm;