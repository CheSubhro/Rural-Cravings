
import api from './api' 

export const loginUser = async (credentials) => {
    const response = await api.post('/customers/login', credentials)
    return response.data 
}

export const registerUser = async (userData) => {
    const response = await api.post('/customers/register', userData);
    return response.data; 
}

export const getCurrentCustomer = async () => {
    const response = await api.get('/customers/current-customer');
    return response.data; 
}

export const updateAccountDetails = async (updateData) => {
    const response = await api.patch('/customers/update-account', updateData);
    return response.data;
}

export const changeCurrentPassword = async (passwordData) => {
    const response = await api.post('/customers/change-password', passwordData);
    return response.data;
}


const authService = {
    loginUser,
    registerUser,
    getCurrentCustomer,
    updateAccountDetails,
    changeCurrentPassword
}

export default authService