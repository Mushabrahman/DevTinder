import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed: (state,action)=>{
            return action.payload;
        },
      removeFeed: (state,action)=>{
        return state.filter(res=>res._id!==action.payload)
      }
    }
})

export const {addFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer