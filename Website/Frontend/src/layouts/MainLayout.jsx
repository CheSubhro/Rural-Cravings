
import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar, Footer, Sidebar } from '../components/layout/index'; 

const MainLayout = ({ children }) => {

    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ 
                width: 300, 
                breakpoint: 'sm', 
                collapsed: { mobile: !opened } 
            }}
            footer={{ height: 50 }}
            padding="md"
        >
            <AppShell.Header>
                <Navbar opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Navbar style={{ backgroundColor: '#e9ecef', borderRight: '1px solid #dee2e6' }}>
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export default MainLayout;