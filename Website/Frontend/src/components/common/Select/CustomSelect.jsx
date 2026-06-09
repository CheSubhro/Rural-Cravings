
import React from 'react';
import { Box, Select, createListCollection } from '@chakra-ui/react';

const CustomSelect = ({ label, value, onValueChange, options = [], placeholder = "Select option", flex }) => {
    
    const collection = createListCollection({
        items: options.map(opt => ({
            label: opt.label || opt,
            value: opt.value || opt
        }))
    });

    return (
        <Box flex={flex || "1"}>
            {label && (
                <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
                    {label}
                </label>
            )}
            <Select.Root 
                collection={collection}
                value={[value]} 
                onValueChange={(details) => {
                    if (details.value && details.value.length > 0) {
                        onValueChange(details.value[0]);
                    }
                }}
            >
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.Content portal>
                    {collection.items.map((item) => (
                        <Select.Item 
                            key={item.value} 
                            item={item}
                        >
                            {item.label}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Box>
    );
};

export default CustomSelect;