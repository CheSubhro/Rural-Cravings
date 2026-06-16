
import api from './api' 

export const loginUser = async (credentials) => {
    const response = await api.post('/customers/login', credentials)
    return response.data 
}

const authService = {
    loginUser
}

export default authService