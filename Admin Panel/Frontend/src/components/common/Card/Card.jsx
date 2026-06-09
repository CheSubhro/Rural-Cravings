

import { Box } from '@chakra-ui/react';

const Card = ({ children, ...props }) => (
    <Box 
        p={5} 
        shadow="md" 
        borderWidth="1px" 
        borderRadius="lg" 
        bg="white" 
        {...props}
    >
        {children}
    </Box>
);
export default Card;