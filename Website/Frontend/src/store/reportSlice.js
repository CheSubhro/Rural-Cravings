
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '../services/reportService';

// --- Async Thunks ---
export const fetchAllReportsData = createAsyncThunk(
    'report/fetchAllData',
    async (filters, thunkAPI) => {
        try {
            const days = filters?.days || 7;
            const startDate = filters?.startDate || null;
            const endDate = filters?.endDate || null;

            const [overview, topItems, trend, coldItems, insights] = await Promise.all([
                reportService.getSalesOverview(startDate, endDate),
                reportService.getTopItems(),
                reportService.getSalesTrend(days),
                reportService.getUnderperformingItems(),
                reportService.getInsights()
            ]);

            return {
                overview: overview.data,
                topItems: topItems.data,
                trend: trend.data,
                coldItems: coldItems.data,
                riderPerformance: insights.data.riderPerformance,
                customerStats: insights.data.customerStats
            };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch analytics reports';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// --- Slice Configuration ---
const reportSlice = createSlice({
    name: 'report',
    initialState: {
        overview: null,
        topItems: [],
        trend: [],
        coldItems: [],
        riderPerformance: [],
        customerStats: null,
        isLoading: false,
        error: null
    },
    reducers: {
        clearReportError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReportsData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllReportsData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.overview = action.payload.overview;
                state.topItems = action.payload.topItems;
                state.trend = action.payload.trend;
                state.coldItems = action.payload.coldItems;
                state.riderPerformance = action.payload.riderPerformance;
                state.customerStats = action.payload.customerStats;
            })
            .addCase(fetchAllReportsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearReportError } = reportSlice.actions;
export default reportSlice.reducer;