
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Router>
                <ErrorBoundary>
                    <MainLayout>
                        {/* <Home /> */}
                        <h1>Welcome to CheSubhro's App</h1>
                    </MainLayout>
                </ErrorBoundary> 
            </Router>
        </ChakraProvider>
    )
}

export default App
