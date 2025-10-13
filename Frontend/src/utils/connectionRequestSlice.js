import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addConnectionRequest: (state, action) => {
            return action.payload;
        },
        removeConnectionRequest: (state, action) => {
            return state.filter((ele) => {
                return ele.fromUserId._id !== action.payload
            })
        }
    }
})

export const { addConnectionRequest, removeConnectionRequest } = connectionRequestSlice.actions;

export default connectionRequestSlice.reducer