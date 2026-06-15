
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="text-center py-20">
            <h2 className="text-6xl font-extrabold text-red-500">404</h2>
            <p className="text-xl mt-4 mb-8">Oops! Page not found.</p>
            <Link to="/" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound