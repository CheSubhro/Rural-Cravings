
import React from 'react';
import { Modal, Button, Group, Text, Title } from '@mantine/core';

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
        <Modal 
            opened={isOpen} 
            onClose={onClose} 
            title={
                <Title order={4} style={{ color: '#e03131', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⚠️ {title}
                </Title>
            }
            centered
            size="sm"
            {...props}
        >
            <Text size="sm" color="dimmed" mb="lg">
                {children || "Do you really want to perform this action? This process cannot be undone."}
            </Text>

            <Group justify="flex-end" mt="xl">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onClose} 
                    disabled={loading}
                >
                    {cancelText}
                </Button>
                
                <Button 
                    color="red" 
                    size="sm" 
                    onClick={onConfirm} 
                    loading={loading}
                >
                    {confirmText}
                </Button>
            </Group>
        </Modal>
    );
};

export default ConfirmModal;