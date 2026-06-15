

import api from './api';

const foodService = {

    // Create Food Item 
    createFoodItem: async (formData) => {
        const { data } = await api.post('/foods', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    },    

    // Fetch All Food Items
    getFoodItems: async () => {
        const { data } = await api.get('/foods');
        return data;
    },

    // Update Food Item
    updateFoodItem: async (foodItemId, formData) => {
        const { data } = await api.patch(`/foods/${foodItemId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    },

    // Delete Food Item
    deleteFoodItem: async (foodItemId) => {
        const { data } = await api.delete(`/foods/${foodItemId}`);
        return data;
    }
};

export default foodService;