
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { 
    IconShoppingCart, 
    IconUser, 
    IconMenu2, 
    IconX, 
    IconBrandSupernova, 
    IconLogout, 
    IconClipboardList, 
    IconLogin 
} from '@tabler/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../../store/cartSlice' 
import { logout } from '../../../store/authSlice' 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems)
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const authState = useSelector((state) => state.auth)
    const token = authState?.token || null
    const user = authState?.user || null 

    const handleLogout = () => {
        dispatch(logout()) 
        alert('Logged out successfully!')
        setIsOpen(false)
        navigate('/login')
    }

    const navLinkStyle = ({ isActive }) => 
        `text-sm font-semibold tracking-wide transition-colors hover:text-emerald-600 ${
            isActive ? 'text-emerald-600' : 'text-gray-600'
        }`

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
                        <IconBrandSupernova size={28} className="text-emerald-600" />
                        <span className="tracking-tight">Rural Cravings</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" end className={navLinkStyle}>Home</NavLink>
                        <NavLink to="/products" className={navLinkStyle}>Products</NavLink>
                        {token && <NavLink to="/my-orders" className={navLinkStyle}>My Orders</NavLink>}
                    </div>

                    {/* Right Side Icons & Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart Icon */}
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors mr-1">
                            <IconShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-pulse">
                                    {totalItems} 
                                </span>
                            )}
                        </Link>

                        {/* Dynamic Profile / Auth Button for Desktop */}
                        <div className="hidden sm:flex items-center gap-2">
                            {token ? (
                                <div className="flex items-center gap-2">
                                    <Link to="/profile" className="p-2 text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1 text-sm font-medium">
                                        <IconUser size={22} />
                                        <span className="hidden lg:inline text-gray-700">{user?.name || 'Profile'}</span>
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Logout"
                                    >
                                        <IconLogout size={22} />
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-xl transition-all"
                                >
                                    <IconLogin size={16} />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors focus:outline-hidden"
                        >
                            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1.5 transition-all">
                    <NavLink to="/" end onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 font-medium text-sm">Home</NavLink>
                    <NavLink to="/products" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 font-medium text-sm">Products</NavLink>
                    
                    {token && (
                        <NavLink to="/my-orders" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 font-medium text-sm">
                            <span className="flex items-center gap-2"><IconClipboardList size={18}/> My Orders</span>
                        </NavLink>
                    )}

                    <div className="border-t border-gray-100 pt-3 mt-2 sm:hidden">
                        {token ? (
                            <div className="space-y-1">
                                <NavLink to="/profile" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 font-medium text-sm">
                                    <span className="flex items-center gap-2"><IconUser size={18}/> My Profile</span>
                                </NavLink>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left block py-2.5 px-3 rounded-xl text-red-600 hover:bg-red-50 font-medium text-sm"
                                >
                                    <span className="flex items-center gap-2"><IconLogout size={18}/> Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={() => setIsOpen(false)}
                                className="block text-center py-2.5 px-4 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-xs"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar