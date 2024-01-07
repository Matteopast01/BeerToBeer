import { configureStore, createSlice } from '@reduxjs/toolkit';
import {selectClasses} from "@mui/material";

//Slice per il DropDwon
const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState: {
        selectedOption: null,
       // isOpen: false,
    },
    reducers: {
       /* openDropdown: (state) => {
            state.isOpen = true;
        },
        closeDropdown: (state) => {
            state.isOpen = false;
        },
        selectOption: (state, action) => {
            const { payload } = action;
            state.selectedOption = payload;
            state.isOpen = false;
        },*/
        setSelectedValue: (state, action) => {
            state.selectedValue = action.payload;
        },
    },
});

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
    dropdown: dropdownSlice.reducer,
    filters: filterSlice.reducer,
};
// Configurazione dello store
const store = configureStore({
    reducer: rootReducer,
});

/*export const {
    openDropdown,
    closeDropdown,
    selectOption,
} = dropdownSlice.actions;*/

export const { updateFilter } = filterSlice.actions;
export const { setSelectedValue } = dropdownSlice.actions;

/*export const selectDropdown = (state) => state.dropdown;*/
export const selectFilters = (state) => state.filters;

export default store;
