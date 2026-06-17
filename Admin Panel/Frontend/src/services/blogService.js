

import api from './api';

const blogService = {

    getAllBlogs: async () => {
        const response = await api.get('/blogs');
        return response.data; 
    },
    
    getBlogById: async (blogId) => {
        const response = await api.get(`/blogs/${blogId}`);
        return response.data;
    },

    createBlog: async (blogFormData) => {
        const response = await api.post('/blogs', blogFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateBlog: async (blogId, blogFormData) => {
        const response = await api.patch(`/blogs/${blogId}`, blogFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteBlog: async (blogId) => {
        const response = await api.delete(`/blogs/${blogId}`);
        return response.data;
    }
};

export default blogService;