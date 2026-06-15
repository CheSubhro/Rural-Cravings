
import React from 'react'
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'

const CartItemsList = ({ cartItems, handleQuantityChange, handleRemoveItem, handleClearCart }) => {
    return (
        <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
                const itemPrice = item.discountPrice > 0 && item.price > item.discountPrice 
                ? item.discountPrice 
                : item.price

                return (
                <div 
                    key={item._id} 
                    className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs gap-4 transition-all hover:border-gray-200"
                >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-gray-400 font-medium capitalize mt-0.5">Price: ₹{itemPrice}</p>
                    </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 w-28 h-9">
                        <button 
                        onClick={() => handleQuantityChange(item._id, item.quantity, 'decrease', item.stock)}
                        className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                        >
                        <IconMinus size={14} />
                        </button>
                        <span className="font-bold text-gray-800 text-sm select-none">{item.quantity}</span>
                        <button 
                        onClick={() => handleQuantityChange(item._id, item.quantity, 'increase', item.stock)}
                        className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                        >
                        <IconPlus size={14} />
                        </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                        <span className="font-extrabold text-emerald-600 text-base">
                        ₹{itemPrice * item.quantity}
                        </span>
                    </div>

                    <button 
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <IconTrash size={18} />
                    </button>
                    </div>
                </div>
                )
            })}

            <div className="flex justify-start">
                <button 
                onClick={handleClearCart}
                className="text-xs font-bold text-gray-400 hover:text-red-500 underline transition-colors cursor-pointer"
                >
                Clear Entire Basket
                </button>
            </div>
        </div>
    )
}

export default CartItemsList