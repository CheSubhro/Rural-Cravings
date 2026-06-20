
import React, { useState,useEffect } from 'react'
import { IconChevronDown, IconHelpCircle } from '@tabler/icons-react'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const FAQs = () => {
    const faqData = [
        { q: "Are your products 100% organic and rural?", a: "Yes, we source our items directly from rural farmers and traditional kitchens. No artificial preservatives or chemical colors are used." },
        { q: "What are the delivery charges?", a: "Delivery charges are dynamic based on location setup in the system settings. Inside Kolkata and outside Kolkata have distinct flat rates." },
        { q: "How can I track my running order?", a: "Simply go to the footer or navbar navigation, click on 'Track Your Order' or check your 'My Orders' log history dashboard to get instant rider update statuses." },
        { q: "Do you support cash on delivery (COD)?", a: "Absolutely! We support Cash on Delivery (COD) along with secure digital channels like UPI, Cards, and Online banking." }
    ]

    const [openIndex, setOpenIndex] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 750) 

        return () => clearTimeout(timer)
    }, [])

    // Loading  State
    if (loading) {
        return <Spinner message="Gathering helpful answers for you..." />
    }

    // Error State 
    if (error) {
        return <ErrorComponent message={error} onBack={() => window.location.reload()} />
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 min-h-[70vh]">
            <div className="text-center mb-10">
                <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-full inline-block mb-3"><IconHelpCircle size={28} /></span>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Frequently Asked Questions</h2>
                <p className="text-gray-500 text-sm mt-1">Got questions about Rural Cravings? We have gathered answers right here.</p>
            </div>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                        <button 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full p-5 text-left flex justify-between items-center font-bold text-gray-800 hover:bg-gray-50/50 transition-colors"
                        >
                            <span>{faq.q}</span>
                            <IconChevronDown size={18} className={`text-gray-400 transition-transform ${openIndex === index ? 'rotate-180 text-emerald-600' : ''}`} />
                        </button>
                        {openIndex === index && (
                            <div className="px-5 pb-5 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQs