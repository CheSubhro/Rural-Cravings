

import React from 'react';
import { Badge as MantineBadge } from '@mantine/core';

const Badge = ({ variant, status, children, ...props }) => {
    const rawKey = (variant || status || 'info').toLowerCase();
    const activeKey = rawKey === 'inactive' ? 'yellow' : rawKey;

    const colors = {
        success: 'green',
        danger: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
    };

    const color = colors[activeKey] || 'gray';

    return (
        <MantineBadge
            color={color}
            variant="light"
            radius="xl"
            tt="uppercase"
            fw={600}
            {...props}
        >
            {children}
        </MantineBadge>
    );
};

export default Badge;