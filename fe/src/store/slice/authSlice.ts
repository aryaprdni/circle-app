/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../interface/IAuth";
import { setAuthToken } from "../../libs/axios";

const initialAuthState: { data: IAuth } = {
  data: {
    userId: 0,
    id: 0,
    username: "",
    full_name: "",
    email: "",
    bio: "",
    profile_picture: null,
    profile_description: null,
    followers_count: 0,
    followings_count: 0,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const payload = action.payload;
      // console.log(action.payload);
      const { token } = action.payload;
      setAuthToken(token);
      localStorage.setItem("token", token);
      const user: IAuth = {
        userId: payload.user.id,
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        bio: payload.user.bio,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
        followers_count: payload.user.followers_count,
        followings_count: payload.user.followings_count,
      };

      state.data = user;
    },
    AUTH_CHECK: (state, action) => {
      const payload = action.payload;
      const user: IAuth = {
        userId: payload.user.id,
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        bio: payload.user.bio,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
        followers_count: payload.user.followers_count,
        followings_count: payload.user.followings_count,
      };

      state.data = user;
    },
    AUTH_UPDATE: (state, action) => {
      state.data = action.payload;
    },


    AUTH_LOGOUT: (state) => {
      localStorage.removeItem("token");
      setAuthToken(null);

      state.data = {
        userId: 0,
        id: 0,
        username: "",
        full_name: "",
        email: "",
        bio: "",
        profile_picture: "",
        profile_description: "",
        followers_count: 0,
        followings_count: 0,
      };
    },

    AUTH_ERROR: (_state, _action) => {
      localStorage.removeItem("token");
    },
  },
});

export const { AUTH_LOGIN } = authSlice.actions;

export default authSlice.reducer;
