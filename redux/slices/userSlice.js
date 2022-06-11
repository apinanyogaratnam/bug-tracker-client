import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.user_id = action.payload;
        }
    },
});

export const {
    setUserId,
} = userSlice.actions;

export default userSlice.reducer;
