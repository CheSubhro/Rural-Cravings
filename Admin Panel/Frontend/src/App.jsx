
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';


function App() {
    return (
        <Router>
            <ErrorBoundary>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<h1>Welcome to Rural Cravings Admin</h1>} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MainLayout>
            </ErrorBoundary>
        </Router>
    )
}

export default App
