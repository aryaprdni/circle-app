import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { threadSlice, postThreadSlice } from "./slice/threadSlice";
import { followSlice } from "./slice/followSlice";
import { usersSlice } from "./slice/userSlice";
import { repliesSlice } from "./slice/repliesSlice";
<<<<<<< HEAD
import { threadDetailSlice } from "./slice/threadDetailSlice";
=======
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT, AUTH_UPDATE } = authSlice.actions;
export const { GET_THREADS, SET_THREAD_LIKE } = threadSlice.actions;
export const { POST_THREAD } = postThreadSlice.actions;
export const { GET_FOLLOWS, SET_FOLLOW, SET_FOLLOW_STATE } = followSlice.actions;
export const { GET_USERS } = usersSlice.actions;
export const { GET_REPLIES } = repliesSlice.actions;
<<<<<<< HEAD
export const { SET_THREAD_DETAIL} = threadDetailSlice.actions;
=======
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070

export const authReducer = authSlice.reducer;
export const threadReducer = threadSlice.reducer;
export const followReducer = followSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const getReplies = repliesSlice.reducer;
<<<<<<< HEAD
export const getThreadDetail = threadDetailSlice.reducer;
=======
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070

export const rootReducer = combineReducers({
  auth: authReducer,
  thread: threadReducer,
  follow: followReducer,
  users: usersReducer,
  replies: getReplies,
<<<<<<< HEAD
  threadDetail: getThreadDetail
=======
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070
});
