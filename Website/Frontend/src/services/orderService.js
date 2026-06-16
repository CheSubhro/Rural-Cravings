
import api from './api'; 

export const getMyOrders = async () => {
    const response = await api.get('/orders/customer/my-orders');
    return response.data; 
};

export const getMyAssignedOrders = async (token) => {
    const config = token ? {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    } : {};

    const response = await api.get('/orders/rider/my-orders', config); 
    return response.data;
};

export const createOrder = async (orderData, token) => {
    const config = token ? {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    } : {};

    const response = await api.post('/orders/place', orderData, config);
    return response.data;
};

const orderService = {
    getMyOrders,
    getMyAssignedOrders,
    createOrder
};

export default orderService;