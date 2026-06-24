
import React from 'react';
import { Table, ActionIcon, Group, Tooltip, Text, Badge } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';

export default function CouponsTable({ coupons, onEdit, onDelete }) {
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (

        <Table striped highlightOnHover verticalSpacing="md" withTableBorder>
            <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                <Table.Tr>
                    <Table.Th>Coupon Code</Table.Th>
                    <Table.Th>Discount</Table.Th>
                    <Table.Th>Min Order Amt</Table.Th>
                    <Table.Th>Expiry Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th ta="center">Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {coupons.length > 0 ? (
                    coupons.map((coupon) => {
                        const expiryDate = new Date(coupon.expiryDate);
                        const isExpired = expiryDate < today;
                        
                        const isActive = !isExpired && coupon.isActive;

                        return (
                            <Table.Tr key={coupon._id}>
                                <Table.Td fw={600}>{coupon.code}</Table.Td>
                                <Table.Td>{coupon.discountPercentage}% OFF</Table.Td>
                                <Table.Td>₹{coupon.minOrderAmount}</Table.Td>
                                <Table.Td>{new Date(coupon.expiryDate).toLocaleDateString()}</Table.Td>
                                <Table.Td>
                                    <Badge color={isExpired ? 'red' : (coupon.isActive ? 'green' : 'gray')}>
                                        {isExpired ? 'Expired' : (coupon.isActive ? 'Active' : 'Inactive')}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs" justify="center">
                                        <Tooltip label="Edit">
                                            <ActionIcon color="blue" variant="light" onClick={() => onEdit(coupon)}>
                                                <IconPencil size={18} />
                                            </ActionIcon>
                                        </Tooltip>
                                        <Tooltip label="Delete">
                                            <ActionIcon color="red" variant="light" onClick={() => onDelete(coupon._id)}>
                                                <IconTrash size={18} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={6} ta="center" py="xl">
                            <Text c="dimmed">No coupons generated yet.</Text>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    );
}