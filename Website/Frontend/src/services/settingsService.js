
import api from './api';

const settingsService = {

    // Get Global Settings (Public)
    getGlobalSettings: async () => {
        const { data } = await api.get('/settings');
        return data;
    },

    // Update Global Settings (Protected - Admin/Manager)
    updateGlobalSettings: async (settingsData) => {
        const { data } = await api.patch('/settings', settingsData);
        return data;
    }
};

export default settingsService;