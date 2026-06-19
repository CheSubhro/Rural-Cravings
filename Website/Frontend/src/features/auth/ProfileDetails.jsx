
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../store/authSlice';
import authService from '../../services/authService';
import { IconUser, IconMail, IconPhone, IconLoader2, IconUserCheck } from '@tabler/icons-react';
import { toast } from 'react-toastify';

const ProfileDetails = () => {
    
    const { user, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || user.fullName || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Full Name is required");

        try {
            dispatch(updateUserStart());
            const response = await authService.updateAccountDetails(formData);
            if (response.success) {
                toast.success("Profile updated successfully!");
                dispatch(updateUserSuccess(response.data));
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to update profile";
            dispatch(updateUserFailure(errorMsg));
            toast.error(errorMsg);
        }
    };

    return (

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <IconUserCheck size={22} className="text-emerald-600" /> Account Information
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconUser size={20} /></span>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Username (Locked)</label>
                        <input type="text" value={user?.username || ''} disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email (Locked)</label>
                        <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400"><IconPhone size={20} /></span>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer text-sm">
                    {loading ? <><IconLoader2 size={16} className="animate-spin" /> Saving...</> : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default ProfileDetails;