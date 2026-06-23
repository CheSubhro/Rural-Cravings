
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSettings } from '../store/settingSlice' 
import Spinner from '../components/common/Spinner/Spinner' 
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent' 

const AppInitializer = ({ children }) => {

    const dispatch = useDispatch();
    const { config, loading, error } = useSelector((state) => state.settings);

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
                <Spinner message="Initializing Rural Cravings..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <ErrorComponent 
                    message="Failed to initialize the app. Please check your connection." 
                    onBack={() => window.location.reload()} 
                />
            </div>
        );
    }

    return children;
}

export default AppInitializer;