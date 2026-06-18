
import api from './api'; 

const couponService = {
    getActiveCoupons: async () => {
        const { data } = await api.get('/coupons'); 
        return data;
    }
};

export default couponService;