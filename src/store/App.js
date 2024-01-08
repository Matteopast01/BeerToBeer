import { configureStore, createSlice } from '@reduxjs/toolkit';

//Slice per i filtri
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

// Combinazione degli slice
const rootReducer = {
    filters: filterSlice.reducer,
};
// Configurazione dello store
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter } = filterSlice.actions;

export const selectFilters = (state) => state.filters;

export default store;
