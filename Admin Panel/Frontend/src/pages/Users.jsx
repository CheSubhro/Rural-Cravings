
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, Group, Avatar, ActionIcon, Tooltip, LoadingOverlay } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';

// অ্যাকশন এবং কম্পোনেন্ট ইম্পোর্ট
import { registerUser, fetchAllStaffs } from '../store/authSlice'; 
import AddStaffForm from '../features/auth/AddStaffForm'; // 👈 নতুন ফর্মটি ইম্পোর্ট করলাম
import { Modal, Badge, Button } from '../components/common';

const Users = () => {
    const dispatch = useDispatch();
    const { isLoading, staffs = [] } = useSelector((state) => state.auth); 
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

    // সেন্ট্রালাইজড ফর্ম স্টেট
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        role: 'Staff',
        avatar: null,
        coverImage: null
    });

    // পেজ লোড হলে টিম ডিরেক্টরি ফেচ হবে
    useEffect(() => {
        dispatch(fetchAllStaffs());
    }, [dispatch]);

    const clearForm = () => {
        setFormData({
            fullName: '',
            email: '',
            username: '',
            password: '',
            role: 'Staff',
            avatar: null,
            coverImage: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.avatar) {
            notifications.show({ title: 'Validation Error', message: 'Profile avatar image is required', color: 'red' });
            return;
        }

        const multipartData = new FormData();
        multipartData.append('fullName', formData.fullName);
        multipartData.append('username', formData.username.toLowerCase().trim());
        multipartData.append('email', formData.email.trim());
        multipartData.append('password', formData.password);
        multipartData.append('role', formData.role);
        multipartData.append('avatar', formData.avatar);
        if (formData.coverImage) {
            multipartData.append('coverImage', formData.coverImage);
        }

        try {
            await dispatch(registerUser(multipartData)).unwrap();
            
            notifications.show({
                title: 'Success',
                message: `${formData.fullName} has been registered as ${formData.role}!`,
                color: 'green',
                autoClose: 3000,
            });

            clearForm();
            closeModal();
            dispatch(fetchAllStaffs()); // লিস্ট রিফ্রেশ
        } catch (err) {
            notifications.show({
                title: 'Registration Failed',
                message: typeof err === 'string' ? err : err?.message || 'Something went wrong',
                color: 'red',
            });
        }
    };

    const getRoleColor = (userRole) => {
        switch (userRole) {
            case 'Admin': return 'danger';
            case 'Manager': return 'info';
            default: return 'success';
        }
    };

    return (
        <Container size="xl" py="xl">
            {/* Header */}
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb="xl">
                <div>
                    <Title order={1} fw={800} lts={-0.5} c="dark.7">Staff & Users Directory</Title>
                    <Text size="sm" c="dimmed">Manage system roles, kitchen staff, and administrative access for Rural Cravings</Text>
                </div>
                <Button 
                    onClick={openModal} 
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    + Add New Staff
                </Button>
            </Box>

            <Divider mb="xl" />

            {/* Register Staff Modal */}
            <Modal
                isOpen={modalOpened}
                onClose={() => { closeModal(); clearForm(); }}
                title={<Title order={3} fw={700} style={{ fontSize: '22px' }}>Register New Staff</Title>}
                size="lg" // ফর্ম বড় হওয়ায় মডালের সাইজ lg করা হলো
            >
                <AddStaffForm 
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </Modal>

            {/* Users Table List */}
            <Paper withBorder shadow="sm" p="xl" radius="md" pos="relative">
                <LoadingOverlay visible={isLoading} overlayProps={{ blur: 1 }} loaderProps={{ color: '#f26c23', type: 'oval' }} />
                
                <Title order={3} mb="lg">Active Management Team</Title>

                <Table striped highlightOnHover verticalSpacing="md">
                    <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                        <Table.Tr>
                            <Table.Th style={{ padding: '12px' }}>Staff Member</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th style={{ textAlign: 'center', width: '120px' }}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {staffs.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={4} ta="center" py="xl">
                                    <Text c="dimmed" size="sm">No registered staff found.</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            staffs.map((staff) => (
                                <Table.Tr key={staff._id}>
                                    <Table.Td style={{ padding: '12px' }}>
                                        <Group gap="sm">
                                            <Avatar src={staff.avatar} radius="xl" size="md" alt={staff.fullName} shadow="xs" />
                                            <div>
                                                <Text fw={600} size="sm">{staff.fullName}</Text>
                                                <Text size="xs" c="dimmed">@{staff.username}</Text>
                                            </div>
                                        </Group>
                                    </Table.Td>

                                    <Table.Td>
                                        <Text size="sm">{staff.email}</Text>
                                    </Table.Td>

                                    <Table.Td>
                                        <Badge status={getRoleColor(staff.role)}>
                                            {staff.role}
                                        </Badge>
                                    </Table.Td>

                                    <Table.Td>
                                        <Group gap="xs" justify="center">
                                            <Tooltip label="Edit Staff Role" position="top">
                                                <span>
                                                    <ActionIcon color="blue" variant="light" size="lg">
                                                        <IconPencil size={18} stroke={1.5} />
                                                    </ActionIcon>
                                                </span>
                                            </Tooltip>
                                            <Tooltip label="Remove Access" position="top">
                                                <span>
                                                    <ActionIcon color="red" variant="light" size="lg">
                                                        <IconTrash size={18} stroke={1.5} />
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

    export default Users;