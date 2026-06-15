
import React from 'react'
import { 
  IconTruck, 
  IconPhone, 
  IconUser, 
  IconMapPin, 
  IconCash, 
  IconCreditCard, 
  IconDeviceMobile, 
  IconGlobe 
} from '@tabler/icons-react'

const CheckoutForm = ({ formData, handleInputChange, handleSubmit }) => {
  
  // পেমেন্ট অপশনগুলোর একটি ডাইনামিক অ্যারে
  const paymentOptions = [
    {
      id: 'COD',
      title: 'Cash on Delivery (COD)',
      description: 'Pay with cash upon local delivery',
      icon: <IconCash size={20} />,
    },
    {
      id: 'UPI',
      title: 'UPI (GPay / PhonePe / Paytm)',
      description: 'Instant transfer using your UPI app',
      icon: <IconDeviceMobile size={20} />,
    },
    {
      id: 'Card',
      title: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay, or Amex',
      icon: <IconCreditCard size={20} />,
    },
    {
      id: 'Online',
      title: 'Net Banking',
      description: 'Pay directly securely from your bank account',
      icon: <IconGlobe size={20} />,
    },
  ]

  return (
    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
      <h2 className="text-xl font-black text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
        <IconTruck size={22} className="text-emerald-600" />
        <span>Delivery & Shipping Details</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <IconUser size={14} /> Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-medium text-gray-800"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <IconPhone size={14} /> Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="017XXXXXXXX"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-medium text-gray-800"
          />
        </div>

        {/* Delivery Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <IconMapPin size={14} /> Shipping Address
          </label>
          <textarea
            name="address"
            required
            rows="3"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="173/1, Block-B, Lake Town, Kolkata, West Bengal"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-medium text-gray-800 resize-none"
          ></textarea>
        </div>

        {/* 💳 Dynamic Payment Method Selector */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Payment Method</label>
          
          <div className="grid grid-cols-1 gap-3">
            {paymentOptions.map((option) => {
              const isSelected = formData.paymentMethod === option.id

              return (
                <label 
                  key={option.id}
                  className={`p-4 border rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs' 
                      : 'bg-white border-gray-200 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{option.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
                    </div>
                  </div>
                  
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value={option.id}
                    checked={isSelected}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer" 
                  />
                </label>
              )
            })}
          </div>
        </div>

        {/* Hidden Submit Button triggered from CheckoutSummary */}
        <button type="submit" id="checkout-form-submit" className="hidden" />
      </form>
    </div>
  )
}

export default CheckoutForm