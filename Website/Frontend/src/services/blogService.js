

import api from './api' 

export const getAllBlogs = async () => {
    const response = await api.get('/blogs'); 
    return response.data; 
};

export const getBlogById = async (blogId) => {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data; 
};




const blogService = {
    getAllBlogs,
    getBlogById,
}

export default blogService