
import React from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

const Badge = ({ variant, status, children, ...props }) => {
    const rawKey = (variant || status || 'info').toLowerCase();

    const activeKey = rawKey === 'inactive' ? 'warning' : rawKey;

    const colorSchemes = {
        success: { bg: 'green.50', color: 'green.700', border: '1px solid', borderColor: 'green.200' },
        danger: { bg: 'red.50', color: 'red.700', border: '1px solid', borderColor: 'red.200' },
        error: { bg: 'red.50', color: 'red.700', border: '1px solid', borderColor: 'red.200' },
        warning: { bg: 'amber.50', color: 'amber.700', border: '1px solid', borderColor: 'amber.200' }, // 👈 ইনঅ্যাক্টিভ এখন এই কালার পাবে
        info: { bg: 'blue.50', color: 'blue.700', border: '1px solid', borderColor: 'blue.200' },
    };

    const styles = colorSchemes[activeKey] || { bg: 'gray.50', color: 'gray.600', border: '1px solid', borderColor: 'gray.200' };

    return (
        <ChakraBadge
            {...styles}
            px="2.5"
            py="0.5"
            borderRadius="full"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="center"
            {...props}
        >
            {children}
        </ChakraBadge>
    );
};

export default Badge;
