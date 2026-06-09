
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Navbar, Footer } from '../components/layout/index'; 

const MainLayout = ({ children }) => {
    return (
        <Flex direction="column" minH="100vh">
            <Navbar />
                <Box as="main" flex="1" p={4}>
                    {children}
                </Box>
            <Footer />
        </Flex>
    );
};

export default MainLayout;