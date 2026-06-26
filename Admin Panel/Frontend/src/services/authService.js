
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
    getAllStaffs: async () => {
        const { data } = await api.get('/users/all-staffs'); 
        return data;
    },
    deleteStaff: async (id) => {
        const { data } = await api.delete(`/users/delete-staff/${id}`); 
        return data;
    },
    updateStaff: async (id, multipartData) => {
        const { data } = await api.patch(`/users/update-staff/${id}`, multipartData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },
    changePassword: async (passwordData) => {
        const { data } = await api.patch('/users/change-password', passwordData);
        return data;
    }
};

export default authService;