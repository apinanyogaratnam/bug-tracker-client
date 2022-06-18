import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import projectsSlice from './slices/projectsSlice';
import projectSlice from './slices/projectSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        projects: projectsSlice,
        project: projectSlice,
    },
});
