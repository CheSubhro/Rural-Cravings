
import api from './api' 

export const fetchAllProducts = async () => {
    const response = await api.get('/foods') 
    return response.data
}

export const fetchProductById = async (id) => {
    const response = await api.get(`/foods/${id}`)
    return response.data
}

export const getFeaturedProducts = async () => {
    const response = await api.get('/foods'); 
    return response.data;
}

const productService = {
    fetchAllProducts,
    fetchProductById,
    getFeaturedProducts
}

export default productService;

