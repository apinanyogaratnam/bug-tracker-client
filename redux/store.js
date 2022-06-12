import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import projectsSlice from './slices/projectsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        projects: projectsSlice,
    },
});
