
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Tabs, Button, Group, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSettings, IconBuildingStore } from '@tabler/icons-react';

import { fetchSettings, updateSettings } from '../store/settingsSlice';

import BusinessLogisticsForm from '../features/settings/BusinessLogisticsForm';
import OperationalSwitchesForm from '../features/settings/OperationalSwitchesForm';

export default function SettingsPage() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.settings);
    const [activeTab, setActiveTab] = useState('business');

    const form = useForm({
        initialValues: {
            deliveryChargeInside: 60,
            deliveryChargeOutside: 120,
            minimumOrderAmount: 200,
            isShopOpen: true,
            isMaintenanceMode: false
        }
    });

    useEffect(() => {
        dispatch(fetchSettings()).unwrap().then((data) => {
            if (data) form.setValues(data);
        });
    }, [dispatch]);

    const handleSubmit = (values) => {
        dispatch(updateSettings(values));
    };

    return (
        <Box pos="relative" p="md">
            <LoadingOverlay visible={loading} overlayBlur={2} />
            
            <Title order={2} mb="xl">Platform Configuration & Settings</Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                
                <Tabs 
                    value={activeTab} 
                    onChange={(value) => setActiveTab(value)} 
                    orientation="vertical" 
                    variant="outline"
                >
                    <Tabs.List style={{ minWidth: '200px' }} mr="xl">
                        <Tabs.Tab value="business" leftSection={<IconBuildingStore size={16} />}>
                            Business Logistics
                        </Tabs.Tab>
                        <Tabs.Tab value="system" leftSection={<IconSettings size={16} />}>
                            System Control
                        </Tabs.Tab>
                    </Tabs.List>

                    {/* 🏢 Business Panel */}
                    <Tabs.Panel value="business" style={{ width: '100%' }}>
                        <BusinessLogisticsForm form={form} />
                    </Tabs.Panel>

                    {/* 🛑 System Panel */}
                    <Tabs.Panel value="system" style={{ width: '100%' }}>
                        <OperationalSwitchesForm form={form} />
                    </Tabs.Panel>
                </Tabs>

                <Group mt="xl" style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit" color="teal" size="md">
                        Save Dynamic Changes
                    </Button>
                </Group>
            </form>
        </Box>
    );
}