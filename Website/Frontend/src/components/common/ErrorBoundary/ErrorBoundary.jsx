import React, { Component } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Updates the state so the next render will show the fallback UI
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // Used for logging error details (e.g., to console or error tracking services like Sentry)
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Renders the fallback UI when an unexpected error occurs
            return (
                <Box 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center" 
                    minH="100vh" 
                    p={5}
                >
                    <VStack spacing={4} textAlign="center">
                        <Heading as="h2" size="xl" color="red.500">
                            Oops! Something went wrong.
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            We encountered an unexpected error. Please try refreshing the page.
                        </Text>
                        <Button 
                            colorScheme="blue" 
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </Button>
                    </VStack>
                </Box>
            );
        }

        // If there is no error, renders the children components normally
        return this.props.children;
    }
}

export default ErrorBoundary;
