
import React from 'react';
import { Box, Select } from '@mantine/core';

const CustomSelect = ({ 
    label, 
    value, 
    onValueChange, 
    options = [], 
    placeholder = "Select option", 
    flex 
}) => {
    
    const data = options.map(opt => ({
        label: opt.label || opt,
        value: opt.value?.toString() || opt.toString() 
    }));

    return (
        <Box style={{ flex: flex || "1" }}>
            <Select
                label={label}
                placeholder={placeholder}
                data={data}
                value={value?.toString() || null}
                onChange={(selectedValue) => onValueChange(selectedValue)}
                searchable 
                clearable  
            />
        </Box>
    );
};

export default CustomSelect;