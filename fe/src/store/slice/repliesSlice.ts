import { createSlice } from "@reduxjs/toolkit";
import { IReplies } from "../../interface/IReplies";

const initialRepliesState: IReplies = { data: [] };

export const repliesSlice = createSlice({
  name: "replies",
  initialState: initialRepliesState,
  reducers: {
    GET_REPLIES: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

