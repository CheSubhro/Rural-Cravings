
import { NavLink, Stack, Text, Box } from '@mantine/core';
import { 
  IconDashboard, IconUsers, IconShoppingBag, IconCategory, 
  IconChefHat, IconTruck, IconChartBar, IconSettings,
  IconArticle, IconTicket 
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from "react-redux";

const Sidebar = () => {

    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const allMenuItems = [

        { label: 'Dashboard', icon: IconDashboard, link: '/', roles: ['Admin', 'Manager'] },
        { label: 'Users', icon: IconUsers, link: '/users', roles: ['Admin'] },
        { label: 'Customers', icon: IconUsers, link: '/customers', roles: ['Admin', 'Manager'] },
        { label: 'Category', icon: IconCategory, link: '/categories', roles: ['Admin', 'Manager'] },
        { label: 'Food Items', icon: IconChefHat, link: '/food-items', roles: ['Admin', 'Manager'] },
        { label: 'Orders', icon: IconShoppingBag, link: '/orders', roles: ['Admin', 'Manager', 'Delivery'] },
        { label: 'Coupons', icon: IconTicket, link: '/coupons', roles: ['Admin', 'Manager'] },
        { label: 'Blogs Management', icon: IconArticle, link: '/blogs', roles: ['Admin', 'Manager'] },
        { label: 'Delivery', icon: IconTruck, link: '/delivery', roles: ['Admin', 'Manager'] },
        { label: 'Reports', icon: IconChartBar, link: '/reports', roles: ['Admin', 'Manager'] },

    ];

    const filteredMenuItems = allMenuItems.filter(item => 
        item.roles.includes(user?.role)
    );

    return (
        <Box 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: 'calc(100vh - 120px)', 
                justifyContent: 'space-between',
                padding: '16px'
            }}
        >
            <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="sm">
                    Main Menu
                </Text>
                
                {filteredMenuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        label={item.label}
                        component={Link}
                        to={item.link}
                        leftSection={<item.icon size={20} stroke={1.5} />}
                        active={location.pathname === item.link}
                        variant="filled" 
                        py={9}
                        style={{ borderRadius: '8px' }}
                    />
                ))}
            </Stack>

            <Box style={{ paddingTop: '12px', borderTop: '1px solid #f1f3f5' }}>
                {(user?.role === 'Admin' || user?.role === 'Manager') && (
                    <NavLink
                        label="Settings"
                        component={Link}
                        to="/settings"
                        leftSection={<IconSettings size={20} stroke={1.5} />}
                        active={location.pathname === '/settings'}
                        variant="filled" 
                        py={9}
                        style={{ borderRadius: '8px' }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;