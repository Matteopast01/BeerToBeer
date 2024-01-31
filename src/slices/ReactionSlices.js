import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice(
    {
        name: "like",
        initialState: {
           rerender: true
        },
        reducers: {
            setRerenderLike: (state, action) =>{
                state.rerender =  !state.rerender
            },
        }
    }
)


export const favoritesSlice = createSlice(
    {
        name: "favorites",
        initialState: {
            rerender: true
        },
        reducers: {
            setRerenderFavorite: (state, action) =>{
                state.rerender =  !state.rerender
            },
        }
    }
)