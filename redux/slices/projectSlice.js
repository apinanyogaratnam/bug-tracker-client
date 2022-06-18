import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project_id: null,
    name: '',
    columns: {},
    column_id: null,
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
        setColumnId: (state, action) => {
            state.column_id = action.payload;
        },
    },
});

export const {
    setProject,
    setColumns,
    setColumnId,
} = projectSlice.actions;

export default projectSlice.reducer;
