
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";

export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchData",
    async (_, thunkAPI) => {
        try {
            const response = await dashboardService.getDashboardSummary();
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || "Failed to load dashboard data";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    summary: null,
    isLoading: false,
    isError: false,
    message: "",
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardState: (state) => {
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.summary = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { clearDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;