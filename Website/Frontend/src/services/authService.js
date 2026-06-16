
import api from './api' 

export const loginUser = async (credentials) => {
    const response = await api.post('/customers/login', credentials)
    return response.data 
}

export const registerUser = async (userData) => {
    const response = await api.post('/customers/register', userData);
    return response.data; 
};

const authService = {
    loginUser,
    registerUser
}

export default authService