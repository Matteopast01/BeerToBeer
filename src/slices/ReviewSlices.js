import { createSlice } from '@reduxjs/toolkit';
import {get_docs_by_attribute, pull_img_url} from '../services/persistence_manager'

export const reviewSlices = createSlice(
    {
        name: "review",
        initialState: {
            reviews : [],
            rewToReply: null
        },
        reducers: {
            updateReviews: (state, action) =>{
                state.reviews =  action.payload
            },
            setRewToReply: (state, action)=>{
                state.rewToReply = action.payload
            }
        }
    }
)




export const pubReviewSlices = createSlice(
    {
        name: "pub_review",
        initialState: {
            reviews : [],
            rewToReply: null
        },
        reducers: {
            updatePubReviews: (state, action) =>{
                state.reviews =  action.payload
            },
            setPubRewToReply: (state, action)=>{
                state.rewToReply = action.payload
            }
        }
    }
)