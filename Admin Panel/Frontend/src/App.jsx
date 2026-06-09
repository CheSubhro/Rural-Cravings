
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import Login from './pages/Login';


function App() {
    return (
        <Router>
            <ErrorBoundary>
                <MainLayout>
                    <Routes>
                        {/* Public Route */}
                        <Route path="/login" element={<Login />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                            <Route element={<MainLayout />}>
                                <Route path="/" element={<h1>Welcome to Rural Cravings Admin</h1>} />
                                <Route path="/orders" element={<h1>Orders Page</h1>} />
                                <Route path="/food-items" element={<h1>Food Items Page</h1>} />
                            </Route>
                        </Route>
                    </Routes>
                </MainLayout>
            </ErrorBoundary>
        </Router>
    )
}

export default App
