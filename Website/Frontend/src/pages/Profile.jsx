

import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDetails from '../features/auth/ProfileDetails'
import ChangePassword from '../features/auth/ChangePassword'
import { IconUserCircle } from '@tabler/icons-react'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const Profile = () => {
    
    const { user, loading, error } = useSelector((state) => state.auth || { user: null, loading: false, error: null })

    // Loading State
    if (loading) {
        return <Spinner fullPage={true} message="Updating your secure kitchen profile..." />
    }

    // Error State
    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <ErrorComponent 
                    message={error} 
                    onBack={() => window.location.reload()} 
                />
            </div>
        )
    }

    return (
        
        <div className="max-w-4xl mx-auto px-4 py-10 min-h-[70vh]">
            <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl mb-6 shadow-xs">
                <div className="bg-white/10 p-2 rounded-full text-emerald-300">
                    <IconUserCircle size={56} />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">{user?.fullName || user?.name || "Welcome Back"}</h2>
                    <p className="text-emerald-200 text-sm font-medium">@{user?.username || 'username'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <ProfileDetails />
                <ChangePassword />
            </div>
        </div>
    )
}

export default Profile