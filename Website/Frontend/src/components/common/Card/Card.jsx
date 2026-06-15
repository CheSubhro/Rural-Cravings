
import React from 'react';
import { Card as MantineCard } from '@mantine/core';

const Card = ({ children, ...props }) => (
    <MantineCard 
        padding="lg" 
        radius="md" 
        withBorder 
        shadow="sm"
        {...props}
    >
        {children}
    </MantineCard>
);

export default Card;