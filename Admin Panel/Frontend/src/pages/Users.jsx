
import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Divider, Box, Table, Group, Avatar, ActionIcon, Tooltip, LoadingOverlay } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { registerUser, fetchAllStaffs,updateStaff,deleteStaff } from '../store/authSlice'; 
import AddStaffForm from '../features/auth/AddStaffForm'; 
import { Modal, Badge, Button } from '../components/common';

const Users = () => {

    const dispatch = useDispatch();
    const { isLoading, staffs = [] } = useSelector((state) => state.auth); 
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        role: 'Staff',
        avatar: null,
        coverImage: null
    });

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

    const handleCloseModal = () => {
        closeModal();
        clearForm();
        setIsEditing(false);
        setSelectedStaffId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isEditing && !formData.avatar) {
            notifications.show({ title: 'Validation Error', message: 'Profile avatar image is required', color: 'red' });
            return;
        }

        const multipartData = new FormData();
        multipartData.append('fullName', formData.fullName);
        multipartData.append('username', formData.username.toLowerCase().trim());
        multipartData.append('email', formData.email.trim());
        multipartData.append('role', formData.role);

        if (formData.password && formData.password.trim() !== '') {
            multipartData.append('password', formData.password);
        }
        
        if (formData.avatar) {
            multipartData.append('avatar', formData.avatar);
        }
        if (formData.coverImage) {
            multipartData.append('coverImage', formData.coverImage);
        }

        try {
            if (isEditing) {
                
                await dispatch(updateStaff({ id: selectedStaffId, data: multipartData })).unwrap();
                
                notifications.show({
                    title: 'Success',
                    message: `${formData.fullName}'s profile has been updated!`,
                    color: 'green',
                    autoClose: 3000,
                });
            } else {
                await dispatch(registerUser(multipartData)).unwrap();
                
                notifications.show({
                    title: 'Success',
                    message: `${formData.fullName} has been registered as ${formData.role}!`,
                    color: 'green',
                    autoClose: 3000,
                });
            }

            handleCloseModal();
            dispatch(fetchAllStaffs()); 
        } catch (err) {
            notifications.show({
                title: isEditing ? 'Update Failed' : 'Registration Failed',
                message: typeof err === 'string' ? err : err?.message || 'Something went wrong',
                color: 'red',
                autoClose: 4000
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

    const handleEditClick = (staff) => {
        setIsEditing(true);
        setSelectedStaffId(staff._id);
        setFormData({
            fullName: staff.fullName,
            email: staff.email,
            username: staff.username,
            password: '',
            role: staff.role,
            avatar: null,
            coverImage: null
        });
        openModal();
    };

    const handleDeleteStaff = async (staffId, staffName) => {
        if (window.confirm(`Are you sure you want to remove access for ${staffName}?`)) {
            try {
                await dispatch(deleteStaff(staffId)).unwrap();
                notifications.show({ 
                    title: 'Access Revoked', 
                    message: `${staffName}'s access has been successfully removed.`, 
                    color: 'green' 
                });
            } catch (err) {
                notifications.show({ 
                    title: 'Error', 
                    message: typeof err === 'string' ? err : err?.message || 'Failed to delete staff', 
                    color: 'red' 
                });
            }
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
                    onClick={() => { setIsEditing(false); openModal(); }} 
                    style={{ backgroundColor: '#f26c23' }} 
                    size="md"
                    radius="md"
                >
                    + Add New Staff
                </Button>
            </Box>

            <Divider mb="xl" />

            {/* Register/Update Staff Modal */}
            <Modal
                isOpen={modalOpened}
                onClose={handleCloseModal}
                title={
                    <Title order={3} fw={700} style={{ fontSize: '22px' }}>
                        {isEditing ? 'Update Staff Member' : 'Register New Staff'}
                    </Title>
                }
                size="lg" 
            >
                <AddStaffForm 
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    isEditing={isEditing}
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
                                                    <ActionIcon color="blue" variant="light" size="lg" onClick={() => handleEditClick(staff)}>
                                                        <IconPencil size={18} stroke={1.5} />
                                                    </ActionIcon>
                                                </span>
                                            </Tooltip>
                                            <Tooltip label="Remove Access" position="top">
                                                <span>
                                                    <ActionIcon color="red" variant="light" size="lg" onClick={() => handleDeleteStaff(staff._id, staff.fullName)}>
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