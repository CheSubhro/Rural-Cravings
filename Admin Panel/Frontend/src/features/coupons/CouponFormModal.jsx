
import React from 'react';
import { Modal, Stack, TextInput, NumberInput, Switch, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';

export default function CouponFormModal({ opened, onClose, form, onSubmit, editingId }) {
    
    return (

        <Modal 
            opened={opened} 
            onClose={onClose} 
            title={editingId ? "Edit Coupon Details" : "Generate Promotional Coupon"}
            centered
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack gap="sm">
                    <TextInput 
                        label="Coupon Code" 
                        placeholder="e.g. FESTIVE20" 
                        required 
                        {...form.getInputProps('code')}
                        styles={{ input: { textTransform: 'uppercase' } }}
                    />
                    <NumberInput 
                        label="Discount Percentage (%)" 
                        min={1} max={100} required
                        {...form.getInputProps('discountPercentage')}
                    />
                    <NumberInput 
                        label="Minimum Order Value" 
                        min={0}
                        {...form.getInputProps('minOrderAmount')}
                    />
                    <DateInput 
                        label="Expiry Date" 
                        placeholder="Select Date" 
                        required
                        minDate={new Date()}
                        {...form.getInputProps('expiryDate')}
                    />
                    <Switch 
                        label="Keep Coupon Active" 
                        mt="xs"
                        checked={form.values.isActive}
                        onChange={(event) => form.setFieldValue('isActive', event.currentTarget.checked)}
                    />
                    <Button type="submit" color="teal" fullWidth mt="md">
                        {editingId ? "Save Changes" : "Publish Coupon"}
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
}