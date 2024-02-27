/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../interface/IAuth";
import { setAuthToken } from "../../libs/axios";

const initialAuthState: { data: IAuth } = {
  data: {
    id: 0,
    username: "",
    full_name: "",
    email: "",
    profile_picture: "",
    profile_description: "",
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
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
      };

      state.data = user;
    },
    AUTH_CHECK: (state, action) => {
      const payload = action.payload;
      const user: IAuth = {
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
      };

      state.data = user;
    },
    AUTH_LOGOUT: (_state, _action) => {
      localStorage.removeItem("token");
    },

    AUTH_ERROR: (_state, _action) => {
      localStorage.removeItem("token");
    },
  },
});

export const { AUTH_LOGIN } = authSlice.actions;

export default authSlice.reducer;
