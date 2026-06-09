
import React from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

const Tooltip = ({ label, children, ...props }) => {
    return (
        <ChakraTooltip 
            label={label} 
            hasArrow 
            placement="top" 
            bg="gray.700" 
            color="white"
            borderRadius="md"
            {...props}
        >
            {/* Tooltip wrapping children must be a single element */}
            <span>{children}</span>
        </ChakraTooltip>
    );
};

export default Tooltip;