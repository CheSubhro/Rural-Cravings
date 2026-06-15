
import api from './api';

const reportService = {

    // Sales & Order Overview Summary
    getSalesOverview: async (startDate, endDate) => {
        const params = startDate && endDate ? { startDate, endDate } : {};
        const { data } = await api.get('/reports/sales-overview', { params });
        return data;
    },

    // Top Selling Food Items
    getTopItems: async (limit = 5) => {
        const { data } = await api.get(`/reports/top-items?limit=${limit}`);
        return data;
    },

    // Sales Trend Daily Breakdown (For Charts)
    getSalesTrend: async (days = 7) => {
        const { data } = await api.get(`/reports/sales-trend?days=${days}`);
        return data;
    },

    // Underperforming Items
    getUnderperformingItems: async (limit = 5) => {
        const { data } = await api.get(`/reports/underperforming-items?limit=${limit}`);
        return data;
    },

    // Customer Stats & Rider Performance
    getInsights: async () => {
        const { data } = await api.get('/reports/insights');
        return data;
    }
};

export default reportService;