
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button, Box, LoadingOverlay, Container, Paper, Divider, Text } from '@mantine/core';
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
        form.setValues({
            code: '',
            discountPercentage: 10,
            minOrderAmount: 0,
            expiryDate: null,
            isActive: true,
        });
        setOpened(true);
    };

    const handleOpenEditModal = (couponData) => {

        setEditingId(couponData._id);
        
        form.setValues({
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
        
        const action = editingId ? editCoupon({ id: editingId, couponData: payload }) : addCoupon(payload);
        
        dispatch(action)
            .unwrap()
            .then(() => {
                notifications.show({
                    title: 'Success',
                    message: editingId ? 'Coupon updated successfully! 🎉' : 'New Coupon active now! 🎟️',
                    color: 'green',
                });
                setOpened(false);
            })
            .catch((err) => {
                notifications.show({ title: 'Error', message: err || 'Operation failed', color: 'red' });
            });
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
                    notifications.show({ title: 'Deleted', message: 'Coupon removed successfully.', color: 'blue' });
                    setDeleteModalOpened(false);
                });
        }
    };

    return (
        
        <Container size="xl" py="xl" pos="relative">
            <LoadingOverlay visible={loading} overlayBlur={2} />
            
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb="xl">
                <div>
                    <Title order={1} fw={800} c="dark.7">Coupon Codes & Promotions</Title>
                    <Text size="sm" c="dimmed">Manage your discount codes and promotional offers.</Text>
                </div>
                <Button 
                    leftSection={<IconPlus size={16} />} 
                    onClick={handleOpenAddModal}
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    Create New Coupon
                </Button>
            </Box>

            <Divider mb="xl" />

            <CouponFormModal 
                key={editingId ? `edit-${editingId}` : 'add-new'}
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
                Are you sure you want to delete this coupon? This action cannot be undone.
            </ConfirmModal>

            <Paper withBorder shadow="sm" p="xl" radius="md">
                <Title order={3} mb="lg">All Coupons</Title>
                <CouponsTable 
                    coupons={coupon}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteClick} 
                />
            </Paper>
        </Container>
    );
}