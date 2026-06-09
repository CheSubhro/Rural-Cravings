
import React from 'react';
import { Dialog, Button, HStack, Text } from '@chakra-ui/react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    ...props
}) => {
    return (
        <Dialog.Root 
            open={isOpen} 
            onOpenChange={(e) => !e.open && onClose?.()}
            closeOnInteractOutside={false}
            size="sm"
            {...props}
        >
            <Dialog.Backdrop />
            
            <Dialog.Positioner>
                <Dialog.Content borderRadius="xl" p="4" bg="white" boxShadow="2xl">
                    
                    {/* Modal Header & Title */}
                    <Dialog.Header>
                        <Dialog.Title fontWeight="bold" fontSize="lg" color="red.600">
                            ⚠️ {title}
                        </Dialog.Title>
                    </Dialog.Header>

                    {/* Modal Body Content */}
                    <Dialog.Body py="3">
                        <Text color="gray.600" fontSize="sm">
                            {children || "Do you really want to perform this action? This process cannot be undone."}
                        </Text>
                    </Dialog.Body>

                    {/* Modal Footer Action Buttons */}
                    <Dialog.Footer mt="4">
                        <HStack spaceX="3" justify="flex-end" w="100%">
                            {/* Cancel Button */}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={onClose}
                                disabled={loading}
                                cursor="pointer"
                            >
                                {cancelText}
                            </Button>
                            
                            {/* Confirm Button */}
                            <Button 
                                bg="red.600" 
                                color="white" 
                                size="sm" 
                                onClick={onConfirm}
                                loading={loading}
                                _hover={{ bg: "red.700" }}
                                cursor="pointer"
                            >
                                {confirmText}
                            </Button>
                        </HStack>
                    </Dialog.Footer>

                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default ConfirmModal;