import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to send card data
export const sendData = createAsyncThunk('sendCard/sendCardData', async (cardData) => {
    const response = await axios.post('/api/cards', cardData); // API call to send card data
    return response.data;
});

const sendCardSlice = createSlice({
    name: 'sendCard',
    initialState: {
        title: '',
        description: '',
        price: 0,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setCardDetails: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.price = action.payload.price;
        },
        resetCardDetails: (state) => {
            state.title = '';
            state.description = '';
            state.price = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.title = '';
                state.description = '';
                state.price = 0;
            })
            .addCase(sendData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCardDetails, resetCardDetails } = sendCardSlice.actions;

export default sendCardSlice.reducer;
