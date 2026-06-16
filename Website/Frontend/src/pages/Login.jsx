

import React from 'react'
import LoginForm from '../features/auth/LoginForm'
import { IconBrandSupernova } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="min-h-(screen-16) bg-gray-50/50 flex flex-col items-center justify-center px-4 py-12">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-emerald-700 mb-8">
                <IconBrandSupernova size={32} className="text-emerald-600" />
                <span className="tracking-tight">Rural Cravings</span>
            </Link>

            <LoginForm />
        </div>
    )
}

export default Login