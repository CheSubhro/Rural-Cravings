
import React, { useEffect, useState } from 'react';
import { 
    Container, Paper, Avatar, Text, Title, Group, 
    Badge, Stack, Box, Center, Button, Modal, PasswordInput 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'; 
import { notifications } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, changePassword } from '../store/authSlice'; 
import { Spinner } from '../components/common'; 
import { IconMail, IconUser, IconShieldLock, IconLock } from '@tabler/icons-react';

const Profile = () => {

    const dispatch = useDispatch();
    const { user: rawUser, isLoading } = useSelector((state) => state.auth);
    
    const [opened, { open, close }] = useDisclosure(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const user = rawUser?.user || rawUser;

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, user]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            notifications.show({
                title: 'Validation Error',
                message: 'New passwords do not match!',
                color: 'red',
                position: 'top-right'
            });
            return;
        }
    
        dispatch(changePassword({ oldPassword: currentPassword, newPassword }))
            .unwrap()
            .then(() => {
                notifications.show({
                    title: 'Success',
                    message: 'Password updated successfully!',
                    color: 'green',
                    position: 'top-right'
                });
    
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                close(); 
            })
            .catch((backendErrorMessage) => {
                notifications.show({
                    title: 'Authentication Failed',
                    message: backendErrorMessage,
                    color: 'red', 
                    position: 'top-right' 
                });
            });
    };

    if (isLoading) {
        return (
            <Center style={{ height: '70vh' }}>
                <Spinner size="xl" />
            </Center>
        );
    }

    if (!user) {
        return (
            <Container size="sm" mt="xl">
                <Paper p="xl" withBorder radius="md" ta="center" shadow="xs">
                    <Text fw={600} c="dimmed">
                        Session Expired or Profile Data Unreachable. Please try signing in again.
                    </Text>
                </Paper>
            </Container>
        );
    }

    return (
        <Container size="md" py="xl">
            <Paper withBorder radius="xl" shadow="sm" bg="white" style={{ overflow: 'hidden' }}>
                
                <Box 
                    style={{ 
                        height: '180px', 
                        backgroundImage: user.coverImage ? `url(${user.coverImage})` : 'linear-gradient(45deg, #f26c23, #ff8c42)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }} 
                />

                <Box px={40} pb={40} style={{ marginTop: '-60px', position: 'relative' }}>
                    <Stack gap="md">
                        <Group align="flex-end" justify="space-between" wrap="nowrap">
                            <Avatar 
                                src={user.avatar} 
                                size={120} 
                                radius={120} 
                                style={{ border: '4px solid white', backgroundColor: '#e9ecef' }}
                                color="orange"
                            >
                                {user.fullName?.charAt(0).toUpperCase()}
                            </Avatar>

                            <Group gap="sm" align="center" style={{ transform: 'translateY(-10px)' }}>
                                <Badge 
                                    size="lg" 
                                    variant="gradient" 
                                    gradient={{ from: 'orange', to: 'red', deg: 45 }}
                                >
                                    {user.role}
                                </Badge>
                                
                                <Button variant="light" color="orange" onClick={open}>
                                    Change Password
                                </Button>
                            </Group>
                        </Group>

                        <Box mt="sm">
                            <Title order={2} fw={900} c="dark.7">{user?.fullName}</Title>
                            <Text c="dimmed" size="sm" fw={500}>@{user?.username}</Text>
                        </Box>

                        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />

                        <Stack gap="sm">
                            <Group gap="md">
                                <IconUser size={18} stroke={1.5} style={{ color: '#f26c23' }} />
                                <div>
                                    <Text size="xs" c="dimmed" fw={500}>Username</Text>
                                    <Text size="sm" fw={600}>{user?.username}</Text>
                                </div>
                            </Group>

                            <Group gap="md">
                                <IconMail size={18} stroke={1.5} style={{ color: '#f26c23' }} />
                                <div>
                                    <Text size="xs" c="dimmed" fw={500}>Email Address</Text>
                                    <Text size="sm" fw={600}>{user?.email}</Text>
                                </div>
                            </Group>

                            <Group gap="md">
                                <IconShieldLock size={18} stroke={1.5} style={{ color: '#f26c23' }} />
                                <div>
                                    <Text size="xs" c="dimmed" fw={500}>Account Permission Role</Text>
                                    <Text size="sm" fw={600}>{user?.role}</Text>
                                </div>
                            </Group>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>

            <Modal 
                opened={opened} 
                onClose={close} 
                title={<Text fw={700} size="lg">Change Password</Text>}
                centered
                radius="md"
                shadow="md"
            >
                <form onSubmit={handlePasswordChange}>
                    <Stack gap="sm">
                        <PasswordInput
                            label="Current Password"
                            placeholder="Enter current password"
                            required
                            leftSection={<IconLock size={16} stroke={1.5} />}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <PasswordInput
                            label="New Password"
                            placeholder="Enter new password"
                            required
                            leftSection={<IconLock size={16} stroke={1.5} />}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <PasswordInput
                            label="Confirm New Password"
                            placeholder="Confirm your new password"
                            required
                            leftSection={<IconLock size={16} stroke={1.5} />}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" color="gray" onClick={close}>
                                Cancel
                            </Button>
                            <Button type="submit" color="orange">
                                Update Password
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </Container>
    );
};

export default Profile;