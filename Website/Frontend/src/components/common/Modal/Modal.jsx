
import React from 'react';
import { Dialog } from '@chakra-ui/react';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer, 
    size = 'md', 
    ...props 
}) => {
    return (
        <Dialog.Root 
            open={isOpen} 
            onOpenChange={(e) => !e.open && onClose?.()} 
            size={size} 
            motionPreset="slide-in-bottom"
            {...props}
        >
            <Dialog.Backdrop />
            
            <Dialog.Positioner>
                <Dialog.Content borderRadius="xl" boxShadow="2xl" p="2">
                    
                    {/* Header and Title Section */}
                    {title && (
                        <Dialog.Header>
                            <Dialog.Title fontWeight="bold" fontSize="lg" color="slate.800">
                                {title}
                            </Dialog.Title>
                        </Dialog.Header>
                    )}
                    
                    {/* 🆕 Dialog.CloseTrigger replaces ModalCloseButton */}
                    <Dialog.CloseTrigger position="absolute" top="4" right="4" cursor="pointer" />
                    
                    {/* 🆕 Dialog.Body replaces ModalBody */}
                    <Dialog.Body pb="6" pt="2">
                        {children}
                    </Dialog.Body>
                    
                    {/* 🆕 Dialog.Footer replaces ModalFooter */}
                    {footer && (
                        <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt="4">
                            {footer}
                        </Dialog.Footer>
                    )}
                    
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default Modal;