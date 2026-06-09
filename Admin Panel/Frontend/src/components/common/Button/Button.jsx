
import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

/**
 * @param {string} variant - 'solid', 'outline', 'ghost', 'link'
 * @param {string} colorScheme - 'blue', 'red', 'green', etc.
 * @param {boolean} isLoading - Loading spinner dekhabor jonno
 * @param {any} leftIcon - Button-er bame icon thakle
 */
const Button = ({ 
    children, 
    variant = 'solid', 
    colorScheme = 'blue', 
    isLoading = false, 
    leftIcon, 
    ...props 
}) => {
    return (
        <ChakraButton
            variant={variant}
            colorScheme={colorScheme}
            isLoading={isLoading}
            leftIcon={leftIcon}
            // General props (onClick, type, disabled, etc.)
            {...props}
            >
            {children}
        </ChakraButton>
    );
};

export default Button;