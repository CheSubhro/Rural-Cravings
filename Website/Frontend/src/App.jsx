
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'

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
                    </Route>

                    <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                
                <ToastContainer position="top-right" autoClose={3000} />
            </Provider>
        </>
    )
}

export default App
