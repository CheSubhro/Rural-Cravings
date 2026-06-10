
import React from 'react';
import { Group, Burger, Text, ThemeIcon, Avatar, Menu, UnstyledButton } from '@mantine/core';
import { IconChefHat, IconLogout, IconUser } from '@tabler/icons-react'; 
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ opened, toggle }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Group 
            h="100%" 
            px="md" 
            justify="space-between"
            style={{ 
                backgroundColor: '#e9ecef',
                borderBottom: '2px solid #dee2e6'
            }}
        >
            {/* Left Side: Logo and Burger Menu */}
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                
                <Group gap="xs">
                    <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>
                        <IconChefHat size={20} />
                    </ThemeIcon>
                    <Text 
                        size="xl" 
                        fw={900} 
                        variant="gradient" 
                        gradient={{ from: 'red', to: 'orange', deg: 45 }}
                        style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                    >
                        Rural Cravings
                    </Text>
                    <Text size="xs" fw={700} c="dimmed" style={{ marginTop: '10px' }} visibleFrom="sm">
                        ADMIN PANEL
                    </Text>
                </Group>
            </Group>

            {/* Right Side: Avatar, Name, ebong Logout Dropdown (Only shown if user exists) */}
            {user && (
                <Menu shadow="md" width={220} radius="md" position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
                    <Menu.Target>
                        <UnstyledButton style={{ padding: '4px 8px', borderRadius: '8px' }}>
                            <Group gap="xs" style={{ cursor: 'pointer' }}>
                                {/* Avatar Image Component */}
                                <Avatar 
                                    src={user.avatar} // Cloud storage text path from backend
                                    alt={user.fullName} 
                                    radius="xl" 
                                    color="orange"
                                >
                                    {user.fullName?.charAt(0).toUpperCase()}
                                </Avatar>
                                
                                <div style={{ display: 'block' }} className="user-info-text">
                                    <Text size="sm" fw={700} c="dark.7" lh={1.2}>
                                        {user.fullName}
                                    </Text>
                                    <Text size="xs" c="dimmed" lh={1}>
                                        {user.role}
                                    </Text>
                                </div>
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Account Session</Menu.Label>
                        <Menu.Item 
                            leftSection={<IconUser size={16} stroke={1.5} />}
                            onClick={() => navigate('/profile')}
                        >
                            My Profile
                        </Menu.Item>
                        
                        <Menu.Divider />
                        
                        <Menu.Item 
                            color="red" 
                            leftSection={<IconLogout size={16} stroke={1.5} />}
                            onClick={handleLogout}
                        >
                            Logout Account
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            )}
        </Group>
    );
};

export default Navbar;