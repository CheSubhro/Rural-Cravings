
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSettings } from '../store/settingSlice' 

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const { config, loading } = useSelector((state) => state.settings);

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    if (config?.isMaintenanceMode) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6" style={{ fontFamily: 'sans-serif' }}>
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 max-w-lg shadow-sm">
                    <span className="text-5xl">🔧</span>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-4">
                        Rural Cravings is Under Maintenance
                    </h1>
                    <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed">
                        We are currently adding some delicious updates to our backend! We will be back online shortly. We apologize for the temporary inconvenience
                    </p>
                </div>
            </div>
        );
    }

    if (loading && !config) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-emerald-600 font-medium animate-pulse text-lg">
                    Initializing Rural Cravings...
                </div>
            </div>
        );
    }

    return children;
}

export default AppInitializer;