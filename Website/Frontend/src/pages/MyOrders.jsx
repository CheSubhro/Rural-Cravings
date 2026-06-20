
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerOrders } from '../store/orderSlice' 
import OrderCard from '../features/orders/OrderCard'
import { IconShoppingBagX } from '@tabler/icons-react'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const MyOrders = () => {

    const dispatch = useDispatch()
    
    const { customerOrders: orders, loading, error } = useSelector((state) => state.orders)

    useEffect(() => {
        dispatch(fetchCustomerOrders())
    }, [dispatch])

    // Loading State
    if (loading) {
        return <Spinner message="Fetching your delicious history..." />;
    }

    // Error State
    if (error) {
        return (
            <ErrorComponent 
                message={error} 
                onBack={() => dispatch(fetchCustomerOrders())} 
            />
        )
    }

    return (

        <div className="max-w-4xl mx-auto px-4 py-10 min-h-[70vh]">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">My Orders</h2>
                <p className="text-gray-500 text-sm">Track your authentic rural cravings and past traditional treats.</p>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium mb-6">
                    {error}
                </div>
            )}

            {!orders || orders.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-xs">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4">
                        <IconShoppingBagX size={40} />
                    </div>
                    <h3 className="text-lg font-black text-gray-800 mb-1">No Orders Found Yet</h3>
                    <p className="text-gray-400 text-sm max-w-sm mb-6">Looks like you haven't ordered any heritage recipe from our kitchen layout yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default MyOrders