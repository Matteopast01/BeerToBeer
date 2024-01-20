import { createSlice } from '@reduxjs/toolkit';
import { get_docs_by_attribute } from '../services/persistence_manager'

export const reviewSlices = createSlice(
    {
        name: "review",
        initialState: {
            reviews : []
        },
        reducers: {
            updateReviews: (state, action) =>{
                state.reviews = action.payload
            }
        }
    }
)