
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { IconArrowLeft } from '@tabler/icons-react'
import CheckoutForm from '../features/checkout/CheckoutForm'
import CheckoutSummary from '../features/checkout/CheckoutSummary'
import { createOrder, verifyRazorpayPayment } from '../services/orderService'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'
import { 
    clearCart, 
    selectCartItems, 
    selectCartTotal, 
    selectDiscountAmount, 
    selectDeliveryFee, 
    selectFinalBill,
    fetchSystemSettings,
    updateDeliveryCity 
} from '../store/cartSlice'
import { toast } from 'react-toastify';

// Razorpay SDK
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}

const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const cartItems = useSelector(selectCartItems)
    const totalCartPrice = useSelector(selectCartTotal)
    const discountAmount = useSelector(selectDiscountAmount)
    const deliveryFee = useSelector(selectDeliveryFee)
    const finalBill = useSelector(selectFinalBill)
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '', 
        phone: '', 
        city: 'Kolkata',
        address: '', 
        paymentMethod: 'COD'
    })

    useEffect(() => {
        dispatch(fetchSystemSettings());
    }, [dispatch]);

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    
        if (name === 'city') {
            dispatch(updateDeliveryCity(value));
        }
    };

    const handleRazorpayPayment = async (mongoOrderData, razorpayOrderData) => {

        const isScriptLoaded = await loadRazorpayScript()

        if (!isScriptLoaded) {
            toast.error("Razorpay SDK failed to load. Are you online?")
            setLoading(false)
            return
        }

        const currentMethod = formData.paymentMethod.toLowerCase();

        const options = {
            key: mongoOrderData.razorpayKeyId, 
            amount: razorpayOrderData.amount,
            currency: razorpayOrderData.currency,
            name: "Rural Cravings",
            description: `Order Payment for ID: ${mongoOrderData._id}`,
            order_id: razorpayOrderData.id, 
            config: {
                display: {
                    hide: [
                        { method: currentMethod === 'upi' ? '' : 'upi' },
                        { method: currentMethod === 'card' ? '' : 'card' },
                        { method: currentMethod === 'netbanking' ? '' : 'netbanking' }
                    ].filter(item => item.method !== '') 
                }
            },
            
            prefill: {
                name: formData.name,
                contact: formData.phone,
                method: currentMethod 
            },
            theme: { color: "#10b981" },
            handler: async function (response) {
                setLoading(true)
                try {
                    const verificationPayload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        mongo_order_id: mongoOrderData._id
                    }

                    const verifyRes = await verifyRazorpayPayment(verificationPayload);
                    if (verifyRes?.success || verifyRes) {
                        toast.success("🎉 Payment successful & Order Placed!");
                        dispatch(clearCart())
                        navigate('/') 
                    }
                } catch (err) {
                    console.error("Verification failed:", err)
                    toast.error(err.response?.data?.message || "Payment verification failed.")
                } finally {
                    setLoading(false)
                }
            },
            modal: {
                ondismiss: function () {
                    setLoading(false)
                    toast.info("Payment cancelled by user.")
                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        try {
            const orderPayload = {
                items: cartItems.map(item => ({
                    foodItem: item._id, 
                    quantity: item.quantity,
                    priceAtPurchase: item.discountPrice > 0 && item.price > item.discountPrice ? item.discountPrice : item.price
                })),
                totalAmount: finalBill, 
                discountAmount: discountAmount, 
                deliveryAddress: {
                    street: formData.address.trim(),
                    city: formData.city.trim(),
                    state: 'West Bengal',
                    zipCode: '700089', 
                    phone: formData.phone.trim()
                },
                paymentDetails: {
                    method: formData.paymentMethod,
                    status: 'Pending'
                }
            }

            const response = await createOrder(orderPayload)
            const orderData = response?.data || response; 

            if (orderData) {
                if (formData.paymentMethod === 'COD') {
                    toast.success("🎉 Thank you! Order placed successfully.");
                    dispatch(clearCart())
                    navigate('/') 
                } else if (orderData.razorpayOrder) {
                    await handleRazorpayPayment(orderData, orderData.razorpayOrder)
                } else {
                    toast.error("Online payment generation failed from server.")
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error('Order Placement Failed:', error)
            const errorMessage = error.response?.data?.message || 'Something went wrong while placing the order.';
            setError(errorMessage);
            toast.error(errorMessage);
            setLoading(false)
        }
    }

    if (loading) {
        return <Spinner fullPage={true} message="Processing your order & securing payment, please wait..." />
    }

    if (error) {
        return <ErrorComponent message={error} onBack={() => setError(null)} />
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
                    discountAmount={discountAmount} 
                    deliveryFee={deliveryFee}
                    finalBill={finalBill}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default Checkout