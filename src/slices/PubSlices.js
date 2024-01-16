import { createSlice } from '@reduxjs/toolkit';

// Slice for pub selected in ourPub page
export const pubSlice = createSlice({
    name: 'pub',
    initialState: {value : null},
    reducers: {
        pubSelected: (state, action) => {
            state.value = action.payload;
        },
        resetPubSelected: (state, action) => {
            state.value = action.payload;
        }
    }
});


export const loadedPubsSlice = createSlice({
    name: 'loadedPubs',
    initialState: {
        pubs : []
    },
    reducers: {
        addPub: (state, action) => {
            state.pubs.push(action.payload);
        },
        resetPubs: (state, action) => {
            state = [];
        }
    }
});