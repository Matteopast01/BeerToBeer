import { configureStore} from '@reduxjs/toolkit';
import {reviewSlices, pubReviewSlices} from "../slices/ReviewSlices";
import {filterSlice, searchedBeersSlice, searchTermSlice, sortingSlice} from "../slices/SearchSlices"
import {loadedPubsSlice, pubSlice} from "../slices/PubSlices";
import {userImgSlice} from '../slices/UserSlices'


// combination of all slices
const rootReducer = {
    filters: filterSlice.reducer,
    sorting: sortingSlice.reducer,
    pub: pubSlice.reducer,
    review: reviewSlices.reducer,
    pub_review: pubReviewSlices.reducer,
    loadedPubs: loadedPubsSlice.reducer,
    searchedBeers: searchedBeersSlice.reducer,
    searchTerm: searchTermSlice.reducer,
    userImg: userImgSlice.reducer
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
});

export const { updateFilter } = filterSlice.actions;
export const { setSelection1, setSelection2 } = sortingSlice.actions;
export const {pubSelected, resetPubSelected} = pubSlice.actions;
export const {addPub, resetPubs} = loadedPubsSlice.actions;
export const {updateReviews, setRewToReply} = reviewSlices.actions;
export const {updatePubReviews, setPubRewToReply} = pubReviewSlices.actions;
export const {setSearchedBeers} = searchedBeersSlice.actions;
export const {setSearchTerm} = searchTermSlice.actions;
export const {imgSelected} = userImgSlice.actions;
export const selectFilters = (state) => state.filters;

export default store;
