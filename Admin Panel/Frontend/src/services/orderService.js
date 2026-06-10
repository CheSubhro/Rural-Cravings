
import api from './api';

const orderService = {
    
    // Fetch All Orders
    getOrders: async () => {
        const { data } = await api.get('/orders/all');
        return data;
    },

    // Update Order Status (Pending, Preparing, etc. & Payment Status)
    updateOrderStatus: async (orderId, statusData) => {
        const { data } = await api.patch(`/orders/${orderId}`, statusData);
        return data;
    }
};

export default orderService;