
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button, Group, Box, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import { fetchCoupons, addCoupon, editCoupon, removeCoupon } from '../store/couponSlice';
import CouponsTable from '../features/coupons/CouponsTable';
import CouponFormModal from '../features/coupons/CouponFormModal';
import { ConfirmModal } from '../components/common'; 

import '@mantine/dates/styles.css';

export default function CouponsPage() {

    const dispatch = useDispatch();
    const { items: coupon = [], loading = false } = useSelector((state) => state.coupon || {});
    
    const [opened, setOpened] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState(null);

    const form = useForm({
        initialValues: {
            code: '',
            discountPercentage: 10,
            minOrderAmount: 0,
            expiryDate: null,
            isActive: true,
        },
        validate: {
            code: (value) => (value.trim().length < 3 ? 'Code must be at least 3 chars' : null),
            discountPercentage: (value) => (value < 1 || value > 100 ? 'Discount must be between 1 and 100' : null),
            expiryDate: (value) => (!value ? 'Expiry date is required' : null),
        },
    });

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);

    const handleOpenAddModal = () => {
        setEditingId(null);
        form.reset();
        setOpened(true);
    };

    const handleOpenEditModal = (couponData) => {
        setEditingId(couponData._id);
        form.initialize({
            code: couponData.code,
            discountPercentage: couponData.discountPercentage,
            minOrderAmount: couponData.minOrderAmount,
            expiryDate: new Date(couponData.expiryDate),
            isActive: couponData.isActive,
        });
        setOpened(true);
    };

    const handleSubmit = (values) => {
        const payload = { ...values, code: values.code.toUpperCase() };
        
        if (editingId) {
            dispatch(editCoupon({ id: editingId, couponData: payload }))
                .unwrap()
                .then(() => {
                    notifications.show({
                        title: 'Success',
                        message: 'Coupon updated successfully! 🎉',
                        color: 'green',
                        autoClose: 3000,
                    });
                    setOpened(false);
                })
                .catch((err) => {
                    notifications.show({
                        title: 'Error',
                        message: err || 'Failed to update coupon',
                        color: 'red',
                    });
                });
        } else {
            dispatch(addCoupon(payload))
                .unwrap()
                .then(() => {
                    notifications.show({
                        title: 'Success',
                        message: 'New Coupon active now! 🎟️',
                        color: 'teal',
                        autoClose: 3000,
                    });
                    setOpened(false);
                })
                .catch((err) => {
                    notifications.show({
                        title: 'Error',
                        message: err || 'Failed to create coupon',
                        color: 'red',
                    });
                });
        }
    };

    const handleDeleteClick = (id) => {
        setCouponToDelete(id);
        setDeleteModalOpened(true);
    };

    const handleConfirmDelete = () => {
        if (couponToDelete) {
            dispatch(removeCoupon(couponToDelete))
                .unwrap()
                .then(() => {
                    notifications.show({
                        title: 'Deleted',
                        message: 'Coupon removed successfully.',
                        color: 'blue',
                        autoClose: 3000,
                    });
                    setDeleteModalOpened(false);
                    setCouponToDelete(null);
                })
                .catch((err) => {
                    notifications.show({
                        title: 'Error',
                        message: err || 'Failed to delete coupon',
                        color: 'red',
                    });
                });
        }
    };

    return (
        <Box pos="relative" p="md">
            <LoadingOverlay visible={loading} overlayBlur={2} />
            
            <Group justify="space-between" mb="xl">
                <Title order={2}>Coupon Codes & Promotions</Title>
                <Button 
                    leftSection={<IconPlus size={16} />} 
                    onClick={handleOpenAddModal}
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    Create New Coupon
                </Button>
            </Group>

            <CouponFormModal 
                opened={opened}
                onClose={() => setOpened(false)}
                form={form}
                onSubmit={handleSubmit}
                editingId={editingId}
            />

            <ConfirmModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Coupon"
                confirmText="Yes, Delete"
                cancelText="No, Keep It"
                loading={loading}
            >
                Are you sure you want to delete this coupon? This action cannot be undone and customers will no longer be able to use this discount code.
            </ConfirmModal>

            <CouponsTable 
                coupons={coupon}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteClick} 
            />
        </Box>
    );
}