import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import dataReducer from '@/features/cardsSlice';
import sendCardReducer from '@/features/sendCardSlice';
const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    data: dataReducer,
    sendCard: sendCardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
