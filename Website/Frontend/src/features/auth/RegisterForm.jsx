
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { authStart, authSuccess, authFailure } from '../../store/authSlice'
import authService from '../../services/authService'
import { IconUser, IconMail, IconLock, IconPhone, IconLoader2, IconEye, IconEyeOff } from '@tabler/icons-react'
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        phone: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error } = useSelector((state) => state.auth)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.name || !formData.email || !formData.username || !formData.password) return;

        try {
            dispatch(authStart())
            const response = await authService.registerUser(formData)
            
            if (response) {
       
                toast.success("Account created successfully! Please log in.")
                dispatch(authFailure(null)) 
                navigate('/login')
            }
        } catch (err) {
            const serverMessage = err.response?.data?.message;

            const errorMessage = serverMessage 
                ? `Error: ${serverMessage}` 
                : "Error: Registration failed! Please try again.";
                
            dispatch(authFailure(errorMessage));
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Account</h2>
                <p className="text-gray-500 text-sm mt-1">Join us to explore the true taste of tradition</p>
            </div>

            {error && (
                <div className="mb-4 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconUser size={20} /></span>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                {/* Username */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Username</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconUser size={20} /></span>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="johndoe123" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconMail size={20} /></span>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number (Optional)</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconPhone size={20} /></span>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+880 1234-567890" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconLock size={20} /></span>
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full pl-11 pr-12 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 cursor-pointer select-none">
                            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-4">
                    {loading ? (
                        <><IconLoader2 size={18} className="animate-spin" /><span>Creating Account...</span></>
                    ) : (
                        <span>Sign Up</span>
                    )}
                </button>
            </form>

            <div className="text-center mt-5 pt-4 border-t border-gray-50">
                <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm