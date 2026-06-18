
import React from 'react';
import { Table, Badge, Group, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function CouponTableRow({ coupon, onEdit, onDelete }) {
    const isCouponActive = coupon.isActive && new Date() <= new Date(coupon.expiryDate);

    return (
        <Table.Tr>
            <Table.Td style={{ fontWeight: 600, color: '#0f766e' }}>{coupon.code}</Table.Td>
            <Table.Td>{coupon.discountPercentage}% OFF</Table.Td>
            <Table.Td>₹{coupon.minOrderAmount}</Table.Td>
            <Table.Td>{new Date(coupon.expiryDate).toLocaleDateString('en-IN')}</Table.Td>
            <Table.Td>
                <Badge color={isCouponActive ? 'teal' : 'red'}>
                    {isCouponActive ? 'Active' : 'Expired/Inactive'}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <ActionIcon color="blue" variant="subtle" onClick={() => onEdit(coupon)}>
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon color="red" variant="subtle" onClick={() => onDelete(coupon._id)}>
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}