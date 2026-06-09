
import React from 'react';
import { Group, Burger, Text, ThemeIcon } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react'; 

const Navbar = ({ opened, toggle }) => {
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
            <Text size="xs" fw={700} c="dimmed" style={{ marginTop: '10px' }}>
                ADMIN PANEL
            </Text>
            </Group>
        </Group>

        </Group>
    );
};

export default Navbar;