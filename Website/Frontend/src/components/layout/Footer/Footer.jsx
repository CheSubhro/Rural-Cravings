
import React from 'react'
import { Link } from 'react-router-dom'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMail, IconPhone } from '@tabler/icons-react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Brand Info */}
                <div className="space-y-4">
                <h3 className="text-white text-lg font-bold">Rural Cravings</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Bringing the authentic taste and goodness of rural tradition straight to your doorstep. Pure, fresh, and crafted with love.
                </p>
                <div className="flex gap-4 text-gray-400">
                    <a href="#" className="hover:text-emerald-500 transition-colors"><IconBrandFacebook size={20} /></a>
                    <a href="#" className="hover:text-emerald-500 transition-colors"><IconBrandInstagram size={20} /></a>
                    <a href="#" className="hover:text-emerald-500 transition-colors"><IconBrandTwitter size={20} /></a>
                </div>
                </div>

                {/* Quick Links */}
                <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Shop All Products</Link></li>
                    <li><Link to="/blogs" className="hover:text-emerald-400 transition-colors">Our Blog Articles</Link></li>
                    <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Our Story & Mission</Link></li>
                </ul>
                </div>

                {/* Customer Service */}
                <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Care</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Track Your Order</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping & Returns Policy</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQs</a></li>
                </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                <h4 className="text-white font-semibold mb-1 text-sm uppercase tracking-wider">Contact Us</h4>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                    <IconPhone size={18} className="text-emerald-500" />
                    <span>+880 1234-567890</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                    <IconMail size={18} className="text-emerald-500" />
                    <span>support@ruralcravings.com</span>
                </p>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="container mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Rural Cravings. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer