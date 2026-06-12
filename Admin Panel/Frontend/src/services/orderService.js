
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
    },

    // Fetch orders assigned specifically to the logged-in rider
    getRiderOrders: async () => {
        const { data } = await api.get('/orders/rider/my-orders');
        return data;
    },

    // Quick update of delivery status by the rider (PATCH /orders/rider/:orderId/delivery)
    updateDeliveryStatus: async (orderId, status) => {
        const { data } = await api.patch(`/orders/rider/${orderId}/delivery`, { status });
        return data;
    }
};

export default orderService;