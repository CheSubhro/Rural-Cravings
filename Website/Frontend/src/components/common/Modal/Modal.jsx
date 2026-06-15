
import React from 'react';
import { Modal as MantineModal } from '@mantine/core';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md', ...props }) => {
    return (
        <MantineModal 
            opened={isOpen} 
            onClose={onClose} 
            title={title}
            size={size}
            centered
            {...props}
        >
            {children}
            {footer && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                    {footer}
                </div>
            )}
        </MantineModal>
    );
};

export default Modal;