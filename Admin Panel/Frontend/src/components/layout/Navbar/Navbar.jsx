
// src/components/layout/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Button, HStack, Link, Stack } from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    // 🆕 In v3, managing the mobile drawer/menu state using a basic React state is recommended over useDisclosure
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Consolidated navigation links array
    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products' },
        { label: 'About', path: '/about' },
    ];

    return (
        <Box 
            bg="white" 
            px={{ base: "4", md: "6" }} // 🆕 Slightly reduced mobile padding to 4 to prevent icons from touching the viewport edges
            boxShadow="sm" 
            position="sticky" 
            top="0" 
            zIndex="1000" 
            borderBottom="1px solid" 
            borderColor="gray.100"
        >
            {/* 🆕 Explicitly set w="100%" alongside h="16" to ensure contents stay perfectly contained within the viewport */}
            <Flex h="16" w="100%" alignItems="center" justifyContent="space-between">
                
                {/* 📱 Modern toggle button for mobile screens */}
                <Box 
                    display={{ base: 'block', md: 'none' }} 
                    onClick={toggleMenu} 
                    fontSize="2xl" 
                    cursor="pointer"
                    color="gray.700"
                    mr="2" // 🆕 Added a subtle right margin for structural breathing room on smaller viewports
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </Box>
                
                {/* 🏷️ Brand Logo and Desktop Menu */}
                <HStack spaceX={{ base: "2", md: "8" }} alignItems="center"> {/* 🆕 Optimized spacing for narrow mobile displays */}
                    <Box 
                        as={RouterLink} 
                        to="/" 
                        fontWeight="extrabold" 
                        fontSize={{ base: "lg", md: "xl" }} // 🆕 Scaled down logo font size slightly (lg) on mobile viewports
                        color="blue.600"
                        letterSpacing="tight"
                        _hover={{ textDecoration: 'none' }}
                    >
                        CheSubhro
                    </Box>

                    {/* 💻 Desktop Navigation */}
                    <HStack as="nav" spaceX="6" display={{ base: 'none', md: 'flex' }}>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                as={RouterLink} 
                                to={link.path}
                                fontWeight="medium"
                                color="gray.600"
                                fontSize="sm"
                                transition="all 0.2s"
                                _hover={{ color: "blue.600", textDecoration: "none" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </HStack>
                </HStack>

                {/* 🔑 Right Side Action Button */}
                {/* 🆕 Kept at minW="fit-content" inside the flex container to guarantee the action element never squishes or breaks onto new lines */}
                <Flex alignItems="center" minW="fit-content"> 
                    <Button 
                        as={RouterLink}
                        to="/login"
                        bg="blue.600" 
                        color="white"
                        size="sm" 
                        borderRadius="lg"
                        px={{ base: "3", md: "5" }} // 🆕 Compressed horizontal padding to 3 on mobile for a tighter, cleaner button footprint
                        fontWeight="semibold"
                        _hover={{ bg: "blue.700" }}
                        boxShadow="0 4px 12px rgba(37, 99, 235, 0.15)"
                    >
                        Login
                    </Button>
                </Flex>
            </Flex>

            {/* Mobile Menu Content */}
            {isOpen && (
                <Box pb="4" display={{ md: 'none' }}>
                    <Stack as="nav" spaceY="3" mt="2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                as={RouterLink} 
                                to={link.path}
                                onClick={toggleMenu}
                                fontWeight="medium"
                                color="gray.700"
                                py="2"
                                px="3"
                                borderRadius="md"
                                _hover={{ bg: "blue.50", color: "blue.600", textDecoration: "none" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default Navbar;