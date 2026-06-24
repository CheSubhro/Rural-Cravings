
import api from './api'; 

export const getMyOrders = async () => {
    const response = await api.get('/orders/customer/my-orders');
    return response.data; 
};

export const getMyAssignedOrders = async () => {
    const response = await api.get('/orders/rider/my-orders'); 
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await api.post('/orders/place', orderData);
    return response.data;
};

export const verifyRazorpayPayment = async (verificationData) => {
    const response = await api.post('/orders/verify-payment', verificationData);
    return response.data; 
};

const orderService = {
    getMyOrders,
    getMyAssignedOrders,
    createOrder,
    verifyRazorpayPayment
};

export default orderService;