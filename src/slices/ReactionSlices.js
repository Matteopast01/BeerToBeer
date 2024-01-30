import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice(
    {
        name: "like",
        initialState: {
           rerender: null
        },
        reducers: {
            setRerenderLike: (state, action) =>{
                state.rerender =  action.payload
            },
        }
    }
)


export const favoritesSlice = createSlice(
    {
        name: "favorites",
        initialState: {
            rerender: null
        },
        reducers: {
            setRerenderFavorite: (state, action) =>{
                state.rerender =  action.payload
            },
        }
    }
)