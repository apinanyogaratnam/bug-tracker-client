import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (_state, action) => {
            return action.payload;
        }
    },
});

export const {
    setProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
