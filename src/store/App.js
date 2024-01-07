import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
    reducer: {
        filters: filterSlice.reducer,
    },
});

export default store;
export const { updateFilter } = filterSlice.actions;
