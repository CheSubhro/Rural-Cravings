
import React from 'react';
import { Card, Title, Stack, Switch } from '@mantine/core';

export default function OperationalSwitchesForm({ form }) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
            <Title order={4} mb="lg">Operational Switches</Title>
            <Stack spacing="xl">
                <Switch
                    label="Shop Operational Status (Open / Closed)"
                    description="Turning this off stops customers from placing any new orders instantly."
                    checked={form.values.isShopOpen}
                    onChange={(event) => form.setFieldValue('isShopOpen', event.currentTarget.checked)}
                />

                <Switch
                    label="System Maintenance Mode"
                    description="Locks down the entire customer application for technical updates."
                    color="red"
                    checked={form.values.isMaintenanceMode}
                    onChange={(event) => form.setFieldValue('isMaintenanceMode', event.currentTarget.checked)}
                />
            </Stack>
        </Card>
    );
}