import { createSlice } from '@reduxjs/toolkit';

// Slice for pub selected in ourPub page
export const pubSlice = createSlice({
    name: 'pub',
    initialState: null,
    reducers: {
        pubSelected: (state, action) => {
            state = action.payload;
        },
        resetPubSelected: (state, action) => {
            state = action.payload;
        }
    }
});


export const loadedPubsSlice = createSlice({
    name: 'loadedPubs',
    initialState: [],
    reducers: {
        addPub: (state, action) => {
            state.push(action.payload);
        },
        resetPubs: (state, action) => {
            state = [];
        }
    }
});