
import React, { Component } from 'react';
import { Center, Stack, Title, Text, Button } from '@mantine/core';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Center h="100vh">
                    <Stack align="center" gap="md">
                        <Title c="red">Oops! Something went wrong.</Title>
                        <Text c="dimmed">We encountered an unexpected error. Please try refreshing.</Text>
                        <Button onClick={() => window.location.reload()}>Reload Page</Button>
                    </Stack>
                </Center>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;