
import api from './api';

const authService = {

    register: async (userData) => {
        const response = await api.post('/users/register', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        return response.data;
    },

    login: async (credentials) => {
        const { data } = await api.post('/users/login', credentials);
        return data;
    },
  
    logout: async () => {
        await api.post('/users/logout');
    },

    getCurrentUser: async () => {
        const { data } = await api.get('/users/current-user');
        return data;
    },
};

export default authService;