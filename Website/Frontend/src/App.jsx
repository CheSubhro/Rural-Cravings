

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layouts/MainLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import NotFound from './pages/NotFound'

import ProtectedRoute from './layouts/ProtectedRoute' 
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="products" element={<Products />} />
                            <Route path="products/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route element={<ProtectedRoute />}>
                                <Route path="checkout" element={<Checkout />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="my-orders" element={<MyOrders />} />
                            </Route>
                            
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                
                <ToastContainer position="top-right" autoClose={3000} />
            </Provider>
        </>
    )
}

export default App;