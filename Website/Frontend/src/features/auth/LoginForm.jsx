
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { authStart, authSuccess, authFailure } from '../../store/authSlice'
import authService from '../../services/authService'
import { IconMail, IconLock, IconLoader2 } from '@tabler/icons-react'

const LoginForm = () => {
    
    const [formData, setFormData] = useState({ email: '', password: '' })
    const { loading, error } = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password) return;

        try {
            dispatch(authStart())
            const response = await authService.loginUser(formData)
            
            if (response?.data) {
                dispatch(authSuccess(response.data))
                navigate('/') 
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Invalid email or password!"
            dispatch(authFailure(errorMessage))
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Log in to relish your favourite rural dishes</p>
            </div>

            {error && (
                <div className="mb-6 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                            <IconMail size={20} />
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="alex@example.com"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                            <IconLock size={20} />
                        </span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                    {loading ? (
                        <>
                            <IconLoader2 size={18} className="animate-spin" />
                            <span>Signing In...</span>
                        </>
                    ) : (
                        <span>Sign In</span>
                    )}
                </button>
            </form>

            <div className="text-center mt-6 pt-5 border-t border-gray-50">
                <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm