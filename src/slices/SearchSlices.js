import { createSlice } from '@reduxjs/toolkit';

// Slice for filters
export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        values: [
            { min: 0, max: 200 },
            { min: 0, max: 200 },
            { min: 0, max: 200 },
        ],
    },
    reducers: {
        updateFilter: (state, action) => {
            const {index, newValue} = action.payload;
            state.values = state.values.map((filter, i) =>
                i === index ? {...filter, min: newValue[0], max: newValue[1]} : filter
            );
        },
    },
});

// Slice for sorting
export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        selection1: { label: 'Seleziona...', value: null },
        selection2: { label: 'Seleziona...', value: null },
    },
    reducers: {
        setSelection1: (state, action) => {
            state.selection1 = action.payload;
        },
        setSelection2: (state, action) => {
            state.selection2 = action.payload;
        },
    },
});

export const searchedBeersSlice = createSlice({
    name: 'searchedBeers',
    initialState: {
       searchedBeers: []
    },
    reducers: {
        setSearchedBeers: (state, action) => {
            state.searchedBeers = action.payload;
        },
    },
});

export const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState: {
       value: ""
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.value = action.payload;
        },
    },
});