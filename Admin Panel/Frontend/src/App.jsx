
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import { MainLayout, PrivateRoute, AuthProvider } from './layouts';


import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import FoodItems from './pages/FoodItems';
import Orders from './pages/Orders';
import Delivery from './pages/Delivery';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Blogs from './pages/Blogs';
import CouponsPage from './pages/CouponsPage';


function App() {
    return (
        <Router>
            <ErrorBoundary>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<PrivateRoute allowedRoles={['Admin', 'Manager']} />}>
                            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
                            <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
                            <Route path="/customers" element={<MainLayout><Customers /></MainLayout>} />
                            <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
                            <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
                            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
                            <Route path="/coupons" element={<MainLayout><CouponsPage /></MainLayout>} />
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={['Admin', 'Manager', 'Staff']} />}>
                            <Route path="/categories" element={<MainLayout><Categories /></MainLayout>} />
                            <Route path="/food-items" element={<MainLayout><FoodItems /></MainLayout>} />
                            <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} /> 
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={['Admin', 'Manager', 'Delivery', 'Staff']} />}>
                            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={['Admin', 'Manager', 'Delivery']} />}>
                            <Route path="/delivery" element={<MainLayout><Delivery /></MainLayout>} /> 
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AuthProvider>
            </ErrorBoundary>
        </Router>
    )
}

export default App
