
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Grid, 
    SimpleGrid, 
    Text, 
    Paper, 
    Group, 
    RingProgress, 
    Table, 
    ThemeIcon, 
    Loader, 
    Center, 
    Stack
} from "@mantine/core";
import { 
    IconShoppingCart, 
    IconCurrencyDollar, 
    IconClock, 
    IconBike, 
    IconCpu, 
    IconDatabase, 
    IconServer 
} from "@tabler/icons-react";
import { fetchDashboardData } from "../store/dashboardSlice";
import {Badge} from "../components/common/index"; 

const Dashboard = () => {
    const dispatch = useDispatch();
    const { summary, isLoading, isError, message } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
        
        // Auto-refresh every 60 seconds to provide a live dashboard feel
        const interval = setInterval(() => {
            dispatch(fetchDashboardData());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    if (isLoading && !summary) {
        return (
            <Center style={{ height: "70vh" }}>
                <Loader size="xl" variant="bars" color="orange" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Center style={{ height: "70vh" }}>
                <Text color="red" size="lg" fw={600}>⚠️ {message}</Text>
            </Center>
        );
    }

    const { todayOrders, todayEarnings, pendingOrders, activeRiders, recentOrders, serverStatus } = summary || {};

    // Helper function to map order status to custom badge types
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "warning";
            case "Preparing": return "info";
            case "Out for Delivery": return "secondary";
            case "Delivered": return "success";
            default: return "default";
        }
    };

    return (
        <Stack spacing="lg" p="md">
            <div>
                <Text size="xl" fw={700} style={{ color: "#2B2D42" }}>Rural Cravings Dashboard</Text>
                <Text size="xs" color="dimmed">Live daily business metrics and server overview</Text>
            </div>

            {/* KPI Metrics Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group justify="space-between">
                        <div>
                            <Text size="xs" color="dimmed" fw={700} tt="uppercase">Today's Orders</Text>
                            <Text size="xl" fw={700} mt={5}>{todayOrders || 0}</Text>
                        </div>
                        <ThemeIcon color="orange" variant="light" size="xl" radius="md">
                            <IconShoppingCart size="1.4rem" />
                        </ThemeIcon>
                    </Group>
                </Paper>

                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group justify="space-between">
                        <div>
                            <Text size="xs" color="dimmed" fw={700} tt="uppercase">Today's Earnings</Text>
                            <Text size="xl" fw={700} mt={5}>₹{todayEarnings || 0}</Text>
                        </div>
                        <ThemeIcon color="green" variant="light" size="xl" radius="md">
                            <IconCurrencyDollar size="1.4rem" />
                        </ThemeIcon>
                    </Group>
                </Paper>

                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group justify="space-between">
                        <div>
                            <Text size="xs" color="dimmed" fw={700} tt="uppercase">Pending Dispatches</Text>
                            <Text size="xl" fw={700} mt={5} color={pendingOrders > 0 ? "red" : "inherit"}>
                                {pendingOrders || 0}
                            </Text>
                        </div>
                        <ThemeIcon color="yellow" variant="light" size="xl" radius="md">
                            <IconClock size="1.4rem" />
                        </ThemeIcon>
                    </Group>
                </Paper>

                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group justify="space-between">
                        <div>
                            <Text size="xs" color="dimmed" fw={700} tt="uppercase">Active Riders</Text>
                            <Text size="xl" fw={700} mt={5}>{activeRiders || 0}</Text>
                        </div>
                        <ThemeIcon color="blue" variant="light" size="xl" radius="md">
                            <IconBike size="1.4rem" />
                        </ThemeIcon>
                    </Group>
                </Paper>
            </SimpleGrid>

            <Grid gutter="md">
                {/* Live Order Feed Table */}
                <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Paper withBorder p="md" radius="md" shadow="xs" style={{ minHeight: "320px" }}>
                        <Text size="md" fw={700} mb="md">Recent Orders</Text>
                        <Table verticalSpacing="sm" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Order ID</Table.Th>
                                    <Table.Th>Customer</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {recentOrders && recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <Table.Tr key={order._id}>
                                            <Table.Td>
                                                <Text size="xs" fw={500} color="dimmed">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" fw={500}>{order.customerName || "Walking Customer"}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" fw={600}>₹{order.totalAmount}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge type={getStatusColor(order.status)}>
                                                    {order.status}
                                                </Badge>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                ) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={4}>
                                            <Text align="center" color="dimmed" py="xl">No orders found today</Text>
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Grid.Col>

                {/* Server Monitoring Widget */}
                <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Paper withBorder p="md" radius="md" shadow="xs" style={{ height: "100%" }}>
                        <Text size="md" fw={700} mb="sm">Server Health Monitor</Text>
                        
                        <Group justify="space-around" my="md">
                            <Stack align="center" spacing={5}>
                                <RingProgress
                                    size={100}
                                    thickness={8}
                                    roundCaps
                                    sections={[{ value: serverStatus?.cpuUsage || 0, color: "orange" }]}
                                    label={
                                        <Text size="xs" align="center" fw={700}>
                                            {serverStatus?.cpuUsage}%
                                        </Text>
                                    }
                                />
                                <Group spacing={4}>
                                    <IconCpu size="1rem" color="gray" />
                                    <Text size="xs" fw={600} color="dimmed">CPU Usage</Text>
                                </Group>
                            </Stack>

                            <Stack align="center" spacing={5}>
                                <RingProgress
                                    size={100}
                                    thickness={8}
                                    roundCaps
                                    sections={[{ value: serverStatus?.ramUsage || 0, color: "teal" }]}
                                    label={
                                        <Text size="xs" align="center" fw={700}>
                                            {serverStatus?.ramUsage}%
                                        </Text>
                                    }
                                />
                                <Group spacing={4}>
                                    <IconDatabase size="1rem" color="gray" />
                                    <Text size="xs" fw={600} color="dimmed">RAM Usage</Text>
                                </Group>
                            </Stack>
                        </Group>

                        <Stack spacing="xs" mt="md" style={{ borderTop: "1px solid #E4E5E7", paddingTop: "12px" }}>
                            <Group justify="space-between">
                                <Group spacing={6}>
                                    <IconClock size="1rem" color="gray" />
                                    <Text size="xs" color="dimmed">System Uptime:</Text>
                                </Group>
                                <Text size="xs" fw={600}>{serverStatus?.uptime || "N/A"}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Group spacing={6}>
                                    <IconServer size="1rem" color="gray" />
                                    <Text size="xs" color="dimmed">OS Platform:</Text>
                                </Group>
                                <Text size="xs" fw={600} tt="capitalize">{serverStatus?.platform || "N/A"}</Text>
                            </Group>
                        </Stack>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};

export default Dashboard;