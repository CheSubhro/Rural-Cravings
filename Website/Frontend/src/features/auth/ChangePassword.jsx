import React, { useState } from 'react'
import { IconLock, IconLoader2, IconKey } from '@tabler/icons-react'
import authService from '../../services/authService'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!passwords.oldPassword || !passwords.newPassword) return toast.error("Both fields are required")

        try {
            setLoading(true)
            const response = await authService.changeCurrentPassword(passwords)
            if (response.success) {
                toast.success("Password changed successfully!")
                setPasswords({ oldPassword: '', newPassword: '' })
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to change password";
            toast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs mt-6">
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <IconKey size={22} className="text-emerald-600" /> Update Password
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Current Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconLock size={20} /></span>
                        <input type="password" value={passwords.oldPassword} onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} placeholder="••••••••" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">New Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconLock size={20} /></span>
                        <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} placeholder="••••••••" className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer text-sm">
                    {loading ? <><IconLoader2 size={16} className="animate-spin" /> Updating...</> : "Update Password"}
                </button>
            </form>
        </div>
    )
}

export default ChangePassword