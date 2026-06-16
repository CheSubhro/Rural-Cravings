
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconMail, IconPhone } from '@tabler/icons-react'

const Footer = () => {
    // 🎯 ইউজার লগড-ইন আছে কিনা তা জানার জন্য টোকেন চেক করা হচ্ছে
    const token = useSelector((state) => state.auth?.token)

    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand Info */}
                <div className="space-y-4">
                    <h3 className="text-white text-lg font-black tracking-tight">Rural Cravings</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Bringing the authentic taste and goodness of rural tradition straight to your doorstep. Pure, fresh, and crafted with love.
                    </p>
                    <div className="flex gap-4 text-gray-400">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors"><IconBrandFacebook size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors"><IconBrandInstagram size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors"><IconBrandTwitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-black mb-4 text-xs uppercase tracking-wider text-emerald-500">Quick Links</h4>
                    <ul className="space-y-2.5 text-sm">
                        <li><Link to="/products" className="hover:text-emerald-400 transition-colors font-medium">Shop All Products</Link></li>
                        <li><Link to="/blogs" className="hover:text-emerald-400 transition-colors font-medium">Our Blog Articles</Link></li>
                        <li><Link to="/about" className="hover:text-emerald-400 transition-colors font-medium">Our Story & Mission</Link></li>
                    </ul>
                </div>

                {/* Customer Care (ডায়নামিক লিঙ্কসহ) */}
                <div>
                    <h4 className="text-white font-black mb-4 text-xs uppercase tracking-wider text-emerald-500">Customer Care</h4>
                    <ul className="space-y-2.5 text-sm">
                        {/* 🎯 ইউজার লগইন থাকলে সরাসরি My Orders এ যাবে, না থাকলে লগইন পেজে রিডাইরেক্ট করবে */}
                        <li>
                            <Link to={token ? "/my-orders" : "/login"} className="hover:text-emerald-400 transition-colors font-medium">
                                Track Your Order
                            </Link>
                        </li>
                        {token && (
                            <li>
                                <Link to="/profile" className="hover:text-emerald-400 transition-colors font-medium">
                                    My Account Profile
                                </Link>
                            </li>
                        )}
                        <li><Link to="/shipping-policy" className="hover:text-emerald-400 transition-colors font-medium">Shipping & Returns Policy</Link></li>
                        <li><Link to="/faqs" className="hover:text-emerald-400 transition-colors font-medium">FAQs</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                    <h4 className="text-white font-black mb-1 text-xs uppercase tracking-wider text-emerald-500">Contact Us</h4>
                    <p className="flex items-center gap-2 text-sm text-gray-400">
                        <IconPhone size={18} className="text-emerald-500" />
                        <span className="font-medium">+880 1234-567890</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-400">
                        <IconMail size={18} className="text-emerald-500" />
                        <span className="font-medium">support@ruralcravings.com</span>
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