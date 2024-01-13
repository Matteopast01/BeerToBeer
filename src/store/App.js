import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice for filters
const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        values: [
            { min: 20, max: 37 },
            { min: 1, max: 10 },
            { min: 1, max: 10 },
        ],
    },
    reducers: {
        updateFilter: (state, action) => {
            const { index, newValue } = action.payload;
            state.values = state.values.map((filter, i) =>
                i === index ? { ...filter, min: newValue[0], max: newValue[1] } : filter
            ); },
    },
});

// Slice for sorting
const sortingSlice = createSlice({
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

// Slice for pub selected in ourPub page
const pubSlice = createSlice({
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

// combination of all slices
const rootReducer = {
    filters: filterSlice.reducer,
    sorting: sortingSlice.reducer,
    pub: pubSlice.reducer
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter } = filterSlice.actions;
export const { setSelection1, setSelection2 } = sortingSlice.actions;
export const {pubSelected, resetPubSelected} = pubSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectSorting = (state) => state.sorting;

export default store;