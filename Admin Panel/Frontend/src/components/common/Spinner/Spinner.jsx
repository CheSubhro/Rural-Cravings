
import React from 'react';
import { Loader, Center, Text, Stack } from '@mantine/core';

const Spinner = ({ label = "Loading...", ...props }) => {
    return (
        <Center py="xl" w="100%">
            <Stack align="center" gap="xs">
                <Loader 
                    type="oval" 
                    color="blue" 
                    size="xl" 
                    {...props} 
                />
                {label && <Text size="sm" c="dimmed">{label}</Text>}
            </Stack>
        </Center>
    );
};

export default Spinner;