
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconShoppingCart, IconUser, IconMenu2, IconX, IconBrandSupernova } from '@tabler/icons-react'

const Navbar = () => {
    
    const [isOpen, setIsOpen] = useState(false)

    const navLinkStyle = ({ isActive }) => 
        `text-sm font-medium transition-colors hover:text-emerald-600 ${
        isActive ? 'text-emerald-600 font-semibold' : 'text-gray-600'
        }`

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
                    <IconBrandSupernova size={28} className="text-emerald-600" />
                    <span>Rural Cravings</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" end className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/products" className={navLinkStyle}>Products</NavLink>
                    <NavLink to="/blogs" className={navLinkStyle}>Blogs</NavLink>
                    <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>
                </div>

                {/* Right Side Icons (Cart, Profile, Mobile Menu) */}
                <div className="flex items-center gap-4">
                    {/* Cart Icon */}
                    <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <IconShoppingCart size={24} />
                    <span className="absolute top-0 right-0 bg-emerald-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        0
                    </span>
                    </Link>

                    {/* User Profile */}
                    <Link to="/profile" className="hidden sm:block p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <IconUser size={24} />
                    </Link>

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
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2 transition-all">
                <NavLink to="/" end onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Home</NavLink>
                <NavLink to="/products" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Products</NavLink>
                <NavLink to="/blogs" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Blogs</NavLink>
                <NavLink to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">About Us</NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 hover:text-emerald-600 font-medium sm:hidden">My Profile</NavLink>
                </div>
            )}
        </nav>
    )
}

export default Navbar