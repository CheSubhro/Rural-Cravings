

import mongoose, { Schema } from 'mongoose';

// Define the schema for the Category
const OrderSchema = new Schema(
    {
        // Which Customer Order 
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        items: [
            {
                foodItem: { 
                    type: Schema.Types.ObjectId, 
                    ref: "FoodItem", 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true, 
                    default: 1,
                    min: 1 
                },
                priceAtPurchase: { 
                    type: Number, 
                    required: true 
                }
            }
        ],
        totalAmount: { 
            type: Number, 
            required: true,
            min: 0
        },
        deliveryAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            phone: { type: String, required: true }, 
            alternatePhone: { type: String }
        },
        paymentDetails: {
            method: {
                type: String,
                enum: ['COD', 'Online', 'Card', 'UPI'],
                default: 'COD'
            },
            status: {
                type: String,
                enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
                default: 'Pending'
            },
            transactionId: { 
                type: String, 
                default: "" 
            }
        },
        status: {
            type: String,
            enum: ['Pending', 'Preparing', 'On The Way', 'Delivered', 'Cancelled'],
            default: 'Pending'
        },
        deliveryBoy: {
            type: Schema.Types.ObjectId,
            ref: "User", 
            default: null
        }
    },
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);



// Create and export the Order model
export const Order = mongoose.model("Order", OrderSchema);