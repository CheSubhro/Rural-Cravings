
import { VStack, Text, Icon } from '@chakra-ui/react';
import { FiInbox } from 'react-icons/fi'; // react-icons install 

const EmptyState = ({ message = "No Data Found" }) => (
    <VStack py={10} spacing={3}>
        <Icon as={FiInbox} w={12} h={12} color="gray.400" />
        <Text color="gray.500">{message}</Text>
    </VStack>
);
export default EmptyState;
