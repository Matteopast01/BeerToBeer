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