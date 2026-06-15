
import React from 'react';
import { Button as MantineButton } from '@mantine/core';

const Button = ({ 
    children, 
    variant = 'filled', 
    color = '#f26c23',
    isLoading = false, 
    leftIcon, 
    ...props 
}) => {
    return (
        <MantineButton
            variant={variant}
            color={color}
            loading={isLoading}
            leftSection={leftIcon}
            {...props}
        >
            {children}
        </MantineButton>
    );
};

export default Button;