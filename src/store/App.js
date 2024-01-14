import { configureStore, createSlice } from '@reduxjs/toolkit';
import {reviewSlices} from "../slices/ReviewSlices";
import {filterSlice, sortingSlice} from "../slices/SearchSlices"
import {pubSlice} from "../slices/PubSlices";


// combination of all slices
const rootReducer = {
    filters: filterSlice.reducer,
    sorting: sortingSlice.reducer,
    pub: pubSlice.reducer,
    review: reviewSlices.reducer
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter } = filterSlice.actions;
export const { setSelection1, setSelection2 } = sortingSlice.actions;
export const {pubSelected, resetPubSelected} = pubSlice.actions;

export const {updateReviews} = reviewSlices.actions

export const selectFilters = (state) => state.filters;
export const selectSorting = (state) => state.sorting;

export default store;