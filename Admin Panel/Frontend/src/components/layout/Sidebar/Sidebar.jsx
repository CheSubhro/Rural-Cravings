
import { NavLink, Stack, Text, Box } from '@mantine/core';
import { 
  IconDashboard, IconUsers, IconShoppingBag, IconCategory, 
  IconChefHat, IconTruck, IconChartBar, IconSettings,
  IconArticle 
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', icon: IconDashboard, link: '/' },
        { label: 'Users', icon: IconUsers, link: '/users' },
        { label: 'Customers', icon: IconUsers, link: '/customers' },
        { label: 'Category', icon: IconCategory, link: '/categories' },
        { label: 'Food Items', icon: IconChefHat, link: '/food-items' },
        { label: 'Orders', icon: IconShoppingBag, link: '/orders' },
        { label: 'Blogs Management', icon: IconArticle, link: '/blogs' },
        { label: 'Delivery', icon: IconTruck, link: '/delivery' },
        { label: 'Reports', icon: IconChartBar, link: '/reports' },
    ];

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
                
                {menuItems.map((item) => (
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
            </Box>
        </Box>
    );
};

export default Sidebar;