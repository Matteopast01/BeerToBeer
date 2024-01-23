import { configureStore} from '@reduxjs/toolkit';
import {reviewSlices, pubReviewSlices} from "../slices/ReviewSlices";
import {filterSlice, searchedBeersSlice, searchTermSlice, sortingSlice} from "../slices/SearchSlices"
import {loadedPubsSlice, pubSlice} from "../slices/PubSlices";


// combination of all slices
const rootReducer = {
    filters: filterSlice.reducer,
    sorting: sortingSlice.reducer,
    pub: pubSlice.reducer,
    review: reviewSlices.reducer,
    pub_review: pubReviewSlices.reducer,
    loadedPubs: loadedPubsSlice.reducer,
    searchedBeers: searchedBeersSlice.reducer,
    searchTerm: searchTermSlice.reducer
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter, setValuesFilter } = filterSlice.actions;
export const { setSelection1, setSelection2 } = sortingSlice.actions;
export const {pubSelected, resetPubSelected} = pubSlice.actions;
export const {addPub, resetPubs} = loadedPubsSlice.actions;
export const {updateReviews, setRewToReply} = reviewSlices.actions;
export const {updatePubReviews, setPubRewToReply} = pubReviewSlices.actions;
export const {setSearchedBeers} = searchedBeersSlice.actions;
export const {setSearchTerm} = searchTermSlice.actions;
// TODO da togliere?
export const selectFilters = (state) => state.filters;
// TODO da togliere?
export const selectSorting = (state) => state.sorting;

export default store;