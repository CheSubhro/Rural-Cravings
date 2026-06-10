
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Grid, Table, Button, Badge, ActionIcon, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createCategory, 
    fetchCategories, 
    updateCategory,  
    deleteCategory,  
    resetCategoryState 
} from '../store/categorySlice';
import CategoryForm from '../features/category/CategoryForm';

const Categories = () => {
    const dispatch = useDispatch();
    
    const { isLoading, error, success, categories = [] } = useSelector((state) => state.category);
    
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories()); 
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            alert(editingCategory ? "Category updated successfully!" : "Category created successfully!");
            setEditingCategory(null); 
            dispatch(resetCategoryState());
            dispatch(fetchCategories()); 
        }
    }, [success, dispatch, editingCategory]);

    const handleCategorySubmit = (formData) => {
        if (editingCategory) {
            dispatch(updateCategory({ categoryId: editingCategory._id, categoryData: formData }));
        } else {
            dispatch(createCategory(formData));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory(id)).then(() => {
                dispatch(fetchCategories());
            });
        }
    };

    return (
        <Container size="xl" py="xl">
            <Box mb="xl">
                <Title order={1} fw={800} c="dark.7">Category Management</Title>
                <Text size="sm" c="dimmed">Add, update, and manage configurations for Rural Cravings food items</Text>
            </Box>
            <Divider mb="xl" />

            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Paper withBorder shadow="sm" p="xl" radius="md">
                        <Group justify="space-between" mb="lg">
                            <Title order={3}>{editingCategory ? "Edit Category" : "Add New Category"}</Title>
                            {editingCategory && (
                                <Button variant="subtle" color="gray" size="xs" onClick={() => setEditingCategory(null)}>
                                    Cancel Edit
                                </Button>
                            )}
                        </Group>
                        
                        {error && (
                            <Text color="red" size="sm" ta="center" mb="md" fw={500}>
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </Text>
                        )}

                        <CategoryForm 
                            onSubmit={handleCategorySubmit} 
                            isLoading={isLoading} 
                            categories={categories}
                            initialData={editingCategory}
                        />
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Paper withBorder shadow="sm" p="xl" radius="md">
                        <Title order={3} mb="lg">All Categories</Title>
                        
                        <Table striped highlightOnHover verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Parent Category</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th ta="right">Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {categories.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={4} ta="center">No categories found.</Table.Td>
                                    </Table.Tr>
                                ) : (
                                    categories.map((cat) => (
                                        <Table.Tr key={cat._id}>
                                            <Table.Td>
                                                <Text fw={500} size="sm">{cat.name}</Text>
                                                <Text size="xs" c="dimmed">{cat.slug}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                {cat.parentCategory ? (
                                                    <Badge color="blue" variant="light">{cat.parentCategory.name}</Badge>
                                                ) : (
                                                    <Text size="xs" c="dimmed">None (Main)</Text>
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge color={cat.isActive ? 'green' : 'red'}>
                                                    {cat.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td ta="right">
                                                <Group gap="xs" justify="flex-end">
                                                    <Button 
                                                        variant="light" 
                                                        size="xs" 
                                                        color="blue"
                                                        onClick={() => setEditingCategory(cat)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="light" 
                                                        size="xs" 
                                                        color="red"
                                                        onClick={() => handleDelete(cat._id)}
                                                    >
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
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default Categories;