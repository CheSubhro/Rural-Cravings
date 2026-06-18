
import React from 'react';
import { Table } from '@mantine/core';
import CouponTableRow from './CouponTableRow';

export default function CouponsTable({ coupons, onEdit, onDelete }) {
    return (
        <Table variant="horizontal" verticalSpacing="md" withTableBorder withColumnBorders>
            <Table.Thead bg="gray.5">
                <Table.Tr>
                    <Table.Th>Coupon Code</Table.Th>
                    <Table.Th>Discount</Table.Th>
                    <Table.Th>Min Order Amt</Table.Th>
                    <Table.Th>Expiry Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th style={{ width: '100px' }}>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {coupons.map((coupon) => (
                    <CouponTableRow 
                        key={coupon._id} 
                        coupon={coupon} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                ))}
                {coupons.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={6} style={{ textAlign: 'center', color: 'gray' }}>
                            No coupons generated yet.
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    );
}