import { createSlice } from "@reduxjs/toolkit";
import { ThreadInterface } from "../../interface/IThread";

const initialThreadsState: { threadDetail: ThreadInterface | null } = { threadDetail: null }; 

export const threadDetailSlice = createSlice({
    name: "threadDetail",
    initialState: initialThreadsState,
    reducers: {
        SET_THREAD_DETAIL: (state, action) => {
            state.threadDetail = action.payload;
        },
    },
});