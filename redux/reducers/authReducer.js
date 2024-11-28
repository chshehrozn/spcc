import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, getFromJsonStorage } from "../../app/utiles/common";
const token = getFromStorage("user_token");
const userRole = getFromStorage("user_type");
const userInfo = JSON.parse(getFromStorage("userInfo"));
const roles = JSON.parse(getFromStorage("roles"));
const chooseCategory = getFromJsonStorage("chooseCategory");

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    token: token ? token : null,
    isUser: token ? true : false,
    userRole: userRole ? userRole : "",
    userInfo: userInfo ? userInfo : "",
    roles: roles ? roles : "",
    chooseCategory: chooseCategory ? chooseCategory : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload;
    },
    setRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setChooseCategory: (state, action) => {
      state.chooseCategory = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("userInfo");
      localStorage.clear();
      state.token = null;
      state.isUser = false;
    },
  },
});
export const {
  setToken,
  setIsUser,
  setRole,
  setUserInfo,
  setChooseCategory,
  setRoles,
  logout,
} = authReducer.actions;
export default authReducer.reducer;
