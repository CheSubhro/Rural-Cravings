
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'
import CheckoutForm from '../features/checkout/CheckoutForm'
import CheckoutSummary from '../features/checkout/CheckoutSummary'
import { clearCart } from '../store/cartSlice'
import { createOrder } from '../services/orderService'

import { selectCartItems, selectCartTotal } from '../store/cartSlice' 

const FREE_DELIVERY_THRESHOLD = 500;
const SHIPPING_CHARGE = 70;

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const cartItems = useSelector(selectCartItems)
    const totalCartPrice = useSelector(selectCartTotal)
    
    const authState = useSelector((state) => state.auth)
    const token = authState?.token || null;

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '', 
        phone: '', 
        address: '', 
        paymentMethod: 'COD'
    })

    const deliveryFee = totalCartPrice >= FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_CHARGE;
    const finalBill = totalCartPrice + deliveryFee;

    const handleInputChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const orderPayload = {
                items: cartItems.map(item => ({
                    foodItem: item._id, 
                    quantity: item.quantity,
                    priceAtPurchase: item.discountPrice > 0 && item.price > item.discountPrice ? item.discountPrice : item.price
                })),
                totalAmount: finalBill, 
                deliveryAddress: {
                    street: formData.address.trim(),
                    city: 'Kolkata', 
                    state: 'West Bengal',
                    zipCode: '700089', 
                    phone: formData.phone.trim()
                },
                paymentDetails: {
                    method: formData.paymentMethod,
                    status: 'Pending'
                }
            }

            const response = await createOrder(orderPayload, token)
            
            if (response) {
                alert(`Thank you! Order placed successfully.`)
                dispatch(clearCart())
                navigate('/') 
            }
        } catch (error) {
            console.error('Order Placement Failed:', error)
            alert(error.response?.data?.message || 'Something went wrong while placing the order.')
        } finally {
            setLoading(false)
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold text-gray-800">No items to checkout.</h2>
                <RouterLink to="/products" className="mt-4 text-emerald-600 font-bold underline flex items-center gap-1">
                    <IconArrowLeft size={16} /> Back to Menu
                </RouterLink>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl min-h-[75vh]">
            <RouterLink to="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors mb-8 group">
                <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Basket</span>
            </RouterLink>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Secure Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <CheckoutForm 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit} 
                />

                <CheckoutSummary 
                    cartItems={cartItems} 
                    totalCartPrice={totalCartPrice} 
                    deliveryFee={deliveryFee}
                    finalBill={finalBill}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default Checkout