
import api from './api';

const categoryService = {

    // Create Category API Call
    createCategory: async (categoryData) => {
        const { data } = await api.post('/categories', categoryData);
        return data; 
    },

    // Fetch All Categories
    getCategories: async () => {
        const { data } = await api.get('/categories');
        return data;
    },

    // Update Category API Call
    updateCategory: async (categoryId, categoryData) => {
        const { data } = await api.patch(`/categories/${categoryId}`, categoryData);
        return data;
    },

    // Delete Category API Call
    deleteCategory: async (categoryId) => {
        const { data } = await api.delete(`/categories/${categoryId}`);
        return data;
    }
};

export default categoryService;