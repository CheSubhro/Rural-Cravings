
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
    createCategory, 
    fetchCategories, 
    updateCategory,  
    deleteCategory,  
    resetCategoryState 
} from '../store/categorySlice';
import CategoryForm from '../features/category/CategoryForm';
import { Modal, ConfirmModal, Badge, Button } from '../components/common'; 

const Categories = () => {

    const dispatch = useDispatch();
    
    const { isLoading, error, success, categories = [] } = useSelector((state) => state.category);
    
    const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            alert(editingCategory ? "Category updated successfully!" : "Category created successfully!");
            setEditingCategory(null); 
            closeFormModal();
            dispatch(resetCategoryState());
            dispatch(fetchCategories()); 
        }
    }, [success, dispatch, editingCategory, closeFormModal]);

    const handleCategorySubmit = (formData) => {
        if (editingCategory) {
            dispatch(updateCategory({ categoryId: editingCategory._id, categoryData: formData }));
        } else {
            dispatch(createCategory(formData));
        }
    };

    const handleEditClick = (cat) => {
        setEditingCategory(cat);
        openFormModal();
    };

    const handleFormModalClose = () => {
        setEditingCategory(null);
        closeFormModal();
    };

    const handleDeleteClick = (id) => {
        setCategoryToDelete(id);
        setDeleteModalOpened(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryToDelete) {
            await dispatch(deleteCategory(categoryToDelete));
            setDeleteModalOpened(false);
            setCategoryToDelete(null);
            dispatch(fetchCategories());
        }
    };

    return (
        <Container size="xl" py="xl">
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb="xl">
                <div>
                    <Title order={1} fw={800} c="dark.7">Category Management</Title>
                    <Text size="sm" c="dimmed">Add, update, and manage configurations for Rural Cravings food items</Text>
                </div>
                <Button 
                    onClick={openFormModal} 
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    + Add New Category
                </Button>
            </Box>
            
            <Divider mb="xl" />

            <Modal 
                isOpen={formModalOpened} 
                onClose={handleFormModalClose} 
                title={
                    <Title order={3} fw={700} style={{ fontSize: '22px' }}>
                        {editingCategory ? "Edit Category" : "Add New Category"}
                    </Title>
                }
                size="lg" 
            >
                {error && (
                    <Text color="red" size="sm" mb="md" fw={500}>
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Text>
                )}
                <CategoryForm 
                    onSubmit={handleCategorySubmit} 
                    isLoading={isLoading} 
                    categories={categories}
                    initialData={editingCategory}
                />
            </Modal>

            <ConfirmModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                confirmText="Yes, Delete"
                cancelText="No, Keep It"
                loading={isLoading}
            >
                Are you sure you want to delete this category? This may affect the food items tagged under this category.
            </ConfirmModal>

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">All Categories</Title>
                
                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Name</Table.Th>
                            <Table.Th>Parent Category</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th ta="right" style={{ paddingRight: '20px' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {categories.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={4} ta="center" py="xl">No categories found.</Table.Td>
                            </Table.Tr>
                        ) : (
                            categories.map((cat) => (
                                <Table.Tr key={cat._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Text fw={600} size="sm">{cat.name}</Text>
                                        <Text size="xs" c="dimmed">{cat.slug}</Text>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        {cat.parentCategory ? (
                                            <Badge status="info">{cat.parentCategory.name}</Badge>
                                        ) : (
                                            <Text size="xs" c="dimmed">None (Main)</Text>
                                        )}
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Badge status={cat.isActive ? 'success' : 'danger'}>
                                            {cat.isActive ? '🟢 Active' : '🔴 Inactive'}
                                        </Badge>
                                    </Table.Td>
                                    
                                    <Table.Td ta="right" style={{ paddingRight: '20px' }}>
                                        <Group gap="xs" justify="flex-end">
                                            <Button variant="light" size="xs" color="blue" onClick={() => handleEditClick(cat)}>
                                                Edit
                                            </Button>
                                            <Button variant="light" size="xs" color="red" onClick={() => handleDeleteClick(cat._id)}>
                                                Delete
                                            </Button>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Categories;