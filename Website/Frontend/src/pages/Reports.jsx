
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, Text, Title, Group, Select, Loader, Center, Paper, Table, Avatar, Badge } from '@mantine/core';
import { IconCurrencyRupee, IconTrendingUp, IconShoppingBag, IconCircleX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReportsData } from '../store/reportSlice';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Reports = () => {
    const dispatch = useDispatch();
    const [timeRange, setTimeRange] = useState('7');
    const { overview, topItems, trend, coldItems, riderPerformance, customerStats, isLoading, error } = useSelector((state) => state.report);

    useEffect(() => {
        dispatch(fetchAllReportsData({ days: parseInt(timeRange) }));
    }, [dispatch, timeRange]);

    if (isLoading && !overview) {
        return <Center style={{ height: '80vh' }}><Loader size="xl" color="orange" /></Center>;
    }

    // Pie Chart Colors
    const COLORS = ['#12b886', '#fa5252'];
    const pieData = customerStats ? [
        { name: 'New Customers', value: customerStats.newCustomers },
        { name: 'Returning Customers', value: customerStats.returningCustomers }
    ] : [];

    return (
        <Container size="xl" py="md">
            <Group justify="space-between" mb="xl">
                <div>
                    <Title order={2} fw={800}>Business Analytics Report</Title>
                    <Text size="sm" c="dimmed">Track sales, menu performance, and operations</Text>
                </div>
                <Select
                    label="Time Horizon"
                    value={timeRange}
                    onChange={setTimeRange}
                    data={[
                        { value: '7', label: 'Last 7 Days' },
                        { value: '30', label: 'Last 30 Days' }
                    ]}
                />
            </Group>

            {/* --- Top Metrics Cards / KPI Widgets --- */}
            <Grid mb="xl">
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                    <Card withBorder radius="md" p="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700}>TOTAL REVENUE</Text>
                            <IconCurrencyRupee size={22} color="green" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">₹{overview?.totalRevenue || 0}</Text>
                        <Text size="xs" c="dimmed" mt={2}>Delivered Net: ₹{overview?.successfulRevenue || 0}</Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                    <Card withBorder radius="md" p="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700}>TOTAL ORDERS</Text>
                            <IconShoppingBag size={22} color="blue" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">{overview?.totalOrders || 0}</Text>
                        <Text size="xs" c="green" mt={2}>Success Delivery: {overview?.deliveredCount || 0}</Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                    <Card withBorder radius="md" p="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700}>ORDER CONVERSION</Text>
                            <IconTrendingUp size={22} color="teal" />
                        </Group>
                        <Group gap="xs" mt="sm">
                            <Text size="xl" fw={700}>
                                {overview?.totalOrders ? ((overview.deliveredCount / overview.totalOrders) * 100).toFixed(0) : 0}%
                            </Text>
                            <Text size="xs" c="dimmed">Success Rate</Text>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                    <Card withBorder radius="md" p="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700}>CANCELLED DISPATCH</Text>
                            {/* 🆕 আইকন কম্পোনেন্ট পরিবর্তন করে সঠিক নাম দেওয়া হলো */}
                            <IconCircleX size={22} color="red" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">{overview?.cancelledCount || 0}</Text>
                        <Text size="xs" c="dimmed" mt={2}>COD Orders Count: {overview?.codCount || 0}</Text>
                    </Card>
                </Grid.Col>
            </Grid>

            {/* --- Charts Section --- */}
            <Grid mb="xl">
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper withBorder p="md" radius="md" style={{ height: 350 }}>
                        <Title order={4} mb="md" fw={600}>Revenue Dynamics Trend</Title>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={trend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                                <Area type="monotone" dataKey="dailyRevenue" stroke="#f26c23" fill="#ffe8cc" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md" style={{ height: 350 }} ta="center">
                        <Title order={4} mb="xs" fw={600} ta="left">User Loyalty Persona</Title>
                        <Center style={{ height: '70%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Center>
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* --- Data Performance Tables Section --- */}
            <Grid>
                {/* Top Performing Items */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper withBorder p="md" radius="md">
                        <Title order={4} mb="md" c="green.8" fw={600}>🔥 Top Velocity Best Sellers</Title>
                        <Table verticalSpacing="sm" highlightOnHover>
                            <Table.Thead><Table.Tr><Table.Th>Item</Table.Th><Table.Th ta="right">Qty Sold</Table.Th><Table.Th ta="right">Revenue</Table.Th></Table.Tr></Table.Thead>
                            <Table.Tbody>
                                {topItems && topItems.map((item) => (
                                    <Table.Tr key={item._id}>
                                        <Table.Td><Group gap="sm"><Avatar src={item.image} radius="sm" size="sm" /><div><Text size="sm" fw={500}>{item.name}</Text></div></Group></Table.Td>
                                        <Table.Td ta="right" fw={600}>{item.totalQuantitySold}</Table.Td>
                                        <Table.Td ta="right" c="teal" fw={700}>₹{item.totalRevenueGenerated}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Grid.Col>

                {/* Rider Performance */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper withBorder p="md" radius="md">
                        <Title order={4} mb="md" c="blue.8" fw={600}>🚴 Rider Dispatch Performance</Title>
                        <Table verticalSpacing="sm" highlightOnHover>
                            <Table.Thead><Table.Tr><Table.Th>Rider Identity</Table.Th><Table.Th ta="center">Fulfilled</Table.Th><Table.Th ta="center">Aborted</Table.Th></Table.Tr></Table.Thead>
                            <Table.Tbody>
                                {riderPerformance && riderPerformance.map((rider) => (
                                    <Table.Tr key={rider._id}>
										<Table.Td>
											<Text size="sm" fw={500}>
												{rider.name || "Not Assigned / External"} 
											</Text>
										</Table.Td>
                                        <Table.Td ta="center"><Badge color="green" variant="light">{rider.totalDeliveries} Done</Badge></Table.Td>
                                        <Table.Td ta="center"><Badge color="red" variant="light">{rider.totalCancelled} Fail</Badge></Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default Reports;