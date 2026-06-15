
import React from 'react'
import { IconTools } from '@tabler/icons-react'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <IconTools size={48} className="text-emerald-600 animate-bounce" />
            <h1 className="text-4xl font-bold text-emerald-700">Welcome to Rural Cravings Website</h1>
            <p className="text-gray-600">Tailwind v4 and Redux Toolkit setup is officially active!</p>
        </div>
    )
}

export default Home