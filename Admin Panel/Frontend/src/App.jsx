
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './layouts/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import FoodItems from './pages/FoodItems';
import Orders from './pages/Orders';
import Delivery from './pages/Delivery';
import Reports from './pages/Reports';
import Settings from './pages/Settings';


function App() {
    return (
        <Router>
            <ErrorBoundary>
                <MainLayout>
                    <Routes>
                        {/* Public Route */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/food-items" element={<FoodItems />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/delivery" element={<Delivery />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </MainLayout>
            </ErrorBoundary>
        </Router>
    )
}

export default App
