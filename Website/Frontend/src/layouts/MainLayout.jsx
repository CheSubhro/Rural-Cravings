
import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar,Footer} from '../components/layout/index'

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
            <Navbar />
            
            <main className="grow">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    )
}

export default MainLayout