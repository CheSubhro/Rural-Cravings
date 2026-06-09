
import React from 'react';
import { Box, Flex } from '@mantine/core';
import { Navbar, Footer } from '../components/layout/index'; 

const MainLayout = ({ children }) => {
    return (
        <Flex direction="column" mih="100vh">
            <Navbar />
            
            <Box component="main" style={{ flex: 1, padding: '16px' }}>
                {children}
            </Box>
            
            <Footer />
        </Flex>
    );
};

export default MainLayout;