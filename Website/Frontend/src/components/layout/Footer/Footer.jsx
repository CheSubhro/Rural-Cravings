

import React from 'react';
import { Box, Stack, Text, Link, HStack } from '@chakra-ui/react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box 
            as="footer" 
            bg="#f8fafc" // Soft and premium metallic gray background
            color="gray.500" 
            borderTop="1px solid" 
            borderColor="gray.100"
            w="100%"
            mt="auto" // Forces footer to the bottom of the layout structure
        >
            <Stack 
                maxW="6xl" 
                mx="auto"
                px="6"
                py="6" 
                direction={{ base: 'column', sm: 'row' }} 
                spaceY={{ base: '3', sm: '0' }} // Supplies structural vertical spacing on mobile viewports
                justify="space-between" 
                align="center"
            >
                {/* ©️ Copyright Text Label */}
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    &copy; {currentYear} <Box as="span" fontWeight="bold" color="blue.600">CheSubhro</Box>. All rights reserved.
                </Text>

                {/* 🔗 Social Media Action Anchors (Targeted externally, standard routing preventions omitted) */}
                <HStack spaceX="6">
                    <Link 
                        href="https://github.com/CheSubhro" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        fontSize="lg"
                        color="gray.500"
                        _hover={{ color: "blue.600", transform: "scale(1.1)" }}
                        transition="all 0.2s"
                    >
                        <FiGithub />
                    </Link>
                    
                    <Link 
                        href="#" 
                        fontSize="lg"
                        color="gray.500"
                        _hover={{ color: "sky.500", transform: "scale(1.1)" }}
                        transition="all 0.2s"
                    >
                        <FiTwitter />
                    </Link>
                    
                    <Link 
                        href="#" 
                        fontSize="lg"
                        color="gray.500"
                        _hover={{ color: "blue.700", transform: "scale(1.1)" }}
                        transition="all 0.2s"
                    >
                        <FiLinkedin />
                    </Link>
                </HStack>
            </Stack>
        </Box>
    );
};

export default Footer;