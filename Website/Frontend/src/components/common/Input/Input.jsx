

import React, { forwardRef } from 'react';
import { Input as ChakraInput, Field } from '@chakra-ui/react';


const Input = forwardRef(({ label, error, helperText, ...props }, ref) => {
    return (
        <Field.Root invalid={!!error} mb="4">
            
            {label && (
                <Field.Label fontWeight="600" mb="1">
                    {label}
                </Field.Label>
            )}
            
            <ChakraInput
                ref={ref} 
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                _invalid={{ borderColor: "red.500", boxShadow: "0 0 0 1px #e53e3e" }}
                {...props}
            />

            {error && (
                <Field.ErrorText color="red.500" fontSize="sm" mt="1">
                    {error}
                </Field.ErrorText>
            )}

            {!error && helperText && (
                <Field.HelperText color="gray.500" fontSize="xs" mt="1">
                    {helperText}
                </Field.HelperText>
            )}
            
        </Field.Root>
    );
});

Input.displayName = 'Input';

export default Input;