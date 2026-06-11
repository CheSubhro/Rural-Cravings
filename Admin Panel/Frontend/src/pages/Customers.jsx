
import React, { useState, useEffect } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, LoadingOverlay, Avatar, Tooltip,Group, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomerThunk } from '../store/customerSlice';
import { formatDate } from '../utils/formatDate';
import { ConfirmModal } from '../components/common';

const Customers = () => {
    const dispatch = useDispatch();
    const { isLoading, error, customers = [] } = useSelector((state) => state.customer);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const openDeleteModal = (customerId) => {
        setSelectedCustomerId(customerId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedCustomerId(null);
        setIsDeleting(false);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCustomerId) return;
        
        setIsDeleting(true); 
        try {
            await dispatch(deleteCustomerThunk(selectedCustomerId)).unwrap();
            
            notifications.show({
                title: 'Success',
                message: 'Customer account deleted successfully',
                color: 'green',
                autoClose: 3000, 
            });

            closeDeleteModal(); 
        } catch (err) {
            setIsDeleting(false); 

            notifications.show({
                title: 'Error',
                message: err || 'Failed to delete customer account',
                color: 'red',
            });
        }
    };

    return (
        <Container size="xl" py="xl" style={{ position: 'relative' }}>
            <LoadingOverlay visible={isLoading && !isDeleting} overlayProps={{ blur: 2 }} />

            <Box mb="xl">
                <Title order={1} fw={800} c="dark.7">Registered Customers</Title>
                <Text size="sm" c="dimmed">View and manage registered platform users and their profile summaries</Text>
            </Box>
            <Divider mb="xl" />

            {error && (
                <Text color="red" size="sm" mb="md" fw={500}>
                    {typeof error === 'string' ? error : 'Something went wrong'}
                </Text>
            )}

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">Customer Directory</Title>

                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Customer Profile</Table.Th>
                            <Table.Th>Username</Table.Th>
                            <Table.Th>Email Address</Table.Th>
                            <Table.Th>Phone Number</Table.Th>
                            <Table.Th>Joined Date</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {customers.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={6} ta="center" py="xl">
                                    No registered customers found.
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            customers.map((user) => (
                                <Table.Tr key={user._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Group gap="sm">
                                            <Avatar radius="xl" color="orange" variant="light">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Text fw={600} size="sm">{user.name}</Text>
                                        </Group>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="sm" c="dimmed">@{user.username}</Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="sm">{user.email}</Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="sm">
                                            {user.phone ? `📞 ${user.phone}` : <Text size="xs" c="placeholder">Not Provided</Text>}
                                        </Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="sm" c="dimmed">
                                            {formatDate(user.createdAt)}
                                        </Text>
                                    </Table.Td>

                                    <Table.Td style={{ textAlign: 'center' }}>
                                        <Tooltip label="Delete Customer" position="top">
                                            <span>
                                                <ActionIcon 
                                                    color="red" 
                                                    variant="light" 
                                                    onClick={() => openDeleteModal(user._id)} 
                                                    size="lg"
                                                >
                                                    <IconTrash size={18} stroke={1.5} />
                                                </ActionIcon>
                                            </span>
                                        </Tooltip>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Delete Customer Account"
                confirmText="Delete"
                loading={isDeleting} 
            >
                Are you sure you want to delete this customer's account? All associated profile data will be permanently removed. This action cannot be undone.
            </ConfirmModal>
        </Container>
    );
};

export default Customers;