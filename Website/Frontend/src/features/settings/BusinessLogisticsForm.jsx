
import React from 'react';
import { Card, Title, Stack, Grid, NumberInput } from '@mantine/core';

export default function BusinessLogisticsForm({ form }) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
            <Title order={4} mb="lg">Logistics & Delivery Settings</Title>
            <Stack spacing="md">
                <Grid>
                    <Grid.Col span={6}>
                        <NumberInput
                            label="Delivery Charge Inside Kolkata"
                            prefix="₹ "
                            min={0}
                            {...form.getInputProps('deliveryChargeInside')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            label="Delivery Charge Outside Kolkata"
                            prefix="₹ "
                            min={0}
                            {...form.getInputProps('deliveryChargeOutside')}
                        />
                    </Grid.Col>
                </Grid>

                <NumberInput
                    label="Minimum Order Amount Needed"
                    prefix="₹ "
                    min={0}
                    {...form.getInputProps('minimumOrderAmount')}
                />
            </Stack>
        </Card>
    );
}