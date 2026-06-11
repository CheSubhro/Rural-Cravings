
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, Group, Stack, ActionIcon, Tooltip } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react'; 
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications'; 
import { fetchOrders, updateOrderStatusThunk, resetOrderState } from '../store/orderSlice'; 
import { Modal, CustomSelect, Badge, Button } from '../components/common';

const Orders = () => {

    const dispatch = useDispatch();
    
    const { isLoading, error, success, orders = [] } = useSelector((state) => state.order);

    const [statusModalOpened, { open: openStatusModal, close: closeStatusModal }] = useDisclosure(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [orderStatus, setOrderStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            notifications.show({
                title: 'Success',
                message: "Order status updated successfully!",
                color: 'green',
                autoClose: 3000,
            });
            
            setSelectedOrder(null);
            closeStatusModal();
            dispatch(resetOrderState());
            dispatch(fetchOrders()); 
        }
    }, [success, dispatch, closeStatusModal]);

    const handleActionClick = (order) => {
        setSelectedOrder(order);
        setOrderStatus(order.status);
        setPaymentStatus(order.paymentDetails?.status || 'Pending');
        openStatusModal();
    };

    const handleStatusSubmit = (e) => {
        e.preventDefault();
        if (selectedOrder) {
            dispatch(updateOrderStatusThunk({
                orderId: selectedOrder._id,
                status: orderStatus,
                paymentStatus: paymentStatus
            }));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'Preparing': return 'info';
            case 'On The Way': return 'info';
            case 'Delivered': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'gray';
        }
    };

    const getPaymentColor = (status) => {
        switch (status) {
            case 'Paid': return 'success';
            case 'Pending': return 'warning';
            case 'Failed': return 'danger';
            case 'Refunded': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <Container size="xl" py="xl">
            <Box mb="xl">
                <Title order={1} fw={800} c="dark.7">Live Kitchen Orders</Title>
                <Text size="sm" c="dimmed">Track customer purchases, update food preparation pipeline, and manage payments</Text>
            </Box>
            <Divider mb="xl" />

            <Modal
                isOpen={statusModalOpened}
                onClose={closeStatusModal}
                title={
                    <Title order={3} fw={700} style={{ fontSize: '22px' }}>
                        Update Order Status
                    </Title>
                }
                size="md"
            >
                {error && (
                    <Text color="red" size="sm" mb="md" fw={500}>
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Text>
                )}

                <form onSubmit={handleStatusSubmit}>
                    <Stack gap="md">
                        <CustomSelect
                            label="Kitchen / Delivery Status"
                            placeholder="Change order state"
                            value={orderStatus}
                            onValueChange={(val) => setOrderStatus(val || '')}
                            options={[
                                { value: 'Pending', label: '⏳ Pending' },
                                { value: 'Preparing', label: '🍳 Preparing' },
                                { value: 'On The Way', label: '🛵 On The Way' },
                                { value: 'Delivered', label: '🟢 Delivered' },
                                { value: 'Cancelled', label: '🔴 Cancelled' }
                            ]}
                        />

                        <CustomSelect
                            label="Payment Status"
                            placeholder="Change settlement state"
                            value={paymentStatus}
                            onValueChange={(val) => setPaymentStatus(val || '')}
                            options={[
                                { value: 'Pending', label: '⏳ Pending' },
                                { value: 'Paid', label: '💰 Paid' },
                                { value: 'Failed', label: '❌ Failed' },
                                { value: 'Refunded', label: '↩️ Refunded' }
                            ]}
                        />

                        <Button
                            type="submit"
                            loading={isLoading}
                            style={{ backgroundColor: '#f26c23' }}
                            fullWidth
                            mt="sm"
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </Modal>

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">All Orders Pipeline</Title>

                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Customer & Contact</Table.Th>
                            <Table.Th>Ordered Items</Table.Th>
                            <Table.Th>Bill Amount</Table.Th>
                            <Table.Th>Method</Table.Th>
                            <Table.Th>Payment</Table.Th>
                            <Table.Th>Order Status</Table.Th>
                            <Table.Th ta="right" style={{ paddingRight: '20px' }}>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {orders.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={7} ta="center" py="xl">No active orders found.</Table.Td>
                            </Table.Tr>
                        ) : (
                            orders.map((order) => (
                                <Table.Tr key={order._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Text fw={600} size="sm">{order.customer?.name || 'Walk-in Customer'}</Text>
                                        <Text size="xs" c="dimmed">📞 {order.deliveryAddress?.phone}</Text>
                                        <Text size="xs" c="dimmed" lineClamp={1} style={{ maxWidth: '180px' }}>
                                            📍 {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
                                        </Text>
                                    </Table.Td>

                                    <Table.Td>
										<Group gap={4}>
											{order.items?.map((item, idx) => (
												<Badge key={idx} color="blue">
													{item.foodItem?.name || 'Unknown Item'} x {item.quantity}
												</Badge>
											))}
										</Group>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text fw={700} size="sm" c="dark.7">₹{order.totalAmount}</Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="xs" fw={600} style={{ letterSpacing: '0.5px' }}>
                                            {order.paymentDetails?.method}
                                        </Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Badge status={getPaymentColor(order.paymentDetails?.status)}>
                                            {order.paymentDetails?.status}
                                        </Badge>
                                    </Table.Td>

                                    <Table.Td>
                                        <Badge status={getStatusColor(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </Table.Td>

                                    <Table.Td>
                                        <Group justify="center">
                                            <Tooltip label="Manage Order" position="top">
                                                <span>
                                                    <ActionIcon 
                                                        color="orange" 
                                                        variant="light" 
                                                        onClick={() => handleActionClick(order)}
                                                        size="lg"
                                                    >
                                                        <IconSettings size={18} stroke={1.5} />
                                                    </ActionIcon>
                                                </span>
                                            </Tooltip>
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

export default Orders;