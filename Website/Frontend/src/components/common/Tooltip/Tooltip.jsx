
import React from 'react';
import { Tooltip as MantineTooltip } from '@mantine/core';

const Tooltip = ({ label, children, ...props }) => {
    return (
        <MantineTooltip 
            label={label} 
            withArrow 
            position="top" 
            bg="gray.700" 
            c="white"
            {...props}
        >
            {children}
        </MantineTooltip>
    );
};

export default Tooltip;