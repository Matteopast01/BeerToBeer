import { createSlice } from '@reduxjs/toolkit';

// Slice for user image
export const userImgSlice = createSlice({
    name: 'userImg',
    initialState: {
        value: null
    },
    reducers: {
        imgSelected: (state, action) => {
            state.value = action.payload;
        },
    }
});
