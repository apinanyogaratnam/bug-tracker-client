import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project_id: null,
    name: '',
    columns: {},
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state = action.payload;
        },
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
    },
});

export const {
    setProject,
    setColumns,
} = projectSlice.actions;

export default projectSlice.reducer;
