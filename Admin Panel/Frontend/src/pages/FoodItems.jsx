
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, Button, Group, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodItems, createFoodItem, updateFoodItem, deleteFoodItem, resetFoodState } from '../store/foodSlice';
import { fetchCategories } from '../store/categorySlice';
import FoodItemForm from '../features/fooditem/FoodItemForm';
import { Modal, ConfirmModal, Badge } from '../components/common'; 

const FoodItems = () => {
    const dispatch = useDispatch();
    const { isLoading, error, success, foodItems = [] } = useSelector((state) => state.food);
    const { categories = [] } = useSelector((state) => state.category);
    
    const [formModalOpened, { open: openFormModal, close: closeFormModal }] = useDisclosure(false);
    const [editingItem, setEditingItem] = useState(null);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchFoodItems());
        dispatch(fetchCategories()); 
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            alert(editingItem ? "Food item updated successfully!" : "Food item created successfully!");
            setEditingItem(null);
            closeFormModal(); 
            dispatch(resetFoodState());
            dispatch(fetchFoodItems()); 
        }
    }, [success, dispatch, editingItem, closeFormModal]);

    const handleFoodSubmit = (formData) => {
        if (editingItem) {
            dispatch(updateFoodItem({ foodItemId: editingItem._id, formData }));
        } else {
            dispatch(createFoodItem(formData));
        }
    };

    const handleToggleAvailability = (item) => {
        const updatedStatus = !item.isAvailable;
        
        const formData = new FormData();
        formData.append('isAvailable', updatedStatus);

        dispatch(updateFoodItem({ foodItemId: item._id, formData }));
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        openFormModal(); 
    };

    const handleFormModalClose = () => {
        setEditingItem(null);
        closeFormModal();
    };

    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setDeleteModalOpened(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await dispatch(deleteFoodItem(itemToDelete));
            setDeleteModalOpened(false);
            setItemToDelete(null);
        }
    };

    return (
        <Container size="xl" py="xl">
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb="xl">
                <div>
                    <Title order={1} fw={800} c="dark.7">Food Items Kitchen</Title>
                    <Text size="sm" c="dimmed">Manage recipes, prices, stock levels and regional cuisines of Rural Cravings</Text>
                </div>
                <Button 
                    onClick={openFormModal} 
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    + Add New Recipe
                </Button>
            </Box>
            
            <Divider mb="xl" />

            <Modal 
                isOpen={formModalOpened} 
                onClose={handleFormModalClose} 
                title={
					<Title order={3} fw={700} style={{ fontSize: '22px' }}>
						{editingItem ? "Edit Recipe" : "Add Food Item"}
					</Title>
				}
                size="lg" 
            >
                {error && (
                    <Text color="red" size="sm" mb="md" fw={500}>
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Text>
                )}
                <FoodItemForm 
                    onSubmit={handleFoodSubmit} 
                    isLoading={isLoading} 
                    categories={categories}
                    initialData={editingItem}
                />
            </Modal>

            <ConfirmModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Food Item"
                confirmText="Yes, Delete"
                cancelText="No, Keep It"
                loading={isLoading}
            >
                Are you sure you want to delete this recipe? This action will permanently remove the item from the Rural Cravings menu.
            </ConfirmModal>

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">Menu Items List</Title>

                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Dish</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Stock</Table.Th>
                            <Table.Th>Available</Table.Th>
                            <Table.Th ta="right" style={{ paddingRight: '20px' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {foodItems.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={6} ta="center" py="xl">No food items added yet.</Table.Td>
                            </Table.Tr>
                        ) : (
                            foodItems.map((item) => (
                                <Table.Tr key={item._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Group gap="sm">
                                            <Avatar src={item.image} radius="md" size="lg" alt={item.name} shadow="xs" />
                                            <div>
                                                <Text fw={600} size="sm">{item.name}</Text>
                                                <Text size="xs" c="dimmed" lineClamp={1} style={{ maxWidth: '300px' }}>
                                                    {item.description}
                                                </Text>
                                            </div>
                                        </Group>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Badge status="info">
                                            {item.category?.name || 'Unassigned'}
                                        </Badge>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Text size="sm" fw={600} c="dark.6">₹{item.price}</Text>
                                        {item.discountPrice > 0 && (
                                            <Text size="xs" c="red.6" style={{ textDecoration: 'line-through' }}>₹{item.discountPrice}</Text>
                                        )}
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Badge status={item.stock > 5 ? 'success' : item.stock > 0 ? 'warning' : 'danger'}>
                                            {item.stock} pcs
                                        </Badge>
                                    </Table.Td>
                                    
                                    <Table.Td>
                                        <Badge 
                                            status={item.isAvailable ? 'success' : 'danger'} 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={() => handleToggleAvailability(item)} 
                                        >
                                            {item.isAvailable ? '🟢 Active' : '🔴 Hidden'}
                                        </Badge>
                                    </Table.Td>
                                    
                                    <Table.Td ta="right" style={{ paddingRight: '20px' }}>
                                        <Group gap="xs" justify="flex-end">
                                            <Button variant="light" size="xs" color="blue" onClick={() => handleEditClick(item)}>
                                                Edit
                                            </Button>
                                            <Button variant="light" size="xs" color="red" onClick={() => handleDeleteClick(item._id)}>
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

export default FoodItems;