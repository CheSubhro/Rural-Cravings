
import React, { useEffect } from 'react';
import { Container, Title, Text, Divider, Box, SimpleGrid, Card, Group, Badge, Stack, Button, Loader, Center, Paper } from '@mantine/core';
import { IconTruckDelivery, IconMapPin, IconCheck, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { fetchRiderOrders, updateDeliveryStatusThunk, resetOrderState } from '../store/orderSlice';

const Delivery = () => {
    const dispatch = useDispatch();
    const { isLoading, error, success, orders = [] } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchRiderOrders());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            notifications.show({
                title: 'Success',
                message: 'Delivery pipeline updated successfully!',
                color: 'green',
                autoClose: 2500,
            });
            dispatch(resetOrderState());
            dispatch(fetchRiderOrders()); 
        }
    }, [success, dispatch]);

    const handleStatusUpdate = (orderId, nextStatus) => {
        dispatch(updateDeliveryStatusThunk({ orderId, status: nextStatus }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'On The Way': return 'blue';
            case 'Delivered': return 'green';
            case 'Cancelled': return 'red';
            default: return 'gray';
        }
    };

    return (
        <Container size="md" py="xl">
            <Box mb="xl">
                <Group justify="space-between">
                    <Box>
                        <Title order={2} fw={800} c="dark.7">Rider Delivery Dispatch</Title>
                        <Text size="sm" c="dimmed">Track, update, and manage your assigned deliveries</Text>
                    </Box>
                    <IconTruckDelivery size={36} color="#f26c23" stroke={1.5} />
                </Group>
            </Box>
            <Divider mb="xl" />

            {error && (
                <Text color="red" size="sm" mb="md" fw={500} ta="center">
                    {typeof error === 'string' ? error : 'Failed to fetch delivery logs'}
                </Text>
            )}

            {isLoading && orders.length === 0 ? (
                <Center py="xl"><Loader color="orange" /></Center>
            ) : orders.length === 0 ? (
                <Paper withBorder p="xl" radius="md" ta="center" bg="gray.0">
                    <Text fw={600} c="dimmed">No active delivery jobs assigned to you right now.</Text>
                </Paper>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2 }} gap="md">
                    {orders.map((order) => (
                        <Card key={order._id} withBorder shadow="xs" radius="md" p="lg">
                            <Group justify="space-between" mb="xs">
                                <Text size="xs" fontFamily="monospace" fw={700} c="dimmed">
                                    ID: ...{order._id.slice(-6).toUpperCase()}
                                </Text>
                                <Badge color={getStatusColor(order.status)} variant="light">
                                    {order.status}
                                </Badge>
                            </Group>

                            <Divider my="sm" variant="dashed" />

                            <Stack gap="xs">
                                <Text size="sm" fw={700} c="dark.8">
                                    👤 {order.customer?.name || 'Walk-in Customer'}
                                </Text>
                                
                                <Text size="sm" fw={500} c="blue.7">
                                    📞 {order.deliveryAddress?.phone}
                                </Text>

                                <Text size="sm" c="dark.6" style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                                    <IconMapPin size={16} style={{ marginTop: '3px', flexShrink: 0 }} />
                                    <span>
                                        {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.zipCode}
                                    </span>
                                </Text>
                            </Stack>

                            <Box my="sm" p="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <Group justify="space-between">
                                    <Text size="xs" fw={700} c="dimmed">Collect Amount:</Text>
                                    <Text size="sm" fw={800} c="teal.8">
                                        ₹{order.totalAmount} ({order.paymentDetails?.method || 'COD'})
                                    </Text>
                                </Group>
                                <Text size="xs" fw={600} c={order.paymentDetails?.status === 'Paid' ? 'green.7' : 'orange.7'} ta="right" mt={2}>
                                    Payment: {order.paymentDetails?.status}
                                </Text>
                            </Box>

                            {/* রাইডারের কুইক অ্যাকশন বাটন */}
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <Group gap="xs" grow mt="md">
                                    <Button 
                                        variant="light" 
                                        color="red" 
                                        size="xs"
                                        leftSection={<IconX size={14} />}
                                        onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                                        loading={isLoading}
                                    >
                                        Cancel Delivery
                                    </Button>
                                    <Button 
                                        color="green" 
                                        size="xs"
                                        leftSection={<IconCheck size={14} />}
                                        onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                        loading={isLoading}
                                    >
                                        Mark Delivered
                                    </Button>
                                </Group>
                            )}
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
};

export default Delivery;