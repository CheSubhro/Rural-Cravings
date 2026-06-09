
import React, { forwardRef } from 'react';
import { TextInput } from '@mantine/core';

const Input = forwardRef(({ label, error, helperText, ...props }, ref) => {
    return (
        <TextInput
            ref={ref}
            label={label}
            error={error}
            description={helperText}
            {...props}
        />
    );
});

Input.displayName = 'Input';
export default Input;