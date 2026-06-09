
import { Group, Text, Anchor, Box } from '@mantine/core';

const Footer = () => {
    return (
        <Box 
            h="100%" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingRight: '20px',
                borderTop: '2px solid #dee2e6',    
                backgroundColor: '#e9ecef',        
                boxShadow: '0 -2px 5px rgba(0,0,0,0.05)' 
            }}
        >
            <Text size="sm" fw={500} c="dark">
                © 2026 Rural Cravings. All rights reserved.
            </Text>
            <Group gap="lg">
                <Anchor href="#" size="sm" c="blue" fw={600}>Privacy</Anchor>
                <Anchor href="#" size="sm" c="blue" fw={600}>Terms</Anchor>
            </Group>
        </Box>
    );
};

export default Footer;