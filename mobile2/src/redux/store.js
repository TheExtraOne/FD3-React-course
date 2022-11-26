import { configureStore } from '@reduxjs/toolkit';

import clientsSlice from './clientsSlice';

export const store = configureStore({
    reducer: {
        clients: clientsSlice,
    },
})