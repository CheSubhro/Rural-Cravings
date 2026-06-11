

import api from './api';

const customerService = {

    // Fetch all registered customers for admin panel
    getCustomers: async () => {
        const { data } = await api.get('/customers/admin/all-customers');
        return data;
    }

};

export default customerService;