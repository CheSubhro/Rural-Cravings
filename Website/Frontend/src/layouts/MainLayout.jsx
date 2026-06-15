
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-6">
                <Outlet /> 
            </main>
        </div>
    )
}

export default MainLayout