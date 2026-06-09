
import React from 'react';
import { Spinner as ChakraSpinner, Center, Text, VStack } from '@chakra-ui/react';

const Spinner = ({ label = "Loading...", ...props }) => {
    return (
        <Center py={10} w="100%">
        <VStack>
            <ChakraSpinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            {...props}
            />
            {label && <Text color="gray.500" fontSize="sm">{label}</Text>}
        </VStack>
        </Center>
    );
};

export default Spinner;