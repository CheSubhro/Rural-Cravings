
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { setDeliveryBoy } from '../store/authSlice';

const handleLogin = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        
        if (response.data.data.user.role === 'Delivery') {
        dispatch(setDeliveryBoy({ 
            token: response.data.data.accessToken, 
            user: response.data.data.user 
        }));
        } else {
            alert("Only delivery staff can login here!");
        }
    } catch (error) {
        alert("Login failed!");
    }
};