
import api from './api';

const couponService = {
    // Fetch All Coupons
    getAllCoupons: async () => {
        const { data } = await api.get('/coupons');
        return data;
    },

    // Create Coupon API Call
    createCoupon: async (couponData) => {
        const { data } = await api.post('/coupons', couponData);
        return data;
    },

    // Update Coupon API Call
    updateCoupon: async (couponId, couponData) => {
        const { data } = await api.put(`/coupons/${couponId}`, couponData);
        return data;
    },

    // Delete Coupon API Call
    deleteCoupon: async (couponId) => {
        const { data } = await api.delete(`/coupons/${couponId}`);
        return data;
    },

    // Validate Coupon API Call (Customer Side)
    validateCoupon: async (couponData) => {
        const { data } = await api.post('/coupons/validate', couponData);
        return data;
    }
};

export default couponService;