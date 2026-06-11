
import React, { useEffect } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, LoadingOverlay, Avatar, Group, Stack } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../store/customerSlice';
import { formatDate } from '../utils/formatDate';

const Customers = () => {

    const dispatch = useDispatch();
    const { isLoading, error, customers = [] } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    return (
        <Container size="xl" py="xl" style={{ position: 'relative' }}>
            <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

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
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {customers.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={5} ta="center" py="xl">
                                    No registered customers found.
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            customers.map((user) => (
                                <Table.Tr key={user._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Group gap="sm">
                                            <Avatar 
                                                radius="xl" 
                                                color="orange" 
                                                variant="light"
                                            >
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
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Container>
    );
};

export default Customers;