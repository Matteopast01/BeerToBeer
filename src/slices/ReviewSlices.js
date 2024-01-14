import { createSlice } from '@reduxjs/toolkit';
import { get_docs_by_attribute } from '../services/persistence_manager'

export const reviewSlices = createSlice(
    {
        name: "review",
        initialState: {
            reviews : []
        },
        reducers: {
            updateReviews: async (state, action) =>{
                state.reviews = await get_docs_by_attribute( action.payload, "Review","beer_id",3, "date", "desc")
            }
        }
    }
)