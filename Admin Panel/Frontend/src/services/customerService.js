

import api from './api';

const customerService = {

    // Fetch all registered customers for admin panel
    getCustomers: async () => {
        const { data } = await api.get('/customers/admin/all-customers');
        return data;
    },

    // Delete a customer by ID
    deleteCustomer: async (customerId) => {
        const { data } = await api.delete(`/customers/admin/delete/${customerId}`);
        return data; 
    }

};

export default customerService;