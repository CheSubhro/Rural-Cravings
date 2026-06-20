
import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../features/auth/LoginForm'
import { IconBrandSupernova } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import loginBg from '../assets/images/login-bg.jpg'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const Login = () => {

    const { loading, error } = useSelector((state) => state.auth || { loading: false, error: null })

    if (loading) {
        return <Spinner fullPage={true} message="Authenticating credentials... Preparing your taste basket!" />
    }
    
    return (
        <div className="min-h-screen flex bg-white">
            
            <div className="hidden lg:block lg:w-1/2 relative bg-emerald-950">
                    <img 
                            src={loginBg} 
                            alt="Traditional Rural Food Heritage" 
                            className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-multiply"
                        />
                
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white bg-linear-to-t from-black/60 via-transparent to-black/20">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tight">
                        <IconBrandSupernova size={32} className="text-emerald-400" />
                        <span>Rural Cravings</span>
                    </Link>
                    
                    <div>
                        <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
                            Savour the Authenticity of Rural Heritage
                        </h1>
                        <p className="text-gray-200 text-base max-w-md font-medium leading-relaxed">
                            Experience traditional, homegrown, and freshly prepared meals delivered straight from native heartlands to your table.
                        </p>
                    </div>
                    
                    <p className="text-xs text-emerald-300 font-bold tracking-widest uppercase">
                        © 2026 Rural Cravings Platform
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-12 bg-gray-50/30 lg:bg-white relative">
                
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link to="/" className="flex items-center gap-2 text-xl font-black text-emerald-700">
                        <IconBrandSupernova size={26} className="text-emerald-600" />
                        <span className="tracking-tight">Rural Cravings</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {error ? (
                        <div className="mb-6">
                            <ErrorComponent 
                                message={error} 
                                onBack={() => window.location.reload()} 
                            />
                        </div>
                    ) : (
                        <LoginForm />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Login